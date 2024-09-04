import './docentes/docentes.html';
import './docentes/docentes.js';
import './materias/materias.html';
import './materias/materias.js';
import './alumnos/alumnos.html';
import './alumnos/alumnos.js';
import './alumnos/bajas.html';
import './alumnos/bajas.js'
import './alumnos/agregarAlumnos.html'
import './alumnos/agregarAlumnos.js'
import './alumnos/ajustes.html'
import './alumnos/ajustes.js'
import './egresados/egresados.html'
import './egresados/egresados.js'
import './usuarios/usuarios.html'
import './usuarios/usuarios.js'
import './movimientos/movimientos.html'
import './movimientos/movimientos.js'
import './configuraciones/configuraciones.html'
import './configuraciones/configuraciones.js'
import './emails/emails.html'
import './emails/emails.js'
Template.menuADMON.onCreated(function(){
	this.autorun(() => {
		if (isAdministrador()) Session.set("isAdministrador",true);
		else Session.set("isAdministrador",false);
		if (isSubAcademico()) Session.set("isSubAcademico",true);
		else Session.set("isSubAcademico",false);
		if (isJefeDeptoIngenierias()) Session.set("isJefeDeptoIngenierias",true);
		else Session.set("isJefeDeptoIngenierias",false);
		if (isJefe()) Session.set("isJefe",true);
		else Session.set("isJefe",false);
		if (isJefeTutorias()) Session.set("isJefeTutorias",true);
		else Session.set("isJefeTutorias",false);
		if (isJefeExtraescolares()) Session.set("isJefeExtraescolares",true);
		else Session.set("isJefeExtraescolares",false);
		if (isJefeAcademicas()) Session.set("isJefeAcademicas",true);
		else Session.set("isJefeAcademicas",false);
		if (isDocente()) Session.set("isDocente",true);
		else Session.set("isDocente",false);
	});
});

Template.menuADMON.helpers({
	esJefe:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true;
		else
			return false;
	},
	esDocente:function(){
		return Session.get("isDocente");
	},
	esAlumno:function(){
		return Session.get("isAlumno");
	},
	esAdministrador:function(){
		return Session.get("isAdministrador");
	}
});