from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response    
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, DestroyAPIView
from rest_framework.views import  APIView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly, IsGroupMember
from .models import Group, GroupMember
from .serializers import GroupSerializer, InvitationSerializer
from users.models import User
from .serializers import GroupMemberSerializer
from datetime import datetime
from django.db.models import Count

# from rest_framework.generics import GenericAPIView

# Create your views here.
class GroupListCreateView(ListCreateAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def perform_create(self, serializer):
        print("perform_create: request.user:",self.request.user)
        serializer.save(owner=self.request.user)

        data = {
            "group": serializer.data.get("id"),
            "member": self.request.user.id,
            "invited_by": self.request.user.id,
            "joined": True,
            "joined_date": datetime.now()
        }
        groupmember_serializer = GroupMemberSerializer(data=data)
        groupmember_serializer.is_valid(raise_exception=True)
        groupmember_serializer.save()
    
    def list(self, request, *args, **kwargs):
        queryset = Group.objects.filter(
            members__member=request.user,
            members__joined=True
        ).annotate(total_members=Count('members', distinct=True))
        print("Request user", request.user)
        serializer = GroupSerializer(queryset, many=True)
        return Response(serializer.data)

class GroupDetailView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated, IsGroupMember]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class InviteMember(APIView):

    permission_classes = [IsAuthenticated, IsGroupMember]

    def post(self, request, pk):
        email = request.data.get("email")
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message":"User not found."},status=404)
        
        user_exists = GroupMember.objects.filter(group=pk, member=user.id).first()
        if user_exists:
            if user_exists.joined:
                return Response({"detail":"User already in the group."},status=400)
            else:
                return Response({"message":"User already invited."},status=200)
        
        data = {
            "group": pk,
            "member": user.id,
            "invited_by": request.user.id,
            "joined": False,
            "joined_date": None
        }
        serializer = GroupMemberSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except Exception as e:
            return Response({"message": "Error saving data", "error": str(e)}, status=500)

        # send invitation email
        return Response({"message":"Invited successfully.", "data":serializer.data},status=200)


class AcceptInvitation(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            groupmember_object = GroupMember.objects.get(group=pk, member=request.user.id)
        except GroupMember.DoesNotExist:
            return Response({"message":"Invitation not found."},status=404)

        groupmember_object.joined = True
        groupmember_object.joined_date = datetime.now()
        try:
            groupmember_object.save()
        except Exception as e:
            return Response({"message": "Error saving data", "error": str(e)}, status=500)

        return Response("Invitation accepted successfully.", status=200)

class RejectInvitation(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            groupmember_object = GroupMember.objects.get(group=pk, member=request.user.id)
        except GroupMember.DoesNotExist:
            return Response({"message":"Invitation not found."},status=404)

        try:
            groupmember_object.delete()
        except Exception as e:
            return Response({"message": "Error saving data", "error": str(e)}, status=500)

        return Response("Invitation accepted successfully.", status=200)




class LeaveGroup(DestroyAPIView):

    permission_classes = [IsAuthenticated, IsGroupMember]
    queryset = GroupMember.objects.all()
    serializer_class = GroupMemberSerializer

class ViewInvitations(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        invitations = GroupMember.objects.filter(member=request.user, joined=False).select_related('group', 'invited_by')
        serializer = InvitationSerializer(invitations, many=True)
        print("Invitations:", serializer.data)
        return Response(serializer.data, status=200)
