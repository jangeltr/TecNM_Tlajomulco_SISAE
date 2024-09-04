//*************************************************************************************************************************/
//                                     TOOLBOX INFORMES DE RESIDENCIAS DEL JEFE
//*************************************************************************************************************************/
Template.toolBoxInformesResidenciasNoJefe.helpers({
    cantidad: function(){
        return informeResidencias.find().count()
    }
}); 
//*************************************************************************************************************************/
//                                         INFORMES DE RESIDENCIAS DEL JEFE
//*************************************************************************************************************************/
Template.informesResidenciasNoJefe.onCreated(function(){
	this.autorun(() =>{
        this.subscribe('informeResidencias',Session.get('periodo'),Session.get('carrera'));
	});
});
Template.informesResidenciasNoJefe.helpers({
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
Template.informesResidenciasNoJefe.events({
    "keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTable tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
    "click .descargar":function(){
        Meteor.call('descargueInformeTecnicoResidencias',this)
    }
});