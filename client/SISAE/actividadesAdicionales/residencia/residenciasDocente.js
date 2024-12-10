let alumno = new ReactiveVar();
let ncAlumno = new ReactiveVar();
let residencia = new ReactiveVar();
let configuracion = new ReactiveVar();
let resultadosEvaluacion = new ReactiveVar([]);
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA RESIDENCIAS PARA DOCENTES
//*************************************************************************************************************************/
Template.residenciasDocente.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('misResidenciasAsesoradas',Session.get('periodo'),Meteor.userId());
        this.subscribe('configuracionResidencias',Session.get('periodo'))
        if(this.subscriptionsReady()){
            configuracion.set(residencias.findOne({'configuracion.periodo':Session.get('periodo')}))
        }
	});
});
Template.residenciasDocente.helpers({
    residencias: function(){
        return residencias.find({'periodo':Session.get('periodo')});
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    tieneSolicitudFirmada: function(){
        if (this.expedienteInicio?.pathSolicitud)
            return true;
        return false;
    },
    tieneAnteproyecto: function(){
        if (this.expedienteInicio?.pathAnteproyecto)
            return true;
        return false;
    },
    tieneCartaDePresentacionFirmada: function(){
        if (this.expedienteInicio?.pathCartaPresentacionFirmada)
            return true;
        return false;
    },
    tieneCartaDeAceptacion: function(){
        if (this.expedienteInicio?.pathCartaAceptacion)
            return true;
        return false;
    },
    tieneOficioAsignacionAsesorInterno: function(){
        if (this.asesor?.pathOficioAsignacion)
            return true;
        return false;
    },
    dictamen:function(){
        if (this.solicitud?.dictamen=="Aceptado")
            return true;
        return false;
    },
    tienePlaneacion:function(){
        if (this.seguimiento?.planeacion)
            return true
        return false
    },
    tieneRealizacion:function(){
        if (this.seguimiento?.realizacion)
            return true
        return false
    },
    tieneInformeTecnico:function(){
        if (this.expedienteEvaluacion?.pathInformeTecnico)
            return true
        return false
    },
    calificacionTotal:function(){
        if (this.calificacionTotal)
            return this.calificacionTotal
        return "sin calificar"
    }
}); 
Template.residenciasDocente.events({
    "click .datosAlumno":function(){
        ncAlumno.set(this.residente.nc)
    },
    "click .estaResidencia":function(){
        residencia.set(this)
    },
    "click .evaluarPrimerSeguimiento":function(){
        residencia.set(this)
        if (residencia.get().evaluacionFecha1)
            resultadosEvaluacion.set(Object.values(residencia.get().evaluacionFecha1))
        else
            resultadosEvaluacion.set("");
    },
    "click .evaluarSegundoSeguimiento":function(){
        residencia.set(this)
        if (residencia.get().evaluacionFecha2)
            resultadosEvaluacion.set(Object.values(residencia.get().evaluacionFecha2))
        else
            resultadosEvaluacion.set("");
    },
    "click .evaluarTercerSeguimiento":function(){
        residencia.set(this)
        if (residencia.get().evaluacionFecha3)
            resultadosEvaluacion.set(Object.values(residencia.get().evaluacionFecha3))
        else
            resultadosEvaluacion.set("");
    },
    "click .sendeMail":function(){
        residencia.set(this)
    }
});
//*************************************************************************************************************************/
//                                          MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoEnResidenciasDocente.onCreated(function(){
	this.autorun(() =>{
        Meteor.call('getAlumno',ncAlumno.get(),function(error,result){
                if (error) 
                    alert("error");
                else  if (result)
                    alumno.set(result);
            })
	});
});
Template.showDatosAlumnoEnResidenciasDocente.helpers({
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
            return alumno.get().emails[0].address
        return ""
	}
});
//*************************************************************************************************************************/
//                                    VER EL SEGUIMIENTO DE LA RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.verSeguimientoResidenciasAlumnoEnDocente.helpers({
    tieneDictamenAceptado:function(){
        if (residencia.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        return false;
    },
	residencia:function(){
        return residencia.get();
	},
    actividades: function (){
        if (residencia.get()?.seguimiento?.planeacion)
            return residencia.get().seguimiento.planeacion
        return ""
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
    planeacionAceptada: function(){
        if (residencia.get()?.seguimiento?.planeacionAceptada)
            return "checked"
    }
});
Template.verSeguimientoResidenciasAlumnoEnDocente.events({
    "click .registrarAnteproyectoAceptado":function(){
        let checado = document.getElementById("aceptoPlanActividades").checked;
        Meteor.call('aceptarRechazarPlanActividadesResidencia',residencia.get()._id,checado);
        let aviso={encabezado:"Residencia Profesional",aviso:"Registro realizado",positivo:true};
        Session.set("aviso",aviso);
    }
})
//*************************************************************************************************************************/
//                              VER LA REALIZACION DE LAS ACTIVIDADES DE LA RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.verRealizacionResidenciasAlumnoEnDocente.onCreated(function(){
    
})
Template.verRealizacionResidenciasAlumnoEnDocente.onRendered(function(){
    this.autorun(() =>{

	});
})
Template.verRealizacionResidenciasAlumnoEnDocente.onDestroyed(function(){
    
})
Template.verRealizacionResidenciasAlumnoEnDocente.helpers({
    tieneDictamenAceptado:function(){
        if (residencia.get()?.solicitud?.dictamen=="Aceptado")
            return true;
        else 
            return false;
    },
    configuracion:function(){
        if (configuracion.get()?.configuracion)
            return configuracion.get().configuracion
        return ""
    },
	residencia:function(){
        return residencia.get();
	},
    VoBoFecha1: function(){
        return residencia.get().seguimiento.VoBoFecha1
    },
    VoBoFecha2: function(){
        return residencia.get().seguimiento.VoBoFecha2
    },
    VoBoFecha3: function(){
        return residencia.get().seguimiento.VoBoFecha3
    },
    actividades: function (){
        if (residencia.get()?.seguimiento?.realizacion)
        return residencia.get().seguimiento.realizacion
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
Template.verRealizacionResidenciasAlumnoEnDocente.events({
    "click .registrarVoBoRealizacion":function(){
        let VoBoFecha1 = document.getElementById("VoBoFecha1").checked;
        let VoBoFecha2 = document.getElementById("VoBoFecha2").checked;
        let VoBoFecha3 = document.getElementById("VoBoFecha3").checked;
        Meteor.call('registrarVoBoRealizacionResidencia',residencia.get()._id,VoBoFecha1,VoBoFecha2,VoBoFecha3);
        let aviso={encabezado:"Residencia Profesional",aviso:"Registro realizado",positivo:true};
        Session.set("aviso",aviso);
        FlowRouter.go('/sisae/residencias');
        residencia.set("");
    },
    "click .cerrar":function(){
        FlowRouter.go('/sisae/residencias');
        residencia.set("");
    }
})
//*************************************************************************************************************************/
//                                   EVALUAR EL PRIMER SEGUIMIENTO DE RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.evaluarPrimerSeguimientoResidencia.helpers({
    configuracion:function(){
        if (configuracion.get()?.configuracion)
            return configuracion.get().configuracion
        return ""
    },
	residencia:function(){
        return residencia.get();
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
Template.evaluarPrimerSeguimientoResidencia.events({
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
            Meteor.call('registarEvaluacionSeguimientoFecha1',residencia.get()._id,evaluacionFecha1)
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
//                                   EVALUAR EL SEGUNDO SEGUIMIENTO DE RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.evaluarSegundoSeguimientoResidencia.helpers({
    configuracion:function(){
        if (configuracion.get()?.configuracion)
            return configuracion.get().configuracion
        return ""
    },
	residencia:function(){
        return residencia.get();
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
Template.evaluarSegundoSeguimientoResidencia.events({
    "click .registrarSeguimiento": function(){
        let evaluacionFecha1={}
        let p1=parseInt(document.getElementById('pp1').value)
        let p2=parseInt(document.getElementById('pp2').value)
        let p3=parseInt(document.getElementById('pp3').value)
        let p4=parseInt(document.getElementById('pp4').value)
        let p5=parseInt(document.getElementById('pp5').value)
        let p6=parseInt(document.getElementById('pp6').value)
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
            Meteor.call('registarEvaluacionSeguimientoFecha2',residencia.get()._id,evaluacionFecha1)
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
//                                   EVALUAR EL TERCER SEGUIMIENTO DE RESIDENCIA DEL ALUMNO
//*************************************************************************************************************************/
Template.evaluarTercerSeguimientoResidencia.helpers({
    configuracion:function(){
        if (configuracion.get()?.configuracion)
            return configuracion.get().configuracion
        return ""
    },
	residencia:function(){
        return residencia.get();
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
Template.evaluarTercerSeguimientoResidencia.events({
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
            console.log(evaluacionFecha3)
            Meteor.call('registarEvaluacionSeguimientoFecha3',residencia.get()._id,evaluacionFecha3)
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
//                                                    ENVIO DE eMAILS
//*************************************************************************************************************************/
Template.sendeMailResidenciasDocentes.helpers({
	from:function(){
        let u=Meteor.users.findOne({_id:Meteor.userId()})
        if (u.emails)
            return u.emails[0].address
        return ""
	},
    to:function(){
        if (residencia.get()?.residente?.email)
            return residencia.get().residente.email
        return ""
    },
    alumno:function(){
        if (residencia.get()?.residente?.nombre)
            return residencia.get().residente.nombre
        return ""
    }
});
Template.sendeMailResidenciasDocentes.events({
	"click .enviar": function(){
		let m=document.getElementById("eMailResidenciasDocentes")
        let eMail = {}
        eMail.from      = m.from.value
        eMail.to        = m.to.value
        eMail.subject   = m.subject.value
        eMail.text  	= m.text.value
        Meteor.call('sendeMailResidenciasDocentes',eMail)
        let aviso={encabezado:"Residencias",aviso:"Tu eMail ha sido enviado",positivo:true}
		Session.set("aviso",aviso)
	}
}); 