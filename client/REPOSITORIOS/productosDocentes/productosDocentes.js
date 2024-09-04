import './productosDocentesJefe.html'
import './productosDocentesJefe.js'
import './productosDocentesNoJefe.html'
import './productosDocentesNoJefe.js'
Template.productosDocentes.helpers({
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