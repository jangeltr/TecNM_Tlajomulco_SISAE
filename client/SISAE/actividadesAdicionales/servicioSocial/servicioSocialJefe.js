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
Template.fechasServicioSocial.helpers({
    periodo:function(){
        return Session.get('periodo');
    }
})