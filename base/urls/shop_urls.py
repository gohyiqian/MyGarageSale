from django.urls import path
from base.views import shop_views as views

urlpatterns = [
    path('', views.getShop,  name="get_shop"),
    path('create/', views.createShop,  name="create_shop"), #seller/admin
    path('all/',views.getAllShops, name='get_all_shops'), #public
    path('<str:pk>/',views.getShopByShopId, name='get_shop'), #get shop by shop_id
    path('user/<str:pk>/',views.getShopByUserId, name='get_shop_by_user_id'), #get shop by user_id
    path('update/<str:pk>/', views.updateShop, name="update_shop"),
    path('delete/<str:pk>/', views.deleteShop, name="delete_shop"),
]