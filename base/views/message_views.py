from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Conversation, Message
from base.serializers import MessageSerializer
from rest_framework import status
from datetime import datetime

# POST/CREATE Message
@api_view(['POST'])
# @permission_classes([IsAdminUser])
def createMessage(request, pk):
    user = request.user
    conversation = Conversation.objects.get(id=pk)
    message = Message.objects.create(
        conversation = conversation,
        sender=user,
        content='Default Content',
    )
    message.save()

    serializer = MessageSerializer(instance=Message, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# GET Message
@api_view(['POST'])
# @permission_classes([IsAdminUser])
def getMessage(request, pk):
    user = request.user
    try:
        message = Message.objects.get(id=pk) 
        if user == message.sender:
            serializer = MessageSerializer(instance=Message, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            Response({'detail': 'Not authorized to view this message'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Message does not exist'}, status=status.HTTP_400_BAD_REQUEST)


# GET All Messages
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllMessage(request):
    messages = Message.objects.all()
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)