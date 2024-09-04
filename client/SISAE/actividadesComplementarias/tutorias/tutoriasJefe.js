let alumno   = new ReactiveVar();
let ncAlumno = new ReactiveVar();
let tutoria  = new ReactiveVar();
//*************************************************************************************************************************/
//                                      BARRA DE HERRAMIENTAS DE TUTORIAS DEL JEFE
//*************************************************************************************************************************/
Template.toolBoxTutoriasJefe.helpers({
	tengoTutorias: function(){
		if (tutoria.get())
			return true
		return false
	},
	puedoEscribir: function(){
		if ((Session.get("miPermiso")=="Escritura")||Session.get("isAdministrador")||Session.get("isSubAcademico"))
			return true
		return false
	}
});
Template.toolBoxTutoriasJefe.events({
	"click .verComoDocente":function(){
		Session.set("isAdministrador",false);
		Session.set("isSubAcademico",false);
		Session.set("isJefeTutorias",false);
	},
})
//*************************************************************************************************************************/
//                                              CODIGO DE TUTORIAS DEL JEFE
//*************************************************************************************************************************/
Template.tutoriasJefe.onCreated(function(){
	this.autorun(() => {
		this.subscribe('periodos')
		this.subscribe('tutorias',Session.get("periodo"));
		this.subscribe('alumno',ncAlumno.get())
		if(this.subscriptionsReady()){
			tutoria.set(tutorias.findOne({'propietario':Meteor.userId()}))
		}
	});
});
Template.tutoriasJefe.helpers({
	tutorias: function(){
		return tutorias.find({})
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	puedoEscribir: function(){
		if ((Session.get("miPermiso")=="Escritura")||Session.get("isAdministrador")||Session.get("isSubAcademico"))
			return true
		return false
	},
	//////////////////////////////////////////////Plan de accion tutorial
	tienePlanAccionTutorial:function(){
		if (this.fechaPlanAccionTutorial)
			return true
		return false
	},
	fechaPAT:function(){
		let month = this.fechaPlanAccionTutorial?.getUTCMonth() + 1; //months from 1-12
		let day = this.fechaPlanAccionTutorial?.getUTCDate();
		let year = this.fechaPlanAccionTutorial?.getUTCFullYear();
		let f=day+"/"+month+"/"+year;
		return f;
	},
	ischeckedPAT:function(){
		if (this.revisadoPlanAccionTutorial)
			return "checked"
		else
			return ""
	},
	//////////////////////////////////////////////Diagnostico Inicial del tutor
	tieneDiagnosticoInicial:function(){
		if (this.fechaDiagnosticoInicial)
			return true
		else
			return false
	},
	fechaDI:function(){
		let month = this.fechaDiagnosticoInicial?.getUTCMonth() + 1; //months from 1-12
		let day = this.fechaDiagnosticoInicial?.getUTCDate();
		let year = this.fechaDiagnosticoInicial?.getUTCFullYear();
		let f=day+"/"+month+"/"+year;
		return f;
	},
	ischeckedDI:function(){
		if (this.revisadoDiagnosticoInicial)
			return "checked"
		else
			return ""
	},
	//////////////////////////////////////////////Reporte semestral del tutor
	tieneReporteSemestral:function(){
		if (this.fechaReporteSemestral)
			return true
		else
			return false
	},
	fechaRS:function(){
		let month = this.fechaReporteSemestral?.getUTCMonth() + 1; //months from 1-12
		let day = this.fechaReporteSemestral?.getUTCDate();
		let year = this.fechaReporteSemestral?.getUTCFullYear();
		let f=day+"/"+month+"/"+year;
		return f;
	},
	ischeckedRS:function(){
		if (this.revisadoReporteSemestral)
			return "checked"
		else
			return ""
	},
	//////////////////////////////////////////////Evidencia de la tutoria del tutor
	tieneEvidenciaTutoria:function(){
		if (this.fechaEvidenciaTutoria)
			return true
		else
			return false
	},
	fechaET:function(){
		let month = this.fechaEvidenciaTutoria?.getUTCMonth() + 1; //months from 1-12
		let day = this.fechaEvidenciaTutoria?.getUTCDate();
		let year = this.fechaEvidenciaTutoria?.getUTCFullYear();
		let f=day+"/"+month+"/"+year;
		return f;
	},
	ischeckedET:function(){
		if (this.revisadoEvidenciaTutoria)
			return "checked"
		else
			return ""
	},
	//////////////////////////////////////////////Ficha de identificación del alumno
	fechaFI:function(){
		if (this.fechaFichaIdentificacion){
			let month = this.fechaFichaIdentificacion.getUTCMonth() + 1
			let day = this.fechaFichaIdentificacion.getUTCDate();
			let year = this.fechaFichaIdentificacion.getUTCFullYear();
			let f=day+"/"+month+"/"+year;
			return f;
		}else
			return ""
		//let month = this.fechaFichaIdentificacion.getUTCMonth() + 1; //months from 1-12
	},
	terminoTutoriaSemestral:function(){
		if (this.terminoTutoriaSemestral)
			return true
		else
			return false
	},
	fueEvaluado:function(){
		if (this.nivelDeDesempeño)
			return true
		else
			return false
	}
});
Template.tutoriasJefe.events({
	"keyup .myTxtBoxFiltroTutorias":function(){
		let filtro = $("#myFiltroTutorias");
		let value  = filtro.val().toLowerCase();
    	$("#myTableTutorias tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
	},
	"keyup .myTxtBoxFiltroTutorados":function(){
		let filtro = "#myFiltroTutorados"+this._id;
		let value  = $(filtro).val().toLowerCase();
		let tabla = '#myTableTutorados'+this._id+' tr';
    	$(tabla).filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	},
	"click .verEvaluacion":function(){
		alumno.set(this)
	},
	"click .datos":function(){
		alumno.set(this)
		ncAlumno.set(this.nc)
	},
	"click .revisadoPAT":function(){
		if (this.revisadoPlanAccionTutorial)
			Meteor.call('rechazoPlanAccionTutorial',this._id);
		else
			Meteor.call('aproboPlanAccionTutorial',this._id);
	},
	"click .revisadoDI":function(){
		if (this.revisadoDiagnosticoInicial)
			Meteor.call('rechazoDiagnosticoIncial',this._id);
		else
			Meteor.call('aproboDiagnosticoInicial',this._id);
	},
	"click .revisadoRS":function(){
		if (this.revisadoReporteSemestral)
			Meteor.call('rechazoReporteSemetral',this._id);
		else
			Meteor.call('aproboReporteSemetral',this._id);
	},
	"click .revisadoET":function(){
		if (this.revisadoEvidenciaTutoria)
			Meteor.call('rechazoEvidenciaTutoria',this._id);
		else
			Meteor.call('aproboEvidenciaTutoria',this._id);
	},
	"click .borraTutoria":function(){
		tutoria.set(this);
	}
});
//*************************************************************************************************************************/
//                                     				ELIMINAR TUTORIA
//*************************************************************************************************************************/
Template.eliminarTutoria.helpers({
	docente:function(){
		return tutoria.get()?.docenteTutor;
	}
});
Template.eliminarTutoria.events({
	"click .borrar":function(){
		Meteor.call('removeTutoria',tutoria.get()._id);
		let aviso={encabezado:"Tutorias",aviso:"La tutoria a sido eliminada",positivo:true};
    	Session.set("aviso",aviso);
	}
})
//*************************************************************************************************************************/
//                                     VER LA EVALUACION DEL ALUMNO EN LA TUTORIA
//*************************************************************************************************************************/
Template.verEvaluacionAlumnoEnTutoria.helpers({
	alumno:function(){
		return alumno.get()?.nombre;
	},
	periodo:function(){
		return Session.get('periodo')
	},
	evaluacion:function(){
		return alumno.get()?.evaluacion;
	}
})
//*************************************************************************************************************************/
//                                            MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumno.helpers({
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
		return Meteor.users.findOne({'username':ncAlumno.get()})?.emails[0]?.address;
	}
});
//*************************************************************************************************************************/
//                                                GRAFICA DE DOCENTES
//*************************************************************************************************************************/
Template.graficaDocentesTutores.onRendered(function(){
	let container=document.getElementById("myChartDocentes");
	
	let entregadosDI = tutorias.find({'fechaDiagnosticoInicial':{$exists:true}}).count()
	let entregadosRS = tutorias.find({'fechaReporteSemestral':{$exists:true}}).count()
	let entregadosET = tutorias.find({'fechaEvidenciaTutoria':{$exists:true}}).count()
	let numTutorias  = tutorias.find({}).count();

	let chart =  anychart.column();

	let datos={
		title:'Grafica de entrega de documentos de los Tutores',
		header:['#','Diagnóstico Inicial','Reporte Semestral','Evidencia Tutoria'],
		rows:[
			[Session.get("periodo"),entregadosDI,entregadosRS,entregadosET]
		]
	};
	
	chart.data(datos);
	chart.animation(true);
	chart.yAxis().labels().format('{%Value}{groupsSeparator: }');
	chart.yAxis().title('Tutores');
	chart.yScale().maximum(numTutorias);
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
});
//*************************************************************************************************************************/
//                                                GRAFICA DE ALUMNOS
//*************************************************************************************************************************/
Template.graficaAlumnosTutorados.onRendered(function(){
	let container=document.getElementById("myChartAlumnos");
	let entregados=0;
	let no_entregados=0;
	Meteor.call('cantTutorados',Session.get('periodo'),function(error,result){
		if (error) alert("error")
		else  if (result){
			cant=result;
			
			let container=document.getElementById("myChartAlumnos");

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
});
//*************************************************************************************************************************/
//                                        COPIADO DE TUTORIAS DE OTRO CICLO ESCOLAR
//*************************************************************************************************************************/
Template.copiarTutorias.helpers({
	periodoActual:function(){
		return Session.get("periodo");
	},
	periodos:function(){
		return periodos.find({});
	}
});
Template.copiarTutorias.events({
	"click .copiar":function(){
		let per=document.getElementById("periodoElegido")
		Meteor.call('copiarTutoriaDeOtroPeriodo',per.options[per.selectedIndex].value,Session.get("periodo"));
	}
})
//*************************************************************************************************************************/
//                                            ASIGNACION DE ALUNNOS A TUTOR
//*************************************************************************************************************************/
let semestre = new ReactiveVar(1);
let modalidad = new ReactiveVar("Escolarizado");
let modulo = new ReactiveVar("Tlajomulco");
Template.asigAlumnosTutor.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefeTutorias")||Session.get("isSubAcademico")){
			this.subscribe('tutorias',Session.get("periodo"))
			this.subscribe('alumnos',Session.get('carrera'),parseInt(semestre.get()),modalidad.get(),modulo.get(),'Activo')
			this.subscribe('docentes');
		}	
    })
})
Template.asigAlumnosTutor.helpers({
	periodo: function(){
		return Session.get('periodo')
	},
	listaAlumnos: function(){
		return Meteor.users.find({"profile.tipo":"Alumno"},{
			sort:{"profile.name":1}});
	},
	tieneTutor: function(){
		if (tutorias.findOne({"alumnos.nc":this.username}))
			return true;
		else
			return false;
	},
	semestre: function(){
		return semestre.get();
	},
	modalidad: function(){
		return modalidad.get();
	},
	modulo: function(){
		return modulo.get();
	},
	cantidad: function(){
		return Meteor.users.find({"profile.tipo":"Alumno"}).count();
	}
})
Template.asigAlumnosTutor.events({
	"change .selectSemestre":function(event){
		let c = event.currentTarget;
		semestre.set(c.value);
	},
	"change .selectModalidad":function(event){
		let c = event.currentTarget;
		modalidad.set(c.options[c.selectedIndex].value);
	},
	"change .selectModulo":function(event){
		let c = event.currentTarget;
		modulo.set(c.options[c.selectedIndex].value);
	},
	"click .addAlumno":function(){
		let tutor=Meteor.users.findOne({"profile.name":document.getElementById("findDocenteName").value});
		let alumno=this
		if (!tutor){
			document.getElementById("findDocenteName").classList.add("bg-danger")
			document.getElementById("findDocenteName").value="SELECCIONE UN DOCENTE TUTOR"
		}else{
			Meteor.call('addTutorAAlumno',alumno,tutor.profile.name);
			Meteor.call('addAlumnoATutor',Session.get('periodo'),tutor,alumno)  
		}
	},
	"click .removeAlumno":function(){
		let alumno=this
		let tutor=Meteor.users.findOne({"profile.name":this.profile.tutor})
		Meteor.call('removeTutorAAlumno',alumno);
		Meteor.call('removeAlumnoATutor',Session.get('periodo'),tutor,alumno)
	},
	"mouseover .sobre":function(event){	
		document.getElementById(this._id).style.display = "inline"
	},
	"mouseleave .sobre":function(event){	
		document.getElementById(this._id).style.display = "none"
	}
})