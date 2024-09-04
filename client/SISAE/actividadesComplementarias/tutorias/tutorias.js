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
                existo.permisos.forEach((element)=>{
                    if (element.idDocente==Meteor.userId()){
                        Session.set("miPermiso",element.permiso)
                        Session.set("isJefeTutorias",true)
                    }
                })
            }
            else
                Session.set("miPermiso","Sin acceso")
        }
	});
});
Template.sisaeTutorias.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get("isJefeTutorias")||Session.get("isSubAcademico"))
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