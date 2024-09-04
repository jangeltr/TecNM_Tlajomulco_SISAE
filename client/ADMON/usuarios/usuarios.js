//*************************************************************************************************************************/
//                                                       USUARIOS ONLINE
//*************************************************************************************************************************/
Template.usuarios.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
			this.subscribe('usuariosOnLine')
		}	
    })
})
Template.usuarios.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true;
        else
            return false;
    },
    email: function(){
        return this.emails[0].address;
    },
	listaAlumnos: function(){
		return Meteor.users.find({"profile.tipo":"Alumno"},{
			sort:{"profile.name":1}});
    },
    listaDocentes: function(){
		return Meteor.users.find({"profile.tipo":"Docente"},{
			sort:{"profile.name":1}});
	}
})
Template.usuarios.events({
    "keyup .myTxtBoxFiltroDocentes":function(){
		let filtro = $("#myDocentesFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTableDocentes tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
    "keyup .myTxtBoxFiltroAlumnos":function(){
		let filtro = $("#myAlumnosFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTableAlumnos tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    }
})