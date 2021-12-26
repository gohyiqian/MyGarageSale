from django.urls import path
from base.views import message_views as views

urlpatterns = [
    path('', views.createMessage, name="create_message"),
    path('all/',views.getAllMessage, name="get_all_message"),
    path('<str:pk>/',views.getMessage, name="get_message")
]