from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, Review, ShippingAddress, Order, OrderItem, Shop, UserType, Conversation, Message
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    usertype = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'date_joined', 'usertype']

    # customised default is_staff to isAdmin
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name #name=firstname=username
        # if no name, set email as the name
        if name == '':
            name = obj.email
        return name

    def get_usertype(self,obj):
        usertype = obj.usertype
        # print(usertype)
        serializer = UserTypeSerializer(usertype, many=False)
        return serializer.data

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email',  'name', 'isAdmin', 'date_joined', 'token','usertype']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        address = obj.shippingaddress
        serializers = ShippingAddressSerializer(address, many=False)
       
        return serializers.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class ShopSerializer(serializers.ModelSerializer):
        class Meta:
            model = Shop
            fields = '__all__'


class UserTypeSerializer(serializers.ModelSerializer):
        class Meta:
            model = UserType
            fields = '__all__'

class ConversationSerializer(serializers.ModelSerializer):
        user = serializers.SerializerMethodField(read_only=True)
        class Meta:
            model: Conversation
            fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
        user = serializers.SerializerMethodField(read_only=True)
        class Meta:
            model: Message
            fields = '__all__'