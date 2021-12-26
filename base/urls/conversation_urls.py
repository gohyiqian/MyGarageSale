from django.urls import path
from base.views import conversation_views as views

urlpatterns = [
    path('', views.createConversation, name="create_conversation"),
    path('all/',views.getAllConversations, name="get_all_message"),
    # path('<str:pk>/',views.getConversations, name="get_message")
]