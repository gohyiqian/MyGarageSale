from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('', views.getUserOrders, name="get_user_orders"),
    path('add/', views.addOrder, name="add_order"),
    path('all/', views.getAllOrders, name="get_all_orders"), #admin_only
    path('<str:pk>/', views.getOrderById, name="get_order_by_id"),
    path('<str:pk>/pay/', views.updateOrderToPaid, name="update_order_to_paid"),
    path('<str:pk>/deliver/', views.updateOrderToDelivered, name="update_order_to_delivered"), #admin_only
]