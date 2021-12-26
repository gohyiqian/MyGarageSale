from django.contrib import admin
from django.contrib.auth.models import User
from .models import Product, Review, Order, OrderItem, ShippingAddress, Shop, UserType, Message, Conversation

# Register your models here.
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(Shop)
admin.site.register(UserType)
admin.site.register(Message)
admin.site.register(Conversation)