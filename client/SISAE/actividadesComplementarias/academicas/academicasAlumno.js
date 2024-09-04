let actividadesAcademicas  	= new ReactiveVar();
let idActividadAcademica  	= new ReactiveVar();
let instructor	= new ReactiveVar();
//*************************************************************************************************************************/
//                               BARRA DE HERRAMIENTAS DE ACTIVIDADES ACADEMICAS ALUMNO
//*************************************************************************************************************************/
Template.toolBoxAcademicasAlumno.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	yo: function(){
		return Meteor.user()
	}
})
//*************************************************************************************************************************/
//                                   CODIGO DE ACTIVIDADES ACADEMICAS DEL ALUMNO
//*************************************************************************************************************************/
Template.academicasAlumno.onCreated(function(){
	this.autorun(() => {
        this.subscribe('actividadAcademica',Session.get('periodo'))
		Meteor.call('miActividadAcademica',Meteor.user().username,function(error,result){
			if (error) 
				alert("error");
			else  if (result)
                actividadesAcademicas.set(result); 		
		})
	});
});
Template.academicasAlumno.helpers({
	tieneActividadesAcademicas:function(){
		if (actividadesAcademicas.get()?.length)
			return true
		else
			return false
	},
	actividadesAcademicas:function(){
		return actividadesAcademicas.get()
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
    },
    actividadesAcademicasTotales:function(){
        return actividadAcademica.find({})
    },
    periodoActual:function(){
        return Session.get('periodo');
    },
    heSidoAceptadoEnEstaActividad:function(){
        let a=actividadAcademica.findOne({'_id':this._id,alumnos:{$elemMatch:{_id:Meteor.userId(),aceptado:true}}})
		if (a)
			return true
		else
			return false
    },
    heSolicitadoEstaActividad:function(){
		let a=actividadAcademica.findOne({'_id':this._id,alumnos:{$elemMatch:{_id:Meteor.userId(),solicitud:true}}})
		if (a)
			return true
		else
			return false
	},
	tieneConstanciaTerminacion:function(){
		let a=actividadAcademica.findOne({'_id':this._id,alumnos:{$elemMatch:{_id:Meteor.userId(),solicitud:true,pathConstanciaTerminacion:{$exists:true}}}})
		if (a)
			return true
		else
			return false
	},
	pathConstanciaTerminacion:function(){
		let a=actividadAcademica.findOne({'_id':this._id,alumnos:{$elemMatch:{_id:Meteor.userId(),solicitud:true,pathConstanciaTerminacion:{$exists:true}}}})
		if (a){
			let alu=a.alumnos.find(function(element){
				return element._id==Meteor.userId();
			})
			return alu.pathConstanciaTerminacion
		}
		else
			return false
	},
    esActividadAbierta:function(){
        if (this.tipo=="Abierta")
            return true
        else
            return false
    },
	requiereComprobante:function(){
		if (this.requiereComprobante==true)
			return true
		return false
	}
});
Template.academicasAlumno.events({
	"click .datos":function(){
		Meteor.call('miDocenteInstructorAcademico',this.docente,function(error,result){
			if (error) 
				alert("error");
			else  if (result)
				instructor.set(result);
		})
    },
    "click .actividad":function(event){
		let a=actividadAcademica.findOne({_id:this._id,'alumnos._id':Meteor.userId()})
		if (a){
			let aviso={encabezado:"Actividad academica",aviso:`Tu solicitud ha sido eliminada`,positivo:true}
            Session.set("aviso",aviso)
		}
		else{
			let aviso={encabezado:"Actividad academica",aviso:`tu solicitud ha sido registrada`,positivo:true}
            Session.set("aviso",aviso)
		}
		Meteor.call('addSolicitudAlumnoToActividadAcademica',Session.get('periodo'),Meteor.user(),this._id);
	},
	"click .subeConstanciaTerminacion":function(event){
		idActividadAcademica.set(this._id)
	}
});
//*************************************************************************************************************************/
//                                   CODIGO DEL TEMPLATE DETALLES DEL INSTRUCTOR
//*************************************************************************************************************************/
Template.sisaeDetallesInstructorAcademicas.helpers({
	nombre:function(){
		if (instructor.get()?.profile?.name)
			return instructor.get().profile.name
		return ""
	},
	email:function(){
		if (instructor.get()?.emails)
			return instructor.get().emails[0].address
		return ""
	},
	descripcion:function(){
		if (instructor.get()?.profile?.descripcion)
			return instructor.get().profile.descripcion;
		else
			return "El docente no ha agregado una descripción"
	},
	foto:function(){
		if (instructor.get()?.profile?.foto)
			return Session.get("ipLocal")+Session.get("puerto")+"/fotos/docentes/"+instructor.get().username+".jpg" 
		else
			return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	}
});
//*************************************************************************************************************************/
//                                        SUBIR LA CONSTNACIA DE TERMINACION
//*************************************************************************************************************************/
Template.uploadConstanciaTerminacion.events({
	"change .file-upload-input": function(event, template){
		var file = event.currentTarget.files[0];
		var reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			var buffer = new Uint8Array(reader.result);
			var fileName = Session.get("periodo")+'-'+Meteor.user().username+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'ConstanciaTerminacionActividadAcademica');
			Meteor.call('subiConstanciaTerminacionActividadAcademica',idActividadAcademica.get(),Meteor.userId(),fileName);
		};
		reader.readAsArrayBuffer(file);
		return false;
	}
}); 