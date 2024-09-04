let tutorias   	= new ReactiveVar();
let idTutoria  	= new ReactiveVar();
let tutor 		= new ReactiveVar();
//*************************************************************************************************************************/
//                                         BARRA DE HERRAMIENTAS DE TUTORIAS ALUMNO
//*************************************************************************************************************************/
Template.toolBoxTutoriasAlumno.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	yo: function(){
		return Meteor.user()
	}
})
//*************************************************************************************************************************/
//                                              CODIGO DE TUTORIAS DEL ALUMNO
//*************************************************************************************************************************/
Template.tutoriasAlumno.onCreated(function(){
	this.autorun(() => {
		Meteor.call('miTutoria',Meteor.user().username,function(error,result){
			if (error) 
				alert("error");
			else  if (result)
				tutorias.set(result);		
		})
	});
});
Template.tutoriasAlumno.helpers({
	tieneTutorias:function(){
		if (tutorias.get()?.length)
			return true
		else
			return false
	},
	tutorias:function(){
		return tutorias.get()
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	}
});
Template.tutoriasAlumno.events({
	"click .subeFicha":function(){
		idTutoria.set(this._id);
	},
	"click .datos":function(){
		Meteor.call('miDocenteTutor',this.docenteTutor,function(error,result){
			if (error) 
				alert("error");
			else  if (result)
				tutor.set(result);
		})
	},
});
//*************************************************************************************************************************/
//                                              SUBIR LA FICHA DE IDENTIFICACION
//*************************************************************************************************************************/
Template.uploadFichaIdentificacion.events({
	"change .file-upload-input": function(event, template){
		var file = event.currentTarget.files[0];
		var reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			var buffer = new Uint8Array(reader.result);
			var fileName = Session.get("periodo")+'-'+Meteor.user().username+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'FichaIdentificacionTutoria');
			Meteor.call('subiFichaIdentificacion',idTutoria.get(),Meteor.userId(),fileName);
			Meteor.call('miTutoria',Meteor.user().username,function(error,result){
				if (error) 
					alert("error");
				else  if (result)
					tutorias.set(result);		
			})
		};
		reader.readAsArrayBuffer(file);
		return false;
	}
}); 
//*************************************************************************************************************************/
//                                   CODIGO DEL TEMPLATE DETALLES DEL TUTOR
//*************************************************************************************************************************/
Template.sisaeDetallesTutor.helpers({
	nombre:function(){
		if (tutor.get()?.profile?.name)
			return tutor.get().profile.name
		return ""
	},
	email:function(){
		if (tutor.get()?.emails)
		return tutor.get().emails[0].address;
	},
	descripcion:function(){
		if (tutor.get()?.profile?.descripcion)
			return tutor.get().profile.descripcion;
		else
			return "El docente no ha agregado una descripción"
	},
	foto:function(){
		if (tutor.get()?.profile?.foto)
			return Session.get("ipLocal")+Session.get("puerto")+"/fotos/docentes/"+tutor.get().username+".jpg" 
		else
			return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	}
});