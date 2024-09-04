let tutoria = new ReactiveVar()
let ncAlumno   = new ReactiveVar("")
let alumno = new ReactiveVar()
let subioPlanAccionTutorial = new ReactiveVar()
let subioDiagnosticoInicial = new ReactiveVar()
let subioReporteSemestral = new ReactiveVar()
let subioEvidenciaTutoria = new ReactiveVar()
//*************************************************************************************************************************/
//                                      BARRA DE HERRAMIENTAS DE TUTORIAS DEL DOCENTE
//*************************************************************************************************************************/
Template.toolBoxTutoriasDocente.helpers({
    puedeVerTutores: function(){
		if (Roles.userIsInRole(Meteor.userId(),['Administrador'],'SISAE')) return true;
		else if (Roles.userIsInRole(Meteor.userId(),['Subdirector Academico'],'SISAE')) return true;
		else if (Roles.userIsInRole(Meteor.userId(),['Jefe de Tutorias'],'SISAE')) return true;
		else return false;
    },
	revisadoPAT:function(){
		if (tutoria.get()?.revisadoPlanAccionTutorial)
			return tutoria.get().revisadoPlanAccionTutorial
		return ""
	},	
    revisadoDI:function(){
		if (tutoria.get()?.revisadoDiagnosticoInicial)
			return tutoria.get().revisadoDiagnosticoInicial
		return ""
    },
    revisadoRS:function(){
		if (tutoria.get()?.revisadoReporteSemestral)
			return tutoria.get().revisadoReporteSemestral
		return ""
    },
    revisadoET:function(){
		if (tutoria.get()?.revisadoEvidenciaTutoria)
			return tutoria.get().revisadoEvidenciaTutoria
		return ""
    },
	pathPAT:function(){
		if (tutoria.get()?.pathPlanAccionTutorial)
			return tutoria.get().pathPlanAccionTutorial
		return ""
    },
    pathDI:function(){
		if (tutoria.get()?.pathDiagnosticoInicial)
			return tutoria.get().pathDiagnosticoInicial
		return ""
    },
    pathRS:function(){
		if (tutoria.get()?.pathReporteSemestral)
			return tutoria.get().pathReporteSemestral
		return ""
    },
    pathET:function(){
		if (tutoria.get()?.pathEvidenciaTutoria)
			return tutoria.get().pathEvidenciaTutoria
		return ""
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
});
Template.toolBoxTutoriasDocente.events({
	"click .verComoJefe":function(){
		Session.set("isAdministrador",true);
		Session.set("isSubAcademico",true);
		Session.set("isJefeTutorias",true);
	},
	"click .generarListaAsistencia":function(){
		tutoria.set(tutorias.findOne({}))
		nAlumno=0;
		BlazeLayout.render("impresion",{rellena2:"listaDeAsistenciaTutoria"});
	}
})
//*************************************************************************************************************************/
//                                              CODIGO DE TUTORIAS DEL DOCENTE
//*************************************************************************************************************************/
Template.tutoriasDocente.onCreated(function(){
	this.autorun(() => {
		this.subscribe('periodos')
		this.subscribe('misTutorias',Meteor.userId(),Session.get("periodo"))
        this.subscribe('alumno',ncAlumno.get())
        tutoria.set(tutorias.findOne({'propietario':Meteor.userId()}))
	});
});
Template.tutoriasDocente.helpers({
	tutorias: function(){
		return tutorias.find({})
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	fechaFI:function(){
		if (this.fechaFichaIdentificacion){
			let month = this.fechaFichaIdentificacion.getUTCMonth() + 1 //months from 1-12
			let day = this.fechaFichaIdentificacion.getUTCDate()
			let year = this.fechaFichaIdentificacion.getUTCFullYear()
			let f=day+"/"+month+"/"+year
			return f
		}
		return ""
	},
	terminoTutoriaSemestral:function(){
		if (this.terminoTutoriaSemestral)
			return true
		return false
	},
	fueEvaluado:function(){
		if (this.nivelDeDesempeño)
			return true
		return false
    },
    tieneFichaDeIdentificacion:function(){
		if (this.fechaFichaIdentificacion)
			return true
		return false
    },
    tieneMotivoNoTermino:function(){
		if (this.motivoNoTermino)
			return true
		return false
	},
	tieneMotivoDeserto:function(){
		if (this.motivoDeserto)
			return true
		return false
	},
});
Template.tutoriasDocente.events({
	"keyup .myTxtBoxFiltroTutorados":function(){
		let filtro = "#myFiltroTutorados"+this._id;
		let value  = $(filtro).val().toLowerCase();
		let tabla = '#myTableTutorados'+this._id+' tr';
    	$(tabla).filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
    },
    "click .datos":function(){
		ncAlumno.set(this.nc)
    },
    "click .terminoTutoriaSemestral":function(){
		Meteor.call('terminoTutoriaSemestral',tutoria.get(),this._id);
    },
    "click .addMotivoNoTermino":function(){
		ncAlumno.set(this.nc)
	},
	"click .addMotivoDeserto":function(){
		ncAlumno.set(this.nc)
    },
    "click .verEvaluacion":function(){
		ncAlumno.set(this.nc)
		alumno.set(this)
    },
    "click .evaluarTutoria":function(){
		ncAlumno.set(this.nc)
	},
});
//*************************************************************************************************************************/
//                                            MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoPorDocente.helpers({
	foto:function(){
		if (Meteor.users.findOne({'username':ncAlumno.get()})?.profile?.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+ncAlumno.get()+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	},
	alumnoDatos:function(){
		return Meteor.users.findOne({'username':ncAlumno.get()})  
	},
	eMailAlumno:function(){
		if (Meteor.users.findOne({'username':ncAlumno.get()})?.emails)
			return Meteor.users.findOne({'username':ncAlumno.get()}).emails[0].address
		return ""
	}
});
//*************************************************************************************************************************/
//                                  AGREGA EL MOTIVO POR EL QUE NO TERMINO LA TUTORIA
//*************************************************************************************************************************/
Template.addMotivoNoTerminoTutoria.helpers({
    alumno:function(){
        return Meteor.users.findOne({'username':ncAlumno.get()})?.profile?.name;
    }
})
Template.addMotivoNoTerminoTutoria.events({
    "click .guardarMotivoNoTermino":function(){
        Meteor.call('guardarMotivoNoTerminoTutoria',tutoria.get(),ncAlumno.get(),document.getElementById('motivoNoTermino').value)
    }
})
//*************************************************************************************************************************/
//                                    AGREGA EL MOTIVO POR EL QUE DESERTO LA TUTORIA
//*************************************************************************************************************************/
Template.addMotivoDesertoTutoria.helpers({
	alumno:function(){
		return Meteor.users.findOne({'username':ncAlumno.get()})?.profile?.name;
	}
})
Template.addMotivoDesertoTutoria.events({
	"click .guardarMotivoDeserto":function(){
		Meteor.call('guardarMotivoDesertoTutoria',tutoria.get(),ncAlumno.get(),document.getElementById('motivoDeserto').value)
	}
})
//*************************************************************************************************************************/
//                                            MUESTRA LA EVALUACION DE LA TUTORIA
//*************************************************************************************************************************/
Template.verMiEvaluacionAlumnoEnTutoria.helpers({
	alumno:function(){
		return Meteor.users.findOne({'username':ncAlumno.get()})?.profile?.name;
	},
	periodo:function(){
		return Session.get('periodo')
	},
	evaluacion:function(){
		if (alumno.get()?.evaluacion)
			return alumno.get().evaluacion
		return ""
	}
})
//*************************************************************************************************************************/
//                                                    EVALUAR LA TUTORIA
//*************************************************************************************************************************/
Template.evaluarTutoria.helpers({
	periodo:function(){
		return Session.get("periodo");
	},
	alumno:function(){
		return Meteor.users.findOne({'username':ncAlumno.get()})?.profile?.name;
	}
});
Template.evaluarTutoria.events({
	"click .addEvaluacion":function(){
		let x=document.getElementById("evaluacionActividadComplementaria");
		let evaluacion=[];
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[0],'R':x.uno.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[1],'R':x.dos.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[2],'R':x.tres.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[3],'R':x.cuatro.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[4],'R':x.cinco.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[5],'R':x.seis.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[6],'R':x.siete.value})
		let v1 = parseInt(x.uno.value.substring(1,2));
		let v2 = parseInt(x.dos.value.substring(1,2));
		let v3 = parseInt(x.tres.value.substring(1,2));
		let v4 = parseInt(x.cuatro.value.substring(1,2));
		let v5 = parseInt(x.cinco.value.substring(1,2));
		let v6 = parseInt(x.seis.value.substring(1,2));
		let v7 = parseInt(x.siete.value.substring(1,2));
		let prom =(v1+v2+v3+v4+v5+v6+v7)/7;
		let nivelDeDesempeño=""
		if (prom>=3.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Excelente'
		else if (prom>=2.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Notable'
		else if (prom>=1.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Bueno'
		else if (prom>=1) nivelDeDesempeño = '['+prom.toFixed(2)+'] Suficiente'
		else nivelDeDesempeño = '['+prom.toFixed(2)+'] insuficiente'
		Meteor.call('addEvaluacionTutoria',tutoria.get(),Meteor.users.findOne({'username':ncAlumno.get()}),evaluacion,nivelDeDesempeño)
	}
})
//*************************************************************************************************************************/
//                                    ENVIA EL ARCHIVO DE PLAN DE ACCION TUTORIAL
//*************************************************************************************************************************/
Template.uploadPlanAccionTutorial.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get("periodo")+'-PAT-'+Meteor.user()?.profile?.name+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'tutoriasPAT');
			Meteor.call('subiPlanAccionTutorial',tutorias.findOne({'propietario':Meteor.userId()}),fileName);
			subioPlanAccionTutorial.set(true)
		};
		reader.readAsArrayBuffer(file);
		Modal.hide('uploadPlanAccionTutorial');
		return false;
	},
	"click .cerrar": function(){
		if (subioPlanAccionTutorial.get()){
			let aviso={encabezado:"Tutorias",aviso:"Ha subido su Plan de Acción Tutorial",positivo:true};
			Session.set("aviso",aviso);
		}else{
			let aviso={encabezado:"Tutorias",aviso:"No ha subido ningun archivo",positivo:false};
			Session.set("aviso",aviso);
		}
	}
}); 
//*************************************************************************************************************************/
//                                    ENVIA EL ARCHIVO DE DIAGNOSTICO INICIAL DE LA TUTORIA
//*************************************************************************************************************************/
Template.uploadDiagnosticoInicial.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			var buffer = new Uint8Array(reader.result);
			var fileName = Session.get("periodo")+'-DI-'+Meteor.user()?.profile?.name+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'tutoriasDI');
			Meteor.call('subiDiagnosticoInicial',tutorias.findOne({'propietario':Meteor.userId()}),fileName);
			subioDiagnosticoInicial.set(true)
		};
		reader.readAsArrayBuffer(file);
		Modal.hide('uploadDiagnosticoInicial');
		return false;
	},
	"click .cerrar": function(){
		if (subioDiagnosticoInicial.get()){
			let aviso={encabezado:"Tutorias",aviso:"Ha subido su diagnostico inicial",positivo:true};
			Session.set("aviso",aviso);
		}else{
			let aviso={encabezado:"Tutorias",aviso:"No ha subido ningun archivo",positivo:false};
			Session.set("aviso",aviso);
		}
	}
}); 
//*************************************************************************************************************************/
//                                    ENVIA EL ARCHIVO DE REPORTE SEMETRAL DE LA TUTORIA
//*************************************************************************************************************************/
Template.uploadReporteSemestral.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get("periodo")+'-RS-'+Meteor.user().profile.name+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'tutoriasRS');
			Meteor.call('subiReporteSemestral',tutorias.findOne({'propietario':Meteor.userId()}),fileName);
			subioReporteSemestral.set(true)
		};
		reader.readAsArrayBuffer(file);
	},
	"click .cerrar": function(){
		if (subioReporteSemestral.get()){
			let aviso={encabezado:"Tutorias",aviso:"Ha subido su reporte semestral",positivo:true};
			Session.set("aviso",aviso);
		}else{
			let aviso={encabezado:"Tutorias",aviso:"No ha subido ningun archivo",positivo:false};
			Session.set("aviso",aviso);
		}
	}
}); 
//*************************************************************************************************************************/
//                                    ENVIA EL ARCHIVO CON LAS EVIDENCIAS DE LA TUTORIA
//*************************************************************************************************************************/
Template.uploadEvidenciaTutoria.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get("periodo")+'-E-'+Meteor.user()?.profile?.name+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'tutoriasET');
			Meteor.call('subiEvidenciaTutoria',tutorias.findOne({'propietario':Meteor.userId()}),fileName);
			subioEvidenciaTutoria.set(true)
		};
		reader.readAsArrayBuffer(file);
	},
	"click .cerrar": function(){
		if (subioEvidenciaTutoria.get()){
			let aviso={encabezado:"Tutorias",aviso:"Ha subido su evidencia de tutoria",positivo:true};
			Session.set("aviso",aviso);
		}else{
			let aviso={encabezado:"Tutorias",aviso:"No ha subido ningun archivo",positivo:false};
			Session.set("aviso",aviso);
		}
	}
}); 
//*************************************************************************************************************************/
//                              GRAFICA DE ENTREGA DE FICHAS DE IDENTIFICACION DE LOS ALUMNOS
//*************************************************************************************************************************/
Template.graficaAlumnosPorTutor.onRendered(function(){
	let container=document.getElementById("myChartAlumnos");
	let entregados=0;
	let no_entregados=0;
	Meteor.call('cantTutoradosPorTutor',tutoria.get(),function(error,result){
		if (error) alert("Aun no tienes asignados alumnos tutorados en este periodo")
		else  if (result){
				cant=result;
				
				let container=document.getElementById("myChartAlumnosPorTutor");
				let chart =  anychart.column();

				let datos={
					title:'Grafica de Alumnos',
					header:['#','Ficha de Iden.','Terminaron','No terminaron','Desertaron'],
					rows:[
						[Session.get("periodo"),cant.entregaronFI,cant.terminaron,cant.noTerminaron,cant.desertaron]
					]
				};

				chart.data(datos);
				chart.animation(true);
				chart.yAxis().labels().format('{%Value}{groupsSeparator: }');
				chart.yAxis().title('Alumnos');
				chart.yScale().maximum(cant.tutorados);
				chart.labels()
				.enabled(true)
				.position('center-top')
				.anchor('center-bottom')
				.format('{%Value}{groupsSeparator: }');
						chart.hovered().labels(false);
						chart.legend()
				.enabled(true)
				.fontSize(13)
							.padding([0, 0, 20, 0]);
						chart.interactivity().hoverMode('single');
						chart.tooltip()
				.positionMode('point')
				.position('center-top')
				.anchor('center-bottom')
				.offsetX(0)
				.offsetY(5)
				.titleFormat('{%X}')
				.format('{%SeriesName} : {%Value}{groupsSeparator: }');
		
				chart.container(container).draw();
		}
	});
})
//*************************************************************************************************************************/
//                              			LISTA DE ASISTENCIA DE LA TUTORIA
//*************************************************************************************************************************/
Template.listaDeAsistenciaTutoria.helpers({
	docente:function(){
		return tutoria.get().docenteTutor
	},
	periodo:function(){
		return tutoria.get().periodo;
	},
	alumnos:function(){
		return tutoria.get().alumnos
	},
	number:function(){
		nAlumno++
		return nAlumno
	}
})
Template.listaDeAsistenciaTutoria.events({
	"click .imprimirListaAsistencia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
}) 