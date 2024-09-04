//*************************************************************************************************************************/
//                           BARRA DE HERRAMIENTAS PARA HORARIOS Y REPORTES PARA DOCENTES
//*************************************************************************************************************************/
Template.toolBoxHorarioYReportes.helpers({
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
})
//*************************************************************************************************************************/
//                                         HORARIOS Y REPORTES PARA DOCENTES
//*************************************************************************************************************************/
Template.horarioYReportes.onCreated(function(){
	this.autorun(() => {
        this.subscribe('miHorario',Meteor.userId(),Session.get("periodo"));
        this.subscribe('miReporte1',Meteor.userId(),Session.get("periodo"));
        this.subscribe('miReporte2',Meteor.userId(),Session.get("periodo"));
        this.subscribe('miReporte3',Meteor.userId(),Session.get("periodo"));
        this.subscribe('miReporteFinal',Meteor.userId(),Session.get("periodo"));
		this.subscribe('miProyectoIndividual',Meteor.userId(),Session.get("periodo"));
	});
});
Template.horarioYReportes.helpers({
    esDocente:function(){
        return Session.get("isDocente");;
    },
	horario:function(){
		return horarios.find({});
	},
    reporte1:function(){
		return reporte1.find({});
    },
    reporte2:function(){
		return reporte2.find({});
    },
    reporte3:function(){
		return reporte3.find({});
    },
    reporteF:function(){
		return reporteFinal.find({});
    },
    reportePI:function(){
		return proyectoIndividual.find({});
    },
    proyectoIndividual:function(){
		return proyectoIndividual.find({});
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
	fechaFirmadoP:function(){
		if (this.fechaFirmado){
			let month = this.fechaFirmado.getUTCMonth() + 1 //months from 1-12
			let day = this.fechaFirmado.getUTCDate()
			let year = this.fechaFirmado.getUTCFullYear()
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
    },
    tieneHorario:function(){
        if (horarios.find({'fecha':{$exists:true}}).count()>0)
            return true
        return false
    },
    tieneR1:function(){
		if (reporte1.find({'fechaEvidencia':{$exists:true}}).count()>0)
			return true
		return false
    },
    tieneR2:function(){
		if (reporte2.find({'fechaEvidencia':{$exists:true}}).count()>0)
			return true
		return false
    },
    tieneR3:function(){
		if (reporte3.find({'fechaEvidencia':{$exists:true}}).count()>0)
			return true
		return false
    },
    tieneRF:function(){
		if (reporteFinal.find({'fechaEvidencia':{$exists:true}}).count()>0)
			return true
		return false
    },
    revisadoR1:function(){
        if (reporte1.find({'revisado':true}).count()>0)
			return true
		return false
    },
    revisadoR2:function(){
        if (reporte2.find({'revisado':true}).count()>0)
			return true
		return false
    },
    revisadoR3:function(){
        if (reporte3.find({'revisado':true}).count()>0)
			return true
		return false
    },
    revisadoRF:function(){
        if (reporteFinal.find({'revisado':true}).count()>0)
			return true
		return false
    },
    revisadoPI:function(){
        if (proyectoIndividual.find({'revisado':true}).count()>0)
			return true
		return false
    },
});
Template.horarioYReportes.events({
	"click .agregarHorario":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Horario",
					textoBody:"Sube tu horario en excel",
					tipoArchivo:"xlsx",
					serverMethodFileUploadType:"horario",
					serverMethodAdd:"addHorario",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarHorarioFirmado":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Horario firmado",
					textoBody:"Sube tu horario firmado en jpg",
					tipoArchivo:"jpg",
					serverMethodFileUploadType:"horarioSellado",
					serverMethodAdd:"addHorarioSellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarReporte1":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte 1",
					textoBody:"Sube tu reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte1",
					serverMethodAdd:"addReporte1",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarReporte2":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte 2",
					textoBody:"Sube tu reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte2",
					serverMethodAdd:"addReporte2",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarReporte3":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte 3",
					textoBody:"Sube tu reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporte3",
					serverMethodAdd:"addReporte3",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarReporteF":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte final",
					textoBody:"Sube tu reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reporteF",
					serverMethodAdd:"addReporteF",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarReportePI":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte de proyecto individual",
					textoBody:"Sube tu reporte en word",
					tipoArchivo:"docx",
					serverMethodFileUploadType:"reportePI",
					serverMethodAdd:"addReportePI",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarEvidencia1":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte 1 firmado y sellado con evidencias",
					textoBody:"Sube tu reporte sellado y firmado en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reporte1Sellado",
					serverMethodAdd:"addReporte1Sellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarEvidencia2":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte 2 firmado y sellado con evidencias",
					textoBody:"Sube tu reporte sellado y firmado en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reporte2Sellado",
					serverMethodAdd:"addReporte2Sellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarEvidencia3":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte 3 firmado y sellado con evidencias",
					textoBody:"Sube tu reporte sellado y firmado en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reporte3Sellado",
					serverMethodAdd:"addReporte3Sellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarEvidenciaF":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte final firmado y sellado con evidencias",
					textoBody:"Sube tu reporte sellado y firmado en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reporteFSellado",
					serverMethodAdd:"addReporteFSellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
	"click .agregarEvidenciaPI":function(){
		let docente = Meteor.users.findOne({_id:Meteor.userId()})
		let mensaje={titulo:"Reporte de Proy. Individual firmado y sellado con evidencias",
					textoBody:"Sube tu reporte sellado y firmado en pdf",
					tipoArchivo:"pdf",
					serverMethodFileUploadType:"reportePISellado",
					serverMethodAdd:"addReportePISellado",
					periodo:Session.get("periodo"),
					usuario:docente
				}
		Session.set("fileUpload",mensaje);
	},
})