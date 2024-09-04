//*************************************************************************************************************************/
//                                  PARA OBTENER LA EXTENSION DE LOS ARCHIVOS
//*************************************************************************************************************************/
obtenerExtension=function(fileName){
    return fileName.substring(fileName.lastIndexOf("."))
}
//*************************************************************************************************************************/
//                                  PARA OBTENER LA FECHA LARGA A PARTIR DE UNA new Date()
//*************************************************************************************************************************/
fechaLarga=function(fechaCorta){
    let f = new Date(fechaCorta)
    let month = f.getUTCMonth() + 1; //months from 1-12
    let day = f.getUTCDate()
    let year = f.getUTCFullYear()
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let fe=day+" de "+meses[month-1]+" del año "+year
    return fe;
}
//*************************************************************************************************************************/
//                          PARA PONER LA HORA JUNTO A LA FOTO DE PERFIL Y ESTARLA ACTUALIZANDO 
//*************************************************************************************************************************/
ponerHora=function(elemento){
    setInterval(()=>{
        let time=new Date()
        elemento.innerHTML=time.toLocaleTimeString()
    },1000)
}
//*************************************************************************************************************************/
//                             PARA CONOCER EL ROL DE CADA USUARIO QUE INICIA SESION
//*************************************************************************************************************************/
isJefe = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Director',
    'Subdirector Academico','Depto de Ciencias Básicas',
    'Depto de Ciencias Agropecuarias','Depto de Ingenierias','DEPI'],'SISAE'))
        return true
    return false
}
isSubAcademico = function(){
	if (Roles.userIsInRole(Meteor.userId(),['Subdirector Academico'],'SISAE'))
        return true
    return false
}
isJefeTutorias = function(){
	if (Roles.userIsInRole(Meteor.userId(),['Jefe de Tutorias'],'SISAE'))
        return true
    return false
}
isJefeDeptoIngenierias = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Depto de Ingenierias'],'SISAE'))
        return true
    return false
}
isJefeExtraescolares = function(){
	if (Roles.userIsInRole(Meteor.userId(),['Jefe de Actividades Extraescolares'],'SISAE'))
        return true
    return false
}
isJefeAcademicas = function(){
	if (Roles.userIsInRole(Meteor.userId(),['Jefe de Actividades Academicas'],'SISAE'))
        return true
    return false
}
isJefeServiciosEscolares = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Depto de Servicios Escolares'],'SISAE'))
        return true
    return false
}
isAdministrador = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Administrador'],'SISAE'))
        return true
    return false
}
isDocente = function(){
    if (Meteor.user().profile.tipo=='Docente')
        return true
    return false
}
isAlumno = function(){
    if (Meteor.user().profile.tipo=='Alumno')
        return true
    return false
}
isJejeDeptoGestionTecnologicaVinculacion = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Depto de Gestion Tecnologica y Vinculacion'],'SISAE'))
        return true
    return false
}
isJefeDeptoDivisionEstudiosProfesionales = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Depto Division de Estudios Profesionales'],'SISAE'))
        return true
    return false
}
isJefeDeptoCienciasBasicas = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Depto de Ciencias Básicas'],'SISAE'))
        return true
    return false
}
isJefeDeptoCienciasAgropecuarias = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Depto de Ciencias Agropecuarias'],'SISAE'))
        return true
    return false
}
isJefeCentroInformacion = function(){
    if (Roles.userIsInRole(Meteor.userId(),['Jefe del Centro de Informacion'],'SISAE'))
        return true
    return false
}