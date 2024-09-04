import './informesResidenciasJefe.html'
import './informesResidenciasJefe.js'
import './informesResidenciasNoJefe.html'
import './informesResidenciasNoJefe.js'
Template.informesResidencias.helpers({
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