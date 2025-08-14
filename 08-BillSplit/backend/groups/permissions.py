from rest_framework import permissions
from .models import GroupMember

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
    
class IsGroupMember(permissions.BasePermission):

    def has_permission(self,request,view):
        user_id = request.user
        if request.method == 'GET':
            group_id = request.query_params.get('group_id')  
        else:
            group_id = request.data.get('group_id')

        print("user_id",user_id)
        print(user_id,group_id)
        is_group_member = GroupMember.objects.filter(member=user_id, group=group_id).exists()
        print("is_group_member:",is_group_member)
        return is_group_member

        