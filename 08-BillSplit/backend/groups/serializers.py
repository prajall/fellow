from rest_framework import serializers
from .models import Group, GroupMember
from users.models import User
from users.serializers import UserSerializer

class GroupSerializer(serializers.ModelSerializer):
    total_members = serializers.SerializerMethodField()
    members = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = "__all__"

    def get_total_members(self, obj):
        return obj.members.filter(joined=True).count()

    def get_members(self, obj):
        joined_members = obj.members.filter(joined=True).select_related('member')
        members = [gm.member for gm in joined_members]
        serializer = UserSerializer(members, many=True)
        return serializer.data

    
class GroupMemberSerializer(serializers.ModelSerializer):

    class Meta:
        model = GroupMember
        fields = "__all__"
    
class InvitationSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)
    invited_by = UserSerializer(read_only=True)

    class Meta:
        model = GroupMember
        fields = "__all__"