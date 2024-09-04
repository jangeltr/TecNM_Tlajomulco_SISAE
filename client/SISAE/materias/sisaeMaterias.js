let reticula        = new ReactiveVar(true);
let ordenarMaterias = new ReactiveVar("porSemestre");
//*************************************************************************************************************************/
//                                  CODIGO DE LA BARRA DE HERRAMIENTAS DE MATERIAS
//*************************************************************************************************************************/
Template.sisaeToolBoxMaterias.events({
	"click .reticula":function(){
		if (reticula.get())
			reticula.set(false);
		else
			reticula.set(true);
    }
});
//*************************************************************************************************************************/
//                                              CODIGO DE MATERIAS
//*************************************************************************************************************************/
Template.sisaeMaterias.onCreated(function(){
	this.autorun(() => {
		Meteor.subscribe('materias',Session.get('carrera'));        
	});
});
Template.sisaeMaterias.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")+"/";
	},
    materia:function(){
		if (ordenarMaterias.get()=="porSemestre")
			return materias.find({},{
				sort:{semestre:1,nombre:1}});
		else
			return materias.find({},{
				sort:{nombre:1,semestre:1}});
    },
    reticula:function(){
			return reticula.get();
    },
    carrera:function(){
			return Session.get('carrera');
    }
});
Template.sisaeMaterias.events({
	"click .ordAsignatura":function(){
		ordenarMaterias.set("porNombre");
	},
	"click .ordSemestre":function(){
		ordenarMaterias.set("porSemestre");
	},
	"keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myMateriasFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTableMaterias tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	}
});