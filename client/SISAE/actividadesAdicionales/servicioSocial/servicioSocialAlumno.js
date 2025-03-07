let miSS = {}
let tipoPrograma = {}
let miServicioSocial = new ReactiveVar()
let subioSolicitudServicioSocial = new ReactiveVar()
let subioCartaCompromisoServicioSocial = new ReactiveVar()

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
        if (miServicioSocial.get()._id)
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
    foto:function(){
      if (Meteor.user().profile.foto)
          return true
      return false
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
        return 'No ha registrado un correo electrónico en su cuenta (POR FAVOR VALLA A "MI PERFIL" Y REGISTRE UNO)'
    },
    miServicioSocial: function(){
        if (miServicioSocial.get()._id)
            return miServicioSocial.get()
        return null
    },
    fechaInicio: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaInicio
      return fechaLarga(new Date())
    },
    fechaCartaPresentacion: function(){
      if (miServicioSocial.get()?._id) 
        return miServicioSocial.get().programa.fechaCartaPresentacion
      let fecha = new Date()
      return fechaLarga(fecha.setDate(fecha.getDate()+2))
    },
    fechaCartaAceptacion: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaCartaAceptacion
      let fecha = new Date()
      return fechaLarga(fecha.setDate(fecha.getDate()+3))
    },
    fechaPrimerSeguimiento: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaPrimerSeguimiento
      let fecha = new Date()
      return fechaLarga(fecha.setMonth(fecha.getMonth()+2))
    },
    fechaSegundoSeguimiento: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaSegundoSeguimiento
      let fecha = new Date()
      return fechaLarga(fecha.setMonth(fecha.getMonth()+4))
    },
    fechaTercerSeguimiento: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaTercerSeguimiento
      let fecha = new Date()
      return fechaLarga(fecha.setMonth(fecha.getMonth()+6))
    },
    fechaReporteFinal: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaReporteFinal
      let fecha = new Date()
      return fechaLarga(fecha.setMonth(fecha.getMonth()+6))
    },
    fechaCartaTerminacion: function(){
      if (miServicioSocial.get()?._id)
        return miServicioSocial.get().programa.fechaCartaTerminacion
      let fecha = new Date()
      fecha.setMonth(fecha.getMonth()+6)
      return fechaLarga(fecha.setDate(fecha.getDate()+2))
    },
    tieneRegistradaSolicitud: function(){
        if (miServicioSocial.get()?._id)
            return true
        return false
    },
    yaSubioSolicitud: function(){
      if (miServicioSocial.get()?.expedienteInicio?.pathSolicitud)
          return true
      return false
    },
    seAceptoSolictud: function(){
      if (miServicioSocial.get()?.solicitud?.dictamen=='Aceptada')
          return true
      return false
    },
    ip:function(){
      return Session.get("ipLocal")+Session.get("puerto")
    },
})
Template.solicitudServicioSocialAlumno.events({
  "click .imprimirSolicitud":function(){
    BlazeLayout.render("impresion",{rellena2:"vistaPreviaSolicitudServicioSocialAlumno"});
	},
  "click .establecerFoto":function(){
    FlowRouter.redirect('/sisae/miPerfil');
  },
  "click .agregar":function(event){
        let doc=document.getElementById("solicitudServicioSocialForm");
        let SS = {}
        if (!Meteor.user().emails){
          let aviso={encabezado:"Error",aviso:'No cuentas con una cuenta de correo electrónico, por favor registralo en "Mi perfil"',positivo:false}
          Session.set("aviso",aviso)
        }
        else{
          SS.periodo = Session.get('periodo')
          SS.alumno = {}
          SS.alumno._id = Meteor.userId()
          SS.alumno.nc = Meteor.user().username
          SS.alumno.nombre = Meteor.user().profile.name
          SS.alumno.sexo = Meteor.user().profile.sexo
          SS.alumno.carrera = Meteor.user().profile.carrera
          SS.alumno.semestre = Meteor.user().profile.semestre
          SS.alumno.telefono = Meteor.user().profile.telefono
          SS.alumno.email = Meteor.user().emails[0].address
          SS.alumno.domicilio = doc.domicilioAlumno.value
          SS.alumno.colonia = doc.coloniaAlumno.value
          SS.alumno.ciudad = doc.ciudadAlumno.value
          SS.alumno.cp = doc.CPAlumno.value
          SS.programa = {}
          let fecha = new Date()
          SS.programa.fechaInicio = fechaLarga(fecha)
          SS.programa.fechaCartaPresentacion = fechaLarga(new Date().setDate(fecha.getDate()+2))
          SS.programa.fechaCartaAceptacion = fechaLarga(new Date().setDate(fecha.getDate()+3))
          SS.programa.fechaPrimerSeguimiento = fechaLarga(new Date().setMonth(fecha.getMonth()+2))
          SS.programa.fechaSegundoSeguimiento = fechaLarga(new Date().setMonth(fecha.getMonth()+4))
          SS.programa.fechaTercerSeguimiento = fechaLarga(new Date().setMonth(fecha.getMonth()+6))
          SS.programa.fechaReporteFinal = fechaLarga(new Date().setMonth(fecha.getMonth()+6))
          fecha.setMonth(fecha.getMonth()+6)
          SS.programa.fechaCartaTerminacion = fechaLarga(fecha.setDate(fecha.getDate()+2))
          SS.programa.dependenciaOficial = doc.dependenciaOficial.value
          SS.programa.titularDependencia = doc.titularDependencia.value
          SS.programa.puestoTitularDependencia = doc.puestoTitularDependencia.value
          SS.programa.domicilioDependencia = doc.domicilioDependencia.value
          SS.programa.nombrePrograma = doc.nombrePrograma.value
          SS.programa.modalidad = doc.modalidad.value
          SS.programa.tipoPrograma = doc.tipoPrograma.value
          SS.programa.actividades = doc.actividades.value
          miServicioSocial.set(SS)
          let aviso={encabezado:"Servivio Social",aviso:"Tu solicitud ha sido registrada",positivo:true}
          Session.set("aviso",aviso)
          
          Meteor.call('addServicioSocial',SS)
        } 
	}
})

//*************************************************************************************************************************/
//                         VISTA PREVIA SOLICITUD SERVICIO SOCIAL ALUMNOS
//*************************************************************************************************************************/
Template.vistaPreviaSolicitudServicioSocialAlumno.onCreated(function(){
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
      if (Meteor.user().profile?.foto)
          return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+Meteor.user().username+".jpg" 
      return null//Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg"; 
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
    document.getElementById("btnRegresarServicioSocialAlumno").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
    document.getElementById("btnRegresarServicioSocialAlumno").style.visibility = "visible";
	},
  "click .regresarServicioSocial":function(){
        BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"solicitudServicioSocialAlumno"});
    }
}) 
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA PARA SUBIR LA SOLICITUD
//*************************************************************************************************************************/
Template.uploadSolicitudServicioSocial.onCreated(function(){
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
})
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
//                           CODIGO DE LA PLATILLA PARA SUBIR LA CARTA COMPROMISO
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