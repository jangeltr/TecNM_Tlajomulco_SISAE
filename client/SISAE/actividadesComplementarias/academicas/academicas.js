import './academicasJefe.html';
import './academicasJefe.js';
import './academicasDocente.html';
import './academicasDocente.js';
import './academicasAlumno.html';
import './academicasAlumno.js';
Template.sisaeAcademicas.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get("isJefeDeptoIngenierias")||Session.get("isSubAcademico")||Session.get("isJefeDeptoCienciasBasicas")||Session.get("isJefeDeptoCienciasAgropecuarias"))
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