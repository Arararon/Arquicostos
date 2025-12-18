from django.urls import path
from . import views

urlpatterns = [
    path("obras/", views.ObraListCreate.as_view(), name="obra-list"),
    path("obras/<int:pk>/", views.ObraDetail.as_view(), name="obra-detail"),
    path("obras/<int:pk>/delete/", views.ObraDelete.as_view(), name="obra-delete"),

    path("obras/<int:pk>/conceptos/<int:part>", views.ConceptoListCreate.as_view(), name="concepto-list"),
    path("obras/<int:pk>/conceptos/<int:concepto_pk>/update/", views.ConceptoUpdate.as_view(), name="concepto-update"),
    path("obras/<int:pk>/conceptos/<int:concepto_pk>/delete/", views.ConceptoDelete.as_view(), name="concepto-delete"),
    path("obras/<int:pk>/conceptos/<int:concepto_pk>/", views.ConceptoDetailView.as_view(), name="concepto-detail"),
    
    path("obras/<int:pk>/partidas/", views.PartidaListCreate.as_view(), name="partida-list"),
    path("obras/<int:pk>/partidas/<int:partida_pk>/update/", views.PartidaUpdate.as_view(), name="partida-update"),
    path("obras/<int:pk>/partidas/<int:partida_pk>/delete/", views.PartidaDelete.as_view(), name="partida-delete"),
    
    path("obras/<int:pk>/parentpartidas/", views.PartidaPadreHijoListCreate.as_view(), name="partida-padre-hijo-list"),
    path("obras/<int:pk>/parentpartidas/<int:partida_padre_hijo_pk>/delete/", views.PartidaPadreHijoDelete.as_view(), name="partida-padre-hijo-delete"),
    path("obras/<int:pk>/listaPartidas/", views.PartidasPadreListView.as_view(), name="lista-partidas-view"),

    path("obras/<int:pk>/materiales/", views.MaterialListCreate.as_view(), name="material-list"),
    path("obras/<int:pk>/materiales/<int:material_pk>/update/", views.MaterialUpdate.as_view(), name="material-update"),
    path("obras/<int:pk>/materiales/<int:material_pk>/delete/", views.MaterialDelete.as_view(), name="material-delete"),

    path("obras/<int:pk>/mano_obra/", views.ManoObraListCreate.as_view(), name="mano-obra-list"),
    path("obras/<int:pk>/mano_obra/<int:mano_obra_pk>/update/", views.ManoObraUpdate.as_view(), name="mano-obra-update"),
    path("obras/<int:pk>/mano_obra/<int:mano_obra_pk>/delete/", views.ManoObraDelete.as_view(), name="mano-obra-delete"),

    path("obras/<int:pk>/equipo_herramienta/", views.EquipoHerramientaListCreate.as_view(), name="equipo-herramienta-list"),
    path("obras/<int:pk>/equipo_herramienta/<int:equipo_herramienta_pk>/update/", views.EquipoHerramientaUpdate.as_view(), name="equipo-herramienta-update"),
    path("obras/<int:pk>/equipo_herramienta/<int:equipo_herramienta_pk>/delete/", views.EquipoHerramientaDelete.as_view(), name="equipo-herramienta-delete"),

    path("obras/<int:pk>/materiales_concepto/", views.MaterialConceptoListCreate.as_view(), name="material-concepto-list"),
    path("obras/<int:pk>/materiales_concepto/<int:material_concepto_pk>/delete/", views.MaterialConceptoDelete.as_view(), name="material-concepto-delete"),

    path("obras/<int:pk>/mano_obra_concepto/", views.ManoObraConceptoListCreate.as_view(), name="mano-obra-concepto-list"),
    path("obras/<int:pk>/mano_obra_concepto/<int:material_concepto_pk>/delete/", views.ManoObraConceptoDelete.as_view(), name="mano-obra-concepto-delete"),

    path("obras/<int:pk>/equipo_herramienta_concepto/", views.EquipoHerramientaConceptoListCreate.as_view(), name="equipo-herramienta-concepto-list"),
    path("obras/<int:pk>/equipo_herramienta_concepto/<int:material_concepto_pk>/delete/", views.EquipoHerramientaConceptoDelete.as_view(), name="equipo-herramienta-concepto-delete"),
    
    path("obras/<int:pk>/cuadrillas/", views.CuadrillaListCreate.as_view(), name="cuadrilla-list"),
    path("obras/<int:pk>/cuadrillas/<int:cuadrilla_pk>/update", views.CuadrillaUpdate.as_view(), name="cuadrilla-update"),
    path("obras/<int:pk>/cuadrillas/<int:cuadrilla_pk>/delete", views.CuadrillaDelete.as_view(), name="cuadrilla-delete"),

    path("obras/<int:pk>/cuadrillas/<int:cuadrilla_pk>/mano_obra/", views.ManoObraCuadrillaListCreate.as_view(), name="mano-obra-cuadrilla-list"),
    path("obras/<int:pk>/cuadrillas/<int:cuadrilla_pk>/mano_obra/<int:mano_obra_pk>/delete", views.ManoObraCuadrillaDelete.as_view(), name="mano-obra-cuadrilla-delete"),
    
    path("obras/<int:pk>/cuadrillas/<int:cuadrilla_pk>/equipo_herramienta/", views.EquipoHerramientaCuadrillaListCreate.as_view(), name="equipo-herramienta-cuadrilla-list"),
    path("obras/<int:pk>/cuadrillas/<int:cuadrilla_pk>/equipo_herramienta/<int:equipo_herramienta_pk>/delete", views.EquipoHerramientaCuadrillaDelete.as_view(), name="equipo-herramienta-cuadrilla-delete"),
    
    path("obras/<int:pk>/cuadrillas_concepto/", views.ConceptoCuadrillaListCreate.as_view(), name="concepto-cuadrilla-list"),
    path("obras/<int:pk>/cuadrillas_concepto/<int:concepto_cuadrilla_pk>/delete", views.ConceptoCuadrillaDelete.as_view(), name="concepto-cuadrilla-delete"),
    
    path("obras/<int:pk>/costos_horarios/", views.CostoHorarioListCreate.as_view(), name="costo-horario-list"),
    path("obras/<int:pk>/costos_horarios/<int:costo_horario_pk>/update", views.CostoHorarioUpdate.as_view(), name="costo-horario-update"),
    path("obras/<int:pk>/costos_horarios/<int:costo_horario_pk>/delete", views.CostoHorarioDelete.as_view(), name="costo-horario-delete"),
    
    path("obras/<int:pk>/costos_horarios_concepto/", views.ConceptoCostoHorarioListCreate.as_view(), name="concepto-costo-horario-list"),
    path("obras/<int:pk>/costos_horarios_concepto/<int:concepto_costo_horario_pk>/delete", views.ConceptoCostoHorarioDelete.as_view(), name="concepto-costo-horario-delete"),
    
    path("obras/<int:pk>/auxiliares/", views.AuxiliarListCreate.as_view(), name="auxiliar-list"),
    path("obras/<int:pk>/auxiliares/<int:auxiliar_pk>/update", views.AuxiliarUpdate.as_view(), name="auxiliar-update"),
    path("obras/<int:pk>/auxiliares/<int:auxiliar_pk>/delete", views.AuxiliarDelete.as_view(), name="auxiliar-delete"),
    
    path("obras/<int:pk>/materiales_auxiliar/", views.MaterialAuxiliarListCreate.as_view(), name="material-auxiliar-list"),
    path("obras/<int:pk>/materiales_auxiliar/<int:material_auxiliar_pk>/delete", views.MaterialAuxiliarDelete.as_view(), name="material-auxiliar-delete"),
    
    path("obras/<int:pk>/mano_obra_auxiliar/", views.ManoObraAuxiliarListCreate.as_view(), name="mano-obra-auxiliar-list"),
    path("obras/<int:pk>/mano_obra_auxiliar/<int:mano_obra_auxiliar_pk>/delete", views.ManoObraAuxiliarDelete.as_view(), name="mano-obra-auxiliar-delete"),
    
    path("obras/<int:pk>/equipo_herramienta_auxiliar/", views.EquipoHerramientaAuxiliarListCreate.as_view(), name="equipo-herramienta-auxiliar-list"),
    path("obras/<int:pk>/equipo_herramienta_auxiliar/<int:equipo_herramienta_auxiliar_pk>/delete", views.EquipoHerramientaAuxiliarDelete.as_view(), name="equipo-herramienta-auxiliar-delete"),
    
    path("obras/<int:pk>/conceptos_auxiliar/", views.ConceptoAuxiliarListCreate.as_view(), name="concepto-auxiliar-list"),
    path("obras/<int:pk>/conceptos_auxiliar/<int:concepto_auxiliar_pk>/delete", views.ConceptoAuxiliarDelete.as_view(), name="concepto-auxiliar-delete"),
    
    path("obras/<int:pk>/cuantificacion/",views.CuantificadorObra.as_view(), name="cuantificador-obra"),
]