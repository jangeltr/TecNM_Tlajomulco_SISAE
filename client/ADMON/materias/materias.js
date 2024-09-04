let reticula        = new ReactiveVar(true);
let ordenarMaterias = new ReactiveVar("porSemestre");
let idMateriaASubir = new ReactiveVar("");
let materiaAEditar  = new ReactiveVar("");
let subio           = new ReactiveVar(false);
//*************************************************************************************************************************/
//                                  CODIGO DE LA BARRA DE HERRAMIENTAS DE MATERIAS
//*************************************************************************************************************************/
Template.toolBoxMaterias.events({
	"click .reticula":function(){
		if (reticula.get())
			reticula.set(false);
		else
			reticula.set(true);
    }
});
//*************************************************************************************************************************/
//                                              CODIGO DE MATERIAS
//*************************************************************************************************************************/
Template.materias.onCreated(function(){
	this.autorun(() => {
		Meteor.subscribe('materias',Session.get('carrera'));        
	});
});
Template.materias.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")+"/";
	},
  	esJefe:function(){
        if (isJefe()||isAdministrador())
            return true;
        else
            return false;
	},
	esAdministrador:function(){
		return isAdministrador();
	},
  	materia:function(){
		if (ordenarMaterias.get()=="porSemestre")
			return materias.find({},{
				sort:{semestre:1,nombre:1}});
		else
			return materias.find({},{
				sort:{nombre:1,semestre:1}});
    },
  	reticula:function(){
			return reticula.get();
    },
  	carrera:function(){
			return Session.get('carrera');
    }
});
Template.materias.events({
	"click .ordAsignatura":function(){
		ordenarMaterias.set("porNombre");
	},
	"click .ordSemestre":function(){
		ordenarMaterias.set("porSemestre");
	},
	"click .borrar": function(){
        Meteor.call('removeMateria',this._id);
        let aviso={encabezado:"Materias",aviso:"Ha borrado la materia",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .subir": function(){
        idMateriaASubir.set(this._id);
	},
	"click .editar": function(){
		materiaAEditar.set(this);
	},
	"keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myMateriasFiltro");
		let value  = filtro.val().toLowerCase();
		$("#myTableMaterias tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	}
});
//*************************************************************************************************************************/
//                                              CODIGO PARA AGREGAR MATERIAS
//*************************************************************************************************************************/
Template.addMateria.helpers({
		carrera:function(){
			return Session.get("carrera");
		}
});
Template.addMateria.events({
    "click #btnAgregarMateria":function(event, template){
        let m=document.getElementById("frmAddMateria");
        let materia = {};
        materia.clave           = m.clave.value;
        materia.nombre          = m.nombre.value;
        materia.semestre        = m.semestre.value;
        materia.creditos        = m.creditos.value;
        materia.hrsTeoria       = m.hrsTeoria.value;
        materia.hrsPractica     = m.hrsPractica.value;
        materia.departamento    = m.departamento.value;
        materia.carrera         = Session.get("carrera");
        Meteor.call('addMateria',materia);
        let aviso={encabezado:"Materias",aviso:"Ha agregado la materia correctamente",positivo:true};
        Session.set("aviso",aviso);
    }
});
//*************************************************************************************************************************/
//                                        CODIGO DE SUBIR EL PROGRAMA DE LAS MATERIAS
//*************************************************************************************************************************/
Template.uploadMateria.helpers({

})
Template.uploadMateria.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',file.name,buffer,'materia');
            Meteor.call('updatePathMateria',idMateriaASubir.get(),'materias/'+file.name);
		};
        reader.readAsArrayBuffer(file);
        subio.set(true);

        let aviso={encabezado:"Materias",aviso:"Ha subido el programa de la materia",positivo:true};
        Session.set("aviso",aviso);
    },
    "click #btnCerrarUploadMateria": function(event, template){
        if (subio.get())
            return true;
        else
            return false;
    }
});
//*************************************************************************************************************************/
//                                              CODIGO PARA ACTUALIZAR LA MATERIA
//*************************************************************************************************************************/
Template.updateMateria.helpers({
	materia:function(){
		return materiaAEditar.get();	
	}
});
Template.updateMateria.events({
	"click #btnUpdateMateria": function(){
        let m=document.getElementById("frmUpdateMateria");
        let materia = {};
        materia.clave           = m.clave.value;
        materia.nombre          = m.nombre.value;
        materia.semestre        = m.semestre.value;
        materia.creditos        = m.creditos.value;
        materia.hrsTeoria       = m.hrsTeoria.value;
        materia.hrsPractica     = m.hrsPractica.value;
        materia.departamento    = m.departamento.value;
        materia.carrera         = Session.get("carrera");
        Meteor.call('updateMateria',materia);
		let aviso={encabezado:"Materias",aviso:"Ha actualizado los datos correctamente",positivo:true};
        Session.set("aviso",aviso);
	}
});
//*************************************************************************************************************************/
//                                         MODAL PARA CAMBIAR LA IMAGEN DE LA RETICULA
//*************************************************************************************************************************/
Template.changeReticulaImage.events({
	"change .file-upload-input": function(event, template){
        let foto = document.getElementById('imgReticula')
		let file = event.currentTarget.files[0];
        let reader = new FileReader();
        reader.onload=function(fileLoadEvent){
            let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',Session.get("carrera")+".jpg",buffer,'changeReticulaImg',function(error,result){
                if (error) {
                    
                }else {
                    let timestamp = new Date().getTime();
                    let pathFoto=Session.get("ipLocal")+Session.get("puerto")+'/materias/reticulas/'+Session.get("carrera")+".jpg";
                    foto.src = pathFoto+"?t=" + timestamp;
                }
            });
        };
		reader.readAsArrayBuffer(file);
	}
});