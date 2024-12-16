import './tutoriasJefe.html';
import './tutoriasJefe.js';
import './tutoriasDocente.html';
import './tutoriasDocente.js';
import './tutoriasAlumno.html';
import './tutoriasAlumno.js';
Template.sisaeTutorias.onCreated(function(){
	this.autorun(() => {
		this.subscribe('seguridadByAreaName','sisaeActComplementariasTutorias')
        if(this.subscriptionsReady()){
            let existo = seguridad.findOne({'permisos.idDocente':Meteor.userId()})
            if (existo){
                Session.set("isJefeTutorias",true) //temporal, se debe cambiar de acuerdo al permiso
                existo.permisos.forEach((element)=>{
                    if (element.idDocente==Meteor.userId()) Session.set("miPermiso",element.permiso)
                })
            }
            else
                Session.set("miPermiso","Sin acceso")
        }
	})
});
Template.sisaeTutorias.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get("isSubAcademico")||Session.get("isJefeTutorias"))
            return true
        return false
    },
    esDocente:function(){
        return Session.get("isDocente")
    },
    esAlumno:function(){
        return Session.get("isAlumno")
    },
})