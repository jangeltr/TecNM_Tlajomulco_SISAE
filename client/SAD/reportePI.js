//*************************************************************************************************************************/
//                                     BARRA DE HERRAMIENTAS DE REPORTE PROYECTO INDIVIDUAL
//*************************************************************************************************************************/
Template.toolBoxReportePI.helpers({
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
		if (proyectoIndividual.find().count()>0)
            return proyectoIndividual.find().count()
        return 0
	}
}); 
//*************************************************************************************************************************/
//                                                REPORTE PROYECTO INDIVIDUAL
//*************************************************************************************************************************/
Template.reportePI.onCreated(function(){
	this.autorun(() => {
		this.subscribe('docentesActivos');
		if (Session.get("isAdministrador")||Session.get("isJefe")){
			this.subscribe('proyectoIndividual',Session.get("periodo"));
			this.subscribe('asignaciones',Session.get("periodo"));
		}
	});
});
Template.reportePI.helpers({
	reporte:function(){
		return proyectoIndividual.find({});
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
Template.reportePI.events({
	"keyup .myTxtBoxFiltroReporte":function(){
		let filtro = $("#myFiltroReporte");
		let value  = filtro.val().toLowerCase();
        $("#myTableReporte tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
	"click .borrar": function(){
		Meteor.call('removePI',this);
		let aviso={encabezado:"Reporte",aviso:"El docente se ha quitado del proyecto individual",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .email": function(){
		let user=Meteor.users.findOne({"profile.name":this.nombre});
		let email= {
			from:Meteor.user()?.emails[0]?.address,
			to:user?.emails[0]?.address,
			subject:"TecNM-Tlajomulco (Reporte de Proyecto Individual)"
		}
		Session.set("sendeMail",email)
	},
	"click .revisado":function(){
		if (this.revisado)
			Meteor.call('quitarRevisadoPI',this);
		else 
			Meteor.call('ponerRevisadoPI',this);
	},
	"click .subirReporte":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Reporte de proyecto individual",
					textoBody:"Sube el reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reportePI",
					serverMethodAdd:"addReportePI",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje)
	},
	"click .subirReporteFirmado":function(){
		let docente = Meteor.users.findOne({_id:this.propietario})
		let mensaje={titulo:"Reporte de proyecto individual firmado y con evidencias",
					textoBody:"Sube el reporte con evidencias en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reportePISellado",
					serverMethodAdd:"addReportePISellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje)
	}
});
//*************************************************************************************************************************/
//                                        AGREGA DOCENTE A REPORTE PROYECTO INDIVIDUAL
//*************************************************************************************************************************/
Template.addDocenteReportePI.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});
Template.addDocenteReportePI.events({
	"click .agregar":function(event){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            let rep=proyectoIndividual.findOne({'nombre':nameDoc})
            if (rep){
                let aviso={encabezado:"Docentes",aviso:"Ese docente ya esta en la lista de reportes",positivo:false};
                Session.set("aviso",aviso);    
            }else{
                let aviso={encabezado:"Docentes",aviso:"El docente ha sido agregado",positivo:true};
                Session.set("aviso",aviso);
                Meteor.call('addDocenteAPI',Session.get("periodo"),doc)
            }
        }
        else{
            let aviso={encabezado:"Docentes",aviso:"No existe un docente con ese nombre",positivo:false};
            Session.set("aviso",aviso);
        }
	},
});
//*************************************************************************************************************************/
//                                     GRAFICA DE ENTREGA DE REPORTE PROYECTO INDIVIDUAL
//*************************************************************************************************************************/
Template.graficaReportePIJefes.onRendered(function(){
		let container=document.getElementById("myGraficaReporte");
		let entregados=proyectoIndividual.find({'path':{$exists:true}}).count();
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
			.title('Entrega de proyecto individual');
		chart.animation(true);
		chart.fill("aquastyle");
		chart.container(container).draw();
});
Template.graficaReportePIJefes.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});