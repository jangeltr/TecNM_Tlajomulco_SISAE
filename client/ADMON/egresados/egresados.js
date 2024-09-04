let modalidad = new ReactiveVar("Escolarizado");
let modulo = new ReactiveVar("Tlajomulco");
let ncAlumno = new ReactiveVar("");
let alumnoAEditar = new ReactiveVar();
//*************************************************************************************************************************/
//                                                          ALUNNOS
//*************************************************************************************************************************/
Template.alumnosEgresados.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
			this.subscribe('egresados',Session.get('carrera'),modalidad.get(),modulo.get())
		}	
    })
})
Template.alumnosEgresados.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true;
        else
            return false;
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
		if (this?.emails)
			return this.emails[0].address
		return ""
    },
    estaTitulado: function(){
        if (this.profile.status=='Titulado')
            return true
        else
            return false
    }
})
Template.alumnosEgresados.events({
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
    "click .titulado":function(event){
		ncAlumno.set(this.username)
		alumnoAEditar.set(Meteor.users.findOne({'username':ncAlumno.get()}))
		Meteor.call('alumnoSeTitulo',alumnoAEditar.get());
    },
})
//*************************************************************************************************************************/
//                                            MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoEnEgresados.helpers({
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
//                                           MODIFICA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.editAlumnoEgresado.helpers({
	alumno:function(){
		return alumnoAEditar.get();
	},
	email:function(){
		if (alumnoAEditar.get()?.emails)
			return alumnoAEditar.get().emails[0].address
		return ""
	}
});
Template.editAlumnoEgresado.events({
	"click .actualiza": function(event){
		let x=document.getElementById("editaAlumno");
		let u=alumnoAEditar.get();
		u.profile.carrera=x.carrera.value;
		u.profile.semestre=parseInt(x.semestre.value);
		u.profile.modalidad=x.modalidad.value;
		u.profile.modulo=x.modulo.value;
		u.profile.nivelEscolar=x.nivelEscolar.value;
		u.profile.periodoIngreso=x.periodoIngreso.value;
		u.profile.fechaNacimiento=x.fechaNacimiento.value;
		u.profile.telefono=x.telefono.value;
		u.profile.sexo=x.sexo.value;
		u.profile.semestresConTutoria=parseInt(x.semestresConTutoria.value);
		u.profile.status=x.status.value;
		let emails=[];
		let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(x.email.value)){
            emails.push({"address":x.email.value})
            u.emails = emails;
        }
		Meteor.call('updateAlumno',u);
		let aviso={encabezado:"Alumnos",aviso:"Ha modificado los datos correctamente",positivo:true};
        Session.set("aviso",aviso);
	}
});