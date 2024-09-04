//*************************************************************************************************************************/
//                                                          RESUMEN
//*************************************************************************************************************************/
Template.resumen.onCreated(function(){
	this.autorun(() => {
		Meteor.call('resumen',Session.get("periodo"));
		this.subscribe('docentes');
		this.subscribe('horarios',Session.get("periodo"))
		this.subscribe('resumenGral',Session.get("periodo"));
	});
});
Template.resumen.helpers({
    esJefe:function(){
        if (Session.get("isAdministrador")||Session.get("isJefe"))
            return true;
        else
            return false;
    },
    datos:function(){
        return resumenGral.find();
	},
	colorH:function(){
		if (this.H==0)
			return "red";
		else if (this.HR==false)
				return "orange";
			else
				return "green"
	},
	colorI:function(){
		if (this.I==0)
			return "red"
		else 
			return "orange";
	},
	colorIR:function(){
		if (this.IR==0)
			return "red"
		else if (this.IR<this.A)
				return "orange";
			else
				return "green";
	},
	colorR1:function(){
		if (this.R1==0)
			return "red";
		else if (this.R1==this.R1R)
				return "green";
			else
				return "orange"
	},
	colorR2:function(){
		if (this.R2==0)
			return "red";
		else if (this.R2==this.R2R)
				return "green";
			else
				return "orange"
	},
	colorR3:function(){
		if (this.R3==0)
			return "red";
		else if (this.R3==this.R3R)
				return "green";
			else
				return "orange"
	},
	colorRF:function(){
		if (this.RF==0)
			return "red";
		else if (this.RF==this.RFR)
				return "green";
			else
				return "orange"
	},
	colorPI:function(){
		if (this.PI==0)
			return "red";
		else if (this.PI==this.PIR)
				return "green";
			else
				return "orange"
	},
	tieneProyectoIndividual:function(){
		let pi = horarios.find({'nombre':this.nombre,'tieneProyectoIndividual':true}).count();
		if (pi==0)
			return false
		else
			return true;
	}
});
Template.resumen.events({
    "keyup .myTxtBoxFiltroResumen":function(){
		let filtro = $("#myFiltroResumen");
		let value  = filtro.val().toLowerCase();
        $("#myTableResumen tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	}
});