let ncAlumno = new ReactiveVar('')
let actividad = new ReactiveVar()
let alumno = new ReactiveVar()
let jefeServiciosEcolares = new ReactiveVar()
let jefe = new ReactiveVar()
//*************************************************************************************************************************/
//                                 BARRA DE HERRAMIENTAS DE ACTIVIDADES ACADEMICAS JEFE
//*************************************************************************************************************************/
Template.toolBoxAcademicasJefe.helpers({
	
}); 
Template.toolBoxAcademicasJefe.events({
	
})
//*************************************************************************************************************************/
//                                              ACTIVIDADES ACADFEMICAS JEFE
//*************************************************************************************************************************/
Template.academicasJefe.onCreated(function(){
	this.autorun(() => {
		this.subscribe('docentesActivos');
		this.subscribe('actividadAcademica',Session.get('periodo'))
		this.subscribe('alumno',ncAlumno.get())
	});
});
Template.academicasJefe.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")+"/";
	},
    actividadAcademica:function(){
        return actividadAcademica.find({})
	},
	tieneAlumnos:function(){
		if(this.alumnos && this.alumnos.length>0)
			return true;
		else 
			return false
    },
    esCerrada:function(){
        if (this?.tipo=='Cerrada')
            return true
        else
            return false
	},
	subioListaAsistencia:function(){
		if (this.listaAsistencia)
			return true
		else 
			return false
	},
	estaEnCerrada:function(){
		if (actividad.get()?.tipo=='Cerrada')
			return true
		return false
	},
	aceptado:function(){
		if (this.aceptado)
			return true
		return false
	},
	subioComprobante:function(){
		if (this.pathConstanciaTerminacion)
			return true
		return false
	},
	evaluado:function(){
		if (this.evaluacion)
			return true
		else
			return false
	},
	numSolicitudes:function(){
		return this.alumnos.length;
	},
	numAceptados:function(){
		let al=this.alumnos;
		let numAcept = al.reduce(function (n, a) {
			return n + (a.aceptado == true);
		}, 0);
		return numAcept;
	},
	requiereComprobante: function(){
		if (actividad.get()?.requiereComprobante==true)
			return true
		return false
	}
})
Template.academicasJefe.events({
    "keyup .myTxtBoxFiltroAcademicas":function(){
		let filtro = $("#myFiltroAcademicas");
		let value  = filtro.val().toLowerCase();
    	$("#myTableAcademicas tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
    },
    "keyup .myTxtBoxFiltroAcademicasAlumno":function(){
        let filtro = "#myFiltroAcademicasAlumno"+this._id;
		let value  = $(filtro).val().toLowerCase();
		let tabla = '#myTableAcademicasAlumno'+this._id+' tr';
    	$(tabla).filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
    },
    "click .borrar":function(){
        let aviso={encabezado:"Actividad Academica",aviso:`La actividad ha sido borrada`,positivo:true}
        Session.set("aviso",aviso)
        Meteor.call('removeActividadAcademica',this._id)
    },
    "click .agregarAlumnos":function(){
        actividad.set(this)
        BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"agregarAlumnosALaActividadAcademica"});
    },
    "click .generarListaAsistencia":function(){
		actividad.set(this)
		nAlumno=0;
		BlazeLayout.render("impresion",{rellena2:"listaDeAsistenciaActividadAcademicaJefe"});
	},
	"click .subirListaAsistencia":function(){
		actividad.set(this)
	},
    "click .expandirActividad":function(){
        actividad.set(this)
	},
	"click .aceptarAlumno":function(){
		Meteor.call('aceptarAlumnoEnActividadAcademica',actividad.get()._id,this._id,this.nc)
	},
	"click .quitarAlumno":function(){
		if (actividad.get()?.tipo=="Cerrada"){
			ncAlumno.set(this.nc)
			alumno.set(this)
			Meteor.call('addAlumnoEnActividadAcademica',actividad.get()._id,alumno.get())
		}
		if (actividad.get()?.tipo=="Abierta")
			Meteor.call('quitarAlumnoDeActividadAcademica',actividad.get()._id,this._id,this.nc)
	},
	"click .evaluar":function(){
        alumno.set(this)
	},
	"click .verEvaluacion":function(){
		alumno.set(this)
	},
	"click .datos":function(){
		ncAlumno.set(this.nc)
		alumno.set(Meteor.users.findOne({'username':ncAlumno.get()}))
    },
	"click .generarConstancia":function(){
		Meteor.call('idUsuarioDelRole',"Depto de Servicios Escolares",function(error,result){
            if (error) 
				alert("error")
            else 
				jefeServiciosEcolares.set(Meteor.users.findOne({'_id':result}))
        })
		alumno.set(this)
	},
	"click .subirConstancia":function(){
		alumno.set(this)
	},
})
//*************************************************************************************************************************/
//                                             AGREGAR ACTIVIDADES ACADEMICAS
//*************************************************************************************************************************/
Template.addActividadAcademica.helpers({
    periodo:function(){
        return Session.get('periodo')
    }
})
Template.addActividadAcademica.events({
    "click .agregar":function(event){
        let x=document.getElementById("schemaAddActividadAcademica");
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
		let conComprobante
		if (document.getElementById("conComprobante").checked)
			conComprobante = true
		else 
			conComprobante = false
        if (doc){
            let a={};
            a.periodo=Session.get("periodo");
            a.idDocente=doc._id;
            a.docente=doc.profile.name;
            a.actividad=x.actividad.value;
            a.modalidad=x.modalidad.value;
            a.horario=x.horario.value;
            a.sede=x.sede.value;
            a.tipo=x?.tipo?.value;
			a.requiereComprobante=conComprobante
            let aviso={encabezado:"Actividad Academica",aviso:`La actividad ${a.actividad} ha sido agregada`,positivo:true}
            Session.set("aviso",aviso)
            Meteor.call("addActividadAcademica",a);
        }
        else{
            let aviso={encabezado:"Actividad Academica",aviso:`La actividad ${x.actividad.value} no ha sido agregada porque el profesor no existe`,positivo:false}
            Session.set("aviso",aviso)
        }
	}
})
//*************************************************************************************************************************/
//                                         AGREGA ALUMNOS A UNA ACTIVIDAD ACADEMICA 
//*************************************************************************************************************************/
let semestre = new ReactiveVar(1);
let modalidad = new ReactiveVar("Escolarizado");
let modulo = new ReactiveVar("Tlajomulco");
Template.agregarAlumnosALaActividadAcademica.onCreated(function(){
	this.autorun(() =>{
		this.subscribe('actividadAcademica',Session.get('periodo'))
		this.subscribe('alumnos',Session.get('carrera'),parseInt(semestre.get()),modalidad.get(),modulo.get(),'Activo')
    })
})
Template.agregarAlumnosALaActividadAcademica.helpers({
    actividad: function(){
        return actividad.get()?.actividad
    },
	periodo: function(){
		return Session.get('periodo')
	},
	listaAlumnos: function(){
		return Meteor.users.find({"profile.tipo":"Alumno"},{sort:{"profile.name":1}});
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
	tieneEstaActividad: function(){
		let a=actividadAcademica.findOne({'_id':actividad.get()._id,'alumnos.nc':this.username})
		if (a)
			return true
		else	
			return false
	}
})
Template.agregarAlumnosALaActividadAcademica.events({
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
    "click .regresar":function(event){
        BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"academicasJefe"});
    },
	"click .agregarAlumno":function(event){
		let alumno=this;
		Meteor.call('addAlumnoEnActividadAcademica',actividad.get()._id,alumno)	
	},
	"click .datos":function(event){
		alumno.set(this)
	}
})
//*************************************************************************************************************************/
//                                              EVALUAR LA ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.evaluarActividadAcademicaJefe.helpers({
	actividad:function(){
        return actividad.get()?.actividad
	},
	alumno:function(){
		return alumno.get()?.nombre;
	},
	periodo:function(){
		return Session.get('periodo')
	}
})
Template.evaluarActividadAcademicaJefe.events({
	"click .addEvaluacion":function(){
		var x=document.getElementById("evaluacionActividadComplementaria");
		var evaluacion=[];
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[0],'R':x.uno.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[1],'R':x.dos.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[2],'R':x.tres.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[3],'R':x.cuatro.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[4],'R':x.cinco.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[5],'R':x.seis.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[6],'R':x.siete.value})
		var v1 = parseInt(x.uno.value.substring(1,2));
		var v2 = parseInt(x.dos.value.substring(1,2));
		var v3 = parseInt(x.tres.value.substring(1,2));
		var v4 = parseInt(x.cuatro.value.substring(1,2));
		var v5 = parseInt(x.cinco.value.substring(1,2));
		var v6 = parseInt(x.seis.value.substring(1,2));
		var v7 = parseInt(x.siete.value.substring(1,2));
		var prom =(v1+v2+v3+v4+v5+v6+v7)/7;
		var nivelDeDesempeño=""
		if (prom>=3.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Excelente'
		else if (prom>=2.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Notable'
		else if (prom>=1.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Bueno'
		else if (prom>=1) nivelDeDesempeño = '['+prom.toFixed(2)+'] Suficiente'
		else nivelDeDesempeño = '['+prom.toFixed(2)+'] insuficiente'
		Meteor.call('addEvaluacionActividadAcademica',actividad.get()._id,alumno.get(),evaluacion,nivelDeDesempeño)
	}
})
//*************************************************************************************************************************/
//                                 VER LA EVALUACIÓN DE UN ALUMNO EN LA ACTIVIDAD ACADEMICA
//*************************************************************************************************************************/
Template.verEvaluacionAlumnoEnActividadAcademicaJefe.helpers({
	actividad:function(){
        return actividad.get()?.actividad
	},
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
//                                            SUBIR LA LISTA DE ASISTENCIA
//*************************************************************************************************************************/
Template.uploadListaAsistenciaActividadAcademicaJefe.helpers({

})
Template.uploadListaAsistenciaActividadAcademicaJefe.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let act = actividad.get()
			let fileName = act.periodo+'-'+act.docente+'-'+act.actividad+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'ListaAsistenciaActividadAcademica');
			Meteor.call('subiListaAsistenciaActividadAcademica',act,fileName);
		};
		reader.readAsArrayBuffer(file);
	}
})
//*************************************************************************************************************************/
//                                            MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoPorActividadAcademicaEnJefe.onCreated(function(){
	this.autorun(() =>{
		if(this.subscriptionsReady()){
			alumno.set(Meteor.users.findOne({'username':ncAlumno.get()}))
		}
    })
})
Template.showDatosAlumnoPorActividadAcademicaEnJefe.helpers({
	foto:function(){
		if (alumno.get()?.profile?.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+alumno.get()?.nc+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	},
	alumnoDatos:function(){
		return alumno.get()  
	},
	eMailAlumno:function(){
		if (alumno.get()?.emails)
			return alumno.get()?.emails[0]?.address;
		return ""
	}
})
//*************************************************************************************************************************/
//                               GENERAR LA LISTA DE ASISTENCIA A LA ACTIVIDAD ACADEMICA
//*************************************************************************************************************************/
Template.listaDeAsistenciaActividadAcademicaJefe.helpers({
	docente:function(){
		return actividad.get()?.docente;
	},
	actividad:function(){
		return actividad.get()?.actividad;
	},
	periodo:function(){
		return Session.get('periodo');
	},
	alumnos:function(){
		return actividad.get()?.alumnos;
	},
	number:function(){
		nAlumno++
		return nAlumno
	}
})
Template.listaDeAsistenciaActividadAcademicaJefe.events({
	"click .imprimirListaAsistencia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                              SOLICITUD DE LOS DATOS PARA LA CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
let datosConstanciaTerminacion = new ReactiveVar()
let jefeServiosEscolares = new ReactiveVar()
Template.solicitudDatosParaConstanciaTerminacionActividadAcademica.rendered = function() {
    Meteor.typeahead.inject();
};
Template.solicitudDatosParaConstanciaTerminacionActividadAcademica.helpers({
    docente:function(){
        return Meteor.users.find().fetch().map(function(it){return it?.profile?.name})
    },
	jefeDeptoServiciosEscolares:function(){
		return jefeServiciosEcolares.get()?.profile?.name
	},
	jefe:function(){
		return Meteor.user()?.profile?.name
	}
})
Template.solicitudDatosParaConstanciaTerminacionActividadAcademica.events({
    "click .generarConstanciaTerminacionActividadAcademica":function(){
        let datos={}
        datos.nombreJefeDeptoServiciosEscolares = document.getElementById("nombreJefeDeptoServiciosEscolares").value
        datos.nombreJefeDeptoAcademico = document.getElementById("nombreJefeDeptoAcademico").value
        datos.responsableActividad = actividad.get()?.docente
		datos.alumnoNombre = alumno.get()?.nombre
		datos.alumnoNC = alumno.get()?.nc
		datos.alumnoCarrera = alumno.get()?.carrera
		datos.actividadNombre = actividad.get()?.actividad
		datos.alumnoNivelDesempeño = alumno.get()?.nivelDeDesempeño.substring(alumno.get()?.nivelDeDesempeño.lastIndexOf("]")+1)
		datos.valorNumerico = alumno.get()?.nivelDeDesempeño.slice(1,alumno.get()?.nivelDeDesempeño.lastIndexOf("]"))
		datos.periodoEscolar = actividad.get()?.periodo
        datosConstanciaTerminacion.set(datos)
        BlazeLayout.render("impresion",{rellena2:"vistaConstanciaTerminacionActividadAcademica"})
    }
});
//*************************************************************************************************************************/
//                                   CONSTANCIA DE TERMINACION DE ACTIVIDAD ACADEMICA
//*************************************************************************************************************************/
Template.vistaConstanciaTerminacionActividadAcademica.helpers({
	datos:function(){
		return datosConstanciaTerminacion.get()
	},
	dia:function(){
		return  new Date().getDate()
	},
	mes:function(){
		const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		return months[new Date().getMonth()]
	},
	año:function(){
		return new Date().getFullYear()
	}
})
Template.vistaConstanciaTerminacionActividadAcademica.events({
	"click .imprimirConstancia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                                          SUBIR LA CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
Template.uploadConstanciaTermicacionActividadAcademica.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let act = actividad.get()
			let fileName = act.periodo+'-'+act.docente+'-'+'Constancia-'+act.actividad+'-'+alumno.get()?.nc+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'ConstanciaTermicacionActividadAcademicaDelDepto');
			Meteor.call('subiConstanciaTermicacionActividadAcademicaDelDepto',act._id,alumno.get()._id,fileName);
		};
		reader.readAsArrayBuffer(file);
	}
})