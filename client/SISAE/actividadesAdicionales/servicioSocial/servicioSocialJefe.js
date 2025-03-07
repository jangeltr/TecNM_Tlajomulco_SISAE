let ncAlumno = new ReactiveVar('')
let alumno = new ReactiveVar({});
let alumnoServicioSocial = new ReactiveVar({});
//*************************************************************************************************************************/
//                                   CODIGO DE LA PLATILLA SERVICIO SOCIAL JEFES
//*************************************************************************************************************************/
Template.servicioSocialJefe.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('servicioSocial',Session.get('periodo'))
        this.subscribe('docentesActivos')
	})
})
Template.servicioSocialJefe.helpers({
    servicioSocial: function(){
        return servicioSocial.find({})
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
	},
    dictamen:function(){
        if (this?.solicitud?.dictamen == "Aceptada")
            return "Aceptada"
        return null
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
    },
    "click .datosAlumno":function(){
        ncAlumno.set(this?.alumno?.nc)
    },
    "click .solicitudServicioSocial":function(){
        alumnoServicioSocial.set(this)
    },
    "click .eliminarServicioSocial":function(){
        Meteor.call('eliminarServicioSocial',this._id,function(error,result){
            if (error) 
                console.log("error");
            else  if (result)
                console.log("Servicio Social eliminado")
        })
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
//*************************************************************************************************************************/
//                                        MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoEnServicioSocial.onCreated(function(){
	this.autorun(() =>{
        Meteor.call('getAlumno',ncAlumno.get(),function(error,result){
                if (error) 
                    alert("error");
                else  if (result)
                    alumno.set(result);
            })
	});
});
Template.showDatosAlumnoEnServicioSocial.helpers({
	foto:function(){
		if (alumno.get()?.profile?.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+ncAlumno.get()+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	},
	alumnoDatos:function(){
        return alumno.get();
	},
	eMailAlumno:function(){
        if (alumno.get()?.emails)
            return alumno.get().emails[0].address;
        return ""
	}
});
//*************************************************************************************************************************/
//                               MUESTRA LOS DATOS DE LA SOLICITUS DE SERVICIO SOCIAL
//*************************************************************************************************************************/
Template.showSolicitudServicioSocial.helpers({
    'solicitudServicioSocial': function(){
        return alumnoServicioSocial.get()
    },
    'solicitudServicioSocialAceptadoChecked': function(){
        if (alumnoServicioSocial.get()?.solicitud?.dictamen == "Aceptada")
            return 'checked'
        return ''
    }
})
Template.showSolicitudServicioSocial.events({
    'click .aceptarSolicitudServicioSocial':function(){
        if (alumnoServicioSocial.get()?.solicitud?.dictamen == "Aceptada")
        {
            let solicitud = alumnoServicioSocial.get()
            solicitud.solicitud.dictamen = "Rechazada"
            alumnoServicioSocial.set(solicitud)
            Meteor.call('rechazarSolicitudServicioSocial',solicitud._id,function(error,result){})
        }
        else {
            let solicitud = alumnoServicioSocial.get()
            solicitud.solicitud.dictamen = "Aceptada"
            alumnoServicioSocial.set(solicitud)
            Meteor.call('aceptarSolicitudServicioSocial',solicitud._id,function(error,result){})
        }
    },
})