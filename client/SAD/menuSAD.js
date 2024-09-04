import './asignacionMaterias.html'
import './asignacionMaterias.js'
import './instrumentaciones.html'
import './instrumentaciones.js'
import './horarioYReportes.html'
import './horarioYReportes.js'
import './horarios.html'
import './horarios.js'
import './reporte1.html'
import './reporte1.js'
import './reporte2.html'
import './reporte2.js'
import './reporte3.html'
import './reporte3.js'
import './reporteF.html'
import './reporteF.js'
import './reportePI.html'
import './reportePI.js'
import './constanciaTerminacion.html'
import './constanciaTerminacion.js'
import './resumen.html'
import './resumen.js'
Template.menuSAD.onCreated(function(){
	this.autorun(() => {
		if (isAdministrador()) Session.set("isAdministrador",true);
		else Session.set("isAdministrador",false);
		if (isSubAcademico()) Session.set("isSubAcademico",true);
		else Session.set("isSubAcademico",false);
		if (isJefeDeptoIngenierias()) Session.set("isJefeDeptoIngenierias",true);
		else Session.set("isJefeDeptoIngenierias",false);
		if (isJefe()) Session.set("isJefe",true);
		else Session.set("isJefe",false);
		if (isDocente()) Session.set("isDocente",true);
		else Session.set("isDocente",false);
	});
});

Template.menuSAD.helpers({
	esJefe:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true;
		else
			return false;
	},
	esDocente:function(){
		return Session.get("isDocente");
	},
	esAdministrador:function(){
		return Session.get("isAdministrador");
	}
});