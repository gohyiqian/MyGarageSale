from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Conversation
from base.serializers import ConversationSerializer
from rest_framework import status
from datetime import datetime

# POST/CREATE CONVO
@api_view(['POST'])
# @permission_classes([IsAdminUser])
def createConversation(request):
    user = request.user

    conversation = Conversation.objects.create(
        participants=user,
        content='hello',
    )
    conversation.save()

    serializer = ConversationSerializer(instance=Conversation, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# # GET Conversation
# @api_view(['POST'])
# # @permission_classes([IsAdminUser])
# def getConversation(request, pk):
#     user = request.user
#     try:
#         conversation = Conversation.objects.get(id=pk) 
#         if user == conversation.participants:
#             serializer = ConversationSerializer(instance=Conversation, many=False)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             Response({'detail': 'Not authorized to view this Conversation'}, status=status.HTTP_400_BAD_REQUEST)
#     except:
#         return Response({'detail': 'Conversation does not exist'}, status=status.HTTP_400_BAD_REQUEST)


# GET All Conversations
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllConversations(request):
    conversations = Conversation.objects.all()
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)