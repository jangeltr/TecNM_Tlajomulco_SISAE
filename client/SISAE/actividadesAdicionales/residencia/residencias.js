import './residenciasJefe.html';
import './residenciasJefe.js';
import './residenciasDocente.html';
import './residenciasDocente.js';
import './residenciasAlumno.html';
import './residenciasAlumno.js';
Template.sisaeResidencias.helpers({
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