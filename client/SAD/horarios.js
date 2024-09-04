//*************************************************************************************************************************/
//                                          BARRA DE HERRAMIENTAS DE HORARIOS
//*************************************************************************************************************************/
Template.toolBoxHorarios.helpers({
	esJefe: function(){
        if (Session.get("isAdministrador")||Session.get("isJefe"))
            return true;
		else
			return false;
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    numAsignaciones:function(){
        if (asignaciones.find().count()>0)
            return asignaciones.find().count()
        return 0
    },
	numHorarios:function(){
		if (horarios.find().count()>0)
            return horarios.find().count()
        return 0
	}
}); 
//*************************************************************************************************************************/
//                                                      HORARIOS
//*************************************************************************************************************************/
Template.horarios.onCreated(function(){
	this.autorun(() => {
		this.subscribe('docentesActivos');
		if (Session.get("isAdministrador")||Session.get("isJefe")){
			this.subscribe('horarios',Session.get("periodo"));
			this.subscribe('asignaciones',Session.get("periodo"));
		}
	});
});
Template.horarios.helpers({
	horarios:function(){
		return horarios.find({});
	},
	esJefe:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true;
		else
			return false;
	},
	tieneProyectoIndividual:function(){
		if (this.tieneProyectoIndividual)
			return true
		else 
			return false;
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	fechaP:function(){
		if (this.fecha){
			let month = this.fecha?.getUTCMonth() + 1 //months from 1-12
			let day = this.fecha?.getUTCDate()
			let year = this.fecha?.getUTCFullYear()
			let f=day+"/"+month+"/"+year
			return f
		}
		return ""
	},
	fechaFirmadoP:function(){
		if (this.fechaFirmado){
			let month = this.fechaFirmado?.getUTCMonth() + 1 //months from 1-12
			let day = this.fechaFirmado?.getUTCDate()
			let year = this.fechaFirmado?.getUTCFullYear()
			let f=day+"/"+month+"/"+year
			return f
		}
		return ""
	}
});
Template.horarios.events({
	"keyup .myTxtBoxFiltroHorarios":function(){
		let filtro = $("#myFiltroHorarios");
		let value  = filtro.val().toLowerCase();
        $("#myTableHorarios tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
	"click .borrar": function(){
		Meteor.call('removeHorario',this);
		let aviso={encabezado:"Horarios",aviso:"El docente se ha quitado de horarios",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .email": function(){
		let user=Meteor.users.findOne({"profile.name":this.nombre});
		let email= {from:Meteor.user()?.emails[0]?.address,
					to:user?.emails[0]?.address,
					subject:"TecNM-Tlajomulco (Horario de Clases)"
				}
		Session.set("sendeMail",email)
	},
	"click .checkPI":function(){
		if (this.tieneProyectoIndividual)
			Meteor.call('quitarProyectoIndividual',this);
		else 
			Meteor.call('ponerProyectoIndividual',this);
	},
	"click .subirHorario":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Horario",
					textoBody:"Sube el horario en excel",
					tipoArchivo:"xlsx",
					serverMethodFileUploadType:"horario",
					serverMethodAdd:"addHorario",
					usuario:docente,
					periodo:Session.get("periodo")
				}
		Session.set("fileUpload",mensaje);
	},
	"click .subirHorarioFirmado":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Horario firmado",
					textoBody:"Sube el horario firmado y sellado en jpg",
					tipoArchivo:"jpg",
					serverMethodFileUploadType:"horarioSellado",
					serverMethodAdd:"addHorarioSellado",
					usuario:docente,
					periodo:Session.get("periodo")
				}
		Session.set("fileUpload",mensaje);
	}
});
//*************************************************************************************************************************/
//                                             AGREGA DOCENTE A HORARIOS
//*************************************************************************************************************************/
Template.addDocenteHorarios.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});
Template.addDocenteHorarios.events({
	"click .agregar":function(event){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            let hor=horarios.findOne({'nombre':nameDoc})
            if (hor){
                let aviso={encabezado:"Docentes",aviso:"Ese docente ya esta en la lista de horarios",positivo:false};
                Session.set("aviso",aviso);    
            }else{
                let aviso={encabezado:"Docentes",aviso:"El docente ha sido agregado",positivo:true};
                Session.set("aviso",aviso);
                Meteor.call('addDocenteAHorarios',Session.get("periodo"),doc)
            }
        }
        else{
            let aviso={encabezado:"Docentes",aviso:"No existe un docente con ese nombre",positivo:false};
            Session.set("aviso",aviso);
        }
	},
});
//*************************************************************************************************************************/
//                                            GRAFICA DE ENTREGA DE HORARIOS
//*************************************************************************************************************************/
Template.graficaHorariosJefes.onRendered(function(){
		let container=document.getElementById("myGraficaHorarios");
		let entregados=horarios.find({'path':{$exists:true}}).count();
		//let no_entregados=Meteor.users.find({}).count()-entregados;
		let no_entregados=asignaciones.find().count()-entregados;
		let datos=[
			{x:'Entregados',value:entregados,fill:"#405d27"},
			{x:'No entregados',value:no_entregados,fill:"#c83349"}
		];
		let chart =  anychart.pie(datos);
		chart.legend()
			.position('bottom')
			.itemsLayout('horizontal')
			.align('center')
			.title('Entrega de horarios');
		chart.animation(true);
		chart.fill("aquastyle");
		chart.container(container).draw();
});
Template.graficaHorariosJefes.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
}); 