from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response    
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import  APIView
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwnerOrReadOnly, IsGroupMember
from .models import Group, GroupMember
from .serializers import GroupSerializer
from users.models import User
from .serializers import GroupMemberSerializer
from datetime import datetime

# from rest_framework.generics import GenericAPIView

# Create your views here.
class GroupListCreateView(ListCreateAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def perform_create(self, serializer):
        print("perform_create: request.user:",self.request.user)
        serializer.save(owner=self.request.user)

        # add owner to group member
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


class GroupDetailView(RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class InviteMember(APIView):

    permission_classes = [IsAuthenticated, IsGroupMember]

    def post(self, request, pk):
        data = {
            "group": pk,
            "member": request.data.get("member",""),
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
