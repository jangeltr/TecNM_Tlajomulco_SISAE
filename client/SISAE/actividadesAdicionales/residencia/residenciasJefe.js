let ncAlumno = new ReactiveVar('')
let residencia = new ReactiveVar();
let alumno = new ReactiveVar();
let numOficio = new ReactiveVar();
let nombreDepto = new ReactiveVar();
let nombreJefeDepto = new ReactiveVar();
let subiOficioAsignacionAsesorInternoResidencia = new ReactiveVar();
let subiCartaPresentacion = new ReactiveVar();
let datosDictamenAnteproyectos = new ReactiveVar();
let nombreJefeDeptoVinculacion = new ReactiveVar();
let residenciaSeleccionada = new ReactiveVar();
let configuracion = new ReactiveVar();
let resultadosEvaluacion = new ReactiveVar([]);
let num=0
//*************************************************************************************************************************/
//                        CODIGO DE LA PLATILLA DE BARRA DE HERRAMIENTAS RESIDENCIAS JEFES
//*************************************************************************************************************************/
Template.toolBoxResidenciasJefe.events({

});
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA RESIDENCIAS JEFES
//*************************************************************************************************************************/
Template.residenciasJefe.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('residencias',Session.get('periodo'));
        this.subscribe('docentesActivos');
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}))
        }
	});
});
Template.residenciasJefe.helpers({
    residencias: function(){
        return residencias.find({'periodo':Session.get('periodo')})
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")
	},
    tieneAsesorPropuesto: function(){
        if (this?.solicitud?.asesorPropuesto)
            return true
        return false
    },
    tieneSolicitudFirmada: function(){
        if (this?.expedienteInicio?.pathSolicitud)
            return true
        return false
    },
    tieneAnteproyecto: function(){
        if (this?.expedienteInicio?.pathAnteproyecto)
            return true
        return false
    },
    tieneCartaDeTerminacionDeServicioSocial: function(){
        if (this?.expedienteInicio?.pathCartaTerminacionServicioSocial)
            return true
        return false
    },
    tieneCartaDePresentacion: function(){
        if (this?.expedienteInicio?.pathCartaPresentacion)
            return true
        return false
    },
    tieneCartaDePresentacionFirmada: function(){
        if (this?.expedienteInicio?.pathCartaPresentacionFirmada)
            return true
        return false
    },
    tieneCartaDeAceptacion: function(){
        if (this?.expedienteInicio?.pathCartaAceptacion)
            return true
        return false
    },
    tieneOficioAsignacionAsesorInterno: function(){
        if (this?.asesor?.pathOficioAsignacion)
            return true
        return false
    },
    dictamen:function(){
        if (this?.solicitud?.dictamen=="Aceptado")
            return true
        return false
    },
    tienePrimerEvaluacionSeguimiento:function(){
        if (this?.expedienteEvaluacion?.pathPrimeraEvaluacion)
            return true
        return false
    },
    tieneSegundaEvaluacionSeguimiento:function(){
        if (this?.expedienteEvaluacion?.pathSegundaEvaluacion)
            return true
        return false
    },
    tieneTercerEvaluacionSeguimiento:function(){
        if (this?.expedienteEvaluacion?.pathTercerEvaluacion)
            return true
        return false
    },
    tieneInformeTecnico:function(){
        if (this?.expedienteEvaluacion?.pathInformeTecnico)
            return true
        return false
    },
    tieneCartaTerminacion:function(){
        if (this.pathCartaTerminacionResidencia)
        return true
    return false
    },
    tieneEvaluacion1_soyAsesor:function(){
        if ((this.evaluacionFecha1)||(Meteor.userId()==this?.asesor?._id))
            return true
        return false
    },
    tieneEvaluacion2_soyAsesor:function(){
        if ((this.evaluacionFecha2)||(Meteor.userId()==this?.asesor?._id))
            return true
        return false
    },
    tieneEvaluacion3_soyAsesor:function(){
        if ((this.evaluacionFecha3)||(Meteor.userId()==this?.asesor?._id))
            return true
        return false
    }
}); 
Template.residenciasJefe.events({
    "keyup .myTxtBoxFiltroResidencias":function(){
		let filtro = $("#myFiltroResidencias")
		let value  = filtro.val().toLowerCase()
        $("#myResidencias division").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    },
    "click .asignarAsesorInterno":function(){
        residencia.set(this)
    },
    "click .datosAlumno":function(){
        ncAlumno.set(this?.residente?.nc)
    },
    "click .generarOficioAsesorInterno":function(){
        residencia.set(this)
    },
    "click .subirOficioAsesorInterno":function(){
        residencia.set(this)
    },
    "click .generarCartaPresentacion":function(){
        residencia.set(this)
        Meteor.call('idUsuarioDelRole','Depto de Gestion Tecnologica y Vinculacion',function(error,result){
			if (error) 
				alert("error")
			else  if (result){
                let jefe=Meteor.users.findOne({_id:result})
                nombreJefeDeptoVinculacion.set(jefe.profile.name)
            }
		})
    },
    "click .subirCartaPresentacion":function(){
        residencia.set(this)
    },
    "click .dictaminarAnteproyecto":function(){
        residencia.set(this)
    },
    "click .modificarTituloAnteproyecto":function(){
        residencia.set(this)
    },
    "click .eliminarResidencia":function(){
        residencia.set(this)
        Meteor.call('eliminarResidenciaProfesional',residencia.get())
        let aviso={encabezado:"Residencia Profesional",aviso:"Ha la residencia profesional",positivo:true}
        Session.set("aviso",aviso)
    },
    "click .eliminarDocumento":function(){
        residenciaSeleccionada.set(this)
    },
    "click .verPlanActividades":function(){
        residenciaSeleccionada.set(this)
    },
    "click .verRealizacionActividades":function(){
        residenciaSeleccionada.set(this)
    },
    "click .verEvaluacion1":function(){
        residenciaSeleccionada.set(this)
        if (residenciaSeleccionada.get().evaluacionFecha1)
            resultadosEvaluacion.set(Object.values(residenciaSeleccionada.get().evaluacionFecha1))
        else
            resultadosEvaluacion.set("")
    },
    "click .verEvaluacion2":function(){
        residenciaSeleccionada.set(this)
        if (residenciaSeleccionada.get().evaluacionFecha2)
            resultadosEvaluacion.set(Object.values(residenciaSeleccionada.get().evaluacionFecha2))
        else
            resultadosEvaluacion.set("")
    },
    "click .verEvaluacion3":function(){
        residenciaSeleccionada.set(this)
        if (residenciaSeleccionada.get().evaluacionFecha3)
            resultadosEvaluacion.set(Object.values(residenciaSeleccionada.get().evaluacionFecha3))
        else
            resultadosEvaluacion.set("")
    },
    "click .sendeMail":function(){
		let email= {
			from:Meteor.user()?.emails[0]?.address,
			to:this?.residente?.email,
			subject:"TecNM-Tlajomulco (Residencias Profesionales)"
		}
		Session.set("sendeMail",email)
    },
    "click .expandirActividad":function(){
        let e=document.getElementById('div'+this._id)
        e.classList.toggle("border-top")
        e.classList.toggle("border-left")
        e.classList.toggle("border-right")
        e.classList.toggle("border-info")
        e.classList.toggle("bg-light")
        e.classList.toggle("font-weight-bold")
    }
});
//*************************************************************************************************************************/
//                                 CODIGO DE LA PLATILLA AGREGAR ASESOR INTERNO
//*************************************************************************************************************************/
Template.addAsesorInterno.events({
    "click .asignarAsesorInterno":function(){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            Meteor.call('asignarAsesorInterno',residencia.get()._id,doc._id,doc.profile.name);
            let aviso={encabezado:"Residencias",aviso:`Se asigno asesor interno`,positivo:true}
            Session.set("aviso",aviso)
        }else{
            let aviso={encabezado:"Residencias",aviso:`No se asigno asesor interno, Docente inactivo o inexistente`,positivo:false}
            Session.set("aviso",aviso)
        }
    },
    "click .cancelar":function(){
        let aviso={encabezado:"Residencias",aviso:`No se asigno asesor interno`,positivo:false}
        Session.set("aviso",aviso)
    }
})
//*************************************************************************************************************************/
//                                        MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoEnResidencias.onCreated(function(){
	this.autorun(() =>{
        Meteor.call('getAlumno',ncAlumno.get(),function(error,result){
                if (error) 
                    alert("error");
                else  if (result)
                    alumno.set(result);
            })
	});
});
Template.showDatosAlumnoEnResidencias.helpers({
	foto:function(){
		if (alumno.get()?.profile?.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+ncAlumno.get()+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	},
	alumnoDatos:function(){
        return alumno.get();
	},
	eMailAlumno:function(){
        if (alumno.get()?.emails)
            return alumno.get().emails[0].address;
        return ""
	}
});
//*************************************************************************************************************************/
//                       PLANTILLA PARA LA VISTA PREVIA DEL OFICIO DE ASIGNACION DE ASESOR INTERNO
//*************************************************************************************************************************/
Template.vistaPreviaOficioAsesorInterno.helpers({
    residencia:function(){
        return residencia.get();
    },
    numOficio:function(){
        return numOficio.get();
    },
    nombreDepto:function(){
        return nombreDepto.get();
    },
    nombreJefeDepto:function(){
        return nombreJefeDepto.get();
    },
    fecha:function(){
        let f = new Date(configuracion.get()?.configuracion?.fechaOAA)
        let month = f.getUTCMonth() + 1; //months from 1-12
		let day = f.getUTCDate()
		let year = f.getUTCFullYear()
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		let fe=day+" de "+meses[month-1]+" del año "+year
		return fe;
    },
});
Template.vistaPreviaOficioAsesorInterno.events({
    "click .imprimirOficioAsesorInterno":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
});
//*************************************************************************************************************************/
//                   PLANTILLA PARA LA SOLICITUD DEL NUMERO DE OFICIO DE ASIGNACION DE ASESOR INTERNO
//*************************************************************************************************************************/
Template.solicitudNumOficioAsignacionAsesor.rendered = function() {
    Meteor.typeahead.inject();
};
Template.solicitudNumOficioAsignacionAsesor.helpers({
    docente:function(){
        return Meteor.users.find().fetch().map(function(it){return it.profile.name})
    }
})
Template.solicitudNumOficioAsignacionAsesor.events({
    "click .generarOficioAsesorInterno":function(){
        numOficio.set(document.getElementById("numOficio").value);
        nombreDepto.set(document.getElementById("nombreDepto").value);
        nombreJefeDepto.set(document.getElementById("findJefeDepto").value)
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaOficioAsesorInterno"});
    }
});
//*************************************************************************************************************************/
//                      CODIGO DE LA PLATILLA PARA SUBIR EL OFICIO DE ASIGNACION DE ASESOR INTERNO
//*************************************************************************************************************************/
Template.uploadOficioAsignacionAsesorInterno.events({
    "click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFileOficioAsignacionAsesorInternoResidencia")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0]
		let reader = new FileReader()
        let fileName = residencia.get()?.residente?.nc+" Oficio asignacion asesor interno.pdf"
		reader.onload=function(fileLoadEvent){
            let txtFileName=document.getElementById("txtFileNameOficioAsignacionAsesorInternoResidencia")
			txtFileName.classList.remove("text-danger")
			txtFileName.classList.add("text-success")
			txtFileName.innerHTML = file.name
			document.getElementById("imgCargoOficioAsignacionAsesorInternoResidencia").style.display = "inline"
			let buffer = new Uint8Array(reader.result)
			Meteor.call('fileUpload',fileName,buffer,"AsesorInternoResidencia")
            Meteor.call('subiOficioAsignacionAsesorInternoResidencia',residencia.get()._id,fileName)
		};
        reader.readAsArrayBuffer(file)
        subiOficioAsignacionAsesorInternoResidencia.set(true)
    },
    "click .btnCerrar": function(event, template){
        let txtFileName=document.getElementById("txtFileNameOficioAsignacionAsesorInternoResidencia")
		txtFileName.classList.remove("text-success")
		txtFileName.classList.add("text-danger")
		txtFileName.innerHTML = "Sin archivo"
		document.getElementById("imgCargoOficioAsignacionAsesorInternoResidencia").style.display = "none"
        if (subiOficioAsignacionAsesorInternoResidencia.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido el oficio de asignación de asesor interno de residencia",positivo:true};
            Session.set("aviso",aviso)
            subiOficioAsignacionAsesorInternoResidencia.set(false)
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false}
            Session.set("aviso",aviso)
        }
    }
});
//*************************************************************************************************************************/
//                   PLANTILLA PARA LA SOLICITUD DEL NUMERO DE OFICIO DE LA CARTA DE PRESENTACION
//*************************************************************************************************************************/
Template.solicitudNumOficioCartaPresentacion.events({
    "click .generarCartaPresentacion":function(){
        numOficio.set(document.getElementById("numOficioCP").value);
        Meteor.call('addNumOfCartaPresentacion',residencia.get()._id,document.getElementById("numOficioCP").value)
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaCartaPresentacion"});
    }
});
//*************************************************************************************************************************/
//                          PLANTILLA PARA LA VISTA PREVIA DE LA CARTA DE PRESENTACION
//*************************************************************************************************************************/
Template.vistaPreviaCartaPresentacion.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('docentesActivos');
	});
});
Template.vistaPreviaCartaPresentacion.helpers({
    residencia:function(){
        return residencia.get();
    },
    numOficio:function(){
        return numOficio.get();
    },
    fecha:function(){
        let f = new Date(configuracion.get()?.configuracion?.fechaCP);
        let month = f.getUTCMonth() + 1; //months from 1-12
		let day = f.getUTCDate();
		let year = f.getUTCFullYear();
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		let fe=day+" de "+meses[month-1]+" del año "+year;
		return fe;
    },
    jefeDepto:function(){
        return nombreJefeDeptoVinculacion.get();
    }
});
Template.vistaPreviaCartaPresentacion.events({
    "click .imprimirOficioAsesorInterno":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
        document.getElementById("btnRegresarResidencias").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
        document.getElementById("btnRegresarResidencias").style.visibility = "visible";
	},
    "click .regresarResidencias":function(){
        BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeResidencias"});
    }
});
//*************************************************************************************************************************/
//                           CODIGO DE LA PLATILLA PARA SUBIR LA CARTA DE PRESENTACION
//*************************************************************************************************************************/
Template.uploadCartaPresentacion.events({
    "click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFileCartaPresentacionResidencia")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0]
		let reader = new FileReader()
        let fileName = residencia.get()?.residente?.nc+" Carta de presentacion.pdf"
		reader.onload=function(fileLoadEvent){
            let txtFileName=document.getElementById("txtFileNameCartaPresentacionResidencia")
			txtFileName.classList.remove("text-danger")
			txtFileName.classList.add("text-success")
			txtFileName.innerHTML = file.name
			document.getElementById("imgCargoCartaPresentacionResidencia").style.display = "inline"
			let buffer = new Uint8Array(reader.result)
			Meteor.call('fileUpload',fileName,buffer,"CartaPresentacionResidencia")
            Meteor.call('subiCartaPresentacion',residencia.get()._id,fileName)
		};
        reader.readAsArrayBuffer(file);
        subiCartaPresentacion.set(true);
    },
    "click .btnCerrar": function(event, template){
        let txtFileName=document.getElementById("txtFileNameCartaPresentacionResidencia")
		txtFileName.classList.remove("text-success")
		txtFileName.classList.add("text-danger")
		txtFileName.innerHTML = "Sin archivo"
		document.getElementById("imgCargoCartaPresentacionResidencia").style.display = "none"
        if (subiCartaPresentacion.get()){
            let aviso={encabezado:"Residencia Profesional",aviso:"Ha subido la crata de presentación",positivo:true}
            Session.set("aviso",aviso)
            subiCartaPresentacion.set(false)
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false}
            Session.set("aviso",aviso)
        }
    }
});
//*************************************************************************************************************************/
//                              CODIGO DE LA PLATILLA PARA DICTAMINAR EL PROYECTO
//*************************************************************************************************************************/
Template.dictaminarAnteproyecto.helpers({
    observaciones:function(){
        return residencia.get()?.solicitud?.observaciones
    },
    aceptado:function(){
        if (residencia.get()?.solicitud?.dictamen=="Aceptado")
            return "selected"
        return ""
    },
    rechazado: function(){
        if (residencia.get()?.solicitud?.dictamen=="Rechazado")
            return "selected"
        return ""
    }
})
Template.dictaminarAnteproyecto.events({
    "click .asignarDictamen":function(){
        let dictamen=document.getElementById("dictamenAnteproyectoResidencia").value
        let observaciones=document.getElementById("observacionesAnteproyectoResidencia").value
        Meteor.call('updateDictamenResidenciaProfesional',residencia.get()._id,dictamen,observaciones);
        let aviso={encabezado:"Residencia Profesional",aviso:"Ha dictaminado el anteproyecto de residencia",positivo:true};
        Session.set("aviso",aviso);
    }
});
//*************************************************************************************************************************/
//                     PLANTILLA PARA LA VISTA PREVIA DEL REPORTE DICTAMEN DE ACTEPROYECTOS
//*************************************************************************************************************************/
Template.vistaPreviaReporteDictamenAnteproyectos.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('residencias',Session.get('periodo'));
	});
});
Template.vistaPreviaReporteDictamenAnteproyectos.helpers({
    residenciasProfesionalesAceptadas: function(){
        num = 0
        return residencias.find({'solicitud.dictamen':'Aceptado','solicitud.carrera':datosDictamenAnteproyectos.get().nombreCarrera})
    },
    datosDictamenAnteproyectos: function(){
        return datosDictamenAnteproyectos.get();
    },
    periodo: function(){
        return Session.get('periodo');
    },
    fecha: function(){
        let f = new Date(configuracion.get()?.configuracion?.fechaD);
        let month = f.getUTCMonth() + 1; //months from 1-12
		let day = f.getUTCDate();
		let year = f.getUTCFullYear();
		let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		return day+" de "+meses[month-1]+" del año "+year;
    },
    No: function(){
        num=num+1
        return num
    }
});
Template.vistaPreviaReporteDictamenAnteproyectos.events({
    "click .imprimirDictamenAnteproyectos":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
});
//*************************************************************************************************************************/
//                 PLANTILLA PARA LA SOLICITUD DE LOS DATOS DEL REPORTE DICTAMEN DE ANTEPROYECTOS
//*************************************************************************************************************************/
Template.solicitudDatosDictamenAnteproyecto.rendered = function() {
    Meteor.typeahead.inject();
};
Template.solicitudDatosDictamenAnteproyecto.helpers({
    docente:function(){
        return Meteor.users.find().fetch().map(function(it){return it.profile.name})
    }
})
Template.solicitudDatosDictamenAnteproyecto.events({
    "click .generarDictamenAnteproyectos":function(){
        let datos={}
        datos.nombreDepto = document.getElementById("nombreDeptoAcademico").value;
        datos.nombrePresidenteAcademia = document.getElementById("nombrePresidenteAcademia").value;
        datos.nombreJefeDepto = document.getElementById("nombreJefeDepto").value;
        datos.nombreSubdirectorAcedemico = document.getElementById("nombreSubdirectorAcedemico").value;
        datos.nombreCarrera = document.getElementById("nombreCarrera").value;
        datosDictamenAnteproyectos.set(datos);
        BlazeLayout.render("impresion",{rellena2:"vistaPreviaReporteDictamenAnteproyectos"});
    }
});
//*************************************************************************************************************************/
//                               VER EL SEGUIMIENTO DE LA RESIDENCIA DEL ALUMNO 
//*************************************************************************************************************************/
Template.verSeguimientoResidenciasAlumno.helpers({
    tieneDictamenAceptado: function(){
        if (residenciaSeleccionada.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        else 
            return false;
    },
    alumno:function(){
        return residenciaSeleccionada.get()?.residente?.nombre;
    },
    actividades: function (){
        return residenciaSeleccionada.get()?.seguimiento?.planeacion;
    },
    planeacionAceptada: function(){
        return residenciaSeleccionada.get()?.seguimiento?.planeacionAceptada;
    },
    planeacionAceptadaChecked:function(){
        if (residenciaSeleccionada.get()?.seguimiento?.planeacionAceptada)
            return "checked"
        return ""
    },
    soyElAsesor: function(){
        if (residenciaSeleccionada.get()?.asesor?._id==Meteor.userId())
            return true;
        return false;
    },
    nAct: function(){
        return this.numActividad;
    },
    semana1: function(){
        return this.semana1;
    },
    semana2: function(){
        return this.semana2;
    },
    semana3: function(){
        return this.semana3;
    },
    semana4: function(){
        return this.semana4;
    },
    semana5: function(){
        return this.semana5;
    },
    semana6: function(){
        return this.semana6;
    },
    semana7: function(){
        return this.semana7;
    },
    semana8: function(){
        return this.semana8;
    },
    semana9: function(){
        return this.semana9;
    },
    semana10: function(){
        return this.semana10;
    },
    semana11: function(){
        return this.semana11;
    },
    semana12: function(){
        return this.semana12;
    },
    semana13: function(){
        return this.semana13;
    },
    semana14: function(){
        return this.semana14;
    },
    semana15: function(){
        return this.semana15;
    },
    semana16: function(){
        return this.semana16;
    },
    semana17: function(){
        return this.semana17;
    },
    semana18: function(){
        return this.semana18;
    },
});
Template.verSeguimientoResidenciasAlumno.events({
    "click .registrarAnteproyectoAceptado":function(){
        let checado = document.getElementById("aceptoPlanActividadesJefe").checked;
        Meteor.call('aceptarRechazarPlanActividadesResidencia',residenciaSeleccionada.get()._id,checado);
        let aviso={encabezado:"Residencia Profesional",aviso:"Registro realizado",positivo:true};
        Session.set("aviso",aviso);
    }
})
//*************************************************************************************************************************/
//                         VER LA REALIZACION DE LAS ACTIVIDADES DE LA RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.verRealizacionResidenciasAlumnoEnJefe.helpers({
    tieneDictamenAceptado:function(){
        if (residenciaSeleccionada.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        else 
            return false;
    },
    configuracion:function(){
        return configuracion.get()?.configuracion;
    },
	residencia:function(){
        return residenciaSeleccionada.get();
	},
    VoBoFecha1: function(){
        if (residenciaSeleccionada.get()?.seguimiento?.VoBoFecha1)
            return "Checked";
    },
    VoBoFecha2: function(){
        if (residenciaSeleccionada.get()?.seguimiento?.VoBoFecha2)
            return "Checked";
    },
    VoBoFecha3: function(){
        if (residenciaSeleccionada.get()?.seguimiento?.VoBoFecha3)
            return "Checked";
    },
    actividades: function (){
        return residenciaSeleccionada.get()?.seguimiento?.realizacion;
    },
    nAct: function(){
        return this.numActividad;
    },
    semana1: function(){
        return this.semana1;
    },
    semana2: function(){
        return this.semana2;
    },
    semana3: function(){
        return this.semana3;
    },
    semana4: function(){
        return this.semana4;
    },
    semana5: function(){
        return this.semana5;
    },
    semana6: function(){
        return this.semana6;
    },
    semana7: function(){
        return this.semana7;
    },
    semana8: function(){
        return this.semana8;
    },
    semana9: function(){
        return this.semana9;
    },
    semana10: function(){
        return this.semana10;
    },
    semana11: function(){
        return this.semana11;
    },
    semana12: function(){
        return this.semana12;
    },
    semana13: function(){
        return this.semana13;
    },
    semana14: function(){
        return this.semana14;
    },
    semana15: function(){
        return this.semana15;
    },
    semana16: function(){
        return this.semana16;
    },
    semana17: function(){
        return this.semana17;
    },
    semana18: function(){
        return this.semana18;
    }
});
Template.verRealizacionResidenciasAlumnoEnJefe.events({
    "click .registrarVoBoRealizacion":function(){
        let VoBoFecha1 = document.getElementById("VoBoFecha1J").checked;
        let VoBoFecha2 = document.getElementById("VoBoFecha2J").checked;
        let VoBoFecha3 = document.getElementById("VoBoFecha3J").checked;
        Meteor.call('registrarVoBoRealizacionResidencia',residenciaSeleccionada.get()._id,VoBoFecha1,VoBoFecha2,VoBoFecha3);
        let aviso={encabezado:"Residencia Profesional",aviso:"Registro realizado",positivo:true};
        Session.set("aviso",aviso);
    }
})
//*************************************************************************************************************************/
//                            CONFIGURAR LA RESIDENCIA PROFESIONAL DE ESTE PERIODO 
//*************************************************************************************************************************/
Template.configurarResidencia.helpers({
    periodo:function(){
        return Session.get('periodo');
    },
    fechaD:function(){
        return configuracion.get()?.configuracion?.fechaD
    },
    fecha1:function(){
        return configuracion.get()?.configuracion?.fecha1
    },
    fecha2:function(){
        return configuracion.get()?.configuracion?.fecha2
    },
    fecha3:function(){
        return configuracion.get()?.configuracion?.fecha3
    },
    configurada: function(){
        if (configuracion.get()?.configuracion?.fecha1)
            return true
        return false
    },
    fechaCP:function(){
        return configuracion.get()?.configuracion?.fechaCP
    },
    fechaCA:function(){
        return configuracion.get()?.configuracion?.fechaCA
    },
    fechaCT:function(){
        return configuracion.get()?.configuracion?.fechaCT
    },
    fechaOAA:function(){
        return configuracion.get()?.configuracion?.fechaOAA
    }
})
Template.configurarResidencia.events({
    "click .registrar": function(){
        let configuracion={}
        configuracion.periodo=Session.get('periodo')
        configuracion.fechaD=document.getElementById("fechaD").value
        configuracion.fecha1=document.getElementById("fecha1").value
        configuracion.fecha2=document.getElementById("fecha2").value
        configuracion.fecha3=document.getElementById("fecha3").value
        configuracion.fechaCP=document.getElementById("fechaCP").value
        configuracion.fechaCA=document.getElementById("fechaCA").value
        configuracion.fechaCT=document.getElementById("fechaCT").value
        configuracion.fechaOAA=document.getElementById("fechaOAA").value
        let conf = {}
        conf.configuracion = configuracion
        Meteor.call('registrarFechasSeguimiento',Session.get('periodo'),conf);
        let aviso={encabezado:"Residencia Profesional",aviso:"Registro fechas de seguimiento",positivo:true};
        Session.set("aviso",aviso);
    }
})
//*************************************************************************************************************************/
//                        CAMBIAR EL TITULO DEL ANTEPROYECTO DE RESIDENCIA PROFESIONAL 
//*************************************************************************************************************************/
Template.modificarTituloAnteproyecto.helpers({
    residencia:function(){
        return residencia.get();
    }
})
Template.modificarTituloAnteproyecto.events({
    "click .registrarNuevoTitulo": function(){
        let titulo=document.getElementById("nuevoTituloAnteproyectoResidencia").value
        Meteor.call('cambiarTitutoAnteproyectoResidencia',residencia.get()._id,titulo);
        let aviso={encabezado:"Residencia Profesional",aviso:"Cambio el titulo del anteproyecto de residenc ia",positivo:true};
        Session.set("aviso",aviso);
    }
})
//*************************************************************************************************************************/
//                              VER EL PRIMER SEGUIMIENTO DE RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.verPrimerSeguimientoResidencia.helpers({
    configuracion:function(){
        return configuracion.get()?.configuracion;
    },
	residencia:function(){
        return residenciaSeleccionada.get();
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
    soyAsesor: function(){
        if (Meteor.userId()==residenciaSeleccionada.get()?.asesor?._id)
            return true
        return false
    }
})
Template.verPrimerSeguimientoResidencia.events({
    "click .registrarSeguimiento": function(){
        let evaluacionFecha1={}
        let p1=parseInt(document.getElementById('p1').value)
        let p2=parseInt(document.getElementById('p2').value)
        let p3=parseInt(document.getElementById('p3').value)
        let p4=parseInt(document.getElementById('p4').value)
        let p5=parseInt(document.getElementById('p5').value)
        let p6=parseInt(document.getElementById('p6').value)
        if ((p1>=0 && p1<=10)&&(p2>=0 && p2<=20)&&(p3>=0 && p3<=15)&&(p4>=0 && p4<=20)&&(p5>=0 && p5<=20)&&(p6>=0 && p6<=15)){
            let r=p1+p2+p3+p4+p5+p6
            evaluacionFecha1={
                'Asistió puntualmente a las reuniones de asesoría':p1,
                'Demuestra conocimiento en el área de su especialidad':p2,
                'Trabaja en equipo y se comunica de forma efectiva (oral y escrita)':p3,
                'Es dedicado y proactivo a las actividades encomendadas':p4,
                'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los timpos establecidos en el cronograma':p5,
                'Propone mejoras al proyecto':p6,
                'Calificación Total':r
            }
            Meteor.call('registarEvaluacionSeguimientoFecha1',residenciaSeleccionada.get()._id,evaluacionFecha1)
            let aviso={encabezado:"Residencia Profesional",aviso:"Registró primer evaluación",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"Alguna de las calificicaciones que intenta registrar no están dentro del rango",positivo:false};
            Session.set("aviso",aviso);
        }
    }
})
//*************************************************************************************************************************/
//                                   VER EL SEGUNDO SEGUIMIENTO DE RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.verSegundoSeguimientoResidencia.helpers({
    configuracion:function(){
        return configuracion.get()?.configuracion;
    },
	residencia:function(){
        return residenciaSeleccionada.get();
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
    soyAsesor: function(){
        if (Meteor.userId()==residenciaSeleccionada.get()?.asesor?._id)
            return true
        return false
    }
})
Template.verSegundoSeguimientoResidencia.events({
    "click .registrarSeguimiento": function(){
        let evaluacionFecha2={}
        let p1=parseInt(document.getElementById('pp1').value)
        let p2=parseInt(document.getElementById('pp2').value)
        let p3=parseInt(document.getElementById('pp3').value)
        let p4=parseInt(document.getElementById('pp4').value)
        let p5=parseInt(document.getElementById('pp5').value)
        let p6=parseInt(document.getElementById('pp6').value)
        if ((p1>=0 && p1<=10)&&(p2>=0 && p2<=20)&&(p3>=0 && p3<=15)&&(p4>=0 && p4<=20)&&(p5>=0 && p5<=20)&&(p6>=0 && p6<=15)){
            let r=p1+p2+p3+p4+p5+p6
            evaluacionFecha2={
                'Asistió puntualmente a las reuniones de asesoría':p1,
                'Demuestra conocimiento en el área de su especialidad':p2,
                'Trabaja en equipo y se comunica de forma efectiva (oral y escrita)':p3,
                'Es dedicado y proactivo a las actividades encomendadas':p4,
                'Es ordenado y cumple satisfactoriamente con las actividades encomendadas en los timpos establecidos en el cronograma':p5,
                'Propone mejoras al proyecto':p6,
                'Calificación Total':r
            }
            Meteor.call('registarEvaluacionSeguimientoFecha2',residenciaSeleccionada.get()._id,evaluacionFecha2)
            let aviso={encabezado:"Residencia Profesional",aviso:"Registró segunda evaluación",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"Alguna de las calificicaciones que intenta registrar no están dentro del rango",positivo:false};
            Session.set("aviso",aviso);
        }
    }
})
//*************************************************************************************************************************/
//                                   VER EL TERCER SEGUIMIENTO DE RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.verTercerSeguimientoResidencia.helpers({
    configuracion:function(){
        return configuracion.get()?.configuracion;
    },
	residencia:function(){
        return residenciaSeleccionada.get();
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
    soyAsesor: function(){
        if (Meteor.userId()==residenciaSeleccionada.get()?.asesor?._id)
            return true
        return false
    }
})
Template.verTercerSeguimientoResidencia.events({
    "click .registrarSeguimiento": function(){
        let evaluacionFecha3={}
        let p1=parseInt(document.getElementById('e3pp1').value)
        let p2=parseInt(document.getElementById('e3pp2').value)
        let p3=parseInt(document.getElementById('e3pp3').value)
        let p4=parseInt(document.getElementById('e3pp4').value)
        let p5=parseInt(document.getElementById('e3pp5').value)
        let p6=parseInt(document.getElementById('e3pp6').value)
        let p7=parseInt(document.getElementById('e3pp7').value)
        let p8=parseInt(document.getElementById('e3pp8').value)
        let p9=parseInt(document.getElementById('e3pp9').value)
        let p10=parseInt(document.getElementById('e3pp10').value)
        let p11=parseInt(document.getElementById('e3pp11').value)
        let p12=parseInt(document.getElementById('e3pp12').value)
        let p13=parseInt(document.getElementById('e3pp13').value)
        let p14=parseInt(document.getElementById('e3pp14').value)
        if ((p1>=0 && p1<=2)&&(p2>=0 && p2<=2)&&(p3>=0 && p3<=2)&&(p4>=0 && p4<=2)&&(p5>=0 && p5<=2)&&(p6>=0 && p6<=5)&&(p7>=0 && p7<=5)&&(p8>=0 && p8<=5)&&
        (p9>=0 && p9<=10)&&(p10>=0 && p10<=5)&&(p11>=0 && p11<=40&&(p12>=0 && p12<=15)&&(p13>=0 && p13<=3)&&(p14>=0 && p14<=2))){
            let r=p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14
            evaluacionFecha3={
                'Portada':p1,
                'Agradecimientos':p2,
                'Resumen':p3,
                'Indice':p4,
                'Introducción':p5,
                'Problemas a resolver, priorizándolos':p6,
                'Objetivos':p7,
                'Justificación':p8,
                'Marco teórico':p9,
                'Procedimiento y descripción de las actividades realizadas':p10,
                'Resultados':p11,
                'Conclusiones, recomendaciones y experiencia adquirida':p12,
                'Competencias desarrolladas y/o aplicadas':p13,
                'Fuentes de información':p14,
                'Calificación Total':r
            }
            Meteor.call('registarEvaluacionSeguimientoFecha3',residenciaSeleccionada.get()._id,evaluacionFecha3)
            let aviso={encabezado:"Residencia Profesional",aviso:"Registró tercer evaluación",positivo:true}
            Session.set("aviso",aviso)
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"Alguna de las calificicaciones que intentó registrar no estaban dentro del rango",positivo:false}
            Session.set("aviso",aviso)
        }
    }
})
//*************************************************************************************************************************/
//                                         ELIMINAR ALGUN DOCUMENTO DEL RESIDENTE
//*************************************************************************************************************************/
Template.eliminarDocumento.helpers({
    configuracion:function(){
        return configuracion.get()?.configuracion;
    },
	residencia:function(){
        return residenciaSeleccionada.get();
	},
    tieneSolicitudFirmada: function(){
        if (residenciaSeleccionada.get()?.expedienteInicio?.pathSolicitud)
            return true
        return false
    },
    tieneAnteproyecto: function(){
        if (residenciaSeleccionada.get()?.expedienteInicio?.pathAnteproyecto)
            return true
        return false
    },
    tieneCartaTerminacionServivioSocial: function(){
        if (residenciaSeleccionada.get()?.expedienteInicio?.pathCartaTerminacionServicioSocial)
            return true
        return false
    },
    tieneCartaDePresentacionFirmada: function(){
        if (residenciaSeleccionada.get()?.expedienteInicio?.pathCartaPresentacionFirmada)
            return true
        return false
    },
    tieneCartaDeAceptacion: function(){
        if (residenciaSeleccionada.get()?.expedienteInicio?.pathCartaAceptacion)
            return true
        return false
    },
    tieneOficioAsignacionAsesorInterno: function(){
        if (residenciaSeleccionada.get()?.asesor?.pathOficioAsignacion)
            return true
        return false
    },
    tienePrimerEvaluacionSeguimiento: function(){
        if (residenciaSeleccionada.get()?.expedienteEvaluacion?.pathPrimeraEvaluacion)
            return true
        return false
    },
    tieneSegundaEvaluacionSeguimiento: function(){
        if (residenciaSeleccionada.get()?.expedienteEvaluacion?.pathSegundaEvaluacion)
            return true
        return false
    },
    tieneTercerEvaluacionSeguimiento: function(){
        if (residenciaSeleccionada.get()?.expedienteEvaluacion?.pathTercerEvaluacion)
            return true
        return false
    },
    tieneInformeTecnico:function(){
        if (residenciaSeleccionada.get()?.expedienteEvaluacion?.pathInformeTecnico)
            return true
        return false
    },
    tieneCartaTerminacion:function(){
        if (residenciaSeleccionada.get()?.pathCartaTerminacionResidencia)
            return true
        return false
    },
})
Template.eliminarDocumento.events({
    "click .eliminarSolicitud": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteInicio
        delete exp['pathSolicitud']
        res.expedienteInicio = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarAnteproyecto": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteInicio
        delete exp['pathAnteproyecto']
        res.expedienteInicio = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarCartaTerminacionServivioSocial": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteInicio
        delete exp['pathCartaTerminacionServicioSocial']
        res.expedienteInicio = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarCartaPresentacion": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteInicio
        delete exp['pathCartaPresentacionFirmada']
        res.expedienteInicio = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarCartaAceptacion": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteInicio
        delete exp['pathCartaAceptacion']
        res.expedienteInicio = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarPrimerEvaluacionSeguimiento": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteEvaluacion
        delete exp['pathPrimeraEvaluacion']
        res.expedienteEvaluacion = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarSegundaEvaluacionSeguimiento": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteEvaluacion
        delete exp['pathSegundaEvaluacion']
        res.expedienteEvaluacion = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarTercerEvaluacionSeguimiento": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteEvaluacion
        delete exp['pathTercerEvaluacion']
        res.expedienteEvaluacion = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarInforme": function(){
        let res=residenciaSeleccionada.get()
        let exp=residenciaSeleccionada.get().expedienteEvaluacion
        delete exp['pathInformeTecnico']
        res.expedienteEvaluacion = exp
        residenciaSeleccionada.set(res)
    },
    "click .eliminarCartaTerminacion": function(){
        let res=residenciaSeleccionada.get()
        delete res['pathCartaTerminacionResidencia']
        residenciaSeleccionada.set(res)
    },
    "click .registrarCambios": function(){
        let aviso={encabezado:"Residencia Profesional",aviso:"Cambios Registrados",positivo:true};
        Session.set("aviso",aviso);
        Meteor.call('registrarDoctosEliminadosExpediente',residenciaSeleccionada.get())
    }
})




//*************************************************************************************************************************/
//                PLATILLA RESIDENCIAS JEFES DEL DEPARTAMENTO DE GESTION TECNOLOGICA Y VINCULACION
//*************************************************************************************************************************/
Template.residenciasJefeDeptoGestionTecnologicaVinculacion.onCreated(function(){
    this.autorun(() =>{
        this.subscribe('residencias',Session.get('periodo'));
        this.subscribe('docentesActivos');
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}))
        }
	});
});
Template.residenciasJefeDeptoGestionTecnologicaVinculacion.helpers({
    residencias: function(){
        return residencias.find({'periodo':Session.get('periodo')});
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    tieneSolicitudFirmada: function(){
        if (this?.expedienteInicio?.pathSolicitud)
            return true;
        return false;
    },
    tieneAnteproyecto: function(){
        if (this.expedienteInicio.pathAnteproyecto)
            return true;
        return false;
    },
    tieneCartaDeTerminacionDeServicioSocial: function(){
        if (this.expedienteInicio.pathCartaTerminacionServicioSocial)
            return true
        return false
    },
    tieneConvenioVigente: function(){
        if (this?.solicitud?.convenioVigente)
            return true;
        return false;
    },
    tieneCartaDePresentacion: function(){
        if (this?.expedienteInicio?.pathCartaPresentacion)
            return true;
        return false;
    },
    tieneCartaDePresentacionFirmada: function(){
        if (this?.expedienteInicio?.pathCartaPresentacionFirmada)
            return true;
        return false;
    },
    tieneCartaDeAceptacion: function(){
        if (this?.expedienteInicio?.pathCartaAceptacion)
            return true;
        return false;
    },
    tieneOficioAsignacionAsesorInterno: function(){
        if (this?.asesor?.pathOficioAsignacion)
            return true;
        return false;
    },
    dictamen:function(){
        if (this?.solicitud?.dictamen=="Aceptado")
            return true;
        return false;
    },
    tieneInformeTecnico:function(){
        if (this?.expedienteEvaluacion?.pathInformeTecnico)
            return true
        return false
    }
}); 
Template.residenciasJefeDeptoGestionTecnologicaVinculacion.events({
    "keyup .myTxtBoxFiltroResidencias":function(){
		let filtro = $("#myFiltroResidencias");
		let value  = filtro.val().toLowerCase();
        $("#myResidencias division").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
    "click .datosAlumno":function(){
        ncAlumno.set(this?.residente?.nc)
    },
    "click .checkCV":function(){
        if (this?.solicitud?.convenioVigente)
			Meteor.call('quitarConvenioVigente',this);
		else 
			Meteor.call('ponerConvenioVigente',this);
    },
    "click .generarCartaPresentacion":function(){
        residencia.set(this);
        nombreJefeDeptoVinculacion.set(Meteor.user().profile.name);
    },
    "click .subirCartaPresentacion":function(){
        residencia.set(this);
    },
    "click .verPlanActividades":function(){
        residenciaSeleccionada.set(this);
    },
    "click .verRealizacionActividades":function(){
        residenciaSeleccionada.set(this);
    },
    "click .verEvaluacion1":function(){
        residenciaSeleccionada.set(this);
        if (residenciaSeleccionada.get().evaluacionFecha1)
            resultadosEvaluacion.set(Object.values(residenciaSeleccionada.get().evaluacionFecha1))
        else
            resultadosEvaluacion.set("");
    },
    "click .verEvaluacion2":function(){
        residenciaSeleccionada.set(this);
        if (residenciaSeleccionada.get().evaluacionFecha2)
            resultadosEvaluacion.set(Object.values(residenciaSeleccionada.get().evaluacionFecha2))
        else
            resultadosEvaluacion.set("");
    },
    "click .verEvaluacion3":function(){
        residenciaSeleccionada.set(this);
        if (residenciaSeleccionada.get().evaluacionFecha3)
            resultadosEvaluacion.set(Object.values(residenciaSeleccionada.get().evaluacionFecha3))
        else
            resultadosEvaluacion.set("");
    },
    "click .sendeMail":function(){
        let email= {
			from:Meteor.user()?.emails[0]?.address,
			to:this?.residente?.email,
			subject:"TecNM-Tlajomulco (Residencias Profesionales)"
		}
		Session.set("sendeMail",email)
    },
    "click .expandirActividad":function(){
        let e=document.getElementById('div'+this._id)
        e.classList.toggle("bg-secondary")
        e.classList.toggle("text-white")
        e.classList.toggle("font-weight-bold")
    }
});