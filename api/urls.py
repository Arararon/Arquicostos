from django.urls import path
from . import views


urlpatterns=[
    path("obras/", views.ObraListCreate.as_view(), name="obra-lista"),
    path("obras/<int:pk>/", views.ObraDetail.as_view(), name="obra-detalle"),
    path("obras/<int:pk>/delete/", views.ObraDelete.as_view(), name="obra-borrar"),

    path("partidas/", views.PartidaListCreate.as_view(), name="partida-lista"),
    path("partidas/<int:partida_pk>/", views.PartidaDetail.as_view(), name="partida-detalle"),
    path("partidas/<int:partida_pk>/delete/", views.PartidaDelete.as_view(), name="partida-borrar"),

    path("obras/<int:pk>/partidas/", views.PartidaPadreHijoListCreate.as_view(), name="partida-padre-hijo-list"),
    path("obras/<int:pk>/partidas/<int:partida_padre_hijo_pk>/delete/", views.PartidaPadreHijoDelete.as_view(), name="partida-padre-hijo-delete"),
    path("obras/<int:pk>/listaPartidas/", views.PartidasPadreListView.as_view(), name="lista-partidas-view"),
]