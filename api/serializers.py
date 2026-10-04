from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

#ORM: Object relational mapping for the JWT token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = ["id","nombre", "descripcion"]
        extra_kwargs = {"autor": {"write_only": True}}

class PartidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partida
        fields = ["id", "nombre", "obra"]

class PartidaPadreHijoSerializer(serializers.ModelSerializer):
    partidaPadre_detalle = serializers.SerializerMethodField()
    partidaHijo_detalle = serializers.SerializerMethodField()
    class Meta:
        model = PartidaPadreHijo
        fields = ["id", "partidaPadre", "partidaHijo", "obra", "partidaPadre_detalle", "partidaHijo_detalle",]
    def get_partidaPadre_detalle(self, obj):
        partida_padre = Partida.objects.get(id=obj.partidaPadre.id)
        return {
            "nombre": partida_padre.nombre,
        }
    def get_partidaHijo_detalle(self, obj):
        partida_hijo = Partida.objects.get(id=obj.partidaHijo.id)
        return {
            "nombre": partida_hijo.nombre,
        }
class PartidaHijoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partida
        fields = ['id', 'nombre']

class PartidasListaSerializer(serializers.ModelSerializer):
    hijos = serializers.SerializerMethodField()

    class Meta:
        model = Partida
        fields = ['id', 'nombre', 'hijos']

    def get_hijos(self, obj):
        hijos_rel = obj.partida_padre.all()  # obtiene todas las relaciones donde es padre
        hijos = [rel.partidaHijo for rel in hijos_rel]
        return PartidaHijoSerializer(hijos, many=True).data        

