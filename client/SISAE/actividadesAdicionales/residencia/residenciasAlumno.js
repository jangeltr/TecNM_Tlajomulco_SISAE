let miResidencia = new ReactiveVar()
let subioSolicitudResidencia = new ReactiveVar()
let subioAnteproyectoResidencia = new ReactiveVar()
let subioCartaPresentacionResidencia = new ReactiveVar()
let subioCartaDeAceptacionResidencia = new ReactiveVar()
let subioCartaDeTerminacionServicioSocial = new ReactiveVar()
let subioCartaDePresentacionFirmada = new ReactiveVar()
let subioPrimeraEvaluacionResidencia = new ReactiveVar()
let subioSegundaEvaluacionResidencia = new ReactiveVar()
let subioTercerEvaluacionResidencia = new ReactiveVar()
let subioInformeTecnicoResidencia = new ReactiveVar() 
let subioCartaTerminacionResidencia = new ReactiveVar()
let docenteJefeDivEstudiosProfesionales = new ReactiveVar()
let docenteCoordinadorCarrera = new ReactiveVar()
let asignoJefeDivEstudiosProfesionales = new ReactiveVar(false)
let asignoCoordinadorCarrera = new ReactiveVar(false)
let actividadesEnCronograma = new ReactiveVar([])
let actividadesRealizadas = new ReactiveVar([])
let actividades = new ReactiveVar([])
let configuracion = new ReactiveVar()
let resultadosEvaluacion = new ReactiveVar([])
let nombreJefeDeptoVinculacion = new ReactiveVar('');
//*************************************************************************************************************************/
//                                 CODIGO DE LA BARRA DE HERRAMIENTAS DE RESIDENCIAS ALUMNO
//*************************************************************************************************************************/
Template.toolBoxResidenciasAlumno.events({
    
});
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA SOLICITUD DE RESIDENCIAS ALUMNO
//*************************************************************************************************************************/
Template.solicitudResidenciasAlumno.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('docentesActivos');
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            if (miResidencia.get()?.solicitud?.jefeDivisionEstudiosProfesionales)
                docenteJefeDivEstudiosProfesionales.set(miResidencia.get()?.solicitud?.jefeDivisionEstudiosProfesionales);
            if (miResidencia.get()?.solicitud.coordinadorCarrera)
                docenteCoordinadorCarrera.set(miResidencia.get()?.solicitud?.coordinadorCarrera);
		}
	});
});
Template.solicitudResidenciasAlumno.helpers({
    periodo: function(){
        return Session.get("periodo");
    },
    username: function(){
        return Meteor.user().username;
    },
    nombre: function(){
        if (Meteor.user()?.profile?.name)
            return Meteor.user().profile.name
        return ""
    },
    carrera: function(){
        if (Meteor.user()?.profile?.carrera)
            return Meteor.user().profile.carrera
        return ""
    },
    email: function(){
        if (Meteor.user()?.emails)
            return Meteor.user().emails[0].address;
        else
            return 'No ha registrado un correo electrónico en su cuenta (POR FAVOR VALLA A "MI PERFIL" Y REGISTRE UNO)'
    },
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get();
        return null;
    },
    fecha: function(){
        if (miResidencia.get()?.solicitud) 
            return miResidencia.get().solicitud.fecha; 
        else {
            let f = new Date();
            return f;
        }
    },
    esDeBancoDeProyectos: function(){
        if (miResidencia.get()?.solicitud) 
            return miResidencia.get().solicitud.esDelBancoDeProyectos;
        return true
    },
    esPropuestaPropia: function(){
        if (miResidencia.get()?.solicitud) 
            return miResidencia.get().solicitud.esDePropuestaPropia;
        return false
    },
    eresTrabajadorDeLaEmpresa: function(){
        if (miResidencia.get()?.solicitud) 
            return miResidencia.get().solicitud.eresTrabajadorDeLaEmpresa;
        return false
    },
    numResidentesDelProyecto: function(){
        if (miResidencia.get()?.solicitud) 
            return miResidencia.get().solicitud.numResidentesEnProyecto;
        return 1
    },
    jefeDivisionEstudiosProfesionales: function(){
        return docenteJefeDivEstudiosProfesionales.get();
    },
    coordinadorCarrera: function(){
        return docenteCoordinadorCarrera.get();
    },
    tieneRegistradaSolicitud: function(){
        if (residencias.find().count()>0)
            return true;
        return false;
    },
    seAceptoSolictud: function(){
        if (miResidencia.get()?.solicitud?.dictamen=='Aceptado')
            return true
        return false
    },
    yaSubioSolicitud: function(){
        if (miResidencia.get()?.expedienteInicio?.pathSolicitud)
            return true
        return false
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
}); 
Template.solicitudResidenciasAlumno.events({
    "click .imprimirSolicitud":function(){
		BlazeLayout.render("impresion",{rellena2:"vistaPreviaSolicitudResidenciaAlumno"});
	},
    "click .agregar":function(event){
        let doc=document.getElementById("solicitudresidenciaForm");
        let residencia = {};
        if (doc.jefeDEP.value && doc.coordinadorCarrera.value){
            asignoJefeDivEstudiosProfesionales.set(true)
            asignoCoordinadorCarrera.set(true)
        }
        if (!Meteor.user().emails){
            let aviso={encabezado:"Error",aviso:'No cuentas con una cuenta de correo electrónico, por favor registralo en "Mi perfil"',positivo:false}
            Session.set("aviso",aviso)
        }
        else{
            if (asignoJefeDivEstudiosProfesionales.get() && asignoCoordinadorCarrera.get()){
                
                if (residencias.find().count()>0)
                    residencia._id=miResidencia.get()._id;

                residencia.periodo = Session.get("periodo");

                let solicitud = {};
                solicitud.lugar = doc.lugar.value;
                solicitud.jefeDivisionEstudiosProfesionales = doc.jefeDEP.value
                solicitud.carrera = Meteor.user().profile.carrera;
                solicitud.coordinadorCarrera = doc.coordinadorCarrera.value
                solicitud.nombreProyecto = doc.nombreProyecto.value;
                solicitud.fecha = doc.fecha.value;
                (doc.bancoDeProyectos.value=='true')? solicitud.esDelBancoDeProyectos = true : solicitud.esDelBancoDeProyectos = false;
                (doc.propuestaPropia.value=='true')? solicitud.esDePropuestaPropia = true : solicitud.esDePropuestaPropia = false;
                (doc.trabajador.value=='true')? solicitud.eresTrabajadorDeLaEmpresa = true : solicitud.eresTrabajadorDeLaEmpresa = false;
                solicitud.numResidentesEnProyecto = parseInt(doc.numeroResidentes.value);
                
                let empresa = {};
                empresa.nombre = doc.nombreEmpresa.value;
                empresa.mision = doc.mision.value;
                empresa.giro = doc.giroRamoSector.value;
                empresa.rfc = doc.RFC.value.toUpperCase();
                empresa.domicilio = doc.domicilioEmpresa.value;
                empresa.colonia = doc.coloniaEmpresa.value;
                empresa.ciudad = doc.ciudadEmpresa.value;
                empresa.cp = doc.CPEmpresa.value;
                empresa.email = doc.eMailEmpresa.value;
                empresa.telefono = doc.telefonoEmpresa.value;
                empresa.nombreTitular = doc.titular.value;
                empresa.puestoTitular = doc.puestoTitular.value;
                empresa.nombreAsesor = doc.asesorExterno.value;
                empresa.puestoAsesor = doc.puestoAsesorExterno.value;
                empresa.nombreDeQuienFirma = doc.quienFirmaAcuerdo.value;
                empresa.puestoDeQuienFirma = doc.puestoFirmaAcuerdo.value;
                
                let residente = {};
                residente._id = Meteor.userId();
                residente.nc = Meteor.user().username;
                residente.nombre = Meteor.user().profile.name;
                residente.sexo = Meteor.user().profile.sexo;
                residente.carrera = Meteor.user().profile.carrera;
                residente.modulo = Meteor.user().profile.modulo;
                residente.modalidad = Meteor.user().profile.modalidad;
                residente.email = Meteor.user().emails[0].address;
                residente.domicilio = doc.domicilioResidente.value;
                residente.colonia = doc.coloniaResidente.value;
                residente.ciudad = doc.ciudadResidente.value;
                residente.cp = doc.CPResidente.value;
                residente.telefono = doc.telefonoResidente.value;
                residente.seguridadSocial = doc.seguridadSocial.value;
                residente.numSeguridadSocial = doc.numeroSeguridadSocial.value;
                
                residencia.solicitud = solicitud;
                residencia.empresa = empresa;
                residencia.residente = residente;
            
                let aviso={encabezado:"Residencia profesional",aviso:"Tu solicitud ha sido registrada",positivo:true}
                Session.set("aviso",aviso)
                
                Meteor.call('addResidenciaProfesional',residencia);
            }else{
                let aviso={encabezado:"Residencia profesional",aviso:"No has seleccionado Jefe de departamento o coordinador de carrera adecuadamente",positivo:false}
                Session.set("aviso",aviso)
            }
        }
	}
});
//*************************************************************************************************************************/
//                             CODIGO DE LA PLATILLA VISTA PREVIA DE LA SOLICITUD DE RESIDENCIAS
//*************************************************************************************************************************/
Template.vistaPreviaSolicitudResidenciaAlumno.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get();
        return null;
    },
    rfc: function(){
        if (miResidencia.get())
            return miResidencia.get()?.empresa?.rfc.toUpperCase();
        return null;
    },
    bancoDeProyectos: function(){
        if (miResidencia.get()?.solicitud?.esDelBancoDeProyectos)
            return "Si"
        return "No"
    },
    propuestaPropia: function(){
        if (miResidencia.get()?.solicitud?.esDePropuestaPropia)
            return "Si"
        return "No"
    },
    trabajador: function(){
        if (miResidencia.get()?.solicitud?.eresTrabajadorDeLaEmpresa)
            return "Si"
        return "No"
    },
    fecha: function(){
        if (miResidencia.get()?.solicitud?.fecha)
            return fechaLarga(miResidencia.get().solicitud.fecha)
        return ""
    }
});
Template.vistaPreviaSolicitudResidenciaAlumno.events({
    "click .imprimirSolicitud":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
});
//*************************************************************************************************************************/
//                                 CODIGO DE LA PLATILLA PARA SUBIR LA SOLICITUD DE RESIDENCIA
//*************************************************************************************************************************/
Template.uploadSolicitudResidencia.onCreated(function(){
    this.autorun(() =>{
        subioSolicitudResidencia.set(false);
    })
})
Template.uploadSolicitudResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" Solicitud de residencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"SolicitudResidencia");
            Meteor.call('subiSolicitudResidencia',miResidencia.get(),fileName);
		};
        reader.readAsArrayBuffer(file);
        subioSolicitudResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioSolicitudResidencia.get()){
            let aviso={encabezado:"Solicitud de Residencia Profesional",aviso:"Ha subido su solictud de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Solicitud de Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA PARA PROPONER EL ASESOR DEL ALUMNO
//*************************************************************************************************************************/
Template.proponerAsesor.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('docentesActivos');
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            if (miResidencia.get().solicitud.jefeDivisionEstudiosProfesionales)
                docenteJefeDivEstudiosProfesionales.set(miResidencia.get().solicitud.jefeDivisionEstudiosProfesionales);
            if (miResidencia.get().solicitud.coordinadorCarrera)
                docenteCoordinadorCarrera.set(miResidencia.get().solicitud.coordinadorCarrera);
		}
	});
});
Template.proponerAsesor.helpers({
    periodo: function(){
        return Session.get("periodo");
    },
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get();
        return null;
    },
    tieneRegistradaSolicitud: function(){
        if (residencias.find().count()>0)
            return true;
        return false;
    },
    seAceptoSolictud: function(){
        if (miResidencia.get()?.solicitud?.dictamen=='Aceptado')
            return true
        return false
    },
    yaSubioSolicitud: function(){
        if (miResidencia.get()?.expedienteInicio?.pathSolicitud)
            return true
        return false
    },
    asesorPropuesto: function(){
        if (miResidencia.get())
            return miResidencia.get()?.solicitud?.asesorPropuesto;
        return null;
    }
}); 
Template.proponerAsesor.events({
    "click .registrar":function(event){
        let asesorPropuesto = document.getElementById("findDocenteName").value
        if (miResidencia.get()){
            console.log(miResidencia.get())
            if (miResidencia.get().asesor){
                aviso={ encabezado:"Residencia profesional",
                        aviso:`Ya tienes al maestro ${miResidencia.get()?.asesor?.nombre} asignado por el departamento como tu asesor`,
                        positivo:true}
                Session.set("aviso",aviso)
            }else{
                aviso={encabezado:"Residencia profesional",aviso:"Gracias por proponer a este maestro como tu asesor",positivo:true}
                Session.set("aviso",aviso)
                Meteor.call('addAsesorPropuestoResidenciaProfesional',miResidencia.get(),asesorPropuesto);
            }
        }else{
            aviso={encabezado:"Residencia profesional",aviso:"No has realizado tu solicitud de residencia",positivo:false}
            Session.set("aviso",aviso)
        }
	}
});
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA ANTEPROYECTO DE RESIDENCIAS ALUMNO
//*************************************************************************************************************************/
Template.anteProyectoResidenciasAlumno.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
		}
	});
});
Template.anteProyectoResidenciasAlumno.helpers({
    subioSolicitudResidencias: function(){
        if (miResidencia.get()?.expedienteInicio?.pathSolicitud)
            return true;
        return false;
    },
    subioAnteProyectoResidencias: function(){
        if (miResidencia.get()?.expedienteInicio?.pathAnteproyecto)
            return true;
        return false;
    },
    seAceptoSolictud: function(){
        if (miResidencia.get()?.solicitud?.dictamen=='Aceptado')
            return true
        return false
    },
    miResidencia: function(){
        return miResidencia.get();
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	}
})
//*************************************************************************************************************************/
//                                 CODIGO DE LA PLATILLA PARA SUBIR EL ANTEPROYECTO DE RESIDENCIA
//*************************************************************************************************************************/
Template.uploadAnteproyectoResidencia.onCreated(function(){
    this.autorun(() =>{
        subioAnteproyectoResidencia.set(false);
    })
})
Template.uploadAnteproyectoResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" Anteproyecto de residencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"SolicitudResidencia");
            Meteor.call('subiAnteproyectoResidencia',miResidencia.get(),fileName);
		};
        reader.readAsArrayBuffer(file);
        subioAnteproyectoResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioAnteproyectoResidencia.get()){
            let aviso={encabezado:"Anteproyecto de Residencia Profesional",aviso:"Ha subido su anteproyecto de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Anteproyecto de Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                               PLATILLA PARA DESCARGAR LA CARTA DE TERMINACION DEL SERVICIO SOCIAL
//*************************************************************************************************************************/
Template.cartaTerminacionServicioSocialEnResidenciasAlumno.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
		}
	});
});
Template.cartaTerminacionServicioSocialEnResidenciasAlumno.helpers({
    residencia: function(){
        return miResidencia.get();
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    tieneAsesorAsignado: function(){
        if (miResidencia.get()?.asesor?.nombre)
            return true;
        return false;
    },
    tieneDictamenProyecto: function(){
        if (miResidencia.get()?.solicitud?.dictamen)
            return true;
        return false;
    },
    observaciones: function(){
        return miResidencia.get()?.solicitud?.observaciones
    },
    dictamenAceptado: function(){
        if (miResidencia.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        return false;
    },
    tieneCartaTerminacionServicioSocial: function(){
        if (miResidencia.get()?.expedienteInicio?.pathCartaTerminacionServicioSocial)
            return true;
        return false;
    }
});
//*************************************************************************************************************************/
//                                    PARA SUBIR LA CARTA DE TERMINACION DEL SERVICIO SOCIAL
//*************************************************************************************************************************/
Template.uploadCartaTerminacionServicioSocial.onCreated(function(){
    this.autorun(() =>{
        subioCartaDeTerminacionServicioSocial.set(false)
    })
})
Template.uploadCartaTerminacionServicioSocial.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" CartaDeTerminacionServicioSocial.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"CartaDeTerminacionServicioSocialEnResidencias");
            Meteor.call('subiCartaDeTerminacionServicioSocialEnResidencias',miResidencia.get()._id,fileName);
            subioCartaDeTerminacionServicioSocial.set(true)
		};
        reader.readAsArrayBuffer(file);
    },
    "click .cerrar": function(event, template){
        if (subioCartaDeTerminacionServicioSocial.get()){
            let aviso={encabezado:"Carta de Terminación del Servicio Social",aviso:"Ha subido su carta de terminación del servicio social",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Carta de Terminación del Servicio Social",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
}); 
//*************************************************************************************************************************/
//                                   PLATILLA PARA DESCARGAR LA CARTA DE PRESENTACION DEL ALUMNO
//*************************************************************************************************************************/
Template.cartaPresentacionResidenciasAlumno.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
		}
	});
});
Template.cartaPresentacionResidenciasAlumno.helpers({
    residencia: function(){
        return miResidencia.get();
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    tieneAsesorAsignado: function(){
        if (miResidencia.get()?.asesor?.nombre)
            return true;
        return false;
    },
    tieneDictamenProyecto: function(){
        if (miResidencia.get()?.solicitud?.dictamen)
            return true;
        return false;
    },
    observaciones: function(){
        return miResidencia.get()?.solicitud?.observaciones
    },
    dictamenAceptado: function(){
        if (miResidencia.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        return false;
    },
    tieneCartaPresentacion: function(){
        if (miResidencia.get()?.expedienteInicio?.pathCartaPresentacion)
            return true;
        return false;
    },
    tieneCartaPresentacionFirmada: function(){
        if (miResidencia.get()?.expedienteInicio?.pathCartaPresentacionFirmada)
            return true;
        return false;
    }
}); 
//*************************************************************************************************************************/
//                                          PARA SUBIR LA CARTA DE PRESENTACION FIRMADA
//*************************************************************************************************************************/
Template.uploadCartaPresentacionFirmada.onCreated(function(){
    this.autorun(() =>{
        subioCartaDePresentacionFirmada.set(false)
    })
})
Template.uploadCartaPresentacionFirmada.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" CartaDePresentacionConFirmaRecibido.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"CartaPresentacionFirmada");
            Meteor.call('subiCartaPresentacionFirmada',miResidencia.get()._id,fileName);
            subioCartaDePresentacionFirmada.set(true)
		};
        reader.readAsArrayBuffer(file);
    },
    "click .cerrar": function(event, template){
        if (subioCartaDePresentacionFirmada.get()){
            let aviso={encabezado:"Carta de Presentación de Residencia Profesional",aviso:"Ha subido su carta de presetanción con firma de recibido",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Carta de Presentación de Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                                       PLATILLA PARA LA CARTA DE ACEPTACION DE RESIDENCIAS
//*************************************************************************************************************************/
Template.cartaAceptacionResidenciasAlumno.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}))
		}
	});
});
Template.cartaAceptacionResidenciasAlumno.helpers({
    tengoResidencia: function(){
        if (miResidencia.get()?.solicitud)
            return true
        return false
    },
    subiCartaAceptacion: function(){
        if (miResidencia.get()?.expedienteInicio?.pathCartaAceptacion)
            return true;
        return false;
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    miResidencia: function(){
        return miResidencia.get();
    },
    seAceptoSolictud: function(){
        if (miResidencia.get()?.solicitud?.dictamen=='Aceptado')
            return true
        return false
    }
})
Template.cartaAceptacionResidenciasAlumno.events({
    "click .generarCartaAceptacion":function(){ 
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaCartaAceptacion"});
    },
});
//*************************************************************************************************************************/
//                         CODIGO DE LA PLATILLA VISTA PREVIA DE LA CARTA DE ACEPTACION DE RESIDENCIAS
//*************************************************************************************************************************/
Template.vistaPreviaCartaAceptacion.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get();
        else 
            return null;
    },
    fecha: function(){
        return fechaLarga(configuracion.get().configuracion.fechaCA)
    }
});
Template.vistaPreviaCartaAceptacion.events({
    "click .imprimirCartaAceptacionResidencias":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
});
//*************************************************************************************************************************/
//                                 CODIGO DE LA PLATILLA PARA SUBIR LA CARTA DE ACEPTACION
//*************************************************************************************************************************/
Template.uploadCartaAceptacionResidencia.onCreated(function(){
    this.autorun(() =>{
        subioAnteproyectoResidencia.set(false);
    })
});
Template.uploadCartaAceptacionResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" Carta de Aceptacion.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"CartaAceptacionResidencia");
            Meteor.call('subiCartaAceptacionResidencia',miResidencia.get()._id,fileName);
		};
        reader.readAsArrayBuffer(file);
        subioCartaDeAceptacionResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioCartaDeAceptacionResidencia.get()){
            let aviso={encabezado:"Carta de Aceptacion de Residencia Profesional",aviso:"Ha subido su carta de aceptacion de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Carta de Aceptacion de Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                                 CODIGO PARA EL SEGUIMIENTO DE LA RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.seguimientoResidenciasAlumno.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if (this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            if (miResidencia.get()?.seguimiento?.planeacion)
                actividadesEnCronograma.set(miResidencia.get().seguimiento.planeacion)
            else
                actividadesEnCronograma.set([])
            if (miResidencia.get()?.seguimiento?.realizacion)
                actividadesRealizadas.set(miResidencia.get().seguimiento.realizacion);
            else
                actividadesRealizadas.set([])
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
});
Template.seguimientoResidenciasAlumno.helpers({
    tieneDictamenAceptado: function(){
        if (miResidencia.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        else 
            return false;
    },
    planeacionAceptada: function(){
        if (miResidencia.get()?.seguimiento?.planeacionAceptada)
            return miResidencia.get().seguimiento.planeacionAceptada
        return ""
    },
    realizacionAceptada: function(){
        if (miResidencia.get()?.seguimiento?.VoBoFecha1 && miResidencia?.get()?.seguimiento?.VoBoFecha2 && miResidencia.get()?.seguimiento?.VoBoFecha3)
            return true
        return false;
    },
    actividades: function(){
        return actividadesEnCronograma.get();
    },
    actividadesRealizadas: function(){
        return actividadesRealizadas.get();
    },
    nAct: function(){
        return this.numActividad;
    },
    semana1: function(){
        if (this.semana1)
            return "checked";
    },
    semana2: function(){
        if (this.semana2)
            return "checked";
    },
    semana3: function(){
        if (this.semana3)
            return "checked";
    },
    semana4: function(){
        if (this.semana4)
            return "checked";
    },
    semana5: function(){
        if (this.semana5)
            return "checked";
    },
    semana6: function(){
        if (this.semana6)
            return "checked";
    },
    semana7: function(){
        if (this.semana7)
            return "checked";
    },
    semana8: function(){
        if (this.semana8)
            return "checked";
    },
    semana9: function(){
        if (this.semana9)
            return "checked";
    },
    semana10: function(){
        if (this.semana10)
            return "checked";
    },
    semana11: function(){
        if (this.semana11)
            return "checked";
    },
    semana12: function(){
        if (this.semana12)
            return "checked";
    },
    semana13: function(){
        if (this.semana13)
            return "checked";
    },
    semana14: function(){
        if (this.semana14)
            return "checked";
    },
    semana15: function(){
        if (this.semana15)
            return "checked";
    },
    semana16: function(){
        if (this.semana16)
            return "checked";
    },
    semana17: function(){
        if (this.semana17)
            return "checked";
    },
    semana18: function(){
        if (this.semana18)
            return "checked";
    },
    rsemana1: function(){
        if (this.semana1)
            return "checked";
    },
    rsemana2: function(){
        if (this.semana2)
            return "checked";
    },
    rsemana3: function(){
        if (this.semana3)
            return "checked";
    },
    rsemana4: function(){
        if (this.semana4)
            return "checked";
    },
    rsemana5: function(){
        if (this.semana5)
            return "checked";
    },
    rsemana6: function(){
        if (this.semana6)
            return "checked";
    },
    rsemana7: function(){
        if (this.semana7)
            return "checked";
    },
    rsemana8: function(){
        if (this.semana8)
            return "checked";
    },
    rsemana9: function(){
        if (this.semana9)
            return "checked";
    },
    rsemana10: function(){
        if (this.semana10)
            return "checked";
    },
    rsemana11: function(){
        if (this.semana11)
            return "checked";
    },
    rsemana12: function(){
        if (this.semana12)
            return "checked";
    },
    rsemana13: function(){
        if (this.semana13)
            return "checked";
    },
    rsemana14: function(){
        if (this.semana14)
            return "checked";
    },
    rsemana15: function(){
        if (this.semana15)
            return "checked";
    },
    rsemana16: function(){
        if (this.semana16)
            return "checked";
    },
    rsemana17: function(){
        if (this.semana17)
            return "checked";
    },
    rsemana18: function(){
        if (this.semana18)
            return "checked";
    },
});
Template.seguimientoResidenciasAlumno.events({
    "click .imprimirFormatoSeguimiento": function(){
        let acts = []
        let cro = actividadesEnCronograma.get();
        let rea = actividadesRealizadas.get();
        cro.forEach(function(a,i){
            acts.push({ actividad:a.actividad,
                        sp1:a.semana1,sp2:a.semana2,sp3:a.semana3,sp4:a.semana4,sp5:a.semana5,sp6:a.semana6,sp7:a.semana7,sp8:a.semana8,sp9:a.semana9,
                        sp10:a.semana10,sp11:a.semana11,sp12:a.semana12,sp13:a.semana13,sp14:a.semana14,sp15:a.semana15,sp16:a.semana16,sp17:a.semana17,
                        sp18:a.semana18,
                        sr1:rea[i].semana1,sr2:rea[i].semana2,sr3:rea[i].semana3,sr4:rea[i].semana4,sr5:rea[i].semana5,sr6:rea[i].semana6,sr7:rea[i].semana7,
                        sr8:rea[i].semana8,sr9:rea[i].semana9,sr10:rea[i].semana10,sr11:rea[i].semana11,sr12:rea[i].semana12,sr13:rea[i].semana13,
                        sr14:rea[i].semana14,sr15:rea[i].semana15,sr16:rea[i].semana16,sr17:rea[i].semana17,sr18:rea[i].semana18,
            })
        })
        actividades.set(acts)
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaFormatoSeguimientoAlumno"});
    },
    "click .agregarActividad":function(){
        let actividades=actividadesEnCronograma.get();
        let numAct=actividades.length+1;
        if (numAct<10){
            let actividad={'numActividad':numAct,'actividad':"",'semana1':false,'semana2':false,'semana3':false,'semana4':false,'semana5':false,'semana6':false,'semana7':false,'semana8':false,
            'semana9':false,'semana10':false,'semana11':false,'semana12':false,'semana13':false,'semana14':false,'semana15':false,'semana16':false,'semana17':false,'semana18':false};
            actividades.push(actividad);
            actividadesEnCronograma.set(actividades);
            console.log(actividadesEnCronograma.get())
        }
    },
    "click .eliminarActividad":function(){
        let actividades=actividadesEnCronograma.get();
        actividades.pop();
        actividadesEnCronograma.set(actividades);
    },
    "click .registrar":function(){
        let actividadesARegistrar = actividadesEnCronograma.get();
        actividadesARegistrar.forEach(function(act,index){
            let numAct=index+1;
            act.actividad = document.getElementById("actividad"+numAct).value;
            act.semana1=document.getElementById("actividad"+numAct+"semana1").checked;
            act.semana2=document.getElementById("actividad"+numAct+"semana2").checked;
            act.semana3=document.getElementById("actividad"+numAct+"semana3").checked;
            act.semana4=document.getElementById("actividad"+numAct+"semana4").checked;
            act.semana5=document.getElementById("actividad"+numAct+"semana5").checked;
            act.semana6=document.getElementById("actividad"+numAct+"semana6").checked;
            act.semana7=document.getElementById("actividad"+numAct+"semana7").checked;
            act.semana8=document.getElementById("actividad"+numAct+"semana8").checked;
            act.semana9=document.getElementById("actividad"+numAct+"semana9").checked;
            act.semana10=document.getElementById("actividad"+numAct+"semana10").checked;
            act.semana11=document.getElementById("actividad"+numAct+"semana11").checked;
            act.semana12=document.getElementById("actividad"+numAct+"semana12").checked;
            act.semana13=document.getElementById("actividad"+numAct+"semana13").checked;
            act.semana14=document.getElementById("actividad"+numAct+"semana14").checked;
            act.semana15=document.getElementById("actividad"+numAct+"semana15").checked;
            act.semana16=document.getElementById("actividad"+numAct+"semana16").checked;
            act.semana17=document.getElementById("actividad"+numAct+"semana17").checked;
            act.semana18=document.getElementById("actividad"+numAct+"semana18").checked;
        })
        actividadesEnCronograma.set(actividadesARegistrar);
        Meteor.call('registrarSeguimientoCronograma',miResidencia.get()._id,actividadesARegistrar);
        let aviso={encabezado:"Residencias",aviso:"Ha registrado su cronograma de actividades",positivo:true};
        Session.set("aviso",aviso);
    },
    "click .registrarRealizacionActividades":function(){
        let actividadesARegistrar = actividadesRealizadas.get();
        actividadesARegistrar.forEach(function(act,index){
            let numAct=index+1;
            act.actividad = document.getElementById("ractividad"+numAct).value;
            act.semana1=document.getElementById("ractividad"+numAct+"semana1").checked;
            act.semana2=document.getElementById("ractividad"+numAct+"semana2").checked;
            act.semana3=document.getElementById("ractividad"+numAct+"semana3").checked;
            act.semana4=document.getElementById("ractividad"+numAct+"semana4").checked;
            act.semana5=document.getElementById("ractividad"+numAct+"semana5").checked;
            act.semana6=document.getElementById("ractividad"+numAct+"semana6").checked;
            act.semana7=document.getElementById("ractividad"+numAct+"semana7").checked;
            act.semana8=document.getElementById("ractividad"+numAct+"semana8").checked;
            act.semana9=document.getElementById("ractividad"+numAct+"semana9").checked;
            act.semana10=document.getElementById("ractividad"+numAct+"semana10").checked;
            act.semana11=document.getElementById("ractividad"+numAct+"semana11").checked;
            act.semana12=document.getElementById("ractividad"+numAct+"semana12").checked;
            act.semana13=document.getElementById("ractividad"+numAct+"semana13").checked;
            act.semana14=document.getElementById("ractividad"+numAct+"semana14").checked;
            act.semana15=document.getElementById("ractividad"+numAct+"semana15").checked;
            act.semana16=document.getElementById("ractividad"+numAct+"semana16").checked;
            act.semana17=document.getElementById("ractividad"+numAct+"semana17").checked;
            act.semana18=document.getElementById("ractividad"+numAct+"semana18").checked;
        })
        actividadesRealizadas.set(actividadesARegistrar)
        Meteor.call('registrarRealizacionActividadesResidencia',miResidencia.get()._id,actividadesARegistrar);
        let aviso={encabezado:"Residencias",aviso:"Ha registrado el cumplimiento de las actividades",positivo:true};
        Session.set("aviso",aviso);
    }
});
//*************************************************************************************************************************/
//                           PARA SELECCIONAR EL JEFE DE LA DIVISION DE STUDIOS PROFEISONALES
//*************************************************************************************************************************/
Template.SeleccionarJefeDivEstudiosPrfesionales.events({
    "click .escogerJefeDivEstProf":function(){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            docenteJefeDivEstudiosProfesionales.set(nameDoc);
            asignoJefeDivEstudiosProfesionales.set(true);
        }else{
            docenteJefeDivEstudiosProfesionales.set("El nombre del Docente no existe");
            asignoJefeDivEstudiosProfesionales.set(false);
        }
    },
    "click .cancelar":function(){
        asignoJefeDivEstudiosProfesionales.set(false);
    }
})
//*************************************************************************************************************************/
//                                    PARA SELECCIONAR EL COORDINADOR DE CARRERA
//*************************************************************************************************************************/
Template.SeleccionarCoordinadorCarrera.rendered = function() {
    Meteor.typeahead.inject();
};
Template.SeleccionarCoordinadorCarrera.helpers({
    docente:function(){
        return Meteor.users.find().fetch().map(function(it){return it.profile.name})
    }
})
Template.SeleccionarCoordinadorCarrera.events({
    "click .escogerCoordCarrera":function(){
        let nameDoc=document.getElementById("findCoordCarrera").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            docenteCoordinadorCarrera.set(nameDoc);
            asignoCoordinadorCarrera.set(true);
        }else{
            docenteCoordinadorCarrera.set("El nombre del Docente no existe");
            asignoCoordinadorCarrera.set(false);
        }
    },
    "click .cancelar":function(){
        asignoCoordinadorCarrera.set(false);
    }
})
//*************************************************************************************************************************/
//                      CODIGO DE LA PLATILLA VISTA PREVIA DEL FORMATO DE SEGUIMIENTO DEL PROYECTO
//*************************************************************************************************************************/
Template.vistaPreviaFormatoSeguimientoAlumno.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get()
        else 
            return null;
    },
    actividades: function(){
        return actividades.get()
    },
    configuracion: function(){
        return configuracion.get()
    },
    asesorInterno: function(){
        if (miResidencia.get()?.asesor?.nombre)
            return miResidencia.get().asesor.nombre
        return ""
    },
    estudiante: function(){
        if (miResidencia.get()?.residente?.nombre)
            return miResidencia.get().residente.nombre
        return ""
    }
});
Template.vistaPreviaFormatoSeguimientoAlumno.events({
    "click .imprimirFormatoSeguimiento":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
});
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA EVALUACION  DE SEGUIMIENTO DEL PROYECTO
//*************************************************************************************************************************/
Template.evaluacionSeguimientoUnoAlumno.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
});
Template.evaluacionSeguimientoUnoAlumno.helpers({
    evaluado: function(){
        if (miResidencia.get().evaluacionFecha1)
            return true
        return false
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    expedienteEvaluacion:function(){
        return miResidencia.get().expedienteEvaluacion
    },
    subiPrimeraEvaluacion:function(){
        if (miResidencia.get().expedienteEvaluacion.pathPrimeraEvaluacion)
            return true
        return false
    }
});
Template.evaluacionSeguimientoUnoAlumno.events({
    "click .imprimirEvaluacionSeguimiento":function(){
        resultadosEvaluacion.set(Object.values(miResidencia.get().evaluacionFecha1))
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaFormatoEvaluacionSeguimientoUnoAlumno"});
    }
});
//*************************************************************************************************************************/
//                         VISTA PREVIA DEL FORMATO DE EVALUACION  DE SEGUIMIENTO DEL PROYECTO
//*************************************************************************************************************************/
Template.vistaPreviaFormatoEvaluacionSeguimientoUnoAlumno.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get()
        return null;
    },
    configuracion: function(){
        return configuracion.get()
    },
    valor1: function(){
        return resultadosEvaluacion.get()[0]
    },
    valor2: function(){
        return resultadosEvaluacion.get()[1]
    },
    valor3: function(){
        return resultadosEvaluacion.get()[2]
    },
    valor4: function(){
        return resultadosEvaluacion.get()[3]
    },
    valor5: function(){
        return resultadosEvaluacion.get()[4]
    },
    valor6: function(){
        return resultadosEvaluacion.get()[5]
    },
    res: function(){
        return resultadosEvaluacion.get()[6]
    },
})
Template.vistaPreviaFormatoEvaluacionSeguimientoUnoAlumno.events({
    "click .imprimirFormatoSeguimiento":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                               CODIGO DE LA PLATILLA PARA SUBIR LA SEGUNDA EVALUACION
//*************************************************************************************************************************/
Template.uploadPrimeraEvaluacionResidencia.onCreated(function(){
    this.autorun(() =>{
        subioPrimeraEvaluacionResidencia.set(false);
    })
});
Template.uploadPrimeraEvaluacionResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" PrimeraEvaluacionResidencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"PrimeraEvaluacionResidencia");
            Meteor.call('subiPrimeraEvaluacionResidencia',miResidencia.get()._id,fileName);
		};
        reader.readAsArrayBuffer(file);
        subioPrimeraEvaluacionResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioPrimeraEvaluacionResidencia.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido su primer evaluación de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA EVALUACION  DE SEGUIMIENTO DEL PROYECTO
//*************************************************************************************************************************/
Template.evaluacionSeguimientoDosAlumno.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
});
Template.evaluacionSeguimientoDosAlumno.helpers({
    evaluado: function(){
        if (miResidencia.get()?.evaluacionFecha2)
            return true
        return false
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    expedienteEvaluacion:function(){
        if (miResidencia.get()?.expedienteEvaluacion)
            return miResidencia.get().expedienteEvaluacion
        return ""
    },
    subiSegundaEvaluacion:function(){
        if (miResidencia.get()?.expedienteEvaluacion?.pathSegundaEvaluacion)
            return true
        return false
    }
});
Template.evaluacionSeguimientoDosAlumno.events({
    "click .imprimirEvaluacionSeguimiento":function(){
        resultadosEvaluacion.set(Object.values(miResidencia.get().evaluacionFecha2))
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaFormatoEvaluacionSeguimientoDosAlumno"});
    }
});
//*************************************************************************************************************************/
//                         VISTA PREVIA DEL FORMATO DE EVALUACION  DE SEGUIMIENTO DEL PROYECTO
//*************************************************************************************************************************/
Template.vistaPreviaFormatoEvaluacionSeguimientoDosAlumno.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get()
        return null;
    },
    configuracion: function(){
        return configuracion.get()
    },
    valor1: function(){
        return resultadosEvaluacion.get()[0]
    },
    valor2: function(){
        return resultadosEvaluacion.get()[1]
    },
    valor3: function(){
        return resultadosEvaluacion.get()[2]
    },
    valor4: function(){
        return resultadosEvaluacion.get()[3]
    },
    valor5: function(){
        return resultadosEvaluacion.get()[4]
    },
    valor6: function(){
        return resultadosEvaluacion.get()[5]
    },
    res: function(){
        return resultadosEvaluacion.get()[6]
    },
})
Template.vistaPreviaFormatoEvaluacionSeguimientoDosAlumno.events({
    "click .imprimirFormatoSeguimiento":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                               CODIGO DE LA PLATILLA PARA SUBIR LA SEGUNDA EVALUACION
//*************************************************************************************************************************/
Template.uploadSegundaEvaluacionResidencia.onCreated(function(){
    this.autorun(() =>{
        subioSegundaEvaluacionResidencia.set(false);
    })
});
Template.uploadSegundaEvaluacionResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" SegundaEvaluacionResidencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"SegundaEvaluacionResidencia");
            Meteor.call('subiSegundaEvaluacionResidencia',miResidencia.get()._id,fileName);
		};
        reader.readAsArrayBuffer(file);
        subioSegundaEvaluacionResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioSegundaEvaluacionResidencia.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido su segunda evaluación de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                                         INFORME TECNICO DE LA RESIDENCIA
//*************************************************************************************************************************/
Template.informeTecnicoResidencia.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
})
Template.informeTecnicoResidencia.helpers({
    tieneSegundaEvaluacion: function(){
        if (miResidencia.get()?.expedienteEvaluacion?.pathSegundaEvaluacion)
            return true;
        return false
    },
    subioInformeTecnico: function(){
        if (miResidencia.get()?.expedienteEvaluacion?.pathInformeTecnico)
            return true;
        return false
    },
    expedienteEvaluacion:function(){
        if (miResidencia.get()?.expedienteEvaluacion)
            return miResidencia.get().expedienteEvaluacion
        return ""
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
})
//*************************************************************************************************************************/
//                                  CODIGO DE LA PLATILLA PARA SUBIR EL INFORME TECNICO
//*************************************************************************************************************************/
Template.uploadInformeTecnicoResidencia.onCreated(function(){
    this.autorun(() =>{
        subioInformeTecnicoResidencia.set(false);
    })
});
Template.uploadInformeTecnicoResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" InformeTecnicoResidencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"InformeTecnicoResidencia");
            Meteor.call('subiInformeTecnicoResidencia',miResidencia.get()._id,fileName);
		};
        reader.readAsArrayBuffer(file);
        subioInformeTecnicoResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioInformeTecnicoResidencia.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido su informe técnico de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA EVALUACION FINAL DEL PROYECTO DE RESIDENCIAS
//*************************************************************************************************************************/
Template.evaluacionSeguimientoTresAlumno.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
});
Template.evaluacionSeguimientoTresAlumno.helpers({
    evaluado: function(){
        if (miResidencia.get().evaluacionFecha3)
            return true
        return false
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    expedienteEvaluacion:function(){
        return miResidencia.get().expedienteEvaluacion
    },
    subiTercerEvaluacion:function(){
        if (miResidencia.get().expedienteEvaluacion.pathTercerEvaluacion)
            return true
        return false
    }
});
Template.evaluacionSeguimientoTresAlumno.events({
    "click .imprimirEvaluacionSeguimiento":function(){
        resultadosEvaluacion.set(Object.values(miResidencia.get().evaluacionFecha3))
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaFormatoEvaluacionSeguimientoTresAlumno"});
    }
});
//*************************************************************************************************************************/
//                              VISTA PREVIA DEL FORMATO DE EVALUACION FINAL DEL PROYECTO
//*************************************************************************************************************************/
Template.vistaPreviaFormatoEvaluacionSeguimientoTresAlumno.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get()
        return null;
    },
    configuracion: function(){
        return configuracion.get()
    },
    valor1: function(){
        return resultadosEvaluacion.get()[0]
    },
    valor2: function(){
        return resultadosEvaluacion.get()[1]
    },
    valor3: function(){
        return resultadosEvaluacion.get()[2]
    },
    valor4: function(){
        return resultadosEvaluacion.get()[3]
    },
    valor5: function(){
        return resultadosEvaluacion.get()[4]
    },
    valor6: function(){
        return resultadosEvaluacion.get()[5]
    },
    valor7: function(){
        return resultadosEvaluacion.get()[6]
    },
    valor8: function(){
        return resultadosEvaluacion.get()[7]
    },
    valor9: function(){
        return resultadosEvaluacion.get()[8]
    },
    valor10: function(){
        return resultadosEvaluacion.get()[9]
    },
    valor11: function(){
        return resultadosEvaluacion.get()[10]
    },
    valor12: function(){
        return resultadosEvaluacion.get()[11]
    },
    valor13: function(){
        return resultadosEvaluacion.get()[12]
    },
    valor14: function(){
        return resultadosEvaluacion.get()[13]
    },
    res: function(){
        return resultadosEvaluacion.get()[14]
    },
})
Template.vistaPreviaFormatoEvaluacionSeguimientoTresAlumno.events({
    "click .imprimirFormatoSeguimiento":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                               CODIGO DE LA PLATILLA PARA SUBIR LA SEGUNDA EVALUACION
//*************************************************************************************************************************/
Template.uploadTercerEvaluacionResidencia.onCreated(function(){
    this.autorun(() =>{
        subioTercerEvaluacionResidencia.set(false);
    })
});
Template.uploadTercerEvaluacionResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" TercerEvaluacionResidencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"TercerEvaluacionResidencia");
            Meteor.call('subiTercerEvaluacionResidencia',miResidencia.get()._id,fileName);
		};
        reader.readAsArrayBuffer(file);
        subioTercerEvaluacionResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioTercerEvaluacionResidencia.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido su evaluación final de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                                  CODIGO DE LA PLATILLA DE LA CARTA DE TERMINACION
//*************************************************************************************************************************/
Template.cartaTerminacionResidencia.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
});
Template.cartaTerminacionResidencia.helpers({
    evaluado: function(){
        if (miResidencia.get().evaluacionFecha3)
            return true
        return false
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    subiCartaTerminacion:function(){
        if (miResidencia.get().pathCartaTerminacionResidencia)
            return true
        return false
    },
    pathCartaTerminacion:function(){
        return miResidencia.get().pathCartaTerminacionResidencia
    }
});
Template.cartaTerminacionResidencia.events({
    "click .imprimirCartaTerminacion":function(){
        Meteor.call('usuarioDelRole','Depto de Gestion Tecnologica y Vinculacion',function(error,result){
            if (error) 
                alert("error");
            else  if (result){
                nombreJefeDeptoVinculacion.set(`${result.profile.prefijo} ${result.profile.name}`);
            }
        })
		BlazeLayout.render("impresion",{rellena2:"vistaPreviaCartaTerminacionResidenciaAlumno"});
	}
});
//*************************************************************************************************************************/
//                                  CODIGO DE LA PLATILLA PARA SUBIR LA CARTA DE TERMINACION
//*************************************************************************************************************************/
Template.uploadCartaTerminacionResidencia.onCreated(function(){
    this.autorun(() =>{
        subioCartaTerminacionResidencia.set(false);
    })
});
Template.uploadCartaTerminacionResidencia.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
        let fileName = Meteor.user().username+" CartaTerminacionResidencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"CartaTerminacionResidencia");
            Meteor.call('subiCartaTerminacionResidencia',miResidencia.get()._id,fileName);
		};
        reader.readAsArrayBuffer(file);
        subioCartaTerminacionResidencia.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioCartaTerminacionResidencia.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido su carta de terminacion de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});
//*************************************************************************************************************************/
//                                       VISTA PREVIA DE LA CARTA DE TERMINACION
//*************************************************************************************************************************/
Template.vistaPreviaCartaTerminacionResidenciaAlumno.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('miResidencia',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
			miResidencia.set(residencias.findOne({}))
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}).configuracion)
		}
	});
});
Template.vistaPreviaCartaTerminacionResidenciaAlumno.helpers({
    miResidencia: function(){
        if (miResidencia.get())
            return miResidencia.get()
        return null;
    },
    configuracion: function(){
        return configuracion.get()
    },
    fecha: function(){
        return fechaLarga(configuracion.get().fechaCT)
    },
    jefeVinculacion: function(){
        return nombreJefeDeptoVinculacion.get();
    }
})
Template.vistaPreviaCartaTerminacionResidenciaAlumno.events({
    "click .imprimirCartaTerminacion":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})