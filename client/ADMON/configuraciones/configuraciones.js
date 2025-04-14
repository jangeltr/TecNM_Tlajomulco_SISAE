let idAreaSisaeSeleccionada = new ReactiveVar('')
//*************************************************************************************************************************/
//                                                 CONFIGURACIONES
//*************************************************************************************************************************/
Template.configuracion.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
			this.subscribe('areasSisae')
			this.subscribe('periodos')
			this.subscribe('docentesActivos')
			this.subscribe('seguridad',idAreaSisaeSeleccionada.get())
			if(this.subscriptionsReady()){
				if (idAreaSisaeSeleccionada.get()=='')
					idAreaSisaeSeleccionada.set(areasSisae.findOne({})._id)
			}
		}	
    })
})
Template.configuracion.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true;
        else
            return false;
    },
    esAdministrador(){
        if (isAdministrador)
            return true
        else
            return false
    },
	periodos: function(){
        return periodos.find({});
	},
	ip:function(){
		return Session.get("ipLocal");
	},
	puerto:function(){
		return Session.get("puerto").substring(1);
	},
	periodoElecto:function(){
		return Session.get("periodo")
	},
	areasSisae:function(){
		return areasSisae.find({})
	},
	permisos: function(){
		return seguridad.findOne({})?.permisos
	}
})
Template.configuracion.events({
    "click .guardar":function(){
        let newPer=document.getElementById('newPer').value;
        Meteor.call('addPeriodo',newPer)
        let aviso={encabezado:"Configuración",aviso:"Ha agregado el ciclo o periodo escolar: "+newPer,positivo:true};
        Session.set("aviso",aviso);
	},
	"click .guardarCicloElecto":function(){
		let newPer=Session.get("periodo");
		Meteor.call('saveCicloElecto',newPer)
		let aviso={encabezado:"Configuración",aviso:"Se ha seleccionado un nuevo periodo de trabajo",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .guardarConfiguracion":function(){
		let newIP=document.getElementById('newIP').value;
		let newPuerto=document.getElementById('newPuerto').value;
		let newPer=Session.get("periodo");
		Meteor.call('saveConfig',newIP,newPuerto,newPer)
		let aviso={encabezado:"Configuración",aviso:"Se ha grabado la nueva configuración",positivo:true};
        Session.set("aviso",aviso);
	},
	"change .selectAreaSisae":function(event){
		let c = event.currentTarget
		idAreaSisaeSeleccionada.set(c.options[c.selectedIndex].value)
	},
	"click .btnAsignarPermiso":function(){
		let docente = Meteor.users.findOne({'profile.name':document.getElementById('findDocenteName').value})
		let permiso = document.getElementById('selectPermiso').value
		if (docente)
		{
			if (seguridad.findOne({'permisos.nombre':docente.profile.name})){
				let aviso={encabezado:"Asignacion de permisos",aviso:"El docente ya tiene permiso en esta area",positivo:false}
				Session.set("aviso",aviso)
			}else{
				Meteor.call('savePermiso',idAreaSisaeSeleccionada.get(),docente,permiso)
				let aviso={encabezado:"Asignacion de permisos",aviso:"Permiso Asignado",positivo:true}
				Session.set("aviso",aviso)
			}
		}
		else{
			let aviso={encabezado:"Asignacion de permisos",aviso:"El docente no existe",positivo:false}
			Session.set("aviso",aviso)
		}
	},
	"click .removePermiso":function(event){
		let c = event.currentTarget
		let idDocente = c.getAttribute('id')
		Meteor.call('removePermiso',idAreaSisaeSeleccionada.get(),idDocente)
	},
	"click .subirFormatoInstrumentacion":function(){
		let mensaje={titulo:"Sube el formato de la instrumentacion",
					textoBody:"Sube el formato en excel",
					tipoArchivo:"xlsx",
					serverMethodFileUploadType:"instrumentacion",
					filename:"Formato Oficial"
				}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoEvidenciaEntrega":function(){
		let mensaje={titulo:"Sube el formato de evidencia de entrega de la instrumentación",
					textoBody:"Sube el formato en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"evidenciaInstrumentacion",
					filename:"Formato evidencia"
				}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoHorario":function(){
		let mensaje={titulo:"Sube el formato del horario",
					textoBody:"Sube el formato en excel",
					tipoArchivo:"xlsx",
					serverMethodFileUploadType:"horario",
					filename:"Formato Oficial"
				}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoR1":function(){
		let mensaje={titulo:"Sube el formato del reporte 1",
					textoBody:"Sube el formato en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte1",
					filename:"Formato Oficial"
		}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoR2":function(){
		let mensaje={titulo:"Sube el formato del reporte 2",
					textoBody:"Sube el formato en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte2",
					filename:"Formato Oficial"
		}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoR3":function(){
		let mensaje={titulo:"Sube el formato del reporte 3",
					textoBody:"Sube el formato en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte3",
					filename:"Formato Oficial"
		}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoRF":function(){
		let mensaje={titulo:"Sube el formato del reporte final",
					textoBody:"Sube el formato en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporteF",
					filename:"Formato Oficial"
		}
		Session.set("fileUpload",mensaje);
	},
	"click .subirFormatoPI":function(){
		let mensaje={titulo:"Sube el formato del reporte de proyecto individual",
					textoBody:"Sube el formato en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reportePI",
					filename:"Formato Oficial"
		}
		Session.set("fileUpload",mensaje);
	},
	"click .guardarFrase":function(){
		let frase = document.getElementById('newFrase').value
		let autor = document.getElementById('newAutor').value
		Meteor.call('saveFrase',frase,autor)
		let aviso={encabezado:"Frase motivadora",aviso:"Agregada",positivo:true}
		Session.set("aviso",aviso)
	}
})