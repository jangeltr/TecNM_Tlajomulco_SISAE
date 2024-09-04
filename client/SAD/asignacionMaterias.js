let asignacionAEditar = new ReactiveVar();
//*************************************************************************************************************************/
//                               BARRA DE HERRAMIENTAS PARA LA ASIGNACION DE MATERIAS
//*************************************************************************************************************************/
Template.toolBoxAsignacionMaterias.helpers({
	puedeAgregar: function(){
        if (Session.get("isAdministrador")||Session.get("isJefe"))
            return true
    },
    hayAsignaciones:function(){
        if (asignaciones.find().count()>0)
            return true
        return false
    },
    numAsignaciones:function(){
        if (asignaciones.find().count()>0)
            return asignaciones.find().count()
        return 0
    },
    numMaterias:function(){
        return materias.find().count()
    }
}); 
Template.toolBoxAsignacionMaterias.events({
	"click .agregarTodos":function(){
        Meteor.call('agregarTodosLosDocentesAsignacionMaterias',Session.get('periodo'));
    }
});
//*************************************************************************************************************************/
//                                              ASIGNACION DE MATERIAS
//*************************************************************************************************************************/
Template.asignacionMaterias.onCreated(function(){
	this.autorun(() => {
		if (Session.get("isAdministrador")||Session.get("isJefe")){
            this.subscribe('asignaciones',Session.get("periodo"));
            this.subscribe('docentesActivos');
		}
		else
		{
            let u=Meteor.users.findOne({_id:Meteor.userId()});
            this.subscribe('materiasEnDe',Session.get("periodo"),u.profile.name);
		}
	});
});
Template.asignacionMaterias.helpers({
	asignaciones:function(){
		return asignaciones.find({});
	},
	puedeModificar:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true;
		else
			return false;
    },
    esDocente:function(){
		return Session.get("isDocente");
    },
	materias:function(){
		return materias.find({},{sort:{nombre:1}});
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")+"/";
    },
    cantidadDeMaterias:function(){
        return this.materia.length
    }
});
Template.asignacionMaterias.events({
    "keyup .myTxtBoxFiltroAsignacionMaterias":function(){
		let filtro = $("#myFiltroAsignacionMaterias");
		let value  = filtro.val().toLowerCase();
        $("#myTableAsignacionMaterias tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
	"click .borrar": function(){
        Meteor.call('removeAsignacion',this);
        let aviso={encabezado:"Docentes",aviso:"El docente se ha quitado de la asignación de materias",positivo:true};
        Session.set("aviso",aviso);
	},
	"click .agregarMateria": function(){
		asignacionAEditar.set(this);
    },
    "click .editar":function(){
		asignacionAEditar.set(this);
    },
    "click .quitarMateria":function(){
        Meteor.call('quitarMateriaAsignacionMaterias',asignacionAEditar.get(),this)
    }
});
//*************************************************************************************************************************/
//                                           AGREGA ASIGNACIONES DE MATERIAS
//*************************************************************************************************************************/
Template.addDocenteAsignacionMaterias.helpers({
	periodo:function(){
		return Session.get("periodo");
	}
});
Template.addDocenteAsignacionMaterias.events({
	"click .agregar":function(event){
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            let asig=asignaciones.findOne({'docente':nameDoc})
            if (asig){
                let aviso={encabezado:"Docentes",aviso:"Ese docente ya esta en la lista de asignaciones",positivo:false};
                Session.set("aviso",aviso);    
            }else{
                let aviso={encabezado:"Docentes",aviso:"El docente ha sido agregado",positivo:true};
                Session.set("aviso",aviso);
                Meteor.call('agregarDocenteAsignacionMaterias',Session.get("periodo"),doc)
            }
        }
        else{
            let aviso={encabezado:"Docentes",aviso:"No existe un docente con ese nombre",positivo:false};
            Session.set("aviso",aviso);
        }
	},
});
//*************************************************************************************************************************/
//                                           AGREGA ASIGNACIONES DE MATERIAS
//*************************************************************************************************************************/
Template.addMateriaAsignacionMaterias.onCreated(function(){
	this.autorun(() => {
        if (Session.get("isAdministrador")||Session.get("isJefe")){
            this.subscribe('materias',Session.get("carrera"));
        }
	});
});
Template.addMateriaAsignacionMaterias.helpers({
	periodo:function(){
		return Session.get("periodo");
    },
    docente:function(){
        return asignacionAEditar.get()?.docente;
    }
});
Template.addMateriaAsignacionMaterias.events({
	"click .agregar":function(event){
        let nameMat=document.getElementById("findMateriaName").value;
        let grupo=document.getElementById("inputGrupo").value;
        let mat=materias.findOne({'nombre':nameMat})
        if (mat){
                let aviso={encabezado:"Asignaciones",aviso:"La materia ha sido asignada",positivo:true};
                Session.set("aviso",aviso);
                Meteor.call('agregarMateriaAsignacionMaterias',asignacionAEditar.get(),Session.get('carrera'),mat,grupo)
        }
        else{
            let aviso={encabezado:"Materias",aviso:"No existe una materia con ese nombre",positivo:false};
            Session.set("aviso",aviso);
        }
	},
});

