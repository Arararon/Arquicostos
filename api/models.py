from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Obra(models.Model):
    nombre= models.CharField(max_length=100)
    descripcion= models.TextField()
    autor= models.ForeignKey(User, on_delete=models.CASCADE, related_name="obras")

    def __str__(self):
        return self.name

### ----------- partidas de la Obra ---------------###
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