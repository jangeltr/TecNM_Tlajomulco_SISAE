let configuracion = new ReactiveVar()
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA SERVICIO SOCIAL JEFES
//*************************************************************************************************************************/
Template.servicioSocialJefe.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('servicioSocial',Session.get('periodo'))
        this.subscribe('docentesActivos')
        this.subscribe('configuracionServicioSocial',Session.get('periodo'))
        if(this.subscriptionsReady()){
            configuracion.set(servicioSocial.findOne({'configuracion.periodo':Session.get('periodo')}))
        }
	})
})
Template.servicioSocialJefe.helpers({
    servicioSocial: function(){
        return servicioSocial.find({'periodo':Session.get('periodo')})
    },
    tieneSolicitudFirmada: function(){
        if (this?.expedienteInicio?.pathSolicitud)
            return true
        return false
    },
    tieneCartaCompromiso: function(){
        if (this?.expedienteInicio?.pathCartaCompromiso)
            return true
        return false
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")
	}
}); 
Template.servicioSocialJefe.events({
    "keyup .myTxtBoxFiltroResidencias":function(){
		let filtro = $("#myFiltroResidencias")
		let value  = filtro.val().toLowerCase()
        $("#myResidencias division").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    },
    "click .expandirActividad":function(){
        let e=document.getElementById('div'+this._id)
        e.classList.toggle("bg-secondary")
        e.classList.toggle("text-white")
        e.classList.toggle("font-weight-bold")
    }
});
//*************************************************************************************************************************/
//                            CONFIGURAR EL SERVICIO SOCIAL DE ESTE PERIODO 
//*************************************************************************************************************************/
Template.configurarServicioSocial.helpers({
    periodo:function(){
        return Session.get('periodo');
    },
    configurada: function(){
        if (configuracion.get()?.configuracion?.fecha1)
            return true
        return false
    },
    fechaISS:function(){
        return configuracion.get()?.configuracion?.fechaISS
    },
    fechaTSS:function(){
        return configuracion.get()?.configuracion?.fechaTSS
    },
    fecha1:function(){
        return configuracion.get()?.configuracion?.fecha1
    },
    fecha2:function(){
        return configuracion.get()?.configuracion?.fecha2
    },
    fecha3:function(){
        return configuracion.get()?.configuracion?.fecha3
    },
    fechaCP:function(){
        return configuracion.get()?.configuracion?.fechaCP
    },
    fechaCA:function(){
        return configuracion.get()?.configuracion?.fechaCA
    },
    fechaCT:function(){
        return configuracion.get()?.configuracion?.fechaCT
    },
    fechaRF:function(){
        return configuracion.get()?.configuracion?.fechaRF
    }
})
Template.configurarServicioSocial.events({
    "click .registrar": function(){
        let configuracion={}
        configuracion.periodo=Session.get('periodo')
        configuracion.fechaISS=document.getElementById("fechaISS").value
        configuracion.fechaTSS=document.getElementById("fechaTSS").value
        configuracion.fecha1=document.getElementById("fecha1").value
        configuracion.fecha2=document.getElementById("fecha2").value
        configuracion.fecha3=document.getElementById("fecha3").value
        configuracion.fechaCP=document.getElementById("fechaCP").value
        configuracion.fechaCA=document.getElementById("fechaCA").value
        configuracion.fechaCT=document.getElementById("fechaCT").value
        configuracion.fechaRF=document.getElementById("fechaRF").value
        let conf = {}
        conf.configuracion = configuracion
        Meteor.call('registrarFechasSeguimientoServicioSocial',Session.get('periodo'),conf);
        let aviso={encabezado:"Servicio Social",aviso:"Registro fechas de seguimiento",positivo:true};
        Session.set("aviso",aviso);
    }
})