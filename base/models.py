from django.db import models
from django.contrib.auth.models import User, AbstractUser #Django built-in user view
#  For extending user model using one-for-one link
from django.db.models.signals import post_save
from django.dispatch import receiver
# import uuid

# class CustomUser(AbstractUser):
#     profileImage = models.ImageField(default='/noAvatar.png', null=True, blank=True)
#     coverImage = models.ImageField(default='/noCover.jpg', null=True, blank=True)
#     followers = models.ManyToManyField(User, blank=True)
#     followings = models.ManyToManyField(User, blank=True)
    # is_seller = models.BooleanField('seller', default=False)
    # is_buyer = models.BooleanField('buyer', default=False)

# Extend Django User Model to include userType
class UserType(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    user = models.OneToOneField(User,on_delete=models.SET_NULL, null=True)
    is_seller = models.BooleanField(default=False)
    is_buyer = models.BooleanField(default=False)
    bio = models.TextField(null=True, blank=True)
    profile_image = models.ImageField(default='images/noAvatar.png',null=True, blank=True)
    cover_image = models.ImageField(default='images/userCoverImage.jpg',null=True, blank=True)

    @receiver(post_save, sender=User)
    def create_user_type(sender, instance, created, **kwargs):
        if created:
            UserType.objects.get_or_create(user=instance)
        # instance.usertype.save()

    @receiver(post_save, sender=User)
    def save_user_type(sender, instance, **kwargs):
        instance.usertype.save()
    
    def __str__(self):
        return str(self.user)

class Shop(models.Model):
    # shop_id = models.UUIDField(default=uuid.uuid4, unique=True)
    shop_id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(default='/placeholder.png',null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    contact = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return str(self.name)

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) #relationship to user
    shop = models.ForeignKey(Shop, on_delete=models.SET_NULL, null=True) #relationship to Shop
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(default='/placeholder.png',null=True, blank=True)
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)
    size = models.CharField(max_length=10, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    stockCount = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=500, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    # CASCADE - shippingAddress to be deleted when order model is deleted
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    # shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)

# class FollowRequest(models.Model):
#     to_user = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
#     from_user = models.ForeignKey(User, related_name="follower", on_delete=models.CASCADE)
#     timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
#     def __str__(self):
#         return str(self.from_user)


class Conversation(models.Model):
    chat_id = models.AutoField(primary_key=True, editable=False)
    subject = models.CharField(max_length=200, null=True, blank=True)
    participants = models.ManyToManyField(User,related_name='conversation',blank=True)
    timestamp = models.DateField(auto_now_add=True)
    def __str__(self):
        return str(self.subject)

class Message(models.Model):
    msg_id = models.AutoField(primary_key=True, editable=False)
    conversation = models.ForeignKey(Conversation,on_delete=models.CASCADE, null=True, blank=True)
    sender = models.ForeignKey(User,on_delete=models.CASCADE)
    content = models.TextField(max_length=500, null=True, blank=True) 
    timestamp = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.sender)

