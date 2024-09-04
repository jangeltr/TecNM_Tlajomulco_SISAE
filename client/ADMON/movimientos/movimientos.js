let area = new ReactiveVar("SISAE");
let start = new ReactiveVar(new Date())
let end = new ReactiveVar(new Date())
//*************************************************************************************************************************/
//                                                 BITACORA DE MOVIMIENTOS
//*************************************************************************************************************************/
Template.movimientos.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
			this.subscribe('bitacora',area.get(),start.get(),end.get())
		}	
    })
})
Template.movimientos.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true;
        return false;
	},
	movimientos: function(){
        return bitacora.find({});
    },
    area:function(){
        return area.get();
    },
    start:function(){
        return start.get().toISOString().slice(0,10);
    },
    end: function(){
        return end.get().toISOString().slice(0,10);
    }
})
Template.movimientos.events({
    "keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myMovimientosFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTableMovimientos tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	},
	"change .selectArea":function(event){
		let c = event.currentTarget;
		area.set(c.value);
    },
    "change .start":function(event){
        let c = event.currentTarget;
        start.set(new Date(c.value));
    },
    "change .end":function(event){
		let c = event.currentTarget;
        end.set(new Date(c.value));
	},
})