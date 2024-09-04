let docente = new ReactiveVar();
//*************************************************************************************************************************/
//                                              CONSTANCIAS DE TERMINACION
//*************************************************************************************************************************/
Template.constanciaTerminacion.onCreated(function(){
	this.autorun(() => {
		if (Session.get("isAdministrador")||Session.get("isJefe")){
			this.subscribe('docentesActivos');
			this.subscribe('constanciaTerminacion',Session.get("periodo"));
		}
		else
			this.subscribe('miConstanciaTerminacion',Meteor.userId(),Session.get("periodo"));
	});
});
Template.constanciaTerminacion.helpers({
    esDocente:function(){
        if (isDocente()) 
            return true
        return false
    },
    esJefe: function(){
        if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true
        return false
    },
	listaDocentes: function(){
		return Meteor.users.find({},{sort:{"profile.name":1}})
    },
    tieneConstanciaTerminacion: function(){
		let a;
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			a=constanciaTerminacion.find({'periodo':Session.get("periodo"),'idDocente':this._id}).count()
		else
			a=constanciaTerminacion.find({}).count()
		if (a>0)
            return true
        return false
    },
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	path:function(){
		let a;
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			a=constanciaTerminacion.findOne({'periodo':Session.get("periodo"),'idDocente':this._id})
		else
			a=constanciaTerminacion.findOne({})
		if (a)
            return a.path
        return false
	}
}); 
Template.constanciaTerminacion.events({
	"keyup .myTxtBoxConstanciaTerminacion":function(){
		let filtro = $("#myFiltroConstanciaTerminacion");
		let value  = filtro.val().toLowerCase();
        $("#myTableConstanciaTerminacion tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	},
	"click .subir":function(){
        docente.set(this)
    }
});
//*************************************************************************************************************************/
//                                           SUBE CONSTANCIAS DE TERMINACION
//*************************************************************************************************************************/
Template.uploadConstanciaTerminacionJefe.helpers({
	periodo: function(){
        return Session.get("periodo");
    },
    docente: function(){
        return docente.get()?.profile.name;
    }
}); 
Template.uploadConstanciaTerminacionJefe.events({
	"click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFileConstanciaTerminacion")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		let u=docente.get();
		reader.onload=function(fileLoadEvent){
			let txtFileName=document.getElementById("txtFileNameConstanciaTerminacion")
			txtFileName.classList.remove("text-danger")
			txtFileName.classList.add("text-success")
			txtFileName.innerHTML = file.name
			document.getElementById("imgCargoConstanciaTerminacion").style.display = "inline"

			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get("periodo")+u.profile.name+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'constanciaTerminacion');
			Meteor.call('addConstanciaTerminacion',Session.get("periodo"),u,fileName);
		};
		reader.readAsArrayBuffer(file);
	},
	"click .btnCerrar":function(){
		let txtFileName=document.getElementById("txtFileNameConstanciaTerminacion")
		txtFileName.classList.remove("text-success")
		txtFileName.classList.add("text-danger")
		txtFileName.innerHTML = "Sin archivo"
		document.getElementById("imgCargoConstanciaTerminacion").style.display = "none"
	}
}); 