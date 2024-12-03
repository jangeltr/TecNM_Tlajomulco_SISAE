let miSS = {}
let tipoPrograma = {}
let miServicioSocial = new ReactiveVar()
let subioSolicitudServicioSocial = new ReactiveVar()
let subioCartaCompromisoServicioSocial = new ReactiveVar()

function inicializarMiSS(){
  miSS.periodo = Session.get("periodo");
  miSS.alumno._id = Meteor.userId()
  miSS.alumno.nc = Meteor.user().username
  miSS.alumno.nombre = Meteor.user().profile.name
  miSS.alumno.sexo = Meteor.user().profile.sexo
  miSS.alumno.carrera = Meteor.user().profile.carrera
  miSS.alumno.modulo = Meteor.user().profile.modulo
  miSS.alumno.modalidad = Meteor.user().profile.modalidad
  miSS.alumno.semestre = Meteor.user().profile.semestre
  miSS.alumno.telefono = Meteor.user().profile.telefono
  miSS.alumno.email = Meteor.user().emails[0].address
  let fechaI = new Date()
  let fecha = new Date()
  miSS.programa.fechaInicio =  fechaLarga(fechaI.toISOString().substring(0,10))
  miSS.programa.fechaCartaPresentacion = fechaLarga(fecha.setDate(fechaI.getDate()+2))
  miSS.programa.fechaCartaAceptacion = fechaLarga(fecha.setDate(fechaI.getDate()+3))
  miSS.programa.fechaPrimerSeguimiento = fechaLarga(fecha.setMonth(fechaI.getMonth()+2))
  miSS.programa.fechaSegundoSeguimiento = fechaLarga(fecha.setMonth(fechaI.getMonth()+4))
  fecha.setMonth(fechaI.getMonth()+6)
  miSS.programa.fechaTercerSeguimiento = fechaLarga(fecha)
  miSS.programa.fechaReporteFinal = fechaLarga(fecha)
  miSS.programa.fechaCartaTerminacion = fechaLarga(fecha.setDate(fecha.getDate()+2))
}
//*************************************************************************************************************************/
//                                   SERVICIO SOCIAL ALUMNOS
//*************************************************************************************************************************/
Template.servicioSocialAlumno.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('miServicioSocial',Session.get('periodo'),Meteor.userId());
        if(this.subscriptionsReady()){
          miServicioSocial.set(servicioSocial.findOne({}))
        }
	});
})
Template.servicioSocialAlumno.helpers({
    tieneSolicitudServicioSocial: function(){
        if (miServicioSocial.get())
            return true
        return false
    },
    servicioSocial: function(){
        return miServicioSocial.get()
    },
    ip: function(){
      return Session.get("ipLocal")+Session.get("puerto")
    }
})
//*************************************************************************************************************************/
//                               SOLICITUD SERVICIO SOCIAL ALUMNOS
//*************************************************************************************************************************/
Template.solicitudServicioSocialAlumno.onRendered(function(){
})
Template.solicitudServicioSocialAlumno.onCreated(function(){
  this.autorun(() =>{
    this.subscribe('miServicioSocial',Session.get('periodo'),Meteor.userId())
    if(this.subscriptionsReady()){
      miServicioSocial.set(servicioSocial.findOne({'periodo':Session.get('periodo')}))
      tipoPrograma.EA='___'
      tipoPrograma.DC='___'
      tipoPrograma.AD='___'
      tipoPrograma.AC='___'
      tipoPrograma.ACu='___'
      tipoPrograma.MA='___'
      tipoPrograma.DS='___'
      tipoPrograma.AS='___'
      tipoPrograma.O='___'
      switch (miServicioSocial.get().programa.tipoPrograma){
        case 'Educación para adultos':
          tipoPrograma.EA=' X '
        break
        case 'Desarrollo de comunidad':
          tipoPrograma.DC=' X '
        break
        case 'Actividades deportivas':
          tipoPrograma.AD=' X '
        break
        case 'Actividades cívicas':
          tipoPrograma.AC=' X '
        break
        case 'Actividades culturales':
          tipoPrograma.ACu=' X '
        break
        case 'Medio ambiente':
          tipoPrograma.MA=' X '
        break
        case 'Desarrollo sustentable':
          tipoPrograma.DS=' X '
        break
        case 'Apoyo a la salud':
          tipoPrograma.AS=' X '
        break
        case 'Otro':
          tipoPrograma.O=' X '
        break
      }
		}
	});
})
Template.solicitudServicioSocialAlumno.helpers({
    periodo: function(){
        return Session.get("periodo")
    },
    username: function(){
        return Meteor.user().username
    },
    nombre: function(){
        return Meteor.user().profile.name
    },
    carrera: function(){
        return Meteor.user().profile.carrera
    },
    sexo: function(){
      return Meteor.user().profile.sexo
    },
    telefono: function(){
      return Meteor.user().profile.telefono
    },
    semestre: function(){
      return Meteor.user().profile.semestre
    },
    email: function(){
        if (Meteor.user().emails)
            return Meteor.user().emails[0].address
        else
            return 'No ha registrado un correo electrónico en su cuenta (POR FAVOR VALLA A "MI PERFIL" Y REGISTRE UNO)'
    },
    miServicioSocial: function(){
        if (miServicioSocial.get())
            return miServicioSocial.get();
        return null
    },
    fechaInicio: function(){
      return miServicioSocial.get().programa.fechaInicio
    },
    fechaCartaPresentacion: function(){
        return miServicioSocial.get().programa.fechaCartaPresentacion
    },
    fechaCartaAceptacion: function(){
        return miServicioSocial.get().programa.fechaCartaAceptacion
    },
    fechaPrimerSeguimiento: function(){
        return miServicioSocial.get().programa.fechaPrimerSeguimiento
    },
    fechaSegundoSeguimiento: function(){
        return miServicioSocial.get().programa.fechaSegundoSeguimiento
    },
    fechaTercerSeguimiento: function(){
        return miServicioSocial.get().programa.fechaTercerSeguimiento
    },
    fechaReporteFinal: function(){
        return miServicioSocial.get().programa.fechaReporteFinal
    },
    fechaCartaTerminacion: function(){
        return miServicioSocial.get().programa.fechaCartaTerminacion
    },
    tieneRegistradaSolicitud: function(){
        if (miServicioSocial.get()._id)
            return true
        return false
    },
    yaSubioSolicitud: function(){
      if (miServicioSocial.get()?.expedienteInicio.pathSolicitud)
          return true
      return false
    },
    seAceptoSolictud: function(){
      if (miServicioSocial.get()?.solicitud?.dictamen=='Aceptado')
          return true
      return false
    },
    ip:function(){
      return Session.get("ipLocal")+Session.get("puerto")
    },
})

Template.solicitudServicioSocialAlumno.events({
  "click .imprimirSolicitud":function(){
		//BlazeLayout.render("impresion",{rellena2:"vistaPreviaSolicitudServicioSocialAlumno"});
	},
  /* "click .agregar":function(event){
        let doc=document.getElementById("solicitudServicioSocialForm");
        let SS = miServicioSocial.get();
        if (!Meteor.user().emails){
          let aviso={encabezado:"Error",aviso:'No cuentas con una cuenta de correo electrónico, por favor registralo en "Mi perfil"',positivo:false}
          Session.set("aviso",aviso)
        }
        else{
          SS.alumno.domicilio = doc.domicilioAlumno.value
          SS.alumno.colonia = doc.coloniaAlumno.value
          SS.alumno.ciudad = doc.ciudadAlumno.value
          SS.alumno.cp = doc.CPAlumno.value
          
          let programa = {}
          programa.dependenciaOficial = doc.dependenciaOficial.value
          programa.titularDependencia = doc.titularDependencia.value
          programa.puestoTitularDependencia = doc.puestoTitularDependencia.value
          programa.domicilioDependencia = doc.domicilioDependencia.value
          programa.nombrePrograma = doc.nombrePrograma.value
          programa.modalidad = doc.modalidad.value
          programa.tipoPrograma = doc.tipoPrograma.value
          programa.actividades = doc.actividades.value

          SS.alumno = alumno
          SS.programa = programa
          miServicioSocial.set(SS)
      
          let aviso={encabezado:"Servivio Social",aviso:"Tu solicitud ha sido registrada",positivo:true}
          Session.set("aviso",aviso)
          
          Meteor.call('addServicioSocial',SS)
        } 
	} */
})

//*************************************************************************************************************************/
//                         VISTA PREVIA SOLICITUD SERVICIO SOCIAL ALUMNOS
//*************************************************************************************************************************/
/* Template.vistaPreviaSolicitudServicioSocialAlumno.onCreated(function(){
	this.autorun(() =>{
    this.subscribe('miServicioSocial',Session.get('periodo'),Meteor.userId())
    if(this.subscriptionsReady()){
      miServicioSocial.set(servicioSocial.findOne({'periodo':Session.get('periodo')}))
		}
	});
})
Template.vistaPreviaSolicitudServicioSocialAlumno.helpers({
    periodo: function(){
        return Session.get("periodo")
    },
    miServicioSocial: function(){
        if (miServicioSocial.get())
            return miServicioSocial.get()
        return null
    },
    domicilio: function(){ 
        return `CALLE: ${miServicioSocial.get().alumno.domicilio}, COLONIA:${miServicioSocial.get().alumno.colonia}, CIUDAD:${miServicioSocial.get().alumno.ciudad}, C.P.:${miServicioSocial.get().alumno.cp}`
    },
    foto:function(){
      if (Meteor.user().profile.foto)
          return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+usuario.get().username+".jpg" 
      else
          return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
    },
    EA: function(){
      return tipoPrograma.EA
    },
    DC: function(){
      return tipoPrograma.DC
    },
    AD: function(){
      return tipoPrograma.AD
    },
    AC: function(){
      return tipoPrograma.AC
    },
    ACu: function(){
      return tipoPrograma.ACu
    },
    MA: function(){
      return tipoPrograma.MA
    },
    DS: function(){
      return tipoPrograma.DS
    },
    AS: function(){
      return tipoPrograma.AS
    },
    O: function(){
      return tipoPrograma.O
    }
})
Template.vistaPreviaSolicitudServicioSocialAlumno.events({
  "click .imprimirSolicitud":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})  */
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA PARA SUBIR LA SOLICITUD
//*************************************************************************************************************************/
/* Template.uploadSolicitudServicioSocial.onCreated(function(){
  this.autorun(() =>{
      subioSolicitudServicioSocial.set(false)
  })
})
Template.uploadSolicitudServicioSocial.events({
  "change .file-upload-input": function(event, template){
    let file = event.currentTarget.files[0];
    let reader = new FileReader();
    let fileName = Meteor.user().username+" Solicitud de Servicio Social.pdf";
    reader.onload=function(fileLoadEvent){
      let buffer = new Uint8Array(reader.result);
      Meteor.call('fileUpload',fileName,buffer,"SolicitudServicioSocial");
      Meteor.call('subiSolicitudServicioSocial',miServicioSocial.get(),fileName);
    };
      reader.readAsArrayBuffer(file);
      subioSolicitudServicioSocial.set(true);
  },
  "click .cerrar": function(event, template){
      if (subioSolicitudServicioSocial.get()){
          let aviso={encabezado:"Solicitud de Servicio Social",aviso:"Ha subido su solictud de servicio social",positivo:true};
          Session.set("aviso",aviso);
      }
      else{
          let aviso={encabezado:"Solicitud de Servicio Social",aviso:"No subio archivo",positivo:false};
          Session.set("aviso",aviso);
      }
  }
}) */
//*************************************************************************************************************************/
//                               CARTA COMPROMISO SERVICIO SOCIAL ALUMNOS
//*************************************************************************************************************************/
/* Template.cartaCompromisoServicioSocial.onCreated(function(){
	this.autorun(() =>{
    this.subscribe('miServicioSocial',Session.get('periodo'),Meteor.userId())
    this.subscribe('configuracionServicioSocial',Session.get('periodo'))
    if(this.subscriptionsReady()){
      configuracion.set(servicioSocial.findOne({'configuracion.periodo':Session.get('periodo')}))
      miServicioSocial.set(servicioSocial.findOne({'periodo':Session.get('periodo')}))
      tipoPrograma.EA='___'
      tipoPrograma.DC='___'
      tipoPrograma.AD='___'
      tipoPrograma.AC='___'
      tipoPrograma.ACu='___'
      tipoPrograma.MA='___'
      tipoPrograma.DS='___'
      tipoPrograma.AS='___'
      tipoPrograma.O='___'
      switch (miServicioSocial.get().programa.tipoPrograma){
        case 'Educación para adultos':
          tipoPrograma.EA=' X '
        break
        case 'Desarrollo de comunidad':
          tipoPrograma.DC=' X '
        break
        case 'Actividades deportivas':
          tipoPrograma.AD=' X '
        break
        case 'Actividades cívicas':
          tipoPrograma.AC=' X '
        break
        case 'Actividades culturales':
          tipoPrograma.ACu=' X '
        break
        case 'Medio ambiente':
          tipoPrograma.MA=' X '
        break
        case 'Desarrollo sustentable':
          tipoPrograma.DS=' X '
        break
        case 'Apoyo a la salud':
          tipoPrograma.AS=' X '
        break
        case 'Otro':
          tipoPrograma.O=' X '
        break
      }
		}
	});
})
Template.cartaCompromisoServicioSocial.helpers({
    periodo: function(){
        return Session.get("periodo");
    },
    tieneConfiguracion: function(){
      if (configuracion.get())
          return true
      return false
    },
    tieneSolicitudServicioSocial:function(){
      if (miServicioSocial.get().expedienteInicio.pathSolicitud)
        return true
      return false
    },
    tieneCartaCompromiso: function(){
      if (miServicioSocial.get().expedienteInicio.pathCartaCompromiso)
        return true
      return false
    },
    miServicioSocial: function(){
        if (miServicioSocial.get())
            return miServicioSocial.get()
        return null
    },
    tieneRegistradaSolicitud: function(){
        if (servicioSocial.find({'configuracion.periodo':Session.get('periodo')}).count()>0)
            return true
        return false
    },
    yaSubioSolicitud: function(){
      if (miServicioSocial.get().expedienteInicio.pathSolicitud)
          return true
      return false
    },
    ip:function(){
      return Session.get("ipLocal")+Session.get("puerto")
	},
})
Template.cartaCompromisoServicioSocial.events({
  "click .imprimirCartaCompromiso":function(){
		BlazeLayout.render("impresion",{rellena2:"vistaPreviaCartaCompromisoServicioSocialAlumno"});
	}
}) */
//*************************************************************************************************************************/
//                           VISTA PREVIA CARTA COMPROMISO DEL SERVICIO SOCIAL ALUMNOS
//*************************************************************************************************************************/
/* Template.vistaPreviaCartaCompromisoServicioSocialAlumno.onCreated(function(){
	this.autorun(() =>{
    this.subscribe('miServicioSocial',Session.get('periodo'),Meteor.userId())
    if(this.subscriptionsReady()){
      miServicioSocial.set(servicioSocial.findOne({'periodo':Session.get('periodo')}))
		}
	});
})
Template.vistaPreviaCartaCompromisoServicioSocialAlumno.helpers({
    periodo: function(){
        return Session.get("periodo")
    },
    miServicioSocial: function(){
        if (miServicioSocial.get())
            return miServicioSocial.get()
        return null
    },
    domicilio: function(){ 
        return `CALLE: ${miServicioSocial.get().alumno.domicilio}, COLONIA:${miServicioSocial.get().alumno.colonia}, CIUDAD:${miServicioSocial.get().alumno.ciudad}, C.P.:${miServicioSocial.get().alumno.cp}`
    },
    fecha: function(){
      return fechaLarga(configuracion.get().configuracion.fechaISS)
    },
    fechaInicio: function(){
      return fechaLarga(miServicioSocial.get().programa.fechaInicio);
    },
    fechaTermino: function(){
      return fechaLarga(miServicioSocial.get().programa.fechaTermino);
    }
})
Template.vistaPreviaCartaCompromisoServicioSocialAlumno.events({
  "click .imprimirSolicitud":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
}) */
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA PARA SUBIR LA SOLICITUD
//*************************************************************************************************************************/
/* Template.uploadCartaCompromisoServicioSocial.onCreated(function(){
  this.autorun(() =>{
    subioCartaCompromisoServicioSocial.set(false)
  })
})
Template.uploadCartaCompromisoServicioSocial.events({
  "change .file-upload-input": function(event, template){
    let file = event.currentTarget.files[0];
    let reader = new FileReader();
    let fileName = Meteor.user().username+" Carta Compromiso de Servicio Social.pdf";
    reader.onload=function(fileLoadEvent){
      let buffer = new Uint8Array(reader.result);
      Meteor.call('fileUpload',fileName,buffer,"CartaCompromisoServicioSocial");
      Meteor.call('subiCartaCompromisoServicioSocial',miServicioSocial.get(),fileName);
    };
      reader.readAsArrayBuffer(file);
      subioCartaCompromisoServicioSocial.set(true);
  },
  "click .cerrar": function(event, template){
      if (subioCartaCompromisoServicioSocial.get()){
          let aviso={encabezado:"Carta compromiso de Servicio Social",aviso:"Ha subido su carta compromiso de servicio social",positivo:true};
          Session.set("aviso",aviso);
      }
      else{
          let aviso={encabezado:"Carta compromiso de Servicio Social",aviso:"No subio archivo",positivo:false};
          Session.set("aviso",aviso);
      }
  }
}) */