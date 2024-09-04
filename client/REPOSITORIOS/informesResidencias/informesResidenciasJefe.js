let informe = new ReactiveVar()
let subioInforme = new ReactiveVar()
//*************************************************************************************************************************/
//                                     TOOLBOX INFORMES DE RESIDENCIAS DEL JEFE
//*************************************************************************************************************************/
Template.toolBoxInformesResidenciasJefe.helpers({
    cantidad: function(){
        return informeResidencias.find().count()
    }
}); 
//*************************************************************************************************************************/
//                                         INFORMES DE RESIDENCIAS DEL JEFE
//*************************************************************************************************************************/
Template.informesResidenciasJefe.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('informeResidencias',Session.get('periodo'),Session.get('carrera'));
	});
});
Template.informesResidenciasJefe.helpers({
    informeResidencias: function(){
        return informeResidencias.find()
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")
	},
    tieneInforme: function(){
        if (this.path)
            return true
        return false
    }
}); 
Template.informesResidenciasJefe.events({
    "keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTable tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
    "click .subirInforme":function(){
        informe.set(this) 
    },
    "click .updateProyecto": function(){
        informe.set(this)
    },
    "click .borrar":function(){
        Meteor.call('removeInformeTecnicoResidencias',this)
    },
    "click .descargar":function(){
        Meteor.call('descargueInformeTecnicoResidencias',this)
    }
});
//*************************************************************************************************************************/
//                                         AGREGAR INFORMES DE RESIDENCIAS
//*************************************************************************************************************************/
Template.addInformeResidencias.helpers({
    periodo:function(){
        return Session.get('periodo')
    },
    carrera:function(){
        return Session.get('carrera')
    }
}); 
Template.addInformeResidencias.events({
    "click .registrar":function(){
        let informe = {}
        informe.nc = document.getElementById("nc").value
        informe.nombre = document.getElementById("nombre").value
        informe.proyecto = document.getElementById("proyecto").value
        informe.ciclo = Session.get('periodo')
        informe.carrera = Session.get('carrera')
        
        Meteor.call('agregarInformeTecnicoResidencias',informe,function(error,result){
            if (error) {
                let aviso={encabezado:"Informes de Residencias",aviso:"Ha ocurrido una error al subir el informe",positivo:false};
                Session.set("aviso",aviso);
            }
			else  if (result){
                let aviso={encabezado:"Informes de Residencias",aviso:"Ha registrado datos del alumno, ahora puede subir el informe",positivo:true};
                Session.set("aviso",aviso);
            }else{
                let aviso={encabezado:"Informes de Residencias",aviso:"Ya hay un alumno con ese numero de control registrado para subir informe",positivo:false};
                Session.set("aviso",aviso);
            }
        });
    }
}); 
//*************************************************************************************************************************/
//                                         ACTUALIZAR INFORMES DE RESIDENCIAS
//*************************************************************************************************************************/
Template.updateInformeResidencias.helpers({
    periodo:function(){
        return Session.get('periodo')
    },
    carrera:function(){
        return Session.get('carrera')
    },
    nc:function(){
        return informe.get()?.nc
    },
    nombre:function(){
        return informe.get()?.nombre
    },
    proyecto:function(){
        return informe.get()?.proyecto
    }
}); 
Template.updateInformeResidencias.events({
    "click .registrar":function(){
        let inf = {}
        inf.nc = document.getElementById("ncU").value
        inf.nombre = document.getElementById("nombreU").value
        inf.proyecto = document.getElementById("proyectoU").value
        inf.ciclo = Session.get('periodo')
        inf.carrera = Session.get('carrera')
        
        Meteor.call('actualizarInformeTecnicoResidencias',inf,function(error,result){
            if (error) {
                let aviso={encabezado:"Informes de Residencias",aviso:"Ha ocurrido un error al actualizar los datos del informe de "+inf.nombre,positivo:false};
                Session.set("aviso",aviso);
            }
			else  if (result){
                let aviso={encabezado:"Informes de Residencias",aviso:"Ha registrado datos del alumno, ahora puede subir el informe",positivo:true};
                Session.set("aviso",aviso);
            }
        });
    }
}); 
//*************************************************************************************************************************/
//                                         PARA SUBIR EL INFORME DE RRESDIDENCIAS
//*************************************************************************************************************************/
Template.uploadInformeResidencias.onCreated(function(){
    this.autorun(() =>{
        subioInforme.set(false);
    })
});
Template.uploadInformeResidencias.helpers({
    alumno:function(){
        return informe.get()?.nc + ' ' + informe.get()?.nombre
    }
})
Template.uploadInformeResidencias.events({
	"change .file-upload-input": function(event, template){
        let file = event.currentTarget.files[0];
		let reader = new FileReader();
        //let fileName = Meteor.user().username+" InformeTecnicoResidencia.pdf";
        let fileName = informe.get().nc+" InformeTecnicoResidencia.pdf";
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			Meteor.call('fileUpload',fileName,buffer,"InformeTecnicoResidencia");
            Meteor.call('agregueInformeTecnicoResidencias',informe.get(),fileName);
		};
        reader.readAsArrayBuffer(file);
        subioInforme.set(true);
    },
    "click .cerrar": function(event, template){
        if (subioInforme.get()){
            let aviso={encabezado:"Informes de Residencia Profesional",aviso:"Ha subido un informe técnico de residencia",positivo:true};
            Session.set("aviso",aviso);
        }
        else{
            let aviso={encabezado:"Residencia Profesional",aviso:"No subio archivo",positivo:false};
            Session.set("aviso",aviso);
        }
    }
});