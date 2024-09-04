//*************************************************************************************************************************/
//                                            ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
actividadExtraescolarSchema = new SimpleSchema({
	modalidad:{
		type:String,
		label:"Modalidad",
		allowedValues:catModalidad,
		defaultValue:modalidadDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optModalidad
		}
	},
	actividad:{
		type:String,
		label:'Actividad',
		max:150,
		autoform:{
			afFieldInput:{
				placeholder:'Nombre de la actividad'
			}
		}
	},
	horario:{
		type:String,
		label:'Horario',
		max:50
	},
	sede:{
		type:String,
		label:'Sede',
		max:100
	},
	esSeleccion:{
		type:Boolean,
		label:'Es Seleccion'
	}
});
//*************************************************************************************************************************/
//                                             ACTIVIDAD ACADEMICA
//*************************************************************************************************************************/
actividadAcademicaSchema = new SimpleSchema({
	modalidad:{
		type:String,
		label:"Modalidad",
		allowedValues:catModalidad,
		defaultValue:modalidadDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optModalidad
		}
	},
	actividad:{
		type:String,
		label:'Actividad',
		max:150,
		autoform:{
			afFieldInput:{
				placeholder:'Nombre de la actividad'
			}
		}
	},
	horario:{
		type:String,
		label:'Horario',
		max:50
	},
	sede:{
		type:String,
		label:'Sede',
		max:100
	},
	tipo:{
		type:String,
		label:"Tipo de Actividad",
		allowedValues:catTipoActividadAcademica,
		defaultValue:tipoActividadAcademicaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optTipoActividadAcademica
		}
	},
});
//*************************************************************************************************************************/
//                                                    ALUMNOS
//*************************************************************************************************************************/
alumnosSchema = new SimpleSchema({
	username:{
		type:String,
		label:"Numero de Control",
		max:15
	},
	nombre:{
		type:String,
		label:"Nombre Completo"
	},
	email:{
		type:String,
		label:"email",
		regEx: SimpleSchema.RegEx.Email
	},
	semestre:{
		type:Number,
		label:"Semestre",
		max:15,
		min:1,
		defaultValue:1
	},
	modalidad:{
		type:String,
		label:"Modalidad",
		allowedValues:catModalidad,
		defaultValue:modalidadDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optModalidad
		}
	},
	modulo:{
		type:String,
		label:"Módulo",
		allowedValues:catModulo,
		defaultValue:moduloDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optModulo
		}
	},
	nivelEscolar:{
		type:String,
		label:"Nivel Escolar",
		allowedValues:catNivelEscolar,
		defaultValue:nivelEscolarDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelEscolar
		}
	},
	carrera:{
		type:String,
		label:"Carrera",
		allowedValues:catCarreras,
		defaultValue: carreraDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione una)"
			},
			options:optCarreras
		}
	},
	fechaNacimiento:{
		type:Date,
		label:"Fecha de nacimiento"
	},
	periodoIngreso:{
		type:String,
		label:"Periodo de Ingreso",
		max:5
	},
	password:{
		type:String,
		autoform:{
			label: "Contraseña",
			type: "password"
		}
	},
	telefono:{
		type:String,
		label:"Telefono",
		max:12
	},
	sexo:{
		type:String,
		label:"Sexo",
		allowedValues:catSexos,
		defaultValue: 'Femenino',
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione una)"
			},
			options:optSexos
		}
	},
	status:{
		type:String,
		label:"Status",
		allowedValues:catStatusAlumno,
		defaultValue: statusAlumnoDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione una)"
			},
			options:optStatusAlumno
		}
	},
	semestresConTutoria:{
		type:Number,
		label:"Semestres con tutoria terminada",
		max:7,
		min:0,
		defaultValue:0
	}
});
//*************************************************************************************************************************/
//                                                    eMAILS
//*************************************************************************************************************************/
emailSchema = new SimpleSchema({
	from:{
		type:String,
		label:"De"
	},
	to:{
		type:String,
		label:"Para",
		max:100
	},
	subject:{
		type:String,
		label:"Asunto",
		max:200
	},
	text:{
		type:String,
		label:"Texto"
	}
});
//*************************************************************************************************************************/
//                                                    MATERIAS
//*************************************************************************************************************************/
materiasSchema = new SimpleSchema({
	clave:{
		type:String,
		label:"Clave",
		max:100
	},
	nombre:{
		type:String,
		label:"Nombre",
		max:100
	},
	semestre:{
		type:Number,
		label:"Semestre"
	},
	creditos:{
		type:Number,
		label:"Creditos"
	},
	hrsTeoria:{
		type:Number,
		label:"Numero de Hrs Teoria"
	},
	hrsPractica:{
		type:Number,
		label:"Numero de Hrs Practica"
	},
	carrera:{
		type:String,
		label:"Carrera",
		optional:true,
		max:100
	},
	departamento:{
		type:String,
		label:"Departamento",
		allowedValues:catDepartamentos,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione)"
			},
			options:optDepartamentos
		}
	},
	path:{
		type:String,
		label:"Carrera",
		optional:true,
		max:200
	}
});
//*************************************************************************************************************************/
//                                                    DOCENTES
//*************************************************************************************************************************/
docentesSchema = new SimpleSchema({
	username:{
		type:String,
		label:"Nombre de usuario",
		max:100
	},
	prefijo:{
		type:String,
		label:"Prefijo"
	},
	nombre:{
		type:String,
		label:"Nombre Completo"
	},
	email:{
		type:String,
		label:"email",
		regEx: SimpleSchema.RegEx.Email
	},
	telefono:{
		type:String,
		label:"Telefono"
	},
	areaDeAdscripcion:{
		type:String,
		label:"Area a la que pertenece",
		allowedValues:catAreaDeAdscripcion,
		defaultValue:areaDeAdscripcionDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione una)"
			},
			options:optAreaDeAdscripcion
		}
	},
	password:{
		type:String,
		autoform:{
			label: "Contraseña",
			type: "password"
		}
	},
	rol:{
        type:String,
		label:"Rol",
		optional:true,
		allowedValues:catRoles,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione una)"
			},
			options:optRoles
		}
    },
	estado:{
		type:String,
		label:"Estado",
		allowedValues:catEstados,
		defaultValue:estadoDefault,
		autoform:{
			options:optEstados
		}
	}
});
//*************************************************************************************************************************/
//                                     EVALUACION DE LA ACTIVIDAD COMPLEMENTARIA
//*************************************************************************************************************************/
evaluacionActividadComplementaria = new SimpleSchema({
	uno:{
		type:String,
		label:"Cumple en tiempo y forma con las actividades encomendadas alcanzando los objetivos",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	},
	dos:{
		type:String,
		label:"Trabaja en equipo y se adapta a las nuevas situaciones",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	},
	tres:{
		type:String,
		label:"Muestra liderazgo en las actividades encomendadas",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	},
	cuatro:{
		type:String,
		label:"Organiza su tiempo y trabaja de manera proactiva",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	},
	cinco:{
		type:String,
		label:"Interpreta la realidad y se sensibiliza aportando soluciones a la problemática con la actividad complementaria",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	},
	seis:{
		type:String,
		label:"Realiza sugerencias innovadoras para beneficio o mejora del programa en el que participa",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	},
	siete:{
		type:String,
		label:"Tiene iniciativa para ayudar en las actividades encomendadas y muetra espiritu de servicio",
		allowedValues:catNivelDesempeñoActividadComplementaria,
		defaultValue:nivelDesempeñoActividadComplementariaDefault,
		autoform:{
			afFieldInput:{
				firstOption:"(Seleccione uno)"
			},
			options:optNivelDesempeñoActividadComplementaria
		}
	}
});
//*************************************************************************************************************************/
//                                               SOLICITUD RESIDENCIA
//*************************************************************************************************************************/
solicitudResidenciaSchema = new SimpleSchema({
	lugar:{
		type:String,
		label:"Lugar",
		defaultValue:"",
		max:50
	},
	fecha:{
		type:Date,
		label:"Fecha",
		defaultValue:new Date()
	},
	jefeDEP:{
		type:String,
		label:"Jefe(a) de la Div. Estudios Profesionales",
		max:50,
		defaultValue:"",
		autoform:{
			afFieldInput:{
				placeholder:'Nombre del Jefe de Depto. de la División de Estdudios Profesionales'
			}
		}
	},
	coordinadorCarrera:{
		type:String,
		label:"Coord. de Carrerra",
		max:50,
		defaultValue:"",
		autoform:{
			afFieldInput:{
				placeholder:'Nombre del profesor coordinador de carrera'
			}
		}
	},
	carrera:{
		type:String,
		label:"Carrera"
	},
	nombreProyecto:{
		type:String,
		label:"Nombre del proyecto",
		defaultValue:"",
		max:250
	},
	bancoDeProyectos:{
		type:Boolean,
		label:"Es del banco de proyectos"
	},
	propuestaPropia:{
		type:Boolean,
		label:"Es de propuesta propia"
	},
	trabajador:{
		type:Boolean,
		label:"Eres trabajador de la empresa"
	},
	periodo:{
		type:String,
		label:"Periodo de la residencia",
		max:15
	},
	numeroResidentes:{
		type:Number,
		label:"Número de residentes en el proyecto",
		max:3,
		min:1,
		defaultValue:1
	},
	//empieza la parte de la empresa
	nombreEmpresa:{
		type:String,
		label:"Nombre",
		max:150,
		defaultValue:"",
		autoform:{
			afFieldInput:{
				placeholder:'Nombre de la empresa'
			}
		}
	},
	mision:{
		type:String,
		label:"Misión de la empresa",
		defaultValue:"",
		max:1200
	},
	giroRamoSector:{
		type:String,
		label:"Giro, Ramo o Sector",
		allowedValues: catGiroRamoSectorEmpresa,
		defaultValue: giroRamoSectorEmpresaDefault,
		autoform:{
			afFieldInput:{
				// firstOption:giroRamoSectorEmpresaDefault
			},
			options:optGiroRamoSectorEmpresa
		}
	},
	RFC:{
		type:String,
		label:"R.F.C.",
		defaultValue:"",
		max:15
	},
	domicilioEmpresa:{
		type:String,
		label:"Domicilio",
		defaultValue:"",
		max:150
	},
	coloniaEmpresa:{
		type:String,
		label:"Colonia",
		defaultValue:"",
		max:150
	},
	ciudadEmpresa:{
		type:String,
		label:"Ciudad",
		defaultValue:"",
		max:150
	},
	CPEmpresa:{
		type:String,
		label:"Código Postal",
		defaultValue:"",
		max:5
	},
	eMailEmpresa:{
		type:String,
		label:"Correo electrónico",
		defaultValue:"",
		max:50
		},
	telefonoEmpresa:{
		type:String,
		label:"Número de telefono fijo (No celular)",
		defaultValue:"",
		max:12
	},
	titular:{
		type:String,
		label:"Nombre del titular de la empresa",
		defaultValue:"",
		max:50
	},
	puestoTitular:{
		type:String,
		label:"Puesto del titular de la empresa",
		defaultValue:"",
		max:150
	},
	asesorExterno:{
		type:String,
		label:"Nombre del asesor externo",
		defaultValue:"",
		max:50
	},
	puestoAsesorExterno:{
		type:String,
		label:"Puesto del asesor externo",
		defaultValue:"",
		max:150
	},
	quienFirmaAcuerdo:{
		type:String,
		label:"Nombre de la persona que firmará el acuerdo de trabajo Estudiante-Escuela-Empresa",
		defaultValue:"",
		max:50
	},
	puestoFirmaAcuerdo:{
		type:String,
		label:"Puesto de quien firma el acuerdo",
		defaultValue:"",
		max:150
	},
	//empieza la parte del estudiante
	domicilioResidente:{
		type:String,
		label:"Domicilio",
		defaultValue:"",
		max:150
	},
	coloniaResidente:{
		type:String,
		label:"Colonia",
		defaultValue:"",
		max:150
	},
	ciudadResidente:{
		type:String,
		label:"Ciudad",
		defaultValue:"",
		max:150
	},
	CPResidente:{
		type:String,
		label:"Código Postal",
		defaultValue:"",
		max:5
	},
	telefonoResidente:{
		type:String,
		label:"Número de telefono fijo (No celular)",
		defaultValue:"",
		max:12
	},
	seguridadSocial:{
		type:String,
		label:"Para seguridad social acudir",
		allowedValues:catSeguridadSocial,
		defaultValue: seguridadSocialDefault,
		autoform:{
			afFieldInput:{
				// firstOption:seguridadSocialDefault
			},
			options:optSeguridadSocial
		}
	},
	numeroSeguridadSocial:{
		type:String,
		label:"Número de seguridad Social",
		defaultValue:"",
		max:15
	}
});
//*************************************************************************************************************************/
//                                             SOLICITUD SERVICIO SOCIAL
//*************************************************************************************************************************/
solicitudServicioSocialSchema = new SimpleSchema({
	dependenciaOficial:{
		type:String,
		label:"Dependencia Oficial",
		defaultValue:"",
		max:100,
		autoform:{
			afFieldInput:{
				placeholder:'Nombre de la dependencia donde se realizara el servicio social'
			}
		}
	},
	titularDependencia:{
		type:String,
		label:"Titular de la Dependencia",
		max:50,
		defaultValue:"",
		autoform:{
			afFieldInput:{
				placeholder:'Nombre del titular de la dependencia'
			}
		}
	},
	puestoTitularDependencia:{
		type:String,
		label:"Puesto",
		max:50,
		defaultValue:"",
		autoform:{
			afFieldInput:{
				placeholder:'Puesto del titular de la dependencia'
			}
		}
	},
	domicilioDependencia:{
		type:String,
		label:"Domicilio",
		max:150,
		defaultValue:"",
		autoform:{
			afFieldInput:{
				placeholder:'Domicilio de la dependencia'
			}
		}
	},
	nombrePrograma:{
		type:String,
		label:"Nombre del programa",
		defaultValue:"",
		max:250
	},
	modalidad:{
		type:String,
		label:"Modalidad",
		allowedValues: catModalidadServicioSocial,
		defaultValue: modalidadDefaultServicioSocial,
		autoform:{
			afFieldInput:{
				
			},
			options:optModalidadServicioSocial
		}
	},
	tipoPrograma:{
		type:String,
		label:"Tipo de Programa",
		allowedValues: catTipoProgramaServicioSocial,
		defaultValue: tipoProgramaDefaultServicioSocial,
		autoform:{
			afFieldInput:{
				
			},
			options:optTipoProgramaServicioSocial
		}
	},
	actividades:{
		type:String,
		label:"Actividades",
		defaultValue:"",
		max:1000
	},
	//empieza la parte del estudiante
	domicilioAlumno:{
		type:String,
		label:"Calle y número",
		defaultValue:"",
		max:150
	},
	coloniaAlumno:{
		type:String,
		label:"Colonia",
		defaultValue:"",
		max:150
	},
	ciudadAlumno:{
		type:String,
		label:"Ciudad",
		defaultValue:"",
		max:150
	},
	CPAlumno:{
		type:String,
		label:"Código Postal",
		defaultValue:"",
		max:5
	}
});