from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


#### -------Obra-------------###
class ObraListCreate(generics.ListCreateAPIView):
    serializer_class = ObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Obra.objects.filter(autor=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(autor=self.request.user)
        else:
            print(serializer.errors)

class ObraDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Obra.objects.filter(autor=user)
    def perform_update(self, serializer):
        user = self.request.user
        if serializer.is_valid():
            serializer.save(autor=user)
        else:
            print(serializer.errors)

class ObraDelete(generics.DestroyAPIView):
    serializer_class = ObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Obra.objects.filter(autor=user)


class PartidaListCreate(generics.ListCreateAPIView):
    queryset = Partida.objects.all()
    serializer_class = PartidaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partida.objects.filter(obra__autor=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class PartidaDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PartidaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partida.objects.filter(obra__autor=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class PartidaDelete(generics.DestroyAPIView):
    serializer_class = PartidaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partida.objects.filter(obra__autor=user)

    
class PartidaPadreHijoListCreate(generics.ListCreateAPIView):
    queryset = PartidaPadreHijo.objects.all()
    serializer_class = PartidaPadreHijoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PartidaPadreHijo.objects.filter(obra__autor=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class PartidaPadreHijoDelete(generics.DestroyAPIView):
    serializer_class = PartidaPadreHijoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PartidaPadreHijo.objects.filter(obra__autor=user)
    

class PartidasPadreListView(generics.ListAPIView):
    serializer_class = PartidasListaSerializer

    def get_queryset(self):
        # todas las partidas cuyo id NO aparece como hijo
        obra = Obra.objects.get(id=self.kwargs["pk"])
        hijos_ids = PartidaPadreHijo.objects.values_list('partidaHijo', flat=True)
        return Partida.objects.exclude(id__in=hijos_ids).filter(obra=obra)
    
