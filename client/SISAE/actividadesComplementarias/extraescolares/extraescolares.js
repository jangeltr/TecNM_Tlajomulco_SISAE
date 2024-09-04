import './extraescolaresJefe.html';
import './extraescolaresJefe.js';
import './extraescolaresDocente.html';
import './extraescolaresDocente.js';
import './extraescolaresAlumno.html';
import './extraescolaresAlumno.js';
Template.sisaeExtraescolares.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get("isJefeExtraescolares")||Session.get("isSubAcademico"))
            return true;
		else
            return false;
    },
    esDocente:function(){
        return Session.get("isDocente")
    },
    esAlumno:function(){
        return Session.get("isAlumno")
    },
})