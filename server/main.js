import { Meteor } from 'meteor/meteor';

import './publishes';
import './cuentas';
import './collections'
import './methods'
import './catalogos'

Meteor.startup(() => {
	process.env.MAIL_URL = 'smtps://ead@tlajomulco.tecnm.mx:3adittj86.@smtp.gmail.com:465?tls.rejectUnauthorized=false';
	//process.env.MAIL_URL = 'smtps://sisae@tlajomulco.tecnm.mx:sisae123.@smtp.gmail.com:465?tls.rejectUnauthorized=false';
	if (Meteor.users.find().count()==0){
		Roles.createRole('Alumno');
		catRoles.foreach(function(rol){
			Roles.createRole(rol)
		})
    
		let id=Accounts.createUser({
			username: 'jangeltr',
			email: 'jangeltr@hotmail.com',
			password: 'abc123.',
			profile:{
				name: 'JOSE ANGEL TORRES RANGEL',
				prefijo: 'M.C.',
				areaDeAdscripcion: 'Sub. Academica'
			}
		});
		Roles.addUsersToRoles(id,['Administrador'],'SISAE');
	}
	if (areasSisae.find().count()==0){
		areasSisae.insert({'nombre':'sisaeActComplementariasTutorias'})
		areasSisae.insert({'nombre':'sisaeActComplementariasActExtraescolares'})
		areasSisae.insert({'nombre':'sisaeActComplementariasActAcademicas'})
		areasSisae.insert({'nombre':'sisaeActComplementariasConstancias'})
		areasSisae.insert({'nombre':'sisaeActAdicionalesServicioSocial'})
		areasSisae.insert({'nombre':'sisaeActAdicionalesResidenciaProfesional'})
		areasSisae.insert({'nombre':'sisaeActAdicionalesTitulacion'})
		areasSisae.insert({'nombre':'sisaeEgresados'})
		areasSisae.insert({'nombre':'sadMateriasAsignadas'})
		areasSisae.insert({'nombre':'sadInstrumentaciones'})
		areasSisae.insert({'nombre':'sadHorarios'})
		areasSisae.insert({'nombre':'sadReporte1'})
		areasSisae.insert({'nombre':'sadReporte2'})
		areasSisae.insert({'nombre':'sadReporte3'})
		areasSisae.insert({'nombre':'sadReporteF'})
		areasSisae.insert({'nombre':'sadReportePI'})
		areasSisae.insert({'nombre':'sadConstanciaTerminacion'})
		areasSisae.insert({'nombre':'sadResumen'})
		areasSisae.insert({'nombre':'sadAcademias'})
		areasSisae.insert({'nombre':'reposInformesResidencias'})
		areasSisae.insert({'nombre':'reposTesis'})
		areasSisae.insert({'nombre':'reposProductosDocentes'})
		areasSisae.insert({'nombre':'admonMaterias'})
		areasSisae.insert({'nombre':'admonDocentes'})
		areasSisae.insert({'nombre':'admonAlumnosActivos'})
		areasSisae.insert({'nombre':'admonAlumnosBajas'})
		areasSisae.insert({'nombre':'admonAlumnosAgregar'})
		areasSisae.insert({'nombre':'admonAlumnosAjustes'})
		areasSisae.insert({'nombre':'admonAlumnosBuscar'})
		areasSisae.insert({'nombre':'admonEgresados'})
		areasSisae.insert({'nombre':'admonMovimientos'})
		areasSisae.insert({'nombre':'admonEMails'})
		areasSisae.insert({'nombre':'admonUsuarios'})
		areasSisae.insert({'nombre':'admonConfiguracion'})
	}
	Accounts.config({
		loginExpirationInDays: (1 / 24 / 60) * 30
	});

	/********************************** para migrar a la nueva version de manejo de roles solo ejecutar una ves y despues volver a comentar
	
	Package['alanning:roles'].Roles._forwardMigrate()    //actualizo roles pero no puso documentos en role-assignment
	Package['alanning:roles'].Roles._forwardMigrate2()   //si jalo justo despues de la anterior
	
	Accounts.onLogin(function(){
		console.log('Inicio de sesion');
	})
	Accounts.onLogout(function() {
		console.log('Termino sesion');
	});
	*/
});
