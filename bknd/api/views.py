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
        return Obra.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ObraDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Obra.objects.filter(author=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class ObraDelete(generics.DestroyAPIView):
    serializer_class = ObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Obra.objects.filter(author=user)
    

####----------Concepto-------------###

class ConceptoListCreate(generics.ListCreateAPIView):
    queryset = Concepto.objects.all()
    serializer_class = ConceptoSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        obra = Obra.objects.get(id=self.kwargs["pk"])
        partida=Partida.objects.get(id=self.kwargs["part"])
        if obra.author != user:
            raise PermissionDenied("No tienes permiso para acceder a esta obra.")
        if obra.author == user:
            return Concepto.objects.filter(obra=obra,partida=partida)
        else:   
            return Concepto.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            partida= Partida.objects.get(id=self.request.data["partida"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class ConceptoDetailView(APIView):
    def get(self, request, pk, concepto_pk):
        # Verificamos que la obra exista
        obra = get_object_or_404(Obra, pk=pk)

        # Filtramos el concepto que pertenece a esa obra
        concepto = get_object_or_404(Concepto, pk=concepto_pk, obra=obra)

        serializer = ConceptoSerializer(concepto)
        return Response(serializer.data)


class ConceptoDelete(generics.DestroyAPIView):
    serializer_class = ConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Concepto.objects.filter(obra__author=user)
    

class ConceptoUpdate(generics.UpdateAPIView):
    serializer_class = ConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Concepto.objects.filter(obra__author=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)


####------------partidas---------------###


class PartidaListCreate(generics.ListCreateAPIView):
    queryset = Partida.objects.all()
    serializer_class = PartidaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partida.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
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
        return Partida.objects.filter(obra__author=user)
    
class PartidaUpdate(generics.UpdateAPIView):
    serializer_class = PartidaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Partida.objects.filter(obra__author=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)


class PartidaPadreHijoListCreate(generics.ListCreateAPIView):
    queryset = PartidaPadreHijo.objects.all()
    serializer_class = PartidaPadreHijoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return PartidaPadreHijo.objects.filter(obra__author=user)
    
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
        return PartidaPadreHijo.objects.filter(obra__author=user)
    

class PartidasPadreListView(generics.ListAPIView):
    serializer_class = PartidasListaSerializer

    def get_queryset(self):
        # todas las partidas cuyo id NO aparece como hijo
        obra = Obra.objects.get(id=self.kwargs["pk"])
        hijos_ids = PartidaPadreHijo.objects.values_list('partidaHijo', flat=True)
        return Partida.objects.exclude(id__in=hijos_ids).filter(obra=obra)

####------------insumos---------------###

class MaterialListCreate(generics.ListCreateAPIView):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Material.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class MaterialDelete(generics.DestroyAPIView):  
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Material.objects.filter(obra__author=user)

class MaterialUpdate(generics.UpdateAPIView):
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Material.objects.filter(obra__author=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class ManoObraListCreate(generics.ListCreateAPIView):
    queryset = ManoObra.objects.all()
    serializer_class = ManoObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObra.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class ManoObraDelete(generics.DestroyAPIView):
    serializer_class = ManoObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObra.objects.filter(obra__author=user)
    
class ManoObraUpdate(generics.UpdateAPIView):
    serializer_class = ManoObraSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObra.objects.filter(obra__author=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class EquipoHerramientaListCreate(generics.ListCreateAPIView):
    queryset = EquipoHerramienta.objects.all()
    serializer_class = EquipoHerramientaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramienta.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class EquipoHerramientaDelete(generics.DestroyAPIView):
    serializer_class = EquipoHerramientaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramienta.objects.filter(obra__author=user)
    
class EquipoHerramientaUpdate(generics.UpdateAPIView):
    serializer_class = EquipoHerramientaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramienta.objects.filter(obra__author=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

#####--------------armado de Concepto--------------###

class MaterialConceptoListCreate(generics.ListCreateAPIView):
    queryset = MaterialConcepto.objects.all()
    serializer_class = MaterialConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MaterialConcepto.objects.filter(concepto__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            concepto = Concepto.objects.get(id=self.request.data["concepto"])
            material = Material.objects.get(id=self.request.data["material"])
            serializer.save(concepto=concepto, material=material)
        else:
            print(serializer.errors)
        
class MaterialConceptoDelete(generics.DestroyAPIView):
    serializer_class = MaterialConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MaterialConcepto.objects.filter(concepto__obra__author=user)
    
class ManoObraConceptoListCreate(generics.ListCreateAPIView):
    queryset = ManoObraConcepto.objects.all()
    serializer_class = ManoObraConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObraConcepto.objects.filter(concepto__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            concepto = Concepto.objects.get(id=self.request.data["concepto"])
            mano_obra = ManoObra.objects.get(id=self.request.data["mano_obra"])
            serializer.save(concepto=concepto, mano_obra=mano_obra)
        else:
            print(serializer.errors)

class ManoObraConceptoDelete(generics.DestroyAPIView):
    serializer_class = ManoObraConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObraConcepto.objects.filter(concepto__obra__author=user)

class EquipoHerramientaConceptoListCreate(generics.ListCreateAPIView):
    queryset = EquipoHerramientaConcepto.objects.all()
    serializer_class = EquipoHerramientaConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramientaConcepto.objects.filter(concepto__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            concepto = Concepto.objects.get(id=self.request.data["concepto"])
            equipo_herramienta = EquipoHerramienta.objects.get(id=self.request.data["equipo_herramienta"])
            serializer.save(concepto=concepto, equipo_herramienta=equipo_herramienta)
        else:
            print(serializer.errors)
    
class EquipoHerramientaConceptoDelete(generics.DestroyAPIView):
    serializer_class = EquipoHerramientaConceptoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramientaConcepto.objects.filter(concepto__obra__author=user)
    
###------------Cuadrillas--------###

class CuadrillaListCreate(generics.ListCreateAPIView):
    queryset = Cuadrilla.objects.all()
    serializer_class = CuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cuadrilla.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class CuadrillaDelete(generics.DestroyAPIView):
    serializer_class = CuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cuadrilla.objects.filter(obra__author=user)
    
class CuadrillaUpdate(generics.UpdateAPIView):
    serializer_class = CuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cuadrilla.objects.filter(obra__author=user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)
    
class ConceptoCuadrillaListCreate(generics.ListCreateAPIView):
    queryset = ConceptoCuadrilla.objects.all()
    serializer_class = ConceptoCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoCuadrilla.objects.filter(cuadrilla__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            cuadrilla = Cuadrilla.objects.get(id=self.request.data["cuadrilla"])
            concepto = Concepto.objects.get(id=self.request.data["concepto"])
            serializer.save(cuadrilla=cuadrilla, concepto=concepto)
        else:
            print(serializer.errors)

class ConceptoCuadrillaDelete(generics.DestroyAPIView):
    serializer_class = ConceptoCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoCuadrilla.objects.filter(cuadrilla__obra__author=user)

class ManoObraCuadrillaListCreate(generics.ListCreateAPIView):
    queryset = ManoObraCuadrilla.objects.all()
    serializer_class = ManoObraCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObraCuadrilla.objects.filter(cuadrilla__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            cuadrilla = Cuadrilla.objects.get(id=self.request.data["cuadrilla"])
            mano_obra = ManoObra.objects.get(id=self.request.data["mano_obra"])
            serializer.save(cuadrilla=cuadrilla, mano_obra=mano_obra)
        else:
            print(serializer.errors)

class ManoObraCuadrillaDelete(generics.DestroyAPIView):
    serializer_class = ManoObraCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObraCuadrilla.objects.filter(cuadrilla__obra__author=user)

class EquipoHerramientaCuadrillaListCreate(generics.ListCreateAPIView):
    queryset = EquipoHerramientaCuadrilla.objects.all()
    serializer_class = EquipoHerramientaCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramientaCuadrilla.objects.filter(cuadrilla__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            cuadrilla = Cuadrilla.objects.get(id=self.request.data["cuadrilla"])
            equipo_herramienta = EquipoHerramienta.objects.get(id=self.request.data["equipo_herramienta"])
            serializer.save(cuadrilla=cuadrilla, equipo_herramienta=equipo_herramienta)
        else:
            print(serializer.errors)

class EquipoHerramientaCuadrillaDelete(generics.DestroyAPIView):
    serializer_class = EquipoHerramientaCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramientaCuadrilla.objects.filter(cuadrilla__obra__author=user)


class ConceptoCuadrillaDelete(generics.DestroyAPIView):
    serializer_class = ConceptoCuadrillaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoCuadrilla.objects.filter(cuadrilla__obra__author=user)
    
####------COsto Horario------##
class CostoHorarioListCreate(generics.ListCreateAPIView):
    queryset = CostoHorario.objects.all()
    serializer_class = CostoHorarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CostoHorario.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class CostoHorarioDelete(generics.DestroyAPIView):
    serializer_class = CostoHorarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CostoHorario.objects.filter(obra__author=user)
    
class CostoHorarioUpdate(generics.UpdateAPIView):
    serializer_class = CostoHorarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return CostoHorario.objects.filter(obra__author=user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors) 

class ConceptoCostoHorarioListCreate(generics.ListCreateAPIView):
    queryset = ConceptoCostoHorario.objects.all()
    serializer_class = ConceptoCostoHorarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoCostoHorario.objects.filter(costo_horario__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            costo_horario = CostoHorario.objects.get(id=self.request.data["costo_horario"])
            concepto = Concepto.objects.get(id=self.request.data["concepto"])
            serializer.save(costo_horario=costo_horario, concepto=concepto)
        else:
            print(serializer.errors)
    
class ConceptoCostoHorarioDelete(generics.DestroyAPIView):
    serializer_class = ConceptoCostoHorarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoCostoHorario.objects.filter(costo_horario__obra__author=user)
    

#####-----------Auxiliares---------###

class AuxiliarListCreate(generics.ListCreateAPIView):
    queryset = Auxiliar.objects.all()
    serializer_class = AuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Auxiliar.objects.filter(obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class AuxiliarDelete(generics.DestroyAPIView):
    serializer_class = AuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Auxiliar.objects.filter(obra__author=user)

class AuxiliarUpdate(generics.UpdateAPIView):
    serializer_class = AuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Auxiliar.objects.filter(obra__author=user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            obra = Obra.objects.get(id=self.request.data["obra"])
            serializer.save(obra=obra)
        else:
            print(serializer.errors)

class MaterialAuxiliarListCreate(generics.ListCreateAPIView):
    queryset = MaterialAuxiliar.objects.all()
    serializer_class = MaterialAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MaterialAuxiliar.objects.filter(auxiliar__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            auxiliares = Auxiliar.objects.get(id=self.request.data["auxiliar"])
            material = Material.objects.get(id=self.request.data["material"])
            serializer.save(auxiliares=auxiliares, material=material)
        else:
            print(serializer.errors)

class MaterialAuxiliarDelete(generics.DestroyAPIView):
    serializer_class = MaterialAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return MaterialAuxiliar.objects.filter(auxiliares__obra__author=user)
    
class ManoObraAuxiliarListCreate(generics.ListCreateAPIView):
    queryset = ManoObraAuxiliar.objects.all()
    serializer_class = ManoObraAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObraAuxiliar.objects.filter(auxiliar__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            auxiliar = Auxiliar.objects.get(id=self.request.data["auxiliar"])
            mano_obra = ManoObra.objects.get(id=self.request.data["mano_obra"])
            serializer.save(auxiliar=auxiliar, mano_obra=mano_obra)
        else:
            print(serializer.errors)

class ManoObraAuxiliarDelete(generics.DestroyAPIView):
    serializer_class = ManoObraAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ManoObraAuxiliar.objects.filter(auxiliar__obra__author=user)
    
class EquipoHerramientaAuxiliarListCreate(generics.ListCreateAPIView):
    queryset = EquipoHerramientaAuxiliar.objects.all()
    serializer_class = EquipoHerramientaAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramientaAuxiliar.objects.filter(auxiliar__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            auxiliares = Auxiliar.objects.get(id=self.request.data["auxiliares"])
            equipo_herramienta = EquipoHerramienta.objects.get(id=self.request.data["equipo_herramienta"])
            serializer.save(auxiliares=auxiliares, equipo_herramienta=equipo_herramienta)
        else:
            print(serializer.errors)
        
class EquipoHerramientaAuxiliarDelete(generics.DestroyAPIView):
    serializer_class = EquipoHerramientaAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return EquipoHerramientaAuxiliar.objects.filter(auxiliar__obra__author=user)
    
class ConceptoAuxiliarListCreate(generics.ListCreateAPIView):
    queryset = ConceptoAuxiliar.objects.all()
    serializer_class = ConceptoAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoAuxiliar.objects.filter(auxiliar__obra__author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            auxiliares = Auxiliar.objects.get(id=self.request.data["auxiliar"])
            concepto = Concepto.objects.get(id=self.request.data["concepto"])
            serializer.save(auxiliares=auxiliares, concepto=concepto)
        else:
            print(serializer.errors)

class ConceptoAuxiliarDelete(generics.DestroyAPIView):
    serializer_class = ConceptoAuxiliarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ConceptoAuxiliar.objects.filter(auxiliar__obra__author=user)
    

class CuantificadorObra(APIView):
    def get(self, request, pk):
        user= self.request.user
        materiales_ids = MaterialConcepto.objects.filter(concepto__obra__author=user).values_list('material_id', flat=True).distinct()
        mano_obra_ids = ManoObraConcepto.objects.filter(concepto__obra__author=user).values_list('mano_obra_id', flat=True).distinct()
        equipo_herramienta_ids = EquipoHerramientaConcepto.objects.filter(concepto__obra__author=user).values_list('equipo_herramienta_id', flat=True).distinct()

        materiales = Material.objects.filter(id__in=materiales_ids)
        mano_obra = ManoObra.objects.filter(id__in=mano_obra_ids)
        equipo_herramienta=EquipoHerramienta.objects.filter(id__in=equipo_herramienta_ids)

        materiales_serializados = CuantificadorMatrialSerializer(materiales, many=True).data
        mano_obra_serializada = CuantificadorManoObraSerializer(mano_obra, many=True).data
        equipo_herramienta_serializada = CuantificadorEquipoHerramientaSerializer(equipo_herramienta, many=True).data

        return Response({
            'materiales': materiales_serializados,
            'mano_obra': mano_obra_serializada,
            'equipo_herramienta': equipo_herramienta_serializada
        })



