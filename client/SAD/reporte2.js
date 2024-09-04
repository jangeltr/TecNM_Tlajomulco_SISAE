let docenteToSendMail = new ReactiveVar();
//*************************************************************************************************************************/
//                                          BARRA DE HERRAMIENTAS DE REPORTE 2
//*************************************************************************************************************************/
Template.toolBoxReporte2.helpers({
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
	numReportes:function(){
		if (reporte2.find().count()>0)
            return reporte2.find().count()
        return 0
	}
}); 
//*************************************************************************************************************************/
//                                                      REPORTE 2
//*************************************************************************************************************************/
Template.reporte2.onCreated(function(){
	this.autorun(() => {
		this.subscribe('docentesActivos');
		if (Session.get("isAdministrador")||Session.get("isJefe")){
			this.subscribe('reporte2',Session.get("periodo"));
			this.subscribe('asignaciones',Session.get("periodo"));
		}
	});
});
Template.reporte2.helpers({
	reporte:function(){
		return reporte2.find({});
	},
	esJefe:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true;
		else
			return false;
	},
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
	fechaP:function(){
		if (this.fecha){
			let month = this.fecha.getUTCMonth() + 1 //months from 1-12
			let day = this.fecha.getUTCDate()
			let year = this.fecha.getUTCFullYear()
			let f=day+"/"+month+"/"+year
			return f
		}
		return ""
	},
	fechaEvidenciaP:function(){
		if (this.fechaEvidencia){
			let month = this.fechaEvidencia.getUTCMonth() + 1 //months from 1-12
			let day = this.fechaEvidencia.getUTCDate()
			let year = this.fechaEvidencia.getUTCFullYear()
			let f=day+"/"+month+"/"+year
			return f
		}
		return ""
	}
});
Template.reporte2.events({
	"keyup .myTxtBoxFiltroReporte":function(){
		let filtro = $("#myFiltroReporte");
		let value  = filtro.val().toLowerCase();
        $("#myTableReporte tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
	"click .borrar": function(){
		Meteor.call('removeReporte2',this);
		let aviso={encabezado:"Reporte",aviso:"El docente se ha quitado de reporte",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .email": function(){
		let user=Meteor.users.findOne({"profile.name":this.nombre});
		let email= {
			from:Meteor.user()?.emails[0]?.address,
			to:user?.emails[0]?.address,
			subject:"TecNM-Tlajomulco (Reporte 2)"
		}
		Session.set("sendeMail",email)
	},
	"click .revisado":function(){
		if (this.revisado)
			Meteor.call('quitarRevisadoReporte2',this);
		else 
			Meteor.call('ponerRevisadoReporte2',this);
	},
	"click .subirReporte":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Reporte 2",
					textoBody:"Sube el reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte2",
					serverMethodAdd:"addReporte2",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje)
	},
	"click .subirReporteFirmado":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Reporte 2 firmado y con evidencias",
					textoBody:"Sube el reporte con evidencias en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reporte2Sellado",
					serverMethodAdd:"addReporte2Sellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje)
	}
});
//*************************************************************************************************************************/
//                                             AGREGA DOCENTE A REPORTE 2
//*************************************************************************************************************************/
Template.addDocenteReporte2.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});
Template.addDocenteReporte2.events({
	"click .agregar":function(event){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            let rep=reporte2.findOne({'nombre':nameDoc})
            if (rep){
                let aviso={encabezado:"Docentes",aviso:"Ese docente ya esta en la lista de reportes",positivo:false};
                Session.set("aviso",aviso);    
            }else{
                let aviso={encabezado:"Docentes",aviso:"El docente ha sido agregado",positivo:true};
                Session.set("aviso",aviso);
                Meteor.call('addDocenteAReporte2',Session.get("periodo"),doc)
            }
        }
        else{
            let aviso={encabezado:"Docentes",aviso:"No existe un docente con ese nombre",positivo:false};
            Session.set("aviso",aviso);
        }
	},
});
//*************************************************************************************************************************/
//                                            GRAFICA DE ENTREGA DE REPORTE 2
//*************************************************************************************************************************/
Template.graficaReporte2Jefes.onRendered(function(){
		let container=document.getElementById("myGraficaReporte");
		let entregados=reporte2.find({'path':{$exists:true}}).count();
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
			.title('Entrega de reportes');
		chart.animation(true);
		chart.fill("aquastyle");
		chart.container(container).draw();
});
Template.graficaReporte2Jefes.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});