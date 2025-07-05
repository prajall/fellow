from django.urls import path
from .views import home_view
from .views import detail_view
from .views import post_blog
from .views import edit_blog
from .views import delete_blog
from django.conf import settings
from django.conf.urls.static import static

app_name = "task1_blog"
urlpatterns = [
    path("",home_view, name="home_view"),
    path("detail/<int:id>",detail_view, name="detail"),
    path("create/",post_blog,name='post_blog'),
    path("edit/<int:id>",edit_blog,name='edit_blog'),
    path("delete/<int:id>",delete_blog,name='delete_blog')

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
