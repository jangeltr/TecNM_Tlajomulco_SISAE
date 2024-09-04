materias = new Mongo.Collection("materias")
periodos = new Mongo.Collection("periodos")
asignaciones = new Mongo.Collection("asignaciones")
horarios = new Mongo.Collection("horarios")
reporte1 = new Mongo.Collection("reporte1")
reporte2 = new Mongo.Collection("reporte2")
reporte3 = new Mongo.Collection("reporte3")
reporteFinal = new Mongo.Collection("reporteFinal")
proyectoIndividual = new Mongo.Collection("proyectoIndividual")
constanciaTerminacion = new Mongo.Collection("constanciaTerminacion")
emails = new Mongo.Collection("emails")
tutorias = new Mongo.Collection("tutorias")
actividadExtraescolar = new Mongo.Collection('actividadExtraescolar')
actividadAcademica = new Mongo.Collection('actividadAcademica')
servicioSocial = new Mongo.Collection('servicioSocial')
residencias = new Mongo.Collection("residencias")
informeResidencias = new Mongo.Collection('informeResidencias')
titulacion = new Mongo.Collection('titulacion')
bitacora = new Mongo.Collection('bitacora')
configuracion  = new Mongo.Collection('configuracion')
areasSisae = new Mongo.Collection('areasSisae')
seguridad = new Mongo.Collection('seguridad')
frases = new Mongo.Collection('frases')

resumenD = new Mongo.Collection("resumenD")
resumenH = new Mongo.Collection("resumenH")
resumenR1 = new Mongo.Collection("resumenR1")
resumenR2 = new Mongo.Collection("resumenR2")
resumenR3 = new Mongo.Collection("resumenR3")
resumenRF = new Mongo.Collection("resumenRF")
resumenPI = new Mongo.Collection("resumenPI")
resumenGral = new Mongo.Collection('resumenGral')
resumenAsig2 = new Mongo.Collection("resumenAsig2")
resumenAsig3 = new Mongo.Collection("resumenAsig3")
resumenI = new Mongo.Collection("resumenI")

materias.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
periodos.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
asignaciones.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
horarios.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
reporte1.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
reporte2.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
reporte3.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
reporteFinal.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
proyectoIndividual.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
constanciaTerminacion.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
emails.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
tutorias.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
actividadExtraescolar.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
actividadAcademica.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
servicioSocial.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
residencias.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
informeResidencias.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
titulacion.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
bitacora.allow({
	insert: function(userId, doc){
		return userId;
	}
})
configuracion.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
areasSisae.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
seguridad.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})
frases.allow({
	insert: function(userId, doc){
		return userId;
	},
	remove: function(userId, doc){
		return userId;
	},
	update: function(userId, doc, fields, modifier){
		return userId;
	}
})