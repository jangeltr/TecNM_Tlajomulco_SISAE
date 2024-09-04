//*************************************************************************************************************************/
//                                                          GENERALES
//*************************************************************************************************************************/
periodos = new Mongo.Collection("periodos")
emails = new Mongo.Collection("emails")
materias = new Mongo.Collection("materias")
asignaciones = new Mongo.Collection("asignaciones")
//*************************************************************************************************************************/
//                                                          SISAE
//*************************************************************************************************************************/
actividadExtraescolar = new Mongo.Collection('actividadExtraescolar')
actividadAcademica = new Mongo.Collection('actividadAcademica')
tutorias = new Mongo.Collection("tutorias")
servicioSocial = new Mongo.Collection('servicioSocial')
residencias = new Mongo.Collection("residencias")
informeResidencias = new Mongo.Collection('informeResidencias')
titulacion = new Mongo.Collection('titulacion')
//*************************************************************************************************************************/
//                                                          SAD
//*************************************************************************************************************************/
horarios = new Mongo.Collection("horarios")
reporte1 = new Mongo.Collection("reporte1")
reporte2 = new Mongo.Collection("reporte2")
reporte3 = new Mongo.Collection("reporte3")
reporteFinal = new Mongo.Collection("reporteFinal")
proyectoIndividual = new Mongo.Collection("proyectoIndividual")
constanciaTerminacion = new Mongo.Collection("constanciaTerminacion")
resumenGral = new Mongo.Collection("resumenGral")
avisosSAD = new Mongo.Collection("avisosSAD")
logsSAD = new Mongo.Collection("logsSAD")
//*************************************************************************************************************************/
//                                                          ADMON
//*************************************************************************************************************************/
bitacora = new Mongo.Collection('bitacora')
configuracion  = new Mongo.Collection('configuracion')
areasSisae = new Mongo.Collection('areasSisae')
seguridad = new Mongo.Collection('seguridad')
frases = new Mongo.Collection('frases')