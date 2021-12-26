from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from base.models import Product, Review, Shop
from base.serializers import ProductSerializer
from rest_framework import status

# GET all products with Pagination && Search by keyword (Public)
@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    # Case-insensitive containment test - icontains
    # filter by product names
    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')
        
    
    page = request.query_params.get('page')

    # set number of products to return
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    # return 1st page if not integer
    except PageNotAnInteger:
        products = paginator.page(1)
    # return last page if empty page
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(instance=products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


# GET 1 Product for ProductShowPage (Public)
@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(instance=product, many=False) 
    return Response(serializer.data, status=status.HTTP_200_OK)


# GET top few products for Homepage
@api_view(['GET'])
def getTopProducts(request):
    #filter top 8 products with rating >= 4 and ordered by ratings
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:8]
    serializer = ProductSerializer(instance=products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


#  GET products by Category
@api_view(['GET'])
def getProductsByCat( request):
    query = request.query_params.get('category')
    if query == None:
        query = ''

    # filter by categories
    products = Product.objects.filter(category__icontains=query)

    page = request.query_params.get('page')
    # set number of products to return
    paginator = Paginator(products, 12)
    try:
        products = paginator.page(page)
    # return 1st page if not integer
    except PageNotAnInteger:
        products = paginator.page(1)
    # return last page if empty page
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(instance=products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

# GET distinct product categories
@api_view(['GET'])
def getDistinctCat(request):
    category = Product.objects.values('category').distinct()
    print(category)
    return Response(category)

# GET distinct product colors
@api_view(['GET'])
def getDistinctColor(request):
    color = Product.objects.values('color').distinct()
    print(color)
    # serializer = ProductSerializer(instance=color, many=True)
    return Response(color)

# Admin POST Product (Admin)
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        stockCount=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(instance=product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
# @permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    print(data)
    productId = data['productId']
    product = Product.objects.get(id=productId)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded', status=status.HTTP_201_CREATED)


# Admin EDIT product
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.stockCount = data['stockCount']
    product.color = data['color']
    product.category = data['category']
    product.gender = data['gender']
    product.size = data['size']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)


# Admin/seller DELETE Product
@api_view(['DELETE'])
# @permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response('Producted Deleted', status=status.HTTP_204_NO_CONTENT)


# CREATE Product Reviews
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(id=pk)
    data = request.data

    # Check if review already exists
    checkExists = product.review_set.filter(user=user).exists()
    if checkExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # If no rating selected
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # Create new review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added', status=status.HTTP_201_CREATED)

#  GET products by Shop
@api_view(['GET'])
def getProductsByShop( request):
    query = request.query_params.get('shop')
    if query == None:
        query = ''

    # filter by categories
    products = Product.objects.filter(shop=query)

    page = request.query_params.get('page')
    # set number of products to return
    paginator = Paginator(products, 8)
    try:
        products = paginator.page(page)
    # return 1st page if not integer
    except PageNotAnInteger:
        products = paginator.page(1)
    # return last page if empty page
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(instance=products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

# Seller POST/create Product (Seller)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createShopProduct(request,pk):
    user = request.user
    shop = Shop.objects.get(shop_id=pk)
    try:
        if user.usertype.is_seller and shop.user == user:
            product = Product.objects.create(
                user=user,
                shop = shop,
                name='Sample Name',
                price=0,
                brand='Sample Brand',
                stockCount=0,
                category='Sample Category',
                description=''
            )

            serializer = ProductSerializer(instance=product, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except:
        return Response({'detail': 'You do not own this Shop'}, status=status.HTTP_400_BAD_REQUEST)


# Seller EDIT product
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def updateShopProduct(request, pk):
    data = request.data
    user = request.user
    product = Product.objects.get(id=pk)
    try:
        if user.usertype.is_seller:
            product.name = data['name']
            product.price = data['price']
            product.brand = data['brand']
            product.stockCount = data['stockCount']
            product.color = data['color']
            product.category = data['category']
            product.gender = data['gender']
            product.size = data['size']
            product.description = data['description']

            product.save()

            serializer = ProductSerializer(product, many=False)
            return Response(serializer.data,status=status.HTTP_200_OK)
    except:
        return Response({'detail': 'You do not own this Shop'}, status=status.HTTP_400_BAD_REQUEST)