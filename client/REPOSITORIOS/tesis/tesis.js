import './tesisJefe.html'
import './tesisJefe.js'
import './tesisNoJefe.html'
import './tesisNoJefe.js'
Template.tesis.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get('isJefeCentroInformacion'))
            return true;
		return false;
    },
    esDocente:function(){
        return Session.get("isDocente")
    },
    esAlumno:function(){
        return Session.get("isAlumno")
    }
})