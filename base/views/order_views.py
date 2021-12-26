# from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer
from rest_framework import status
from datetime import datetime

# USER CREATE order
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    user = request.user #username
    data = request.data #orderItems array
    # print(data)
    orderItems = data['orderItems']
    # print(data['shippingAddress']['address'])
    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # Create user order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
       
        # Create user shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )
       
        # Loop thru every orderItems and relate to order
        for item in orderItems:
            # get products
            product = Product.objects.get(id=item['productId'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=item['qty'],
                price=item['price'],
                image=product.image.url,
            )

            # minus stockCount from product stockCount
            product.stockCount -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)


# USER GET order
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# ADMIN GET all orders
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# USER GET order BY ID
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


# UPDATE order pay
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was paid', status=status.HTTP_200_OK)


# ADMIN UPDATE order delivery
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response('Order was delivered', status=status.HTTP_200_OK)
    