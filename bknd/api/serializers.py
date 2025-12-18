from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

###----------------------------------###
class ObraSerializer(serializers.ModelSerializer):
    conceptos = serializers.SerializerMethodField()
    class Meta:
        model = Obra
        fields = ["id", "name", "description", "created_at", "author", "conceptos"]
        extra_kwargs = {"author": {"read_only": True}}
    
    def get_conceptos(self, obj):
        conceptos = Concepto.objects.filter(obra=obj)
        return ConceptoSerializer(conceptos, many=True).data
    

###----------------------------------###
class ConceptoSerializer(serializers.ModelSerializer):
    materiales = serializers.SerializerMethodField()
    mano_obra = serializers.SerializerMethodField()
    equipo_herramienta = serializers.SerializerMethodField()
    cuadrillas = serializers.SerializerMethodField()
    costos_horarios = serializers.SerializerMethodField()
    auxiliares = serializers.SerializerMethodField()


    class Meta:
        model = Concepto
        fields = ["id", "concepto", "descripcion", "cantidad", "obra", "materiales", "mano_obra", "equipo_herramienta", "cuadrillas", "costos_horarios", "auxiliares","partida"]
        extra_kwargs = {"obra": {"read_only": True}}
    def get_materiales(self, obj):
        materiales_concepto = MaterialConcepto.objects.filter(concepto=obj)
        return MaterialConceptoSerializer(materiales_concepto, many=True).data

    def get_mano_obra(self, obj):
        mano_obra_concepto = ManoObraConcepto.objects.filter(concepto=obj)
        return ManoObraConceptoSerializer(mano_obra_concepto, many=True).data
    
    def get_equipo_herramienta(self, obj):
        equipo_herramienta_concepto = EquipoHerramientaConcepto.objects.filter(concepto=obj)
        return EquipoHerramientaConceptoSerializer(equipo_herramienta_concepto, many=True).data
    
    def get_cuadrillas(self, obj):
        cuadrillas_concepto = ConceptoCuadrilla.objects.filter(concepto=obj)
        return ConceptoCuadrillaSerializer(cuadrillas_concepto, many=True).data
    
    def get_costos_horarios(self, obj):
        costos_horarios_concepto = ConceptoCostoHorario.objects.filter(concepto=obj)
        return ConceptoCostoHorarioSerializer(costos_horarios_concepto, many=True).data
    
    def get_auxiliares(self, obj):
        auxiliares_concepto = ConceptoAuxiliar.objects.filter(concepto=obj)
        return ConceptoAuxiliarSerializer(auxiliares_concepto, many=True).data
    
    def get_partida(self, obj):
        partida = partida.objects.get(concepto=obj)
        return PartidaSerializer(partida).data
    

###----------------------------------###

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


###----------------------------------###
class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ["id", "clave", "descripcion", "unidad", "costoUnitario", "clasificacion", "colocado", "obra"]

class ManoObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManoObra
        fields = ["id", "clave", "descripcion", "categoria", "unidad", "salario", "obra"]

class EquipoHerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipoHerramienta
        fields = ["id", "clave", "descripcion", "unidad", "costoUnitario", "clasificacion", "obra"]


###----------------------------------###
class MaterialConceptoSerializer(serializers.ModelSerializer):
    material_detalle = serializers.SerializerMethodField()
    class Meta:
        model = MaterialConcepto
        fields = ["id","material", "concepto","cantidad", "material_detalle"]

    def get_material_detalle(self, obj):
        material = Material.objects.get(id=obj.material.id)
        return {
            "clave": material.clave,
            "descripcion": material.descripcion,
            "unidad": material.unidad,
            "costoUnitario": material.costoUnitario,
            "clasificacion": material.clasificacion,
        }

class ManoObraConceptoSerializer(serializers.ModelSerializer):
    mano_obra_detalle = serializers.SerializerMethodField()
    class Meta:
        model = ManoObraConcepto
        fields = ["id","mano_obra", "concepto","cantidad", "mano_obra_detalle"] 
    def get_mano_obra_detalle(self, obj):
        mano_obra = ManoObra.objects.get(id=obj.mano_obra.id)
        return {
            "clave": mano_obra.clave,
            "descripcion": mano_obra.descripcion,
            "unidad": mano_obra.unidad,
            "salario": mano_obra.salario,
            "categoria": mano_obra.categoria,
        }

class EquipoHerramientaConceptoSerializer(serializers.ModelSerializer):
    equipo_herramienta_detalle = serializers.SerializerMethodField()
    class Meta:
        model = EquipoHerramientaConcepto
        fields = ["id","equipo_herramienta", "concepto","cantidad", "equipo_herramienta_detalle"]
    def get_equipo_herramienta_detalle(self, obj):
        equipo_herramienta = EquipoHerramienta.objects.get(id=obj.equipo_herramienta.id)
        return {
            "clave": equipo_herramienta.clave,
            "descripcion": equipo_herramienta.descripcion,
            "unidad": equipo_herramienta.unidad,
            "costoUnitario": equipo_herramienta.costoUnitario,
            "clasificacion": equipo_herramienta.clasificacion,
        }

###----------------------------------###


class CuadrillaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuadrilla
        fields = ["id","clave", "descripcion","jornada", "obra"]

class ManoObraCuadrillaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManoObraCuadrilla
        fields = ["id","mano_obra", "cuadrilla","cantidad"]

class EquipoHerramientaCuadrillaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipoHerramientaCuadrilla
        fields = ["id","equipo_herramienta", "cuadrilla","cantidad"]

class ConceptoCuadrillaSerializer(serializers.ModelSerializer):
    #mano_obra = serializers.SerializerMethodField()
    #equipo_herramienta = serializers.SerializerMethodField()
    class Meta:
        model = ConceptoCuadrilla
        fields = ["id","concepto", "cuadrilla","cantidad", ]




###----------------------------------###

class CostoHorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CostoHorario
        fields = ["id","clave","descripcion","unidad","costoHorario", "obra"]

class ConceptoCostoHorarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConceptoCostoHorario
        fields = ["id","concepto", "costo_horario","cantidad"]


###----------------------------------###
class AuxiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auxiliar
        fields = ["id","clave","descripcion","unidad", "obra"]

class MaterialAuxiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialAuxiliar
        fields = ["id","material", "auxiliar","cantidad"]

class ManoObraAuxiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManoObraAuxiliar
        fields = ["id","mano_obra", "auxiliar","cantidad"]

class EquipoHerramientaAuxiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipoHerramientaAuxiliar
        fields = ["id","equipo_herramienta", "auxiliar","cantidad"]

class ConceptoAuxiliarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConceptoAuxiliar
        fields = ["id","concepto", "auxiliar","cantidad"]

###----------------------------------###



class CuantificadorMatrialSerializer(serializers.ModelSerializer):
    cantidad_total = serializers.SerializerMethodField()
    class Meta:
        model = Material
        fields = ["id", "clave", "descripcion", "unidad", "costoUnitario", "clasificacion", "colocado", "obra","cantidad_total"]
        extra_kwargs = {"obra": {"read_only": True}}
    def get_cantidad_total(self, obj):
        cantidad_concepto = MaterialConcepto.objects.filter(material=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        cantidad_auxiliar = MaterialAuxiliar.objects.filter(material=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        return cantidad_concepto + cantidad_auxiliar


class CuantificadorManoObraSerializer(serializers.ModelSerializer):
    cantidad_total = serializers.SerializerMethodField()
    class Meta:
        model = ManoObra
        fields = ["id", "clave", "descripcion", "unidad", "salario", "categoria", "obra","cantidad_total"]
        extra_kwargs = {"obra": {"read_only": True}}
    def get_cantidad_total(self, obj):
        cantidad_concepto= ManoObraConcepto.objects.filter(mano_obra=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        cantidad_auxiliar= ManoObraAuxiliar.objects.filter(mano_obra=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        cantidad_cuadrilla= ManoObraCuadrilla.objects.filter(mano_obra=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        return cantidad_concepto + cantidad_auxiliar + cantidad_cuadrilla

class CuantificadorEquipoHerramientaSerializer(serializers.ModelSerializer):
    cantidad_total = serializers.SerializerMethodField()
    class Meta:
        model = EquipoHerramienta
        fields = ["id", "clave", "descripcion", "unidad", "costoUnitario", "clasificacion", "obra","cantidad_total"]
        extra_kwargs = {"obra": {"read_only": True}}
    def get_cantidad_total(self, obj):
        cantidad_concepto= EquipoHerramientaConcepto.objects.filter(equipo_herramienta=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        cantidad_auxiliar= EquipoHerramientaAuxiliar.objects.filter(equipo_herramienta=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        cantidad_cuadrilla= EquipoHerramientaCuadrilla.objects.filter(equipo_herramienta=obj).aggregate(total=serializers.models.Sum('cantidad'))['total'] or 0
        return cantidad_concepto + cantidad_auxiliar + cantidad_cuadrilla




