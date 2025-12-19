from django.db import models
from django.contrib.auth.models import User

### Modelos Para Obras ###

class Obra (models.Model):
    name= models.CharField(max_length=100)
    description= models.TextField()
    created_at= models.DateTimeField(auto_now_add=True)
    author= models.ForeignKey(User, on_delete=models.CASCADE, related_name="obras")
    calle=models.CharField(max_length=500)
    numero=models.CharField(max_length=6)
    codigoPostal=models.IntegerField()
    estado=models.CharField(max_length=500)
    municipio=models.CharField(max_length=500)

    def __str__(self):
        return self.name

###Grupos de Trabajo###
class GrupoTrabajo(models.Model):
    nombre=models.CharField(max_length=100)
    obra=models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="grupoTrabajo")

    def __str__(self):
        return self.nombre


###Grupo de Usuario###
class GrupoUsuarios(models.Model):
    usuario=models.ForeignKey(User, on_delete=models.CASCADE, related_name="grupoUsuarios")
    rol=models.CharField(max_length=100)
    grupo=models.ForeignKey(GrupoTrabajo, on_delete=models.CASCADE, related_name="grupoUsuarios")

    def __str__(self):
        return f"{self.usuario} - {self.rol}"



### partidas de la Obra ###
class Partida(models.Model):
    nombre= models.CharField(max_length=1000)
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="partida")
    def __str__(self):
        return self.nombre
    

### partidas Padre hijo de la Obra ###
class PartidaPadreHijo(models.Model):
    partidaPadre= models.ForeignKey(Partida, on_delete=models.CASCADE, related_name="partida_padre")
    partidaHijo= models.ForeignKey(Partida, on_delete=models.CASCADE, related_name="partida_hijo")
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="partida_padre_hijo")
    def __str__(self):
        return f"{self.partidaPadre} - {self.partidaHijo}"


### Catalogo de Conceptos ###    

class Concepto(models.Model):
    concepto= models.CharField(max_length=100)
    descripcion= models.TextField()
    cantidad= models.IntegerField()
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="concept")
    partida= models.ForeignKey(Partida, on_delete=models.CASCADE, related_name="concepto")
    def __str__(self):
        return self.concepto
    
### Insumos de la Obra ###

class Material(models.Model):
    clave= models.CharField(max_length=100)
    descripcion= models.TextField()
    unidad= models.CharField(max_length=100)
    costoUnitario= models.DecimalField(max_digits=10, decimal_places=2)
    clasificacion= models.CharField(max_length=100)
    colocado= models.BooleanField(default=False)
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="material")
    def __str__(self):
        return self.clave
    
class ManoObra(models.Model):
    clave= models.CharField(max_length=100)
    descripcion= models.TextField()
    categoria= models.CharField(max_length=100)
    unidad= models.CharField(max_length=100)
    salario= models.DecimalField(max_digits=10, decimal_places=2)
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="mano_obra")
    def __str__(self):
        return self.clave
    
class EquipoHerramienta(models.Model):
    clave= models.CharField(max_length=100)
    descripcion= models.TextField()
    unidad= models.CharField(max_length=100)
    costoUnitario= models.DecimalField(max_digits=10, decimal_places=2)
    clasificacion= models.CharField(max_length=100)
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="equipo_herramienta")
    def __str__(self):
        return self.clave
    
        

### Auxiliares de la Obra ###    
    
class Cuadrilla(models.Model):
    clave= models.CharField(max_length=100)
    descripcion= models.TextField()
    jornada=models.IntegerField()
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="cuadrilla")
    def __str__(self):
        return self.nombre

class CostoHorario(models.Model):
    clave= models.CharField(max_length=100)
    descripcion= models.TextField()
    unidad= models.CharField(max_length=100)
    costoHorario= models.DecimalField(max_digits=10, decimal_places=2)
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="costo_horario")
    def __str__(self):
        return self.clave

class Auxiliar(models.Model):
    clave= models.CharField(max_length=100)
    descripcion= models.TextField()
    cantidad= models.IntegerField()
    unidad= models.CharField(max_length=100)
    obra= models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="auxiliar")
    def __str__(self):
        return self.clave
    

### Armado de Matrices de Concepto ###
    
class MaterialConcepto(models.Model):
    concepto= models.ForeignKey(Concepto, on_delete=models.CASCADE, related_name="material_concepto")
    material= models.ForeignKey(Material, on_delete=models.CASCADE, related_name="material_concepto")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.concepto} - {self.materiales}"
    

class ManoObraConcepto(models.Model):
    concepto= models.ForeignKey(Concepto, on_delete=models.CASCADE, related_name="mano_obra_concepto")
    mano_obra= models.ForeignKey(ManoObra, on_delete=models.CASCADE, related_name="mano_obra_concepto")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.concepto} - {self.mano_obra}"

class EquipoHerramientaConcepto(models.Model):
    concepto= models.ForeignKey(Concepto, on_delete=models.CASCADE, related_name="equipo_herramienta_concepto")
    equipo_herramienta= models.ForeignKey(EquipoHerramienta, on_delete=models.CASCADE, related_name="equipo_herramienta_concepto")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.concepto} - {self.equipo_herramienta}"
    

### Armado de Matrices de Cuadrilla ###
    
class ManoObraCuadrilla(models.Model):
    cuadrilla= models.ForeignKey(Cuadrilla, on_delete=models.CASCADE, related_name="mano_obra_cuadrilla")
    mano_obra= models.ForeignKey(ManoObra, on_delete=models.CASCADE, related_name="mano_obra_cuadrilla")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.cuadrilla} - {self.mano_obra}"

class EquipoHerramientaCuadrilla(models.Model):
    cuadrilla= models.ForeignKey(Cuadrilla, on_delete=models.CASCADE, related_name="equipo_herramienta_cuadrilla")
    equipo_herramienta= models.ForeignKey(EquipoHerramienta, on_delete=models.CASCADE, related_name="equipo_herramienta_cuadrilla")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.cuadrilla} - {self.equipo_herramienta}"
    
### Armado de Matrices Auxiliares ###

class MaterialAuxiliar(models.Model):
    auxiliar= models.ForeignKey(Auxiliar, on_delete=models.CASCADE, related_name="materiales_auxiliar")
    material= models.ForeignKey(Material, on_delete=models.CASCADE, related_name="materiales_auxiliar")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.auxiliar} - {self.materiales}"

class ManoObraAuxiliar(models.Model):
    auxiliar= models.ForeignKey(Auxiliar, on_delete=models.CASCADE, related_name="mano_obra_auxiliar")
    mano_obra= models.ForeignKey(ManoObra, on_delete=models.CASCADE, related_name="mano_obra_auxiliar")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.auxiliar} - {self.mano_obra}"
    
class EquipoHerramientaAuxiliar(models.Model):
    auxiliar= models.ForeignKey(Auxiliar, on_delete=models.CASCADE, related_name="equipo_herramienta_auxiliar")
    equipo_herramienta= models.ForeignKey(EquipoHerramienta, on_delete=models.CASCADE, related_name="equipo_herramienta_auxiliar")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.auxiliar} - {self.equipo_herramienta}"
    

### Matrices Auxiliares - Concepto ###

class ConceptoAuxiliar(models.Model):
    concepto= models.ForeignKey(Concepto, on_delete=models.CASCADE, related_name="concepto_auxiliar")
    auxiliar= models.ForeignKey(Auxiliar, on_delete=models.CASCADE, related_name="concepto_auxiliar")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.concepto} - {self.auxiliar}"
    
class ConceptoCuadrilla(models.Model):
    concepto= models.ForeignKey(Concepto, on_delete=models.CASCADE, related_name="concepto_cuadrilla")
    cuadrilla= models.ForeignKey(Cuadrilla, on_delete=models.CASCADE, related_name="concepto_cuadrilla")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.concepto} - {self.cuadrilla}"
    
class ConceptoCostoHorario(models.Model):
    concepto= models.ForeignKey(Concepto, on_delete=models.CASCADE, related_name="concepto_costo_horario")
    costo_horario= models.ForeignKey(CostoHorario, on_delete=models.CASCADE, related_name="concepto_costo_horario")
    cantidad= models.IntegerField()
    def __str__(self):
        return f"{self.concepto} - {self.costo_horario}"




