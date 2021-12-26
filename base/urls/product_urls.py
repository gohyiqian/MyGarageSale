from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('<str:pk>', views.getProduct, name="get_product"),
    path('category/', views.getProductsByCat, name="upload_image"),
    path('shop/', views.getProductsByShop, name="get_product_by_shop"),
    path('', views.getProducts, name="get_products"),
    path('top/', views.getTopProducts, name='get_top_products'),
    path('create/', views.createProduct, name="create_product"),
    path('upload/', views.uploadImage, name="upload_image"),
    path('update/<str:pk>/', views.updateProduct, name="update_product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete_product"),
    path('<str:pk>/reviews/', views.createProductReview, name="create_product_review"),
    path('distinct/colors/', views.getDistinctColor, name="get_distinct_color"),
    path('distinct/category/', views.getDistinctCat, name="get_distinct_cat"),
    path('shop/create/<str:pk>/', views.createShopProduct, name="create_shop_product"),
    path('shop/update/<str:pk>/', views.updateShopProduct, name="update_shop_product"),
]