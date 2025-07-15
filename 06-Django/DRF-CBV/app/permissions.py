from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request):
        if request.user.get("role") == "admin":
            return True
        else:
            return False

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self,request,obj,view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.user
            