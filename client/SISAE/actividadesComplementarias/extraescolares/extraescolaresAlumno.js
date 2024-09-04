let actividadesExtraescolares  	= new ReactiveVar();
let idActividadExtraescolar  	= new ReactiveVar();
let instructor	= new ReactiveVar();
//*************************************************************************************************************************/
//                               BARRA DE HERRAMIENTAS DE ACTIVIDADES ACADEMICAS ALUMNO
//*************************************************************************************************************************/
Template.toolBoxExtraescolaresAlumno.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	yo: function(){
		return Meteor.user()
	}
})
//*************************************************************************************************************************/
//                                      CODIGO DE EXTRAESCOLARES DEL ALUMNO
//*************************************************************************************************************************/
Template.extraescolaresAlumno.onCreated(function(){
	this.autorun(() => {
        this.subscribe('actividadExtraescolar',Session.get('periodo'))
		Meteor.call('miActividadExtraescolar',Meteor.user().username,function(error,result){
			if (error) 
				alert("error");
			else  if (result)
                actividadesExtraescolares.set(result);		
		})
	});
});
Template.extraescolaresAlumno.helpers({
	tieneActividadesExtraescolares:function(){
		if (actividadesExtraescolares.get()?.length)
			return true
		return false
	},
	actividadesExtraescolares:function(){
		return actividadesExtraescolares.get()
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
    },
    actividadesExtraescolaresTotales:function(){
        return actividadExtraescolar.find({})
    },
    periodoActual:function(){
        return Session.get('periodo');
    },
    heSidoAceptadoEnEstaActividad:function(){
        let a=actividadExtraescolar.findOne({'_id':this._id,alumnos:{$elemMatch:{_id:Meteor.userId(),aceptado:true}}})
		if (a)
			return true
		return false
    },
    heSolicitadoEstaActividad:function(){
		let a=actividadExtraescolar.findOne({'_id':this._id,alumnos:{$elemMatch:{_id:Meteor.userId(),solicitud:true}}})
		if (a)
			return true
		return false
	},
});
Template.extraescolaresAlumno.events({
	"click .datos":function(){
		Meteor.call('miDocenteInstructor',this.docente,function(error,result){
			if (error) 
				alert("error");
			else  if (result)
				instructor.set(result);
		})
    },
    "click .actividad":function(event){
		let a=actividadExtraescolar.findOne({_id:this._id,'alumnos._id':Meteor.userId()})
		if (a){
			let aviso={encabezado:"Actividad extraescolar",aviso:`Tu solicitud ha sido eliminada`,positivo:true}
            Session.set("aviso",aviso)
		}
		else{
			let aviso={encabezado:"Actividad ectraescolar",aviso:`Tu solicitud ha sido registrada`,positivo:true}
            Session.set("aviso",aviso)
		}
		Meteor.call('addSolicitudAlumnoToActividadExtraescolar',Session.get('periodo'),Meteor.user(),this._id);
	}
});
//*************************************************************************************************************************/
//                                   CODIGO DEL TEMPLATE DETALLES DEL INSTRUCTOR
//*************************************************************************************************************************/
Template.sisaeDetallesInstructor.helpers({
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
			return instructor.get().profile.descripcion
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