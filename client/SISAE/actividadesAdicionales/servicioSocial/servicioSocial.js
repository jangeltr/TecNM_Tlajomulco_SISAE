import './servicioSocialJefe.html';
import './servicioSocialJefe.js';
import './servicioSocialAlumno.html';
import './servicioSocialAlumno.js';
Template.sisaeServicioSocial.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get("isJefeDeptoIngenierias")||Session.get("isSubAcademico")||
        Session.get("isJefeAcademicas")||Session.get("isJefeDeptoDivisionEstudiosProfesionales")||
        Session.get("isJefeDeptoCienciasAgropecuarias")||Session.get("isJefeDeptoCienciasBasicas"))
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
    esJejeDeptoGestionTecnologicaVinculacion: function(){
        return Session.get("isJejeDeptoGestionTecnologicaVinculacion");
    }
})