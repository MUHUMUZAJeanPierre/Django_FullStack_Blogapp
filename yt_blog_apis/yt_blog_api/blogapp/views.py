from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Post
from rest_framework import status
from .serializers import PostSerializer

@api_view(['GET', 'POST'])

def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response({"messages":"Notes retrieved successfully","data":serializer.data}, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"messages":"Note created successfully","data":serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"messages":"Invalid data","data":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, slug):
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return Response({"message": "Posts not found"})
    
    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response({"messages":"Post retrieved successfully","data":serializer.data}, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        serializer  = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"messages":"Post updated successfully","data":serializer.data}, status=status.HTTP_200_OK)
        return Response({"messages":"Invalid data","data":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        post.delete()
        return Response({"messages":"Post deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    