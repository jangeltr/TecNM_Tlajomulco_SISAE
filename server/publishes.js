//*************************************************************************************************************************/
//                              PARA TENER ACCESO AL ROL DE CADA USUARIO CONECTADO
//*************************************************************************************************************************/
Meteor.publish(null, function () {
    if (this.userId) {
        return Meteor.roleAssignment.find({ 'user._id': this.userId });
    } else {
        this.ready()
    }
})
//*************************************************************************************************************************/
//                                              PARA DOCENTES
//*************************************************************************************************************************/
Meteor.publish('docentes',function(){
    Counts.publish(this, 'docentesCount',Meteor.users.find({"profile.tipo":"Docente","profile.estado":"Activo"}),{
        noReady: true
    });
    return Meteor.users.find({"profile.tipo":"Docente"},{
        sort:{"profile.name":1}});
});
Meteor.publish('docentesActivos',function(){
    Counts.publish(this, 'docentesCount',Meteor.users.find({"profile.tipo":"Docente","profile.estado":"Activo"}),{
        noReady: true
    });
    return Meteor.users.find({"profile.tipo":"Docente","profile.estado":"Activo"},{
        sort:{"profile.name":1}});
});
Meteor.publish('roles',function(){
    return Meteor.roles.find({});
});
//*************************************************************************************************************************/
//                                               PARA ALUMNOS
//*************************************************************************************************************************/
Meteor.publish('alumnos',function(carr,sem,modalidad,modulo,status){
    Counts.publish(this, 'alumnosCount',Meteor.users.find({"profile.tipo":"Alumno","profile.carrera":carr,"profile.semestre":sem,"profile.modalidad":modalidad,"profile.modulo":modulo,"profile.status":status}),{
        noReady: true
    });
    return Meteor.users.find({"profile.tipo":"Alumno","profile.carrera":carr,"profile.semestre":sem,"profile.modalidad":modalidad,"profile.modulo":modulo,"profile.status":'Activo'},{
        sort:{"profile.name":1}});
});
Meteor.publish('bajas',function(carr,modalidad,modulo){
    return Meteor.users.find({"profile.tipo":"Alumno","profile.carrera":carr,"profile.modalidad":modalidad,"profile.modulo":modulo,
        $and:[{"profile.status":{$ne:'Activo'}},{"profile.status":{$ne:'Egresado'}},{"profile.status":{$ne:'Titulado'}}]},{
        sort:{"profile.name":1}});
});
Meteor.publish('egresados',function(carr,modalidad,modulo){
    return Meteor.users.find({"profile.tipo":"Alumno","profile.carrera":carr,"profile.modalidad":modalidad,"profile.modulo":modulo,
        $or:[{"profile.status":'Egresado'},{"profile.status":'Titulado'}]},{
        sort:{"profile.name":1}});
});
Meteor.publish('alumno',function(nc){
    return Meteor.users.find({"profile.tipo":"Alumno",'username':nc})
})
//*************************************************************************************************************************/
//                                               PARA MATERIAS
//*************************************************************************************************************************/
Meteor.publish('materias',function(carr){
	Counts.publish(this, 'materiasCount',materias.find({carrera:carr}),{
        noReady: true
    });
    return materias.find({carrera:carr},{
        sort:{semestre:1,nombre:1}
    });
});
//*************************************************************************************************************************/
//                                                  PERIODOS
//*************************************************************************************************************************/
Meteor.publish('periodos',function(){
    return periodos.find({},{sort:{id:-1}});
});
//*************************************************************************************************************************/
//                                              ADMON: BITACORA
//*************************************************************************************************************************/
Meteor.publish('bitacora',function(area,start,end){
    return bitacora.find({$and:[{'area':area},{'date':{$gte:start}},{'date':{$lte:end}}]});
});
//*************************************************************************************************************************/
//                                              ADMON: eMAILS
//*************************************************************************************************************************/
Meteor.publish('emails',function(from,start,end){
    return emails.find({$and:[{'from':from},{'date':{$gte:start}},{'date':{$lte:end}}]});
});
//*************************************************************************************************************************/
//                                        ADMON: USUARIOS CONECTADOS
//*************************************************************************************************************************/
Meteor.publish('usuariosOnLine',function(){
    return Meteor.users.find({"status.online":true});
});
//*************************************************************************************************************************/
//                                          ADMON: CONFIGURACION
//*************************************************************************************************************************/
Meteor.publish('configuracion',function(){
    return configuracion.find({});
});
Meteor.publish('areasSisae',function(){
    return areasSisae.find({},{sort:{nombre:1}});
});
Meteor.publish('seguridad',function(idAreaSisae){
    return seguridad.find({'idArea':idAreaSisae});
});
Meteor.publish('seguridadByAreaName',function(areaName){
    let area = areasSisae.findOne({'nombre':areaName})
    if (area)
        return seguridad.find({'idArea':area._id})
    return null
});
Meteor.publish('frases',function(){
    let max = frases.find({}).count()
    const random = () => Math.floor(Math.random()*(max))
    return frases.find({},{skip:random(), limit:1})
});
//*************************************************************************************************************************/
//                                              SISAE: TUTORIAS
//*************************************************************************************************************************/
Meteor.publish('tutorias',function(per){
    Counts.publish(this, 'tutoriasCount',tutorias.find({periodo:per}),{
        noReady: true
    });
    return tutorias.find({periodo:per},{
        sort:{docenteTutor:1}
    });
});
Meteor.publish('misTutorias',function(prop,per){
    return tutorias.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                            SISAE: EXTRAESCOLARES
//*************************************************************************************************************************/
Meteor.publish('actividadExtraescolar',function(per){
    return actividadExtraescolar.find({periodo:per})
})
Meteor.publish('miActividadExtraescolar',function(per,idUsuario){
    return actividadExtraescolar.find({periodo:per,idDocente:idUsuario})
})
//*************************************************************************************************************************/
//                                               SISAE: ACADEMICAS
//*************************************************************************************************************************/
Meteor.publish('actividadAcademica',function(per){
    return actividadAcademica.find({periodo:per})
})
Meteor.publish('miActividadAcademica',function(per,idUsuario){
    return actividadAcademica.find({periodo:per,idDocente:idUsuario})
})
//*************************************************************************************************************************/
//                                               SISAE: RESIDENCIAS
//*************************************************************************************************************************/
Meteor.publish('residencias',function(per){
    return residencias.find({periodo:per})
})
Meteor.publish('miResidencia',function(per,idAlumno){
    return residencias.find({periodo:per,'residente._id':idAlumno})
})
Meteor.publish('misResidenciasAsesoradas',function(per,idDocente){
    return residencias.find({periodo:per,'asesor._id':idDocente})
})
Meteor.publish('configuracionResidencias',function(per){
    return residencias.find({'configuracion.periodo':per})
})
//*************************************************************************************************************************/
//                                             SISAE: SERVICIO SOCIAL
//*************************************************************************************************************************/
Meteor.publish('servicioSocial',function(per){
    return servicioSocial.find({periodo:per})
})
Meteor.publish('miServicioSocial',function(per,idAlumno){
    return servicioSocial.find({periodo:per,'alumno._id':idAlumno})
})
Meteor.publish('configuracionServicioSocial',function(per){
    return servicioSocial.find({'configuracion.periodo':per})
})
//*************************************************************************************************************************/
//                                      REPOSITORIOS: INFORMES DE RESIDENCIAS
//*************************************************************************************************************************/
Meteor.publish('informeResidencias',function(per,carr){
    return informeResidencias.find({ciclo:per, carrera:carr})
})
//*************************************************************************************************************************/
//                                  SAD: ASIGNACION DE MATERIAS - INSTRUMENTACIONES
//*************************************************************************************************************************/
Meteor.publish('asignaciones',function(per){
    Counts.publish(this, 'AsignacionMateriasCount',asignaciones.find({periodo:per}),{
        noReady: true
    });
    return asignaciones.find({periodo:per},{
            sort:{docente:1}
    });
});
Meteor.publish('materiasEnDe',function(ciclo,user){
    let arr = [];
    let asig = asignaciones.findOne({periodo:ciclo,docente:user});
    if (asig){
        let len  = asig.materia.length;
        for (x=0;x<len;x++) {
            mat = materias.findOne({"_id":asig.materia[x].id})
            arr.push(mat._id);
        }
    }
    return materias.find({_id:{$in:arr}},{sort:{nombre:1}}); 
});
Meteor.publish('asignacionesEnDe',function(per,docen){
    return asignaciones.find({periodo:per,docente:docen});
});
//*************************************************************************************************************************/
//                                                  SAD: HORARIOS
//*************************************************************************************************************************/
Meteor.publish('horarios',function(per){
    Counts.publish(this, 'HorariosCount',horarios.find({periodo:per}),{
        noReady: true
    });
    return horarios.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miHorario',function(prop,per){
    Counts.publish(this, 'HorariosCount',horarios.find({periodo:per}),{
        noReady: true
    });
    return horarios.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                                  SAD: REPORTE 1
//*************************************************************************************************************************/
Meteor.publish('reporte1',function(per){
    Counts.publish(this, 'reporte1Count',reporte1.find({periodo:per}),{
        noReady: true
    });
    return reporte1.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miReporte1',function(prop,per){
    Counts.publish(this, 'reporte1Count',reporte1.find({periodo:per}),{
        noReady: true
    });
    return reporte1.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                                  SAD: REPORTE 2
//*************************************************************************************************************************/
Meteor.publish('reporte2',function(per){
    Counts.publish(this, 'reporte2Count',reporte2.find({periodo:per}),{
        noReady: true
    });
    return reporte2.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miReporte2',function(prop,per){
    Counts.publish(this, 'reporte2Count',reporte2.find({periodo:per}),{
        noReady: true
    });
    return reporte2.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                                  SAD: REPORTE 3
//*************************************************************************************************************************/
Meteor.publish('reporte3',function(per){
    Counts.publish(this, 'reporte3Count',reporte3.find({periodo:per}),{
        noReady: true
    });
    return reporte3.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miReporte3',function(prop,per){
    Counts.publish(this, 'reporte3Count',reporte3.find({periodo:per}),{
        noReady: true
    });
    return reporte3.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                                SAD: REPORTE FINAL
//*************************************************************************************************************************/
Meteor.publish('reporteFinal',function(per){
    Counts.publish(this, 'reporteFinalCount',reporteFinal.find({periodo:per}),{
        noReady: true
    });
    return reporteFinal.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miReporteFinal',function(prop,per){
    Counts.publish(this, 'reporteFinalCount',reporteFinal.find({periodo:per}),{
        noReady: true
    });
    return reporteFinal.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                         SAD: REPORTE DE PROYECTO INDIVIDUAL
//*************************************************************************************************************************/
Meteor.publish('proyectoIndividual',function(per){
    Counts.publish(this, 'proyectoIndividualCount',proyectoIndividual.find({periodo:per}),{
        noReady: true
    });
    return proyectoIndividual.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miProyectoIndividual',function(prop,per){
    Counts.publish(this, 'proyectoIndividualCount',proyectoIndividual.find({periodo:per}),{
        noReady: true
    });
    return proyectoIndividual.find({propietario:prop,periodo:per});
});
//*************************************************************************************************************************/
//                                           SAD: CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
Meteor.publish('constanciaTerminacion',function(per){
    Counts.publish(this, 'constanciaTerminacionCount',constanciaTerminacion.find({periodo:per}),{
        noReady: true
    });
    return constanciaTerminacion.find({periodo:per},{
        sort:{nombre:1}
    });
});
Meteor.publish('miConstanciaTerminacion',function(idDoc,per){
    return constanciaTerminacion.find({idDocente:idDoc,periodo:per});
});
//*************************************************************************************************************************/
//                                                 SAD: RESUMEN GENERAL
//*************************************************************************************************************************/
Meteor.publish('resumenGral',function(per){
    return resumenGral.find({periodo:per},{
        sort:{nombre:1}
    });
});