import './informesResidencias/informesResidencias.html'
import './informesResidencias/informesResidencias.js'
import './productosDocentes/productosDocentes.html'
import './productosDocentes/productosDocentes.js'
import './tesis/tesis.html'
import './tesis/tesis.js'

Template.menuREPOSITORIOS.onCreated(function(){
	this.autorun(() => {
		if (isAdministrador()) Session.set("isAdministrador",true)
		else Session.set("isAdministrador",false)
		if (isSubAcademico()) Session.set("isSubAcademico",true)
		else Session.set("isSubAcademico",false)
		if (isJefeDeptoIngenierias()) Session.set("isJefeDeptoIngenierias",true)
		else Session.set("isJefeDeptoIngenierias",false)
		if (isJefe()) Session.set("isJefe",true)
		else Session.set("isJefe",false)
		if (isJefeTutorias()) Session.set("isJefeTutorias",true)
		else Session.set("isJefeTutorias",false)
		if (isJefeExtraescolares()) Session.set("isJefeExtraescolares",true)
		else Session.set("isJefeExtraescolares",false)
		if (isJefeAcademicas()) Session.set("isJefeAcademicas",true)
		else Session.set("isJefeAcademicas",false)
		if (isDocente()) Session.set("isDocente",true)
		else Session.set("isDocente",false)
		if (isJejeDeptoGestionTecnologicaVinculacion()) Session.set("isJejeDeptoGestionTecnologicaVinculacion",true)
		else Session.set("isJejeDeptoGestionTecnologicaVinculacion",false)
		if (isJefeDeptoDivisionEstudiosProfesionales()) Session.set("isJefeDeptoDivisionEstudiosProfesionales",true)
		else Session.set("isJefeDeptoDivisionEstudiosProfesionales",false)
		if (isJefeDeptoCienciasBasicas()) Session.set("isJefeDeptoCienciasBasicas",true)
		else Session.set("isJefeDeptoCienciasBasicas",false)
		if (isJefeDeptoCienciasAgropecuarias()) Session.set("isJefeDeptoCienciasAgropecuarias",true)
		else Session.set("isJefeDeptoCienciasAgropecuarias",false)
        if (isJefeCentroInformacion()) Session.set('isJefeCentroInformacion',true)
        else Session.set('isJefeCentroInformacion',false)
		if (isAlumno()) {
			Session.set("isAlumno",true)
			let u=Meteor.users.findOne({"_id":Meteor.userId()})
			if (!u.emails){
				alert('No cuentas con una cuenta de correo electrónico, por favor registra una en "Mi Perfil"')
			}
		}
		else Session.set("isAlumno",false)
	})
})

Template.menuREPOSITORIOS.helpers({
	alumno:function(){
		return Session.get("isAlumno")
	}
})