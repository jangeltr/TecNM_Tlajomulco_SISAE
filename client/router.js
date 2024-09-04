//*************************************************************************************************************************/
//                                              RUTA PRINCIPAL DEL SISTEMA
//*************************************************************************************************************************/
FlowRouter.route('/',{
	name:'main',
	action:function(){
		BlazeLayout.render("main",{rellenaMenu:"opciones"});
	}
});
//*************************************************************************************************************************/
//                                              RUTAS DEL MODULO SISAE
//*************************************************************************************************************************/
FlowRouter.route('/sisae',{
	name:'sisae',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"conAcceso"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/miPerfil',{
	name:'sisaeMiPerfil',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"miPerfil"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/docentes',{
	name:'sisaeDocentes',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeDocentes"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/materias',{
	name:'sisaeMaterias',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeMaterias"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/tutorias',{
	name:'sisaeTutorias',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeTutorias"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/tutorias/asigAlumnosTutor',{
	name:'sisaeasigAlumnosTutor',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"asigAlumnosTutor"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/extraescolares',{
	name:'sisaeExtraescolares',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeExtraescolares"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/academicas',{
	name:'sisaeAcademicas',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeAcademicas"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/constanciasActividadesComplementarias',{
	name:'sisaeConstanciasActividadesComplementarias',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeConstanciasActividadesComplementarias"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias',{
	name:'sisaeResidencias',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeResidencias"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/inicio/solicitud',{
	name:'sisaeResidenciasSolicitud',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"solicitudResidenciasAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/inicio/proponerAsesor',{
	name:'sisaeResidenciasProponerAsesor',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"proponerAsesor"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/inicio/anteproyecto',{
	name:'sisaeResidenciasAnteproyecto',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"anteProyectoResidenciasAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/inicio/cartaTerminacionServicioSocial',{
	name:'sisaeResidenciasCartaTerminacionServicioSocial',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"cartaTerminacionServicioSocialEnResidenciasAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/inicio/cartaPresentacion',{
	name:'sisaeResidenciasCartaPresentacion',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"cartaPresentacionResidenciasAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/inicio/cartaAceptacion',{
	name:'sisaeResidenciasCartaAceptacion',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"cartaAceptacionResidenciasAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/seguimiento',{
	name:'sisaeResidenciasSeguimineto',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"seguimientoResidenciasAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/evaluacion/evaluacion1',{
	name:'sisaeResidenciasEvaluacion1',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"evaluacionSeguimientoUnoAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/evaluacion/evaluacion2',{
	name:'sisaeResidenciasEvaluacion2',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"evaluacionSeguimientoDosAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/informeTecnico',{
	name:'sisaeResidenciasInformeTecnico',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"informeTecnicoResidencia"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/evaluacion/evaluacionF',{
	name:'sisaeResidenciasEvaluacionF',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"evaluacionSeguimientoTresAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/residencias/cartaTerminacionResidencia',{
	name:'sisaeCartaTerminacionResidencia',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"cartaTerminacionResidencia"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/servicioSocial',{
	name:'sisaeServivioSocial',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeServicioSocial"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/servicioSocial/inicio/solicitud',{
	name:'sisaeServivioSocialSolicitud',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"solicitudServicioSocialAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sisae/servicioSocial/inicio/cartaCompromiso',{
	name:'sisaeServivioSocialCartaCompromiso',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"cartaCompromisoServicioSocial"});
		}
		else
			FlowRouter.redirect('/')
	}
});
//*************************************************************************************************************************/
//                                          RUTAS DEL MODULO REPOSITORIOS
//*************************************************************************************************************************/
FlowRouter.route('/repositorios',{
	name:'repositorios',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuREPOSITORIOS",rellenaCuerpoSISAE:"conAcceso"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/repositorios/informesResidencias',{
	name:'repositoriosInformesResidencias',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuREPOSITORIOS",rellenaCuerpoSISAE:"informesResidencias"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/repositorios/productosDocentes',{
	name:'repositoriosProductosDocentes',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuREPOSITORIOS",rellenaCuerpoSISAE:"productosDocentes"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/repositorios/tesis',{
	name:'repositoriosTesis',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuREPOSITORIOS",rellenaCuerpoSISAE:"tesis"});
		else
			FlowRouter.redirect('/')
	}
});
//*************************************************************************************************************************/
//                                              RUTAS DEL MODULO SAD
//*************************************************************************************************************************/
FlowRouter.route('/sad',{
	name:'sad',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"conAcceso"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/asignacionMaterias',{
	name:'asignacionMaterias',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"asignacionMaterias"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/instrumentaciones',{
	name:'instrumentaciones',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"instrumentaciones"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/horarioYReportes',{
	name:'horarioYReportes',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"horarioYReportes"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/horarios',{
	name:'horarios',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"horarios"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/reporte1',{
	name:'reporte1',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"reporte1"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/reporte2',{
	name:'reporte2',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"reporte2"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/reporte3',{
	name:'reporte3',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"reporte3"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/reporteF',{
	name:'reporteF',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"reporteF"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/reportePI',{
	name:'reportePI',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"reportePI"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/constanciaTerminacion',{
	name:'constanciaTerminacion',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"constanciaTerminacion"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/sad/resumen',{
	name:'resumen',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuSAD",rellenaCuerpoSISAE:"resumen"});
		else
			FlowRouter.redirect('/')
	}
});
//*************************************************************************************************************************/
//                                              RUTAS DEL MODULO ADMON
//*************************************************************************************************************************/
FlowRouter.route('/admon',{
	name:'admon',
	action:function(){
		if (Meteor.user())
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"conAcceso"});
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/docentes',{
	name:'admonDocentes',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"admonDocentes"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/materias',{
	name:'admonMaterias',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"materias"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/alumnos',{
	name:'admonAlumnos',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"alumnos"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/alumnosBajas',{
	name:'admonAlumnosBajas',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"alumnosBajas"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/agregarAlumnos',{
	name:'admonAgregarAlumnos',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"agregarAlumnos"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/alumnosAjustes',{
	name:'admonAlumnosAjustes',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"alumnosAjustes"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/buscarAlumno',{
	name:'admonBuscarAlumno',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"buscarAlumno"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/egresados',{
	name:'admonEgresados',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"alumnosEgresados"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/movimientos',{
	name:'admonMovimientos',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"movimientos"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/emails',{
	name:'admonEMails',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"emails"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/usuarios',{
	name:'admonUsuarios',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"usuarios"});
		}
		else
			FlowRouter.redirect('/')
	}
});
FlowRouter.route('/admon/configuracion',{
	name:'admonConfiguracion',
	action:function(){
		if (Meteor.user()){
			BlazeLayout.render("main",{rellenaMenu:"menuADMON",rellenaCuerpoSISAE:"configuracion"});
		}
		else
			FlowRouter.redirect('/')
	}
});
//*************************************************************************************************************************/
//                                  RUTAS DESCONOCIDAS LAS REDIRECCIONA A LA RUTA PRINCIPAL
//*************************************************************************************************************************/
FlowRouter.notFound = {
    action: function() {
        FlowRouter.redirect('/')
    }
};
