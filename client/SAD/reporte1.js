//*************************************************************************************************************************/
//                                          BARRA DE HERRAMIENTAS DE REPORTE 1
//*************************************************************************************************************************/
Template.toolBoxReporte1.helpers({
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
		if (reporte1.find().count()>0)
            return reporte1.find().count()
        return 0
	}
}); 
//*************************************************************************************************************************/
//                                                      REPORTE 1
//*************************************************************************************************************************/
Template.reporte1.onCreated(function(){
	this.autorun(() => {
		this.subscribe('docentesActivos');
		if (Session.get("isAdministrador")||Session.get("isJefe")){
			this.subscribe('reporte1',Session.get("periodo"));
			this.subscribe('asignaciones',Session.get("periodo"));
		}
	});
});
Template.reporte1.helpers({
	reporte:function(){
		return reporte1.find({});
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
Template.reporte1.events({
	"keyup .myTxtBoxFiltroReporte":function(){
		let filtro = $("#myFiltroReporte");
		let value  = filtro.val().toLowerCase();
        $("#myTableReporte tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
	"click .borrar": function(){
		Meteor.call('removeReporte1',this);
		let aviso={encabezado:"Reporte 1",aviso:"El docente se ha quitado de reporte 1",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .email": function(){
		let user=Meteor.users.findOne({"profile.name":this.nombre});
		let email= {
			from:Meteor.user()?.emails[0]?.address,
			to:user?.emails[0]?.address,
			subject:"TecNM-Tlajomulco (Reporte 1)"
		}
		Session.set("sendeMail",email)
	},
	"click .revisado":function(){
		if (this.revisado)
			Meteor.call('quitarRevisadoReporte1',this);
		else 
			Meteor.call('ponerRevisadoReporte1',this);
	},
	"click .subirReporte":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Reporte 1",
					textoBody:"Sube el reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte1",
					serverMethodAdd:"addReporte1",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje)
	},
	"click .subirReporteFirmado":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Reporte 1 firmado y con evidencias",
					textoBody:"Sube el reporte con evidencias en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reporte1Sellado",
					serverMethodAdd:"addReporte1Sellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje)
	}
});
//*************************************************************************************************************************/
//                                             AGREGA DOCENTE A REPORTE 1
//*************************************************************************************************************************/
Template.addDocenteReporte1.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});
Template.addDocenteReporte1.events({
	"click .agregar":function(event){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            let rep=reporte1.findOne({'nombre':nameDoc})
            if (rep){
                let aviso={encabezado:"Docentes",aviso:"Ese docente ya esta en la lista de reportes",positivo:false};
                Session.set("aviso",aviso);    
            }else{
                let aviso={encabezado:"Docentes",aviso:"El docente ha sido agregado",positivo:true};
                Session.set("aviso",aviso);
                Meteor.call('addDocenteAReporte1',Session.get("periodo"),doc)
            }
        }
        else{
            let aviso={encabezado:"Docentes",aviso:"No existe un docente con ese nombre",positivo:false};
            Session.set("aviso",aviso);
        }
	},
});
//*************************************************************************************************************************/
//                                            GRAFICA DE ENTREGA DE REPORTE 1
//*************************************************************************************************************************/
Template.graficaReporte1Jefes.onRendered(function(){
		let container=document.getElementById("myGraficaReporte");
		let entregados=reporte1.find({'path':{$exists:true}}).count();
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
Template.graficaReporte1Jefes.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
}); 