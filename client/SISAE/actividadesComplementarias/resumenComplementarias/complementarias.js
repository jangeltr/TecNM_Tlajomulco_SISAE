let semestre = new ReactiveVar(1)
let modalidad = new ReactiveVar("Escolarizado")
let modulo = new ReactiveVar("Tlajomulco")
let ncAlumno = new ReactiveVar("")
let alumno = new ReactiveVar()
//*************************************************************************************************************************/
//                                                          ALUMNOS
//*************************************************************************************************************************/
Template.sisaeConstanciasActividadesComplementarias.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
			this.subscribe('alumnos',Session.get('carrera'),parseInt(semestre.get()),modalidad.get(),modulo.get(),'Activo')
		}	
    })
})
Template.sisaeConstanciasActividadesComplementarias.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador()||isJefeServiciosEscolares())
            return true;
        return false;
	},
	esJefeTutorias:function(){
		if (Session.get("isAdministrador")||Session.get("isJefeTutorias"))
			return true
		return false
	},
	esJefeExtraescolares:function(){
		if (Session.get("isAdministrador")||Session.get("isJefeExtraescolares"))
			return true
		return false
	},
	esJefeAcademicas:function(){
		if (Session.get("isAdministrador")||Session.get("isJefeAcademicas"))
			return true
		return false
	},
	esJefeServiciosEscolares:function(){
		return isJefeServiciosEscolares()
	},
	listaAlumnos: function(){
		return Meteor.users.find({"profile.tipo":"Alumno"},{
			sort:{"profile.name":1}});
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
    email: function(){
        return this.emails[0].address;
	},
	puedeEgresar: function(){
		if (this.profile.semestre>8)
			return true
		return false
	},
	cantidad: function(){
		return Meteor.users.find({"profile.tipo":"Alumno"}).count();
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
    },
})
Template.sisaeConstanciasActividadesComplementarias.events({
    "keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myAlumnosFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTableAlumnos tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	},
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
    "click .datos":function(event){
		ncAlumno.set(this.username)
		alumnoAEditar.set(Meteor.users.findOne({'username':ncAlumno.get()}))
	},
	"click .egreso":function(event){
		ncAlumno.set(this.username)
		alumnoAEditar.set(Meteor.users.findOne({'username':ncAlumno.get()}))
		Meteor.call('alumnoEgreso',alumnoAEditar.get());
    },
	"click .generarConstancia":function(){
		alumno.set(this)
	},
	"click .subirConstancia":function(){
		alumno.set(this)
	},
})
//*************************************************************************************************************************/
//                                               MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoEnConstanciasActividadesComplementarias.helpers({
	foto:function(){
		if (Meteor.users.findOne({'username':ncAlumno.get()}).profile.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+ncAlumno.get()+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	},
	alumnoDatos:function(){
		return Meteor.users.findOne({'username':ncAlumno.get()})  
	},
	eMailAlumno:function(){
		return Meteor.users.findOne({'username':ncAlumno.get()}).emails[0].address
	}
})
//*************************************************************************************************************************/
//                                                        BUSCAR UN ALUMNO
//*************************************************************************************************************************/
Template.buscarAlumnoEnConstanciasActividadesComplementarias.helpers({
	alumno:function(){
		return alumno.get();
	},
	email:function(){
		return alumno.get().emails[0].address;
	}
})
Template.buscarAlumnoEnConstanciasActividadesComplementarias.events({
    "click .buscar": function(){
		ncAlumno.set(document.getElementById("numControl").value)
		Meteor.call("getAlumno",ncAlumno.get(),function(error,result){
            if (error) alert("error")
            else alumno.set(result)
        })
	}
})
//*************************************************************************************************************************/
//                              SOLICITUD DE LOS DATOS PARA LA CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
let datosConstanciaTerminacion = new ReactiveVar()
Template.solicitudDatosParaConstanciaTerminacionActividadComplementaria.onCreated(function(){
	this.subscribe('docentesActivos');
})
Template.solicitudDatosParaConstanciaTerminacionActividadComplementaria.rendered = function() {
    Meteor.typeahead.inject();
};
Template.solicitudDatosParaConstanciaTerminacionActividadComplementaria.helpers({
    docente:function(){
        return Meteor.users.find({'profile.tipo':'Docente'}).fetch().map(function(it){return it.profile.name})
    }
})
Template.solicitudDatosParaConstanciaTerminacionActividadComplementaria.events({
    "click .generarConstanciaTerminacionActividadComplementaria":function(){
        let datos={}
        datos.nombreJefeDeptoServiciosEscolares = document.getElementById("nombreJefeDeptoServiciosEscolares").value
        datos.nombreJefeDeptoAcademico = document.getElementById("nombreJefeDeptoAcademico").value
        datos.responsableActividad = document.getElementById("nombreResponsableActividadComplentaria").value
		datos.actividadNombre = document.getElementById("nombreActividad").value
		datos.numCreditos = document.getElementById("numCreditos").value
		datos.valorDesempeño = document.getElementById("valorDesempeño").value
		datos.valorNumerico = document.getElementById("valorNumerico").value
		datos.periodoEscolar = Session.get("periodo")
		datos.alumnoNombre = alumno.get().profile.name
		datos.alumnoNC = alumno.get().username
		datos.alumnoCarrera = alumno.get().profile.carrera
        datosConstanciaTerminacion.set(datos)
        BlazeLayout.render("impresion",{rellena2:"vistaConstanciaTerminacionActividadComplementaria"})
    }
});
//*************************************************************************************************************************/
//                                   CONSTANCIA DE TERMINACION DE ACTIVIDAD ACADEMICA
//*************************************************************************************************************************/
Template.vistaConstanciaTerminacionActividadComplementaria.helpers({
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
Template.vistaConstanciaTerminacionActividadComplementaria.events({
	"click .imprimirConstancia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                                     SUBIR LA CONSTANCIA DE TERMINACION DE TUTORIA
//*************************************************************************************************************************/
Template.uploadConstanciaTermicacionActividadComplementariaTutoria.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get('periodo')+'-'+'Constancia Act-Complementarias Tutorias-'+alumno.get().username+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'ConstanciaTermicacionActividadTutoria');
			Meteor.call('subiConstanciaTermicacionActividadTutoria',alumno.get()._id,fileName);
		};
		reader.readAsArrayBuffer(file);
	}
})