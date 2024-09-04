//*************************************************************************************************************************/
//                               VARIABLES CON LAS RUTAS A LOS ARCHIVOS QUE SUBEN
//*************************************************************************************************************************/
let pathGral = `/var/www/html/`;
let pathFotosAlumnos = pathGral + `fotos/alumnos/`;
let pathFotosDocentes = pathGral + `fotos/docentes/`;
///////////////////////////////////SISAE
let pathTutorias = pathGral + `actividadesComplementarias/tutorias/`;
let pathExtraescolares = pathGral + `actividadesComplementarias/extraescolares/`;
let pathAcademicas = pathGral + `actividadesComplementarias/academicas/`
let pathServicioSocial = pathGral + `actividadesAdicionales/servicioSocial/`
let pathResidencias = pathGral + `actividadesAdicionales/residencias/`
let pathTitulacion = pathGral + `actividadesAdicionales/titulacion/`
///////////////////////////////////SAD
let pathMaterias = pathGral + `materias/`
let pathReticulas= pathMaterias + `reticulas/`
let pathInstrumentaciones = pathGral + `planeacion/`
let pathHorarios = pathGral + `horarios/`
let pathR1 = pathGral + `reporte1/`
let pathR2 = pathGral + `reporte2/`
let pathR3 = pathGral + `reporte3/`
let pathRF = pathGral + `reporteFinal/`
let pathPI = pathGral + `proyectoIndividual/`
let pathConstaciaLiberacion = pathGral + `constanciaLiberacion/`
Meteor.methods({
//*************************************************************************************************************************/
//                                                  CARGAR ARCHIVOS
//*************************************************************************************************************************/
    fileUpload: function(fileName,fileData,tipo){
        let path=''
        let exito=false
        switch (tipo){
            case 'materia':
                path = pathMaterias
                Meteor.call('agregarRegistroBitacora','ADMON','materias','Subio programa de materia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'changeReticulaImg':
                path = pathReticulas
                Meteor.call('agregarRegistroBitacora','ADMON','materias','Cambio imagen de la reticula: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'fotoAlumno':
                path = pathFotosAlumnos
                Meteor.call('agregarRegistroBitacora','SISAE','miPerfil','El Alumno actualizo su foto',Meteor.userId(),Meteor.user().profile.name);
                break
            case 'fotoDocente':
                path = pathFotosDocentes
                Meteor.call('agregarRegistroBitacora','SISAE','miPerfil','El Docente actualizo su foto',Meteor.userId(),Meteor.user().profile.name);
                break
            case 'tutoriasPAT':
                path = pathTutorias
                Meteor.call('agregarRegistroBitacora','SISAE','tutorias','Subio Plan de Accion Tutorial: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'tutoriasDI':
                path = pathTutorias;
                Meteor.call('agregarRegistroBitacora','SISAE','tutorias','Subio diagnostico inicial: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'tutoriasRS':
                path = pathTutorias
                Meteor.call('agregarRegistroBitacora','SISAE','tutorias','Subio resporte semestral: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'tutoriasET':
                path = pathTutorias
                Meteor.call('agregarRegistroBitacora','SISAE','tutorias','Subio evidencia de tutoria: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break 
            case 'FichaIdentificacionTutoria':
                path = pathTutorias
                Meteor.call('agregarRegistroBitacora','SISAE','tutorias','Subio su ficha de identificacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'ListaAsistenciaActividadExtraescolar':
                path = pathExtraescolares
                Meteor.call('agregarRegistroBitacora','SISAE','extraescolares','Subio lista de asistencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'ListaAsistenciaActividadAcademica':
                path = pathAcademicas
                Meteor.call('agregarRegistroBitacora','SISAE','academicas','Subio lista de asistencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'ConstanciaTerminacionActividadAcademica':
                path = pathAcademicas
                Meteor.call('agregarRegistroBitacora','SISAE','academicas','Subio constancia de terminacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'ConstanciaTermicacionActividadAcademicaDelDepto':
                path = pathAcademicas
                Meteor.call('agregarRegistroBitacora','SISAE','academicas','Subio constancia de terminacion academica de Depto: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'ConstanciaTermicacionActividadExtraescolarDelDepto':
                path = pathExtraescolares
                Meteor.call('agregarRegistroBitacora','SISAE','academicas','Subio constancia de terminacion extraescolar de Depto: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'ConstanciaTermicacionActividadTutoria':
                path = pathTutorias
                Meteor.call('agregarRegistroBitacora','SISAE','academicas','Subio constancia de terminacion tutorias de Depto: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'SolicitudResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio solicitud de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'AnteproyectoResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio anteproyecto de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaDeTerminacionServicioSocialEnResidencias':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio carta de terminacion del servicio social: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaPresentacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio carta de presentacion de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaPresentacionFirmada':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio carta de presentacion de residencia con firma de recibido: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaAceptacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio carta de aceptacion de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'AsesorInternoResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio oficio de asignacion asesor interno de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaPresentacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio carta de presentacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaAceptacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio carta de aceptacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'PrimeraEvaluacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio primera evaluacion de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'SegundaEvaluacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio la segunda evaluacion de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'TercerEvaluacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio la evaluacion final de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'InformeTecnicoResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio el informe tecnico de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaTerminacionResidencia':
                path = pathResidencias
                Meteor.call('agregarRegistroBitacora','SISAE','residencias','Subio la carta de terminacion de residencia: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'SolicitudServicioSocial':
                path = pathServicioSocial
                Meteor.call('agregarRegistroBitacora','SISAE','servicio social','Subio la solicitud de servicio social: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'CartaCompromisoServicioSocial':
                path = pathServicioSocial
                Meteor.call('agregarRegistroBitacora','SISAE','servicio social','Subio la carta compromiso de servicio social: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'instrumentacion':
                path = pathInstrumentaciones
                Meteor.call('agregarRegistroBitacora','SAD','instrumentaciones','Subio instrumentacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'evidenciaInstrumentacion':
                path = pathInstrumentaciones
                Meteor.call('agregarRegistroBitacora','SAD','instrumentaciones','Subio la evidencia de entrega de instrumentacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'horario':
                path = pathHorarios
                Meteor.call('agregarRegistroBitacora','SAD','horarios','Subio horario: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'horarioSellado':
                path = pathHorarios
                Meteor.call('agregarRegistroBitacora','SAD','horarios','Subio horario sellado: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporte1':
                path = pathR1
                Meteor.call('agregarRegistroBitacora','SAD','reporte1','Subio reporte 1: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporte1Sellado':
                path = pathR1
                Meteor.call('agregarRegistroBitacora','SAD','reporte1','Subio reporte 1 sellado con evidencias: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporte2':
                path = pathR2
                Meteor.call('agregarRegistroBitacora','SAD','reporte2','Subio reporte 2: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporte2Sellado':
                path = pathR2
                Meteor.call('agregarRegistroBitacora','SAD','reporte2','Subio reporte 2 sellado con evidencias: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporte3':
                path = pathR3
                Meteor.call('agregarRegistroBitacora','SAD','reporte3','Subio reporte 3: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporte3Sellado':
                path = pathR3
                Meteor.call('agregarRegistroBitacora','SAD','reporte3','Subio reporte 3 sellado con evidencias: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporteF':
                path = pathRF
                Meteor.call('agregarRegistroBitacora','SAD','reporteFinal','Subio reporte final: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reporteFSellado':
                path = pathRF
                Meteor.call('agregarRegistroBitacora','SAD','reporteFinal','Subio reporte final sellado con evidencias: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'reportePI':
                path = pathPI
                Meteor.call('agregarRegistroBitacora','SAD','proyectoIndividual','Subio reporte de proyectoindividual: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break;
            case 'reportePISellado':
                path = pathPI
                Meteor.call('agregarRegistroBitacora','SAD','proyectoIndividual','Subio reporte de proyectoindividual sellado con evidencias: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
            case 'constanciaTerminacion':
                path = pathConstaciaLiberacion
                Meteor.call('agregarRegistroBitacora','SAD','constanciaTerminacion','Subio constancia de terminacion: '+fileName,Meteor.userId(),Meteor.user().profile.name);
                break
        }
        let fs = Npm.require("fs");
        fs.writeFile(path+fileName,new Buffer.from(fileData),function(err){
            if (err==null) exito=true
        });
        return exito
    },
//*************************************************************************************************************************/
//                                                  ENVIOS DE eMAILS
//*************************************************************************************************************************/
    sendeMail:function(doc){
        Email.send({
            to:doc.to,
            from:doc.from,
            subject:doc.subject,
            text:doc.text
        });
        emails.insert({
            to:doc.to,
            from:doc.from,
            date:new Date(),
            subject:doc.subject,
            text:doc.text
        });
    },
//*************************************************************************************************************************/
//                                                      BITACORA
//*************************************************************************************************************************/
    agregarRegistroBitacora:function(area,seccion, accion, idUser, userName){
        bitacora.insert({
            area,
            seccion,
            accion,
            idUser,
            userName,
            date:new Date()
        });
        // console.log('***********************************************************')
        // console.log(`AREA: ${area} \nSECCION: ${seccion} \nACCION: ${accion} \nPOR: ${userName} \nEN LA FECHA: ${new Date()}`);
        // console.log('***********************************************************')
    },
//*************************************************************************************************************************/
//                                                       ROLES
//*************************************************************************************************************************/
    agregarUsuarioARol:function(idUsuario,rol,scope){
        let usuario=Meteor.users.findOne({_id:idUsuario});
        let rA=Meteor.roleAssignment.findOne({'role._id': 'Administrador'});
        if (rA.user._id!=idUsuario){
            Meteor.roleAssignment.remove({'user._id':idUsuario})
            Roles.addUsersToRoles(idUsuario,[rol],scope);
            Meteor.call('agregarRegistroBitacora','ADMON','Docentes','Se asigno rol a: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
    },
    rolDelUsuario:function(idUsuario){
        try{
            let rol=Meteor.roleAssignment.findOne({ 'user._id': idUsuario}).role._id;
            return rol;
        }catch(err){return null}
    },
    idUsuarioDelRole:function(rol){
        let rA=Meteor.roleAssignment.findOne({ 'role._id': rol})
        if (rA) return rA.user._id;
        else return null
    },
    usuarioDelRole:function(rol){
        let idUser=Meteor.roleAssignment.findOne({ 'role._id': rol}).user._id
        let usuario=Meteor.users.findOne({'_id':idUser})
        return usuario;
        
    },
//*************************************************************************************************************************/
//                                                      USUARIOS
//*************************************************************************************************************************/
    cambieMiFoto:function(){
        Meteor.users.update({_id:Meteor.userId()},{
            $set:{
                'profile.foto':true
            }
        });
    },
    actualizarMiPerfil:function(usuario){
        Meteor.users.update({_id:usuario._id},{
            $set:{
                profile :usuario.profile,
                emails  :usuario.emails
            }
        });
        Meteor.call('agregarRegistroBitacora','SISAE','miPerfil','Se actualizaron datos del usuario: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                  ADMON: DOCENTES
//*************************************************************************************************************************/
    addDocente: function(doc){   
        let id=Accounts.createUser({
            username: doc.username,
            email: doc.email,
            password: doc.password,
            profile:doc.profile
        });
        Roles.addUsersToRoles(id,['Docente'],'SISAE'); 
        Meteor.call('agregarRegistroBitacora','ADMON','Docentes','Agrego nuevo docente: '+doc.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeDocente:function(doc){
        Meteor.users.remove(doc._id);
        Meteor.call('agregarRegistroBitacora','ADMON','Docentes','Se elimno el docente: '+doc.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    updateDocente: function(doc,rol){
        Meteor.users.update({_id:doc._id},{
            $set:{
                profile:doc.profile,
                emails:doc.emails,
            }
        });
        Meteor.call('agregarUsuarioARol',doc._id,rol,'SISAE');
        Meteor.call('agregarRegistroBitacora','ADMON','Docentes','Se actualizaron datos del docente: '+doc.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                   ADMON: MATERIAS
//*************************************************************************************************************************/
    removeMateria:function(idMateria){
        let materia=materias.findOne({_id:idMateria}).nombre;
        materias.remove(idMateria);
        Meteor.call('agregarRegistroBitacora','ADMON','Materia','Se borro la materia: '+materia,Meteor.userId(),Meteor.user().profile.name);
    },
    addMateria:function(materia){
        materias.insert({
            clave:materia.clave,
            nombre:materia.nombre,
            semestre:parseInt(materia.semestre),
            creditos:parseInt(materia.creditos),
            hrsTeoria:parseInt(materia.hrsTeoria),
            hrsPractica:parseInt(materia.hrsPractica),
            departamento:materia.departamento,
            carrera:materia.carrera
        })
        Meteor.call('agregarRegistroBitacora','ADMON','Materia','Se agrego la materia: '+materia.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    updatePathMateria:function(idMateria,pathM){
        let materia=materias.findOne({_id:idMateria}).nombre;
        materias.update(
            {_id: idMateria},
            {
                $set:{
                    path:pathM
                }
            }
        );
        Meteor.call('agregarRegistroBitacora','ADMON','Materia','Se actualizo el programa de la materia: '+materia,Meteor.userId(),Meteor.user().profile.name);
    },
    updateMateria:function(materia){
        materias.update(
            {
                clave: materia.clave,
                carrera: materia.carrera
            },
            {
                $set:{
                    clave:materia.clave,
                    nombre:materia.nombre,
                    semestre:parseInt(materia.semestre),
                    creditos:parseInt(materia.creditos),
                    hrsTeoria:parseInt(materia.hrsTeoria),
                    hrsPractica:parseInt(materia.hrsPractica),
                    departamento:materia.departamento
                }
            }
        );
        Meteor.call('agregarRegistroBitacora','ADMON','Materia','Se actualizaron los datos de la materia: '+materia.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                   ADMON: ALUMNOS
//*************************************************************************************************************************/
    updateAlumno:function(alumno){
        Meteor.users.update({_id:alumno._id},{
            $set:{
                profile:alumno.profile,
                emails:alumno.emails
            }
        });
        Meteor.call('agregarRegistroBitacora','ADMON','Alumnos','Se actualizaron los datos del alumno: '+alumno.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    alumnoEgreso:function(alumno){
        Meteor.users.update({_id:alumno._id},{
            $set:{
                'profile.status':'Egresado',
            }
        });
        Meteor.call('agregarRegistroBitacora','ADMON','Alumnos','Se actualizo el status del alumno: '+alumno.profile.name+' a Egresado',Meteor.userId(),Meteor.user().profile.name);
    },
    alumnoSeTitulo:function(alumno){
        Meteor.users.update({_id:alumno._id},{
            $set:{
                'profile.status':'Titulado',
            }
        });
        Meteor.call('agregarRegistroBitacora','ADMON','Alumnos','Se actualizo el status del alumno: '+alumno.profile.name+' a Titulado',Meteor.userId(),Meteor.user().profile.name);
    },
    addAlumno:function(alumno){
        let correos=[];
        correos.push({"address":alumno.email})
        let id=Accounts.createUser({
            username: alumno.username,
            password: alumno.password,
            profile:{
                name: alumno.nombre,
                carrera: alumno.carrera,
                semestre: alumno.semestre,
                modalidad: alumno.modalidad,
                modulo: alumno.modulo,
                nivelEscolar: alumno.nivelEscolar,
                periodoIngreso: alumno.periodoIngreso,
                fechaNacimiento: alumno.fechaNacimiento,
                sexo: alumno.sexo,
                telefono: alumno.telefono,
                status: 'Activo',
                tipo:'Alumno'
            } 
        });
        Roles.addUsersToRoles(id,['Alumno'],'SISAE');
        Meteor.users.update({_id:id},{
            $set:{
                emails:correos
            }
        });
        Meteor.call('agregarRegistroBitacora','ADMON','Alumnos','Se agrego el alumno: '+alumno.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    getPeriodosIngreso:function(){
        let arr=[];
        Meteor.users.aggregate([{$match:{'profile.periodoIngreso':{$exists:1}}},
                                {$project:{'_id':0,'profile.periodoIngreso':1}},
                                {$group:{_id:{periodo:'$profile.periodoIngreso'},cantidad:{$sum:1}}}]).forEach(element=>{
                                    arr.push({'periodo':element._id.periodo,'cantidad':element.cantidad})
                                })
        arr.sort(function(a,b){
            return a.periodo-b.periodo
        })
        return arr;
    },
    getAlumnosPorSemestre:function(){
        let arr=[];
        Meteor.users.aggregate([{$match:{'profile.semestre':{$exists:1}}},
                                {$project:{'_id':0,'profile.semestre':1}},
                                {$group:{_id:{semestre:'$profile.semestre'},cantidad:{$sum:1}}}]).forEach(element=>{
                                    arr.push({'semestre':element._id.semestre,'cantidad':element.cantidad})
                                })
        arr.sort(function(a,b){
            return a.semestre-b.semestre
        })
        return arr;
    },
    actualizarSemestre:function(periodoIngreso,newSemestre){
        let sem=parseInt(newSemestre)
        Meteor.users.update({'profile.periodoIngreso':periodoIngreso},
            {$set:{
                    'profile.semestre':sem,
                }
            },
            {multi:true});
        Meteor.call('agregarRegistroBitacora',
                    'ADMON',
                    'Alumnos','Se actualizo el semestre para los alumnos que ingresaron en: '+periodoIngreso+", al semetre:"+
                    newSemestre,Meteor.userId(),
                    Meteor.user().profile.name);
    },
    getAlumno:function(nc){
        let r=Meteor.users.findOne({'username':nc})
        return r;
    },
//*************************************************************************************************************************/
//                                                   ADMON: PERIODOS
//*************************************************************************************************************************/
    addPeriodo:function(periodo){
        let nextId=periodos.find({}).count()+1
        periodos.insert({
            periodo,
            id:nextId
        })
        Meteor.call('agregarRegistroBitacora','ADMON','Configuracion','Se agrego el ciclo escolar: '+periodo,Meteor.userId(),Meteor.user().profile.name);
    },
    saveCicloElecto:function(periodo){
        configuracion.update({},{$set:{
            Periodo:periodo
        }})
        Meteor.call('agregarRegistroBitacora','ADMON','Configuracion','Se cambio el ciclo escolar electo',Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                ADMON: CONFIGURACION
//*************************************************************************************************************************/
    saveConfig:function(newIP,newPuerto,newPer){
        configuracion.remove({});
        configuracion.insert({
            IP:newIP,
            Puerto:newPuerto,
            Periodo:newPer
        })
        Meteor.call('agregarRegistroBitacora','ADMON','Configuracion','Se cambio la configuración del Sistema',Meteor.userId(),Meteor.user().profile.name);
    },
    savePermiso:function(idArea,docente,permiso){
        if (seguridad.findOne({'idArea':idArea})){
            seguridad.update({'idArea':idArea},{
                $push:{permisos:{
                    'idDocente':docente._id,
                    'nombre':docente.profile.name,
                    'permiso':permiso
                }}
            })
        }
        else{
            seguridad.insert({
                'idArea':idArea,
                'permisos':[
                    {
                        'idDocente':docente._id,
                        'nombre':docente.profile.name,
                        'permiso':permiso
                    }
                ]
            })
        }
    },
    removePermiso:function(idArea,idDocente){
        seguridad.update({'idArea':idArea},{
            $pull:{permisos:{'idDocente':idDocente}}
        })
    },
    saveFrase:function(frase,autor){
        frases.insert({
            frase,
            autor
        })
    },
//*************************************************************************************************************************/
//                                                   SISAE: TUTORIAS
//*************************************************************************************************************************/
    cantTutorados:function(periodo){
        T=tutorias.aggregate([{$match:{'periodo':periodo}},{$unwind:'$alumnos'}])
        FI=tutorias.aggregate([{$match:{'periodo':periodo}},{$unwind:'$alumnos'},{$match:{'alumnos.fechaFichaIdentificacion':{$exists:true}}}])
        TS=tutorias.aggregate([{$match:{'periodo':periodo}},{$unwind:'$alumnos'},{$match:{'alumnos.terminoTutoriaSemestral':{$exists:true}}}])
        NT=tutorias.aggregate([{$match:{'periodo':periodo}},{$unwind:'$alumnos'},{$match:{'alumnos.motivoNoTermino':{$exists:true}}}])
        D=tutorias.aggregate([{$match:{'periodo':periodo}},{$unwind:'$alumnos'},{$match:{'alumnos.motivoDeserto':{$exists:true}}}])
        tut={}
        tut.tutorados=T.length
        tut.entregaronFI=FI.length
        tut.terminaron=TS.length
        tut.noTerminaron=NT.length
        tut.desertaron=D.length
        return tut
    },
    cantTutoradosPorTutor:function(tutoria){
        tut={}
        try{
            T=tutorias.aggregate([{$match:{'_id':tutoria._id}},{$unwind:'$alumnos'}])
            FI=tutorias.aggregate([{$match:{'_id':tutoria._id}},{$unwind:'$alumnos'},{$match:{'alumnos.fechaFichaIdentificacion':{$exists:true}}}])
            TS=tutorias.aggregate([{$match:{'_id':tutoria._id}},{$unwind:'$alumnos'},{$match:{'alumnos.terminoTutoriaSemestral':{$exists:true}}}])
            NT=tutorias.aggregate([{$match:{'_id':tutoria._id}},{$unwind:'$alumnos'},{$match:{'alumnos.motivoNoTermino':{$exists:true}}}])
            D=tutorias.aggregate([{$match:{'_id':tutoria._id}},{$unwind:'$alumnos'},{$match:{'alumnos.motivoDeserto':{$exists:true}}}])
            tut.tutorados=T.length
            tut.entregaronFI=FI.length
            tut.terminaron=TS.length
            tut.noTerminaron=NT.length
            tut.desertaron=D.length
        }catch(error){
            
        }
        return tut
    },
    copiarTutoriaDeOtroPeriodo: function(dePeriodo,aPeriodo){
        tuts=tutorias.find({periodo:dePeriodo})
        tuts.forEach(function(t){
            tutoria={}
            tutoria.periodo=aPeriodo
            tutoria.propietario=t.propietario
            tutoria.docenteTutor=t.docenteTutor
            tutoria.alumnos=[]
            t.alumnos.forEach(function(a){
                var alumno={}
                alumno._id=a._id
                alumno.nc=a.nc
                alumno.nombre=a.nombre
                tutoria.alumnos.push(alumno)
            })
            tutorias.insert(tutoria)
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se copiaron las tutorias de otro semestre',Meteor.userId(),Meteor.user().profile.name);
    },
    aproboPlanAccionTutorial:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
            $set:{'revisadoPlanAccionTutorial':true}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se aprobo el Plan de accion tutorial: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    rechazoPlanAccionTutorial:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
            $set:{'revisadoPlanAccionTutorial':false}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se rechazo el Plan de accion tutorial: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    aproboDiagnosticoInicial:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
            $set:{'revisadoDiagnosticoInicial':true}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se aprobo el Diagnostico Incial de la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    rechazoDiagnosticoIncial:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
            $set:{'revisadoDiagnosticoInicial':false}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se rechazo el Diagnostico Incial de la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    aproboReporteSemetral:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
			$set:{'revisadoReporteSemestral':true}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se aprobo el Reporte Semestral de la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    rechazoReporteSemetral:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
            $set:{'revisadoReporteSemestral':false}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se rechazo el Reporte Semestral de la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    aproboEvidenciaTutoria:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
			$set:{'revisadoEvidenciaTutoria':true}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se aprobo la Evidencia de la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    rechazoEvidenciaTutoria:function(idTutoria){
        tutorias.update({'_id':idTutoria},{
            $set:{'revisadoEvidenciaTutoria':false}
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se rechazo la Evidencia de la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    removeTutoria: function(idTutoria){
        tutorias.remove({_id:idTutoria})
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se elimino la tutoria: '+idTutoria,Meteor.userId(),Meteor.user().profile.name);
    },
    addTutorAAlumno: function(alumno, tutor){
        Meteor.users.update({_id:alumno._id},{
            $set:{
                'profile.tutor':tutor
            }
        });
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se agrego el tutor: '+tutor+' al alumno: '+alumno.username,Meteor.userId(),Meteor.user().profile.name);
    },
    addAlumnoATutor: function(per, tut, alu){
        if (tutorias.find({periodo:per,propietario:tut._id}).count()==0)
            tutorias.insert({
                periodo:per,
                propietario:tut._id,
                docenteTutor:tut.profile.name,
                alumnos:[{'_id':alu._id,'nc':alu.username,'nombre':alu.profile.name}]
            });
        else
            if (tutorias.find({periodo:per,propietario:tut._id,alumnos:{$elemMatch:{_id:alu._id}}}).count()==0)  //verifico que no tenga ya ese alumno asignado
                tutorias.update({periodo:per,propietario:tut._id},{
                    $push:{alumnos:{'_id':alu._id,'nc':alu.username,'nombre':alu.profile.name}}
                });
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se agrego el alumno: '+alu.username+' al tutor: '+tut.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeTutorAAlumno: function(alumno){
        Meteor.users.update({_id:alumno._id},{
            $unset:{
                'profile.tutor':1
            }
        });
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se elimino el tutor del alumno: '+alumno.username,Meteor.userId(),Meteor.user().profile.name);
    },
    removeAlumnoATutor: function(per, tut, alu){
        tutorias.update({periodo:per,propietario:tut._id},{
            $pull:{alumnos:{'nc':alu.username}}
        })
        tutorias.remove({periodo:per,propietario:tut._id,alumnos:{$size:0}})    //se borra la tutoria de ese docente si queda sin alumnos
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Se elimino el alumno: '+alu.username+' del tutor: '+tut.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    terminoTutoriaSemestral:function(tutoria,idAlumno){
        tutorias.update({'_id':tutoria._id,alumnos:{$elemMatch:{_id:idAlumno}}},{
            $set:{
                'alumnos.$.terminoTutoriaSemestral':true
            }
        })
        Meteor.users.update({'_id':idAlumno},{
            $inc:{
                'profile.semestresConTutoria':1
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Termino la tutoria semetral el alumno: '+idAlumno,Meteor.userId(),Meteor.user().profile.name);
    },
    guardarMotivoNoTerminoTutoria:function(tutoria,ncAlumno,motivo){
        tutorias.update({'_id':tutoria._id,alumnos:{$elemMatch:{nc:ncAlumno}}},{
            $set:{
                'alumnos.$.motivoNoTermino':motivo
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Registro motivo por el que no termino la tutoria el alumno: '+ncAlumno,Meteor.userId(),Meteor.user().profile.name);
    },
    guardarMotivoDesertoTutoria:function(tutoria,ncAlumno,motivo){
        tutorias.update({'_id':tutoria._id,alumnos:{$elemMatch:{nc:ncAlumno}}},{
            $set:{
                'alumnos.$.motivoDeserto':motivo
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Registro el alumno por el que deserto el alumno: '+ncAlumno,Meteor.userId(),Meteor.user().profile.name);
    },
    addEvaluacionTutoria:function(tutoria,alumno,evaluacion,nivelDeDesempeño){
        tutorias.update({_id:tutoria._id,alumnos:{$elemMatch:{_id:alumno._id,nc:alumno.nc}}},{
            $set:{
                'alumnos.$.nivelDeDesempeño':nivelDeDesempeño,
                'alumnos.$.evaluacion':evaluacion
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Tutorias','Registro la evaluacion de la tutoria del alumno: '+alumno._id,Meteor.userId(),Meteor.user().profile.name);
    },
    subiPlanAccionTutorial: function(tutoria,fileName){
        fileName="/actividadesComplementarias/tutorias/"+fileName;
        tutorias.update({'_id':tutoria._id},{
            $set:{
                'fechaPlanAccionTutorial':new Date(),
                'pathPlanAccionTutorial':fileName
            }
        })
    },
    subiDiagnosticoInicial: function(tutoria,fileName){
        fileName="/actividadesComplementarias/tutorias/"+fileName;
        tutorias.update({'_id':tutoria._id},{
            $set:{
                'fechaDiagnosticoInicial':new Date(),
                'pathDiagnosticoInicial':fileName
            }
        })
    },
    subiReporteSemestral: function(tutoria,fileName){
        fileName="/actividadesComplementarias/tutorias/"+fileName;
        tutorias.update({'_id':tutoria._id},{
            $set:{
                'fechaReporteSemestral':new Date(),
                'pathReporteSemestral':fileName
            }
        })
    },
    subiEvidenciaTutoria: function(tutoria,fileName){
        fileName="/actividadesComplementarias/tutorias/"+fileName;
        tutorias.update({'_id':tutoria._id},{
            $set:{
                'fechaEvidenciaTutoria':new Date(),
                'pathEvidenciaTutoria':fileName
            }
        })
    },
    miTutoria: function(ncAlumno){
        let Tuts=[]
        tutorias.find({'alumnos.nc':ncAlumno}).forEach((element) => {
            let T=tutorias.aggregate([{$match:{'_id':element._id}},{$unwind:'$alumnos'},{$match:{'alumnos.nc':ncAlumno}}])
            if (T.length>0)
                Tuts.push(T[0])
        })
        return Tuts;
    },
    subiFichaIdentificacion: function(idTutoria,alumno,fileName){
        fileName="/actividadesComplementarias/tutorias/"+fileName;
        tutorias.update({'_id':idTutoria,alumnos:{$elemMatch:{_id:alumno}}},{
            $set:{
                'alumnos.$.fechaFichaIdentificacion':new Date(),
                'alumnos.$.pathFichaIdentificacion':fileName
            }
        })
    },
    miDocenteTutor:function(nombre){
        return Meteor.users.findOne({'profile.name':nombre})
    },
    subiConstanciaTermicacionActividadTutoria: function(idAlumno,fileName){
        fileName="/actividadesComplementarias/tutorias/"+fileName;
        Meteor.users.update({_id:idAlumno},{
            $set:{
                'profile.constanciaActividadTutorias':fileName
            }
        });
    },
//*************************************************************************************************************************/
//                                            SISAE: ACTIVIDADES EXTRAESCOLARES
//*************************************************************************************************************************/
    addActividadExtraescolar:function(doc){
        actividadExtraescolar.insert({
            periodo:doc.periodo,
            idDocente:doc.idDocente,
            docente:doc.docente,
            modalidad:doc.modalidad,
            actividad:doc.actividad,
            horario:doc.horario,
            sede:doc.sede,
            esSeleccion:doc.esSeleccion,
            alumnos:[]
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Se agrego actividad: '+doc.actividad,Meteor.userId(),Meteor.user().profile.name);
    },
    removeActividadExtraescolar:function(idActividad){
        actividadExtraescolar.remove(idActividad)
        Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Se elimino actividad: '+idActividad,Meteor.userId(),Meteor.user().profile.name);
    },
    subiListaAsistenciaActividadExtraescolar:function(actividad,fileName){
        fileName="actividadesComplementarias\\extraescolares\\"+fileName
        actividadExtraescolar.update({_id:actividad._id},{
            $set:{
                listaAsistencia:fileName,
                fechaListaAsistencia:new Date()
            }
        })
    },
    aceptarAlumnoEnActividadExtraescolar:function(idActividad,idUser,ncUser){
        actividadExtraescolar.update({_id:idActividad,alumnos:{$elemMatch:{_id:idUser._id,nc:ncUser}}},{
            $set:{
                'alumnos.$.aceptado':true
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Acepto en actividad: '+idActividad+' al alumno: '+ncUser,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarAlumnoDeActividadExtraescolar:function(idActividad,idUser,ncUser){
        actividadExtraescolar.update({_id:idActividad,alumnos:{$elemMatch:{_id:idUser._id,nc:ncUser}}},{
            $set:{
                'alumnos.$.aceptado':false
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Rechazo en actividad: '+idActividad+' al alumno: '+ncUser,Meteor.userId(),Meteor.user().profile.name);
    },
    addEvaluacionActividadExtraescolar:function(idActividad,alumno,evaluacion,nivelDeDesempeño){
        actividadExtraescolar.update({_id:idActividad,alumnos:{$elemMatch:{_id:alumno._id,nc:alumno.nc}}},{
            $set:{
                'alumnos.$.nivelDeDesempeño':nivelDeDesempeño,
                'alumnos.$.evaluacion':evaluacion
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Registro la evaluacion del alumno: '+alumno.nc,Meteor.userId(),Meteor.user().profile.name);
    },
    miActividadExtraescolar: function(ncAlumno){
        let ActE=[]
        actividadExtraescolar.find({'alumnos.nc':ncAlumno}).forEach((element) => {
            let AE=actividadExtraescolar.aggregate([{$match:{'_id':element._id}},{$unwind:'$alumnos'},{$match:{'alumnos.nc':ncAlumno,'alumnos.aceptado':true}}])
            AE.forEach((element)=>{
                ActE.push(element)
            })
        })
        return ActE;
    },
    miDocenteInstructor:function(nombre){
        return Meteor.users.findOne({'profile.name':nombre})
    },
    addSolicitudAlumnoToActividadExtraescolar:function(per,u,idActividad){
        let a=actividadExtraescolar.findOne({_id:idActividad,'alumnos._id':u._id});
        let us={};
        us._id=u._id;
        us.nc=u.username;
        us.nombre=u.profile.name;
        us.carrera=u.profile.carrera;
        us.semestre=u.profile.semestre;
        us.sexo=u.profile.sexo;
        us.fechaNacimiento=u.profile.fechaNacimiento;
        us.solicitud=true;
        if (a){
            actividadExtraescolar.update({_id:idActividad},
                {$pull:{
                    alumnos:{'_id':us._id}
                }})
                Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Retiro su solicitud de ingresar a una actividad extraescolar',Meteor.userId(),Meteor.user().profile.name);
            }
        else{
            actividadExtraescolar.update({_id:idActividad},
                {$push:{
                    alumnos:us
                }})
                Meteor.call('agregarRegistroBitacora','SISAE','Extraescolares','Solicito ingresar a una actividad extraescolar: ',Meteor.userId(),Meteor.user().profile.name);
            }
    },
    subiConstanciaTermicacionActividadExtraescolarDelDepto: function(idActividad,idAlumno,fileName){
        fileName="/actividadesComplementarias/extraescolares/"+fileName;
        
        if (Meteor.users.find({$and:[{'_id':idAlumno},{'profile.constanciaActividadExtraescolar1':{$exists:true}}]}).count()>0)
            Meteor.users.update({_id:idAlumno},{
                $set:{
                    'profile.constanciaActividadExtraescolar2':fileName
                }
            })
        else
            Meteor.users.update({_id:idAlumno},{
                $set:{
                    'profile.constanciaActividadExtraescolar1':fileName
                }
            })
            
        actividadExtraescolar.update({'_id':idActividad,alumnos:{$elemMatch:{_id:idAlumno}}},{
            $set:{
                'alumnos.$.fechaConstanciaTerminacionDelDepto':new Date(),
                'alumnos.$.pathConstanciaTerminacionDelDepto':fileName
            }
        })
    },
//*************************************************************************************************************************/
//                                              SISAE: ACTIVIDADES ACADEMICAS
//*************************************************************************************************************************/ 
    addActividadAcademica:function(doc){
        actividadAcademica.insert({
            periodo:doc.periodo,
            idDocente:doc.idDocente,
            docente:doc.docente,
            modalidad:doc.modalidad,
            actividad:doc.actividad,
            horario:doc.horario,
            sede:doc.sede,
            tipo:doc.tipo,
            requiereComprobante:doc.requiereComprobante,
            alumnos:[]
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Se agrego actividad: '+doc.actividad,Meteor.userId(),Meteor.user().profile.name);
    },
    removeActividadAcademica:function(idActividad){
        actividadAcademica.remove(idActividad)
        Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Se elimino actividad: '+idActividad,Meteor.userId(),Meteor.user().profile.name);
    },
    addAlumnoEnActividadAcademica:function(idActividad,alu){
        let a=actividadAcademica.findOne({_id:idActividad,'alumnos._id':alu._id});
        let alumno = Meteor.users.findOne({_id:alu._id})
        let us={};
        us._id=alumno._id;
        us.nc=alumno.username;
        us.nombre=alumno.profile.name;
        us.carrera=alumno.profile.carrera;
        us.semestre=alumno.profile.semestre;
        us.sexo=alumno.profile.sexo;
        us.fechaNacimiento=alumno.profile.fechaNacimiento;
        us.solicitud=true;
        us.aceptado=true;
        if (a){
            actividadAcademica.update({_id:idActividad},
                {$pull:{
                    alumnos:{'_id':us._id}
                }})
                Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Se quito de la actividad academica al alumno: '+alumno.username,Meteor.userId(),Meteor.user().profile.name);
            }
        else{
            actividadAcademica.update({_id:idActividad},
                {$push:{
                    alumnos:us
                }})
                Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Se agrego en actividad academica al alumno: '+alumno.username,Meteor.userId(),Meteor.user().profile.name);
            }
    },
    quitarAlumnoDeActividadAcademica:function(idActividad,idUser,ncUser){
        actividadAcademica.update({_id:idActividad,alumnos:{$elemMatch:{_id:idUser._id,nc:ncUser}}},{
            $set:{
                'alumnos.$.aceptado':false
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Rechazo en actividad: '+idActividad+' al alumno: '+ncUser,Meteor.userId(),Meteor.user().profile.name);
    },
    aceptarAlumnoEnActividadAcademica:function(idActividad,idUser,ncUser){
        actividadAcademica.update({_id:idActividad,alumnos:{$elemMatch:{_id:idUser._id,nc:ncUser}}},{
            $set:{
                'alumnos.$.aceptado':true
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Acepto en actividad: '+idActividad+' al alumno: '+ncUser,Meteor.userId(),Meteor.user().profile.name);
    },
    addEvaluacionActividadAcademica:function(idActividad,alumno,evaluacion,nivelDeDesempeño){
        actividadAcademica.update({_id:idActividad,alumnos:{$elemMatch:{_id:alumno._id,nc:alumno.nc}}},{
            $set:{
                'alumnos.$.nivelDeDesempeño':nivelDeDesempeño,
                'alumnos.$.evaluacion':evaluacion
            }
        })
        Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Registro la evaluacion del alumno: '+alumno.nc,Meteor.userId(),Meteor.user().profile.name);
    },
    subiListaAsistenciaActividadAcademica:function(actividad,fileName){
        fileName="actividadesComplementarias\\academicas\\"+fileName
        actividadAcademica.update({_id:actividad._id},{
            $set:{
                listaAsistencia:fileName,
                fechaListaAsistencia:new Date()
            }
        })
    },
    miActividadAcademica: function(ncAlumno){
        let ActE=[]
        actividadAcademica.find({'alumnos.nc':ncAlumno}).forEach((element) => {
            let AE=actividadAcademica.aggregate([{$match:{'_id':element._id}},{$unwind:'$alumnos'},{$match:{'alumnos.nc':ncAlumno,'alumnos.aceptado':true}}])
            AE.forEach((element)=>{
                ActE.push(element)
            })
        })
        return ActE;
    },
    miDocenteInstructorAcademico:function(nombre){
        return Meteor.users.findOne({'profile.name':nombre})
    },
    addSolicitudAlumnoToActividadAcademica:function(per,u,idActividad){
        let a=actividadAcademica.findOne({_id:idActividad,'alumnos._id':u._id});
        let us={};
        us._id=u._id;
        us.nc=u.username;
        us.nombre=u.profile.name;
        us.carrera=u.profile.carrera;
        us.semestre=u.profile.semestre;
        us.sexo=u.profile.sexo;
        us.fechaNacimiento=u.profile.fechaNacimiento;
        us.solicitud=true;
        if (a){
            actividadAcademica.update({_id:idActividad},
                {$pull:{
                    alumnos:{'_id':us._id}
                }})
                Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Retiro su solicitud de ingresar a una actividad Academica',Meteor.userId(),Meteor.user().profile.name);
            }
        else{
            actividadAcademica.update({_id:idActividad},
                {$push:{
                    alumnos:us
                }})
                Meteor.call('agregarRegistroBitacora','SISAE','Academicas','Solicito ingresar a una actividad Academica',Meteor.userId(),Meteor.user().profile.name);
            }
    },
    subiConstanciaTerminacionActividadAcademica: function(idActividad,idAlumno,fileName){
        fileName="/actividadesComplementarias/academicas/"+fileName;
        actividadAcademica.update({'_id':idActividad,alumnos:{$elemMatch:{_id:idAlumno}}},{
            $set:{
                'alumnos.$.fechaConstanciaTerminacion':new Date(),
                'alumnos.$.pathConstanciaTerminacion':fileName
            }
        })
    },
    subiConstanciaTermicacionActividadAcademicaDelDepto: function(idActividad,idAlumno,fileName){
        fileName="/actividadesComplementarias/academicas/"+fileName;
        Meteor.users.update({_id:idAlumno},{
            $set:{
                'profile.constanciaActividadAcademica':fileName
            }
        });
        actividadAcademica.update({'_id':idActividad,alumnos:{$elemMatch:{_id:idAlumno}}},{
            $set:{
                'alumnos.$.fechaConstanciaTerminacionDelDepto':new Date(),
                'alumnos.$.pathConstanciaTerminacionDelDepto':fileName
            }
        })
    },
//*************************************************************************************************************************/
//                                                     SISAE: RESIDENCIAS
//*************************************************************************************************************************/ 
    addResidenciaProfesional: function(residencia){
        if (residencia._id){
            residencias.update({_id:residencia._id},{$set:{
                solicitud : residencia.solicitud,
                empresa   : residencia.empresa,
                residente : residencia.residente
            }})
            Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Guarde cambios en mi soicitud de residencia',Meteor.userId(),Meteor.user().profile.name);
        }
        else{
            residencias.insert(residencia);
            Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Registre mi solicitud de residencia',Meteor.userId(),Meteor.user().profile.name);
        }
    },
    addAsesorPropuestoResidenciaProfesional: function(residencia,asesorPropuesto){
        if (residencia._id){
            residencias.update({_id:residencia._id},{$set:{
                'solicitud.asesorPropuesto' : asesorPropuesto,
            }})
            Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Guarde mi solicitud de asesor interno propuesto',Meteor.userId(),Meteor.user().profile.name);
        }
    },
    subiSolicitudResidencia: function(residencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:residencia._id},{$set:{
            'expedienteInicio.pathSolicitud':fileName
        }})
    },
    addNumOfCartaPresentacion: function(idResidencia,numOficioCP){
        residencias.update({_id:idResidencia},{$set:{
            'expedienteInicio.numOfCartaPresentacion':numOficioCP
        }})
    },
    subiAnteproyectoResidencia: function(residencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:residencia._id},{$set:{
            'expedienteInicio.pathAnteproyecto':fileName
        }})
    },
    subiCartaPresentacionResidencia: function(residencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:residencia._id},{$set:{
            'expedienteInicio.pathCartaPresentacion':fileName
        }})
    },
    subiCartaPresentacionFirmada: function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteInicio.pathCartaPresentacionFirmada':fileName
        }})
    },
    subiCartaAceptacionResidencia: function(residencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:residencia._id},{$set:{
            'expedienteInicio.pathCartaAceptacion':fileName
        }})
    },
    asignarAsesorInterno: function(idResidencia,idAsesor,nombreAsesor){
        residencias.update({_id:idResidencia},{$set:{
            'asesor._id':idAsesor,
            'asesor.nombre':nombreAsesor
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Asigne asesor interno en residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    subiOficioAsignacionAsesorInternoResidencia: function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'asesor.pathOficioAsignacion':fileName
        }})
    },
    subiCartaDeTerminacionServicioSocialEnResidencias: function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteInicio.pathCartaTerminacionServicioSocial':fileName
        }})
    },
    subiCartaPresentacion:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteInicio.pathCartaPresentacion':fileName
        }})
    },
    updateDictamenResidenciaProfesional:function(idResidencia,dictamen,observaciones){
        residencias.update({_id:idResidencia},{$set:{
            'solicitud.dictamen':dictamen,
            'solicitud.observaciones':observaciones
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Dictaminó anteproyecto de residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    eliminarResidenciaProfesional:function(residencia){
        residencias.remove({_id:residencia._id})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Eliminó la residencia: '+residencia._id+' de: '+residencia.residente.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    subiCartaAceptacionResidencia:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteInicio.pathCartaAceptacion':fileName
        }})
    },
    registrarSeguimientoCronograma:function(idResidencia,seguimiento){
        let planeacion = seguimiento;
        let realizacion = seguimiento;
        residencias.update({_id:idResidencia},{$set:{
            'seguimiento.planeacion':planeacion
        }})
        realizacion.forEach(function(act,index){
            act.semana1=false;
            act.semana2=false;
            act.semana3=false;
            act.semana4=false;
            act.semana5=false;
            act.semana6=false;
            act.semana7=false;
            act.semana8=false;
            act.semana9=false;
            act.semana10=false;
            act.semana11=false;
            act.semana12=false;
            act.semana13=false;
            act.semana14=false;
            act.semana15=false;
            act.semana16=false;
            act.semana17=false;
            act.semana18=false;
        })
        residencias.update({_id:idResidencia},{$set:{
            'seguimiento.realizacion':realizacion
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Registro el seguimiento-cronograma de la residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    registrarRealizacionActividadesResidencia:function(idResidencia,realizacion){
        residencias.update({_id:idResidencia},{$set:{
            'seguimiento.realizacion':realizacion
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Registro la realizacion dce actividades de la residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    registrarFechasSeguimiento:function(periodo,conf){
        let configuracion = conf.configuracion
        let r=residencias.findOne({'configuracion.periodo':periodo})
        if (r){
            residencias.update({'configuracion.periodo':periodo},{$set:{
                configuracion
            }})
        }else{
            residencias.insert(conf)
        }
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Registro las fechas de seguimiento del periodo:'+periodo,Meteor.userId(),Meteor.user().profile.name);
    },
    cambiarTitutoAnteproyectoResidencia: function(idResidencia,nuevoTitulo){
        residencias.update({_id:idResidencia},{$set:{
            'solicitud.nombreProyecto':nuevoTitulo
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Cambio el titulo del anteproyecto de residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    aceptarRechazarPlanActividadesResidencia: function(idResidencia,valorDeChequeo){
        residencias.update({_id:idResidencia},{$set:{
            'seguimiento.planeacionAceptada':valorDeChequeo
        }})
        if (valorDeChequeo)
            Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Acepto el plan de trabajo de anteproyecto de residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
        else
            Meteor.call('agregarRegistroBitacora','SISAE','Residencias','No acepto el plan de trabajo de anteproyecto de residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    registrarVoBoRealizacionResidencia:function(idResidencia,VoBoFecha1,VoBoFecha2,VoBoFecha3){
        residencias.update({_id:idResidencia},{$set:{
            'seguimiento.VoBoFecha1':VoBoFecha1,
            'seguimiento.VoBoFecha2':VoBoFecha2,
            'seguimiento.VoBoFecha3':VoBoFecha3
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Dio VoBo a la realizacion de las activ. de residencia: '+idResidencia,Meteor.userId(),Meteor.user().profile.name);
    },
    registarEvaluacionSeguimientoFecha1:function(idResidencia,evaluacionFecha1){
        residencias.update({_id:idResidencia},{$set:{
            evaluacionFecha1
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias',`Registro evaluacion del 1er seguimiento de la residencia: $(idResidencia)`,Meteor.userId(),Meteor.user().profile.name);
    },
    registarEvaluacionSeguimientoFecha2:function(idResidencia,evaluacionFecha2){
        residencias.update({_id:idResidencia},{$set:{
            evaluacionFecha2
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias',`Registro evaluacion del 2do seguimiento de la residencia: $(idResidencia)`,Meteor.userId(),Meteor.user().profile.name);
    },
    registarEvaluacionSeguimientoFecha3:function(idResidencia,evaluacionFecha3){
        residencias.update({_id:idResidencia},{$set:{
            evaluacionFecha3
        }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias',`Registro evaluacion del 3er seguimiento de la residencia: ${idResidencia}`,Meteor.userId(),Meteor.user().profile.name);
    },
    subiPrimeraEvaluacionResidencia:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteEvaluacion.pathPrimeraEvaluacion':fileName
        }})
    },
    subiSegundaEvaluacionResidencia:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteEvaluacion.pathSegundaEvaluacion':fileName
        }})
    },
    subiTercerEvaluacionResidencia:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteEvaluacion.pathTercerEvaluacion':fileName
        }})
    },
    subiInformeTecnicoResidencia:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'expedienteEvaluacion.pathInformeTecnico':fileName
        }})
        let r=residencias.findOne({_id:idResidencia})
        let ir=informeResidencias.findOne({'nc':r.residente.nc})
        if (!ir){
            informeResidencias.insert({
                'nc':r.residente.nc,
                'nombre':r.residente.nombre,
                'carrera':r.residente.carrera,
                'proyecto':r.solicitud.nombreProyecto,
                'ciclo':r.periodo,
                'numDescargas':0,
                'path':fileName
            })
        }else{
            informeResidencias.update({'nc':ir.nc},{$set:{
                'path':fileName
            }})
        }
    },
    agregarInformeTecnicoResidencias(informe){
        let ir=informeResidencias.findOne({'nc':informe.nc})
        if (!ir){
            informeResidencias.insert({
                'nc':informe.nc,
                'nombre':informe.nombre,
                'carrera':informe.carrera,
                'proyecto':informe.proyecto,
                'ciclo':informe.ciclo,
                'numDescargas':0
            })
            return true
        }
        else{
            return false
        }
    },
    actualizarInformeTecnicoResidencias(informe){
        let ir=informeResidencias.findOne({'nc':informe.nc})
        if (ir){
            informeResidencias.update({'nc':informe.nc},{$set:{
                'nombre':informe.nombre,
                'carrera':informe.carrera,
                'proyecto':informe.proyecto,
                'ciclo':informe.ciclo,
                'numDescargas':0
            }})
            return true
        }
        else{
            return false
        }
    },
    agregueInformeTecnicoResidencias:function(informe,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        informeResidencias.update({'_id':informe._id},{$set:{
            'path':fileName
        }})
    },
    removeInformeTecnicoResidencias:function(informe){
        informeResidencias.remove(informe._id)
    },
    descargueInformeTecnicoResidencias:function(informe){
        informeResidencias.update({'_id':informe._id},{$inc:{
            numDescargas:1
        }})
    },
    registrarDoctosEliminadosExpediente:function(residencia){
        residencias.update({_id:residencia._id},{$set:{
            'expedienteInicio':residencia.expedienteInicio,
            'expedienteEvaluacion':residencia.expedienteEvaluacion
        }})
        if (!residencia.pathCartaTerminacionResidencia)
            residencias.update({_id:residencia._id},{$unset:{
                pathCartaTerminacionResidencia:1
            }})
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias',`Elimino un documento al alumno ${residencia.residente.nc}`,Meteor.userId(),Meteor.user().profile.name);
    },
    subiCartaTerminacionResidencia:function(idResidencia,fileName){
        fileName="/actividadesAdicionales/residencias/"+fileName;
        residencias.update({_id:idResidencia},{$set:{
            'pathCartaTerminacionResidencia':fileName
        }})
    },
    ponerConvenioVigente: function(Res){
        residencias.update({_id:Res._id},
            {$set:{
                'solicitud.convenioVigente':true
            }
        });
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias', 'Registro vigencia de Convenio',Meteor.userId(),Meteor.user().profile.name);
    },
    quitarConvenioVigente: function(Res){
        residencias.update({_id:Res._id},
            {$set:{
                'solicitud.convenioVigente':false
            }
        });
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Quito vigencia de Convenio',Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailResidenciasDocentes:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SISAE','Residencias','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                     SISAE: SERVICIO SOCIAL
//*************************************************************************************************************************/ 
    registrarFechasSeguimientoServicioSocial:function(periodo,conf){
        let configuracion = conf.configuracion
        let r=servicioSocial.findOne({'configuracion.periodo':periodo})
        if (r){
            servicioSocial.update({'configuracion.periodo':periodo},{$set:{
                configuracion
            }})
        }else{
            servicioSocial.insert(conf)
        }
        Meteor.call('agregarRegistroBitacora','SISAE','Servicio Social','Registro las fechas de seguimiento del periodo:'+periodo,Meteor.userId(),Meteor.user().profile.name);

    },
    addServicioSocial: function(SS){
        if (SS._id){
            servicioSocial.update({_id:SS._id},{$set:{
                alumno : SS.alumno,
                programa   : SS.programa
            }})
            Meteor.call('agregarRegistroBitacora','SISAE','Servicio Social','Guarde cambios en mi soicitud de Servivio Social',Meteor.userId(),Meteor.user().profile.name);
        }
        else{
            servicioSocial.insert(SS);
            Meteor.call('agregarRegistroBitacora','SISAE','Servicio Social','Registre mi solicitud de Servicio Social',Meteor.userId(),Meteor.user().profile.name);
        }
    },
    subiSolicitudServicioSocial: function(solicitud,fileName){
        fileName="/actividadesAdicionales/servicioSocial/"+fileName;
        servicioSocial.update({_id:solicitud._id},{$set:{
            'expedienteInicio.pathSolicitud':fileName
        }})
    },
    subiCartaCompromisoServicioSocial: function(solicitud,fileName){
        fileName="/actividadesAdicionales/servicioSocial/"+fileName;
        servicioSocial.update({_id:solicitud._id},{$set:{
            'expedienteInicio.pathCartaCompromiso':fileName
        }})
    },
//*************************************************************************************************************************/
//                                                 SAD: ASIGNACION DE MATERIAS
//*************************************************************************************************************************/
    agregarTodosLosDocentesAsignacionMaterias: function(per){
        Meteor.users.find({"profile.tipo":"Docente","profile.estado":"Activo"},{sort:{"profile.name":1}}).forEach((element)=> {
            asignaciones.insert({
                periodo:per,
                idDocente:element._id,
                docente:element.profile.name,
                materia:[]
            })
        })
        Meteor.call('agregarRegistroBitacora','SAD','Asignacion de materias','Se agregaron todos los docentes activos para asignacion de materias: ',Meteor.userId(),Meteor.user().profile.name);
    },
    agregarDocenteAsignacionMaterias: function(per,doc){
        asignaciones.insert({
            periodo:per,
            idDocente:doc._id,
            docente:doc.profile.name,
            materia:[]
        })
        Meteor.call('agregarRegistroBitacora','SAD','Asignacion de materias','Se agrego para asignacion de materias el docente: '+doc.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeAsignacion:function(asig){
        asignaciones.remove(asig._id);
        Meteor.call('agregarRegistroBitacora','SAD','Asignacion de materias','Se quito de asigancion de materias al docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
    },
    agregarMateriaAsignacionMaterias:function(asig,carr,mat,grupo){
        let mate={'carrera':carr,'id':mat._id,'nombre':mat.nombre,'grupo':grupo,'departamento':mat.departamento}
        asignaciones.update({_id:asig._id},
            {$push:{
                materia:mate
            }})
        Meteor.call('agregarRegistroBitacora','SAD','Asignacion de materias','Se agrego la materia: '+mat.nombre+', al docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarMateriaAsignacionMaterias:function(asig,mat){
        asignaciones.update({_id:asig._id},
            {$pull:{
                materia:{id:mat.id,grupo:mat.grupo}
            }})
        Meteor.call('agregarRegistroBitacora','SAD','Asignacion de materias','Se le quito la materia: '+mat.nombre+', al docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                  SAD: INSTRUMENTACIONES
//*************************************************************************************************************************/
    materiasAsignadas:function(per,depto){
        let materiasAsignadas;
        if (depto=="De todos los Departamentos"){
            materiasAsignadas = asignaciones.aggregate([{$match:{periodo:per}},
                                                        {$unwind:'$materia'},
                                                        {$group:{_id:0,'suma':{$sum:1}}}]);
        }
        else{ 
            materiasAsignadas = asignaciones.aggregate([{$match:{periodo:per}},
                                                        {$unwind:'$materia'},
                                                        {$match:{'materia.departamento':depto}},
                                                        {$group:{_id:0,'suma':{$sum:1}}}]);
        }
        try{
            if (materiasAsignadas) return materiasAsignadas[0].suma;
            else return 0;
        }catch(err){
            return 0;
        }
    },
    gestionesEntregadas:function(per,depto){
        if (depto=="De todos los Departamentos")
            gestionesEntregadas = asignaciones.aggregate([{$match:{periodo:per}},
                                                        {$unwind:'$materia'},
                                                        {$match:{'materia.pathPlaneacion':{$exists: true}}},
                                                        {$group:{_id:0,suma:{$sum:1}}}]);
        else 
            gestionesEntregadas = asignaciones.aggregate([{$match:{periodo:per}},
                                                        {$unwind:'$materia'},
                                                        {$match:{'materia.pathPlaneacion':{$exists: true}}},
                                                        {$match:{'materia.departamento':depto}},
                                                        {$group:{_id:0,suma:{$sum:1}}}]);
        try{
            if (gestionesEntregadas) return gestionesEntregadas[0].suma;
            else return 0;
        }catch(err){
            return 0;
        }
    },
    planeacionRevisada: function(asig,mat,valor){
        asignaciones.update({_id:asig._id,materia:{$elemMatch:{id:mat.id,grupo:mat.grupo}}},{
            $set:{
                'materia.$.revisado':valor
            }
        })
        if (valor)
            Meteor.call('agregarRegistroBitacora','SAD','Instrumentaciones','Reviso y aprobo la instrumentacion de la materia: '+mat.nombre+', del docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
        else
            Meteor.call('agregarRegistroBitacora','SAD','Instrumentaciones','Des-aprobo la instrumentacion de la materia: '+mat.nombre+', del docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
    },
    addInstrumentacion:function(asig,mat,fileName){
        asignaciones.update({_id:asig._id,materia:{$elemMatch:{id:mat.id,grupo:mat.grupo}}},{
            $set:{
                'materia.$.pathPlaneacion':'/planeacion/'+fileName,
                'materia.$.fechaPlaneacion':new Date()
            }
        })
        Meteor.call('agregarRegistroBitacora','SAD','Instrumentaciones','Agrego instrumentacion a la materia: '+mat.nombre+', del docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
    },
    addEvidenciaInstrumentacion:function(asig,mat,fileName){
        asignaciones.update({_id:asig._id,materia:{$elemMatch:{id:mat.id,grupo:mat.grupo}}},{
            $set:{
                'materia.$.pathEvidencia':'/planeacion/'+fileName,
                'materia.$.fechaEvidencia':new Date()
            }
        })
        Meteor.call('agregarRegistroBitacora','SAD','Instrumentaciones','Agrego evidencia de instrumentacion a la materia: '+mat.nombre+', del docente: '+asig.docente,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                         SAD: HORARIOS
//*************************************************************************************************************************/
    addHorario: function(per,usuario,fileName){
        let hor=horarios.findOne({'periodo':per,'nombre':usuario.profile.name})
        if (hor) {
            horarios.remove({'periodo':per,'nombre':usuario.profile.name})
            Meteor.call('agregarRegistroBitacora','SAD','Horarios','Actualizo para revizar horario del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }else{
            Meteor.call('agregarRegistroBitacora','SAD','Horarios','Subio para revizar horario del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
        horarios.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            tipo:"clases",
            path:'/horarios/'+fileName,
            fecha:new Date()
        });
    },
    addDocenteAHorarios: function(per,usuario){
        horarios.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            tipo:"clases"
        });
        Meteor.call('agregarRegistroBitacora','SAD','Horarios','En el periodo: '+per+', Se agrego sin horario el docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    addHorarioSellado: function(per,usuario,fileName){
        horarios.update({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per},
            {$set:{
                    pathFirmado:'/horarios/'+fileName,
                    fechaFirmado:new Date()
                }
            });
        Meteor.call('agregarRegistroBitacora','SAD','Horarios','Subio horario sellado del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeHorario: function(horario){
        horarios.remove(horario._id);
        Meteor.call('agregarRegistroBitacora','SAD','Horarios','En el periodo: '+horario.periodo+', Se elimino al docente: '+horario.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    ponerProyectoIndividual: function(horario){
        horarios.update({_id:horario._id},
            {$set:{
                tieneProyectoIndividual:true
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Horarios','En el periodo: '+horario.periodo+', Se activo PI al docente: '+horario.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarProyectoIndividual: function(horario){
        horarios.update({_id:horario._id},
            {$set:{
                tieneProyectoIndividual:false
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Horarios','En el periodo: '+horario.periodo+', Se desactivo PI al docente: '+horario.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailHorarios:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SAD','Horarios','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                         SAD: REPORTE 1
//*************************************************************************************************************************/
    addReporte1: function(per,usuario,fileName){
        let rep=reporte1.findOne({'periodo':per,'nombre':usuario.profile.name})
        if (rep) {
            reporte1.remove({'periodo':per,'nombre':usuario.profile.name})
            Meteor.call('agregarRegistroBitacora','SAD','Reporte1','Actualizo el reporte 1 del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }else{
            Meteor.call('agregarRegistroBitacora','SAD','Reporte1','Subio para revizar su reporte 1 del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
        reporte1.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            revisado: false,
            path:'/reporte1/'+fileName,
            fecha:new Date()
        })
    },
    addReporte1Sellado: function(per,usuario,fileName){
        reporte1.update({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per},
            {$set:{
                    pathEvidencia:'/reporte1/'+fileName,
                    fechaEvidencia:new Date()
                }
            });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte1','Subio reporte 1 sellado del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    addDocenteAReporte1: function(per,usuario){
        reporte1.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte1','En el periodo: '+per+', Se agrego sin reporte el docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeReporte1: function(reporte){
        reporte1.remove(reporte._id);
        Meteor.call('agregarRegistroBitacora','SAD','Reporte1','En el periodo: '+reporte.periodo+', Se elimino al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    ponerRevisadoReporte1: function(reporte){
        reporte1.update({_id:reporte._id},
            {$set:{
                revisado:true
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte1','En el periodo: '+reporte.periodo+', Se aprobo el R1 al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarRevisadoReporte1: function(reporte){
        reporte1.update({_id:reporte._id},
            {$set:{
                revisado:false
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte1','En el periodo: '+reporte.periodo+', Se rechazo el R1 al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailReporte1:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SAD','Reporte1','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                         SAD: REPORTE 2
//*************************************************************************************************************************/
    addReporte2: function(per,usuario,fileName){
        let rep=reporte2.findOne({'periodo':per,'nombre':usuario.profile.name})
        if (rep) {
            reporte2.remove({'periodo':per,'nombre':usuario.profile.name})
            Meteor.call('agregarRegistroBitacora','SAD','Reporte2','Actualizo el reporte 2 del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }else{
            Meteor.call('agregarRegistroBitacora','SAD','Reporte2','Subio para revizar su reporte 2 del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
        reporte2.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            revisado: false,
            path:'/reporte2/'+fileName,
            fecha:new Date()
        })
    },
    addReporte2Sellado: function(per,usuario,fileName){
        reporte2.update({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per},
            {$set:{
                    pathEvidencia:'/reporte2/'+fileName,
                    fechaEvidencia:new Date()
                }
            });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte2','Subio reporte 2 sellado del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    addDocenteAReporte2: function(per,usuario){
        reporte2.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte2','En el periodo: '+per+', Se agrego sin reporte el docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeReporte2: function(reporte){
        reporte2.remove(reporte._id);
        Meteor.call('agregarRegistroBitacora','SAD','Reporte2','En el periodo: '+reporte.periodo+', Se elimino al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    ponerRevisadoReporte2: function(reporte){
        reporte2.update({_id:reporte._id},
            {$set:{
                revisado:true
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte2','En el periodo: '+reporte.periodo+', Se aprobo el R2 al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarRevisadoReporte2: function(reporte){
        reporte2.update({_id:reporte._id},
            {$set:{
                revisado:false
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte2','En el periodo: '+reporte.periodo+', Se rechazo el R2 al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailReporte2:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SAD','Reporte2','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                         SAD: REPORTE 3
//*************************************************************************************************************************/
    addReporte3: function(per,usuario,fileName){
        let rep=reporte3.findOne({'periodo':per,'nombre':usuario.profile.name})
        if (rep) {
            reporte3.remove({'periodo':per,'nombre':usuario.profile.name})
            Meteor.call('agregarRegistroBitacora','SAD','Reporte3','Actualizo el reporte 3 del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }else{
            Meteor.call('agregarRegistroBitacora','SAD','Reporte3','Subio para revizar su reporte 3 del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
        reporte3.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            revisado: false,
            path:'/reporte3/'+fileName,
            fecha:new Date()
        })
    },
    addReporte3Sellado: function(per,usuario,fileName){
        reporte3.update({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per},
            {$set:{
                    pathEvidencia:'/reporte3/'+fileName,
                    fechaEvidencia:new Date()
                }
            });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte3','Subio reporte 3 sellado del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    addDocenteAReporte3: function(per,usuario){
        reporte3.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte3','En el periodo: '+per+', Se agrego sin reporte el docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeReporte3: function(reporte){
        reporte3.remove(reporte._id);
        Meteor.call('agregarRegistroBitacora','SAD','Reporte3','En el periodo: '+reporte.periodo+', Se elimino al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    ponerRevisadoReporte3: function(reporte){
        reporte3.update({_id:reporte._id},
            {$set:{
                revisado:true
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte3','En el periodo: '+reporte.periodo+', Se aprobo el R3 al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarRevisadoReporte3: function(reporte){
        reporte3.update({_id:reporte._id},
            {$set:{
                revisado:false
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','Reporte3','En el periodo: '+reporte.periodo+', Se rechazo el R3 al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailReporte3:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SAD','Reporte3','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                       SAD: REPORTE FINAL
//*************************************************************************************************************************/
    addReporteF: function(per,usuario,fileName){
        let rep=reporteFinal.findOne({'periodo':per,'nombre':usuario.profile.name})
        if (rep) {
            reporteFinal.remove({'periodo':per,'nombre':usuario.profile.name})
            Meteor.call('agregarRegistroBitacora','SAD','ReporteFinal','Actualizo el reporte final del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }else{
            Meteor.call('agregarRegistroBitacora','SAD','ReporteFinal','Subio para revizar su reporte final del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
        reporteFinal.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            revisado: false,
            path:'/reporteFinal/'+fileName,
            fecha:new Date()
        })
    },
    addReporteFSellado: function(per,usuario,fileName){
        reporteFinal.update({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per},
            {$set:{
                    pathEvidencia:'/reporteFinal/'+fileName,
                    fechaEvidencia:new Date()
                }
            });
        Meteor.call('agregarRegistroBitacora','SAD','ReporteFinal','Subio reporte final sellado del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    addDocenteAReporteF: function(per,usuario){
        reporteFinal.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per
        });
        Meteor.call('agregarRegistroBitacora','SAD','ReporteF','En el periodo: '+per+', Se agrego sin reporte el docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removeReporteF: function(reporte){
        reporteFinal.remove(reporte._id);
        Meteor.call('agregarRegistroBitacora','SAD','ReporteF','En el periodo: '+reporte.periodo+', Se elimino al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    ponerRevisadoReporteF: function(reporte){
        reporteFinal.update({_id:reporte._id},
            {$set:{
                revisado:true
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','ReporteF','En el periodo: '+reporte.periodo+', Se aprobo el RF al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarRevisadoReporteF: function(reporte){
        reporteFinal.update({_id:reporte._id},
            {$set:{
                revisado:false
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','ReporteF','En el periodo: '+reporte.periodo+', Se Se rechazo el RF al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailReporteF:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SAD','ReporteF','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                  SAD: REPORTE PROYECTO INDIVIDUAL
//*************************************************************************************************************************/
    addReportePI: function(per,usuario,fileName){
        let rep=proyectoIndividual.findOne({'periodo':per,'nombre':usuario.profile.name})
        if (rep) {
            proyectoIndividual.remove({'periodo':per,'nombre':usuario.profile.name})
            Meteor.call('agregarRegistroBitacora','SAD','ReportePI','Actualizo el reporte PI del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }else{
            Meteor.call('agregarRegistroBitacora','SAD','ReportePI','Subio para revizar su reporte PI del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
        }
        proyectoIndividual.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per,
            revisado: false,
            path:'/proyectoIndividual/'+fileName,
            fecha:new Date()
        })
    },
    addReportePISellado: function(per,usuario,fileName){
        proyectoIndividual.update({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per},
            {$set:{
                    pathEvidencia:'/proyectoIndividual/'+fileName,
                    fechaEvidencia:new Date()
                }
            });
        Meteor.call('agregarRegistroBitacora','SAD','ReportePI','Subio reporte PI sellado del docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    addDocenteAPI: function(per,usuario){
        proyectoIndividual.insert({
            propietario:usuario._id,
            nombre:usuario.profile.name,
            periodo:per
        });
        Meteor.call('agregarRegistroBitacora','SAD','ProyectoIndividual','En el periodo: '+per+', Se agrego sin reporte el docente: '+usuario.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
    removePI: function(reporte){
        proyectoIndividual.remove(reporte._id);
        Meteor.call('agregarRegistroBitacora','SAD','ProyectoIndividual','En el periodo: '+reporte.periodo+', Se elimino al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    ponerRevisadoPI: function(reporte){
        proyectoIndividual.update({_id:reporte._id},
            {$set:{
                revisado:true
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','ProyectoIndividual','En el periodo: '+reporte.periodo+', Se aprobo el PI al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    quitarRevisadoPI: function(reporte){
        proyectoIndividual.update({_id:reporte._id},
            {$set:{
                revisado:false
            }
        });
        Meteor.call('agregarRegistroBitacora','SAD','ProyectoIndividual','En el periodo: '+reporte.periodo+', Se rechazo el PI al docente: '+reporte.nombre,Meteor.userId(),Meteor.user().profile.name);
    },
    sendeMailPI:function(doc){
        Meteor.call('sendeMail',doc);
        Meteor.call('agregarRegistroBitacora','SAD','ProyectoIndividual','Se envio email de: '+doc.from+', para: '+doc.to,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                   SAD: CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
    addConstanciaTerminacion:function(per,doc,fileName){
        constanciaTerminacion.insert({
            periodo: per,
            idDocente: doc._id,
            nombre: doc.profile.name,
            fecha: new Date(),
            path: '/constanciaLiberacion/'+fileName,
        })
        Meteor.call('agregarRegistroBitacora','SAD','ConstanciaTerminacion','Subio la constancia de terminacion de: '+doc.profile.name,Meteor.userId(),Meteor.user().profile.name);
    },
//*************************************************************************************************************************/
//                                                            SAD: RESUMEN
//*************************************************************************************************************************/
    resumen:function(per){
        //genera la lista de docentes activos (nombre, periodo)
        Meteor.users.aggregate([{$match:{'profile.tipo':'Docente','profile.estado':'Activo'}},{$sort:{nombre:1}},{$project:{'nombre':'$profile.name'}},{$addFields: {"periodo": per}},{$out:'resumenD'}])
        
        //Genera lista de docentes que subieron horario para revision y horario esta firmado (nombre, revisadoH) nombre del docente que subio horario en excel y si lo subio firmado y sellado tendra true en revisadoH
        horarios.aggregate([{$match:{periodo:per}},{$project:{nombre:1,'fechaFirmado':{$cond:['$fechaFirmado',true,false]}}},{$project:{'nombre':1,'revisadoH':'$fechaFirmado'}},{$sort:{nombre:1}},{$out:'resumenH'}]);
        //horarios.aggregate([{$match:{periodo:per}},{$project:{nombre:1}},{$addFields: {"revisadoH":false}},{$sort:{nombre:1}},{$out:'resumenH'}]);

        //genera lista de docentes y el numero de materias asignadas (nombre, A)
        asignaciones.aggregate([{$match:{periodo:per}},{$project:{_id:0,nombre:'$docente',A:{$size:'$materia'}}},{$sort:{nombre:1}},{$out:'resumenA'}]);

        //genera una lista de docentes y un arreglo de documentos donde cada documento tienen la fecha de la planeacion que subio para despues contarlas.
        //aquellas en las que no subio planeacion aperece el arreglo con un documento por materia, pero el documento vacio
        asignaciones.aggregate([{$match:{periodo:per}},{$project:{_id:0,nombre:'$docente','materia.fechaPlaneacion':1}},{$out:'resumenAsig2'}]);

        //actualiza quitando todos los documentos vacios dejando un arreglo vacio en aquellos que no subieron ninguna planeacion
        resumenAsig2.update({},{$pull:{materia:{fechaPlaneacion:{$exists:false}}}},{multi:true});

        //genera una lista de docentes con el numero de instrumentaciones subidas (nombre, I)
        resumenAsig2.aggregate([{$project:{_id:0,nombre:1,I:{$size:'$materia'}}},{$sort:{nombre:1}},{$out:'resumenI'}]);
        
        //genera una lista de docentes y un arreglo de documentos donde cada documento tiene el campo revisado = true, para despues contarlas
        //pero si no tiene revisada la instrumentacion de la materia, el documento del arreglo estara vacio
        asignaciones.aggregate([{$match:{periodo:per}},{$project:{_id:0,nombre:'$docente','materia.revisado':1}},{$sort:{nombre:1}},{$out:'resumenAsig3'}]);

        //actualiza el arreglo de materias quitando los documentos vacios y luego donde revisado = false
        resumenAsig3.update({},{$pull:{'materia':{revisado:{$exists:false}}}},{multi:true})
        resumenAsig3.update({},{$pull:{'materia':{revisado:false}}},{multi:true})
        
        //genera una lista de docentes con el numero de instrumentaciones revisadas (nombre, I)
        resumenAsig3.aggregate([{$project:{_id:0,nombre:1,IR:{$size:'$materia'}}},{$sort:{nombre:1}},{$out:'resumenIR'}]);

        //juntar lista de docentes con numero de instrumentaciones subidas con docentes y numero de instrumentaciones revisadas (nombre, I, IR)
        resumenI.aggregate([{$lookup:{from:'resumenIR', localField:'nombre',foreignField:'nombre',as:'fromResumenIR'}},{$unwind:'$fromResumenIR'},{$project:{nombre:1,I:1,IR:'$fromResumenIR.IR'}},{$out:'resumenISR'}])


        reporte1.aggregate([{$match:{periodo:per}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenR1'}]);
        reporte1.aggregate([{$match:{periodo:per,revisado:true,pathEvidencia:{$exists:true}}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenR1R'}]);

        reporte2.aggregate([{$match:{periodo:per}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenR2'}]);
        reporte2.aggregate([{$match:{periodo:per,revisado:true,pathEvidencia:{$exists:true}}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenR2R'}]);
        
        reporte3.aggregate([{$match:{periodo:per}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenR3'}]);
        reporte3.aggregate([{$match:{periodo:per,revisado:true,pathEvidencia:{$exists:true}}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenR3R'}]);
        
        reporteFinal.aggregate([{$match:{periodo:per}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenRF'}]);
        reporteFinal.aggregate([{$match:{periodo:per,revisado:true,pathEvidencia:{$exists:true}}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenRFR'}]);
        
        proyectoIndividual.aggregate([{$match:{periodo:per}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenPI'}]);
        proyectoIndividual.aggregate([{$match:{periodo:per,revisado:true,pathEvidencia:{$exists:true}}},{$project:{nombre:1}},{$sort:{nombre:1}},{$out:'resumenPIR'}]);
        
        //combinado de datos
        resumenD.aggregate([{$lookup:{from:'resumenH',localField:'nombre',foreignField:'nombre',as:'fromResumenH'}},{$project:{periodo:1,nombre:1,H:{$size:'$fromResumenH'},HR:{$arrayElemAt:['$fromResumenH.revisadoH',0]}}},
        {$lookup:{from:'resumenA',localField:'nombre',foreignField:'nombre',as:'fromResumenA'}},{$unwind:'$fromResumenA'},{$project:{_id:0,periodo:1,nombre:1,H:1,HR:1,A:'$fromResumenA.A'}},
        {$lookup:{from:'resumenISR',localField:'nombre',foreignField:'nombre',as:'fromResumenI'}},{$unwind:'$fromResumenI'},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:'$fromResumenI.I',IR:'$fromResumenI.IR'}},
        {$lookup:{from:'resumenR1',localField:'nombre',foreignField:'nombre',as:'fromResumenR1'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:{$size:'$fromResumenR1'}}},
        {$lookup:{from:'resumenR1R',localField:'nombre',foreignField:'nombre',as:'fromResumenR1R'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:{$size:'$fromResumenR1R'}}},
        {$lookup:{from:'resumenR2',localField:'nombre',foreignField:'nombre',as:'fromResumenR2'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:{$size:'$fromResumenR2'}}},
        {$lookup:{from:'resumenR2R',localField:'nombre',foreignField:'nombre',as:'fromResumenR2R'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:{$size:'$fromResumenR2R'}}},
        {$lookup:{from:'resumenR3',localField:'nombre',foreignField:'nombre',as:'fromResumenR3'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:1,R3:{$size:'$fromResumenR3'}}},
        {$lookup:{from:'resumenR3R',localField:'nombre',foreignField:'nombre',as:'fromResumenR3R'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:1,R3:1,R3R:{$size:'$fromResumenR3R'}}},
        {$lookup:{from:'resumenRF',localField:'nombre',foreignField:'nombre',as:'fromResumenRF'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:1,R3:1,R3R:1,RF:{$size:'$fromResumenRF'}}},
        {$lookup:{from:'resumenRFR',localField:'nombre',foreignField:'nombre',as:'fromResumenRFR'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:1,R3:1,R3R:1,RF:1,RFR:{$size:'$fromResumenRFR'}}},
        {$lookup:{from:'resumenPI',localField:'nombre',foreignField:'nombre',as:'fromResumenPI'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:1,R3:1,R3R:1,RF:1,RFR:1,PI:{$size:'$fromResumenPI'}}},
        {$lookup:{from:'resumenPIR',localField:'nombre',foreignField:'nombre',as:'fromResumenPIR'}},{$project:{periodo:1,nombre:1,H:1,HR:1,A:1,I:1,IR:1,R1:1,R1R:1,R2:1,R2R:1,R3:1,R3R:1,RF:1,RFR:1,PI:1,PIR:{$size:'$fromResumenPIR'}}},
        {$out:'resumenGral'}]);
    },
});