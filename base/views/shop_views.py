from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Shop, Product
from base.serializers import ShopSerializer
from rest_framework import serializers, status
from datetime import datetime

# POST/CREATE Shop (Seller)
@api_view(['POST'])
# @permission_classes([IsAdminUser])
@permission_classes([IsAuthenticated])
def createShop(request):
    try:
        user = request.user
        if user.usertype.is_seller:
            shop = Shop.objects.create(
                user=user,
                name='default shop name',
                description='default description',
                contact ='123'
            )
            shop.save()

        serializer = ShopSerializer(instance=shop, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'detail': 'You must be a Seller to create Shop'},status=status.HTTP_400_BAD_REQUEST)


# GET all shops of a Seller (User Auth)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getShop(request):
    user = request.user
    shop = user.shop_set.all()
    serializer = ShopSerializer(shop, many=True) #many=True
    return Response(serializer.data)


# GET all Shops(Public)
@api_view(['GET'])
def getAllShops(request):
    shops = Shop.objects.all()
    serializer = ShopSerializer(shops, many=True)
    return Response(serializer.data)


# GET shop by Shop Id (Public)
@api_view(['GET'])
def getShopByShopId(request, pk):
    try: 
        shop= Shop.objects.get(shop_id=pk)
        serializer = ShopSerializer(instance=shop, many=False) 
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'detail': 'Shop does not exist'}, status=status.HTTP_400_BAD_REQUEST)

# GET shop by User Id (Seller/Admin)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getShopByUserId(request, pk):
    user = request.user
    # print(user)
    # print(Shop.objects.get(user=pk))
    try:
        shop = Shop.objects.get(user=pk)
        # print(shop.user)
        if user == shop.user:
            serializer = ShopSerializer(shop, many=False)
            # print(serializer.data)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this shop'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'You do not own this Shop'}, status=status.HTTP_400_BAD_REQUEST)

# EDIT shop (Seller/Admin)
@api_view(['PATCH'])
# @permission_classes([IsAdminUser])
@permission_classes([IsAuthenticated])
def updateShop(request, pk):
    user = request.user
    data = request.data
    shop = Shop.objects.get(shop_id=pk)
    try:
        if shop.user == user:
            shop.name = data['name']
            shop.contact = data['contact']
            shop.description = data['description']
            shop.save()

            serializer = ShopSerializer(shop, many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
    except:
        return Response({'detail': 'You do not own this Shop'}, status=status.HTTP_400_BAD_REQUEST)

# DELETE Shop (Admin only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteShop(request, pk):
    shop = Shop.objects.get(shop_id=pk)
    shop.delete()
    return Response('Shop Deleted', status=status.HTTP_204_NO_CONTENT)