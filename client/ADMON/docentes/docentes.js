let ordenarDocentes = new ReactiveVar("A-Z");
let docenteAEditar = new ReactiveVar();
let rolDelDocenteAEditar = new ReactiveVar()
let roles = new ReactiveVar([])
//*************************************************************************************************************************/
//                                      CODIGO DE LA BARRA DE HERRAMIENTAS
//*************************************************************************************************************************/
Template.toolBoxDocentes.helpers({
	totalDocentes: function(){
		return Counts.get('docentesCount')
    },
    esAdministrador:function(){
		return Session.get("isAdministrador");
    }
}); 
Template.toolBoxDocentes.events({
	"click .roles":function(){
		let rols=[];
		catRoles.forEach(function(element) {
			if (element!='Docente'){
				Meteor.call('idUsuarioDelRole',element,function(error,result){
					if (result){
						let usuario=Meteor.users.findOne({'_id':result}).profile.name
						rols.push({"rol":element})
						rols.push({"rol":usuario});
						roles.set(rols)
					}
				})
			}
		});
	},
	"keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myFiltro");
		let value  = filtro.val().toLowerCase();
    	$("#myTableDocentes tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
	},
	"click .findDocente":function(event){
        e=document.getElementById("findDocenteName");
        docenteAEditar.set(Meteor.users.findOne({"profile.name":e.value}));
        Meteor.call('rolDelUsuario',docenteAEditar.get()._id,function(error,result){
            if (error) alert("error")
            else rolDelDocenteAEditar.set(result)
        })
    }
})
//*************************************************************************************************************************/
//                                      CODIGO DE LA PLANTILLA DE DOCENTES
//*************************************************************************************************************************/
Template.admonDocentes.onCreated(function(){
	this.autorun(() =>{
		this.subscribe('docentes')
		this.subscribe('roles')
	});
});
Template.admonDocentes.helpers({
	esAdministrador:function(){
		if (isAdministrador())
			return true
		return false
	},
	esJefe:function(){
		if (isJefe()||isAdministrador())
			return true
		return false
	},
	listaDocentes: function(){
        if (ordenarDocentes.get()=="A-Z")
		    return Meteor.users.find({},{
                sort:{"profile.name":1}})
        else
        return Meteor.users.find({},{
            sort:{"profile.name":-1}})
    }
}); 
Template.admonDocentes.events({
    "click .ordDocentes":function(){
        if (ordenarDocentes.get()=="A-Z")
            ordenarDocentes.set("Z-A")
        else
            ordenarDocentes.set("A-Z")
    }
});
//*************************************************************************************************************************/
//                                 CODIGO DE LA PLANTILLA DE CADA DOCENTE DE LA LISTA
//*************************************************************************************************************************/
Template.showDocente.helpers({
	puedeModificar: function(){
		if (isJefe()||isAdministrador())
			return true
		return false
	},
	puedeEliminar:function(){
		return isAdministrador()
    },
    inicial:function(){
        return this.profile?.name?.substring(0,1)
	},
	isActivo:function(){
		if (this.profile?.estado=="Activo")
			return true
		return false
	}
});
Template.showDocente.events({
	"click .borrar": function(event){
		Meteor.call('removeDocente',this);
		let aviso={encabezado:"Docentes",aviso:"El registro del docente a sido eliminado",positivo:true}
    	Session.set("aviso",aviso)
	},
	"click .editar": function(event){
		docenteAEditar.set(this);
		Meteor.call('rolDelUsuario',docenteAEditar.get()._id,function(error,result){
            if (error) alert("error")
            else rolDelDocenteAEditar.set(result)
        })
	}
});
//*************************************************************************************************************************/
//                                      CODIGO DE LA PLANTILLA PARA EDICION DE LOS DATOS DEL DOCENTE
//*************************************************************************************************************************/
Template.editDocente.helpers({
	esJefe:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
            return true
	},
	puedeCambiarRol:function(){
		if (Session.get("isAdministrador")||Session.get("isSubAcademico"))
            return true
	},
	docente:function(){
		return docenteAEditar.get();
	},
	email:function(){
		return docenteAEditar.get()?.emails[0].address;
	},
	rol:function(){
		return rolDelDocenteAEditar.get();
	}
});
Template.editDocente.events({
	"click .actualiza": function(event){
		let x=document.getElementById("editaDocente");
		let u=docenteAEditar.get();
		u.profile.prefijo=x.prefijo.value;
		u.profile.name=x.nombre.value;
		u.profile.areaDeAdscripcion=x.areaDeAdscripcion.value;
		u.profile.telefono=x.telefono.value;
		u.profile.estado=x.estado.value;
		u.profile.tipo="Docente";
		u.emails[0].address=x.email.value;
		let newRol=""
		try{
			newRol=x.rol.value;
		}catch(error){
			newRol=rolDelDocenteAEditar.get()
		}
		Meteor.call('updateDocente',u,newRol);
		let aviso={encabezado:"Docentes",aviso:"Los cambios han sido registrados",positivo:true}
		Session.set("aviso",aviso)
	}
});
//*************************************************************************************************************************/
//                                      CODIGO DEL TEMPLATE PARA AGREGAR DOCENTES
//*************************************************************************************************************************/
Template.addDocente.events({
	"click .agregar":function(event){
		let x=document.getElementById("addDocenteForm");
		let u={};
		u.username=x.username.value;
		u.password=x.password.value;
		u.email=x.email.value;
		u.profile = {};
		u.profile.prefijo=x.prefijo.value;
		u.profile.name=x.nombre.value;
		u.profile.areaDeAdscripcion=x.areaDeAdscripcion.value;
		u.profile.telefono=x.telefono.value;
		u.profile.estado=x.estado.value;
		u.profile.tipo="Docente";
		Meteor.call('addDocente',u)
		let aviso={encabezado:"Docentes",aviso:`El docente ${u.profile.name} ha sido agregado`,positivo:true}
    	Session.set("aviso",aviso)
	}
})
//*************************************************************************************************************************/
//                                      CODIGO DEL TEMPLATE QUE MUESTRA LOS ROLES
//*************************************************************************************************************************/
Template.roles.helpers({
	roles:function(){
		return roles.get();
	}
});