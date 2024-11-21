//*************************************************************************************************************************/
//                                           PARA LA PLANTILLA CATCARRERAS
//*************************************************************************************************************************/
Template.catCarreras.helpers({
    carrera:function(){
		return Session.get("carrera");
    },
	carreras:function(){
		return optCarreras;
	}
}); 
Template.catCarreras.events({
	"change .select":function(event){
		let c = event.currentTarget;
		Session.set("carrera",c.options[c.selectedIndex].value);
	}
});
//*************************************************************************************************************************/
//                                           PARA LA PLANTILLA CATMODULOS
//*************************************************************************************************************************/
Template.catModulos.helpers({
    modulo:function(){
		return Session.get("modulo");
    },
	modulos:function(){
		return optModulo;
	}
}); 
Template.catModulos.events({
	"change .select":function(event){
		let c = event.currentTarget;
		Session.set("modulo",c.options[c.selectedIndex].value);
	}
});
//*************************************************************************************************************************/
//                                             PARA LA PLANTILLA PERIODOS
//*************************************************************************************************************************/
Template.catPeriodos.onCreated(function(){
	this.autorun(() => {
        this.subscribe('periodos');
	});
});
Template.catPeriodos.helpers({
	periodos:function(){
		return periodos.find({});
	},
	periodoTutorias: function(){
		return Session.get("periodo");
	}
})
Template.catPeriodos.events({
	"change .select":function(event){
		let c = event.currentTarget;
		Session.set("periodo",c.options[c.selectedIndex].value);
	}
})
//*************************************************************************************************************************/
//                                         PARA LA PLANTILLA STATUS DE ALUMNOS
//*************************************************************************************************************************/
Template.catStatusAlumnos.helpers({
	catStatus:function(){
		return optStatusAlumno;
	},
})
Template.catStatusAlumnos.events({
	"change .select":function(event){
		let c = event.currentTarget;
		Session.set("statusAlumno",c.options[c.selectedIndex].value);
	}
})
//*************************************************************************************************************************/
//                                              PARA LA PLANTILLA AVISOS
//*************************************************************************************************************************/
Template.avisos.helpers({
    encabezado:function(){
		return Session.get("aviso").encabezado;
	},
	aviso:function(){
		return Session.get("aviso").aviso;
	},
	positivo:function(){
		return Session.get("aviso").positivo;
	}
}); 
//*************************************************************************************************************************/
//                           CODIGO DEL TEMPLATE QUE COMPLETA EL NOMBRE DEL DOCENTE AL BUSCAR
//*************************************************************************************************************************/
Template.buscarDocente.rendered = function() {
    Meteor.typeahead.inject();
};
Template.buscarDocente.helpers({
    docente:function(){
        return Meteor.users.find().fetch().map(function(it){return it.profile.name})
    }
});
//*************************************************************************************************************************/
//                           CODIGO DEL TEMPLATE QUE COMPLETA EL NOMBRE DE LA MATERIA A BUSCAR
//*************************************************************************************************************************/
Template.buscarMateria.rendered = function() {
    Meteor.typeahead.inject();
};
Template.buscarMateria.helpers({
    materia:function(){
        return materias.find().fetch().map(function(it){return it.nombre})
    }
});
//*************************************************************************************************************************/
//                                                    ENVIO DE eMAILS
//*************************************************************************************************************************/
Template.sendeMail.helpers({
	from:function(){
		if (Session.get("sendeMail"))
			return Session.get("sendeMail").from
		return ""
	},
    to:function(){
		if (Session.get("sendeMail"))
			return Session.get("sendeMail").to
		return ""
    },
	subject:function(){
		if (Session.get("sendeMail"))
			return Session.get("sendeMail").subject
		return ""
	}
});
Template.sendeMail.events({
	"click .enviar": function(){
		let m=document.getElementById("eMail")
        let eMail = {}
        eMail.from      = m.from.value
        eMail.to        = m.to.value
        eMail.subject   = m.subject.value
        eMail.text  	= m.text.value
        Meteor.call('sendeMail',eMail)
        let aviso={encabezado:"eMails",aviso:"Tu eMail ha sido enviado",positivo:true}
		Session.set("aviso",aviso)
	}
}); 
//*************************************************************************************************************************/
//                                          SAD:     SUBIR HORARIO O REPORTE
//*************************************************************************************************************************/
Template.uploadFileHorarioReporte.helpers({
    titulo:function(){
		if (Session.get("fileUpload")?.titulo)
			return Session.get("fileUpload").titulo
		return ""
	},
	textoBody:function(){
		if (Session.get("fileUpload")?.textoBody)
			return Session.get("fileUpload").textoBody
		return ""
	},
	tipoArchivo:function(){
		if (Session.get("fileUpload")?.tipoArchivo)
			return Session.get("fileUpload").tipoArchivo
		return ""
	}
}); 
Template.uploadFileHorarioReporte.events({
	"click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFile")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0]
		let reader = new FileReader()
		reader.onload=function(fileLoadEvent){
			let txtFileName=document.getElementById("txtFileName")
			txtFileName.classList.remove("text-danger")
			txtFileName.classList.add("text-success")
			txtFileName.innerHTML = file.name
			document.getElementById("imgCargo").style.display = "inline"
			
			let buffer = new Uint8Array(reader.result)
			let fileName = Session.get("fileUpload").periodo+Session.get("fileUpload")?.usuario?.profile?.name+obtenerExtension(file.name)
			Meteor.call('fileUpload',fileName,buffer,Session.get("fileUpload").serverMethodFileUploadType)
			Meteor.call(Session.get("fileUpload").serverMethodAdd,
						Session.get("fileUpload").periodo,
						Session.get("fileUpload").usuario,
						fileName 
			)
		};
		reader.readAsArrayBuffer(file);
	},
	"click .btnCerrar":function(){
		let txtFileName=document.getElementById("txtFileName")
		txtFileName.classList.remove("text-success")
		txtFileName.classList.add("text-danger")
		txtFileName.innerHTML = "Sin archivo"
		document.getElementById("imgCargo").style.display = "none"
	}
}); 
//*************************************************************************************************************************/
//                                          ADMON:     SUBIR FORMATO PARA EL SAD
//*************************************************************************************************************************/
Template.uploadFileFormatoSADenADMON.helpers({
    titulo:function(){
		if (Session.get("fileUpload")?.titulo)
			return Session.get("fileUpload").titulo
		return ""
	},
	textoBody:function(){
		if (Session.get("fileUpload")?.textoBody)
			return Session.get("fileUpload").textoBody
		return ""
	},
	tipoArchivo:function(){
		if (Session.get("fileUpload")?.tipoArchivo)
			return Session.get("fileUpload").tipoArchivo
		return ""
	}
}); 
Template.uploadFileFormatoSADenADMON.events({
	"click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFileFormatoSADenADMON")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0]
		let reader = new FileReader()
		reader.onload=function(fileLoadEvent){
			let txtFileName=document.getElementById("txtFileNameFormatoSADenADMON")
			txtFileName.classList.remove("text-danger")
			txtFileName.classList.add("text-success")
			txtFileName.innerHTML = file.name
			document.getElementById("imgCargoFormatoSADenADMON").style.display = "inline"
			
			let buffer = new Uint8Array(reader.result)
			let fileName = Session.get("fileUpload").filename+obtenerExtension(file.name)
			Meteor.call('fileUpload',fileName,buffer,Session.get("fileUpload").serverMethodFileUploadType)
		};
		reader.readAsArrayBuffer(file);
	},
	"click .btnCerrar":function(){
		let txtFileName=document.getElementById("txtFileNameFormatoSADenADMON")
		txtFileName.classList.remove("text-success")
		txtFileName.classList.add("text-danger")
		txtFileName.innerHTML = "Sin archivo"
		document.getElementById("imgCargoFormatoSADenADMON").style.display = "none"
	}
}); 