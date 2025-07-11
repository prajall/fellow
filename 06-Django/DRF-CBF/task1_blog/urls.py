from django.urls import path, include
from .views import BlogListAPI, BlogDetailAPI,BlogMixinView, BlogDetailMixin, BlogListGeneric, BlogDetailGeneric

from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, UserListView, UserDetail

router = DefaultRouter()
router.register(r'blog',BlogViewSet)

urlpatterns = [
    # APIView
    path('blogs-apiview/',BlogListAPI.as_view()),
    path('blogs-apiview/<int:pk>/',BlogDetailAPI.as_view()),

    # Mixins
    path('blogs-mixins/',BlogMixinView.as_view()),
    path('blogs-mixins/<int:pk>/',BlogDetailMixin.as_view()),

    # Generic View
    path('blogs-generic/',BlogListGeneric.as_view()),
    path('blogs-generic/<int:pk>/',BlogDetailGeneric.as_view()),

    #ViewSet

    # # Router

    # path('',include(router.urls)),
    # path('users',UserListView.as_view()),
    # path('users/<int:pk>',UserDetail.as_view())
]
