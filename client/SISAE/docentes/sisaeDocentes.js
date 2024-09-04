let ordenarDocentes = new ReactiveVar("A-Z");
let roles = new ReactiveVar([]);
let usuarioDetalles = new ReactiveVar({});
//*************************************************************************************************************************/
//                                      CODIGO DE LA BARRA DE HERRAMIENTAS
//*************************************************************************************************************************/
Template.sisaeToolBoxDocentes.helpers({
	totalDocentes: function(){
		return Counts.get('docentesCount')
    },
    esAdministrador:function(){
		return Session.get("isAdministrador");
    }
}); 
Template.sisaeToolBoxDocentes.events({
	"click .roles":function(){
		let rols=[];
		catRoles.forEach(function(element) {
			if (element!='Docente'){
				Meteor.call('idUsuarioDelRole',element,function(error,result){
					if (error) alert(error)
					else{
						let usuario=Meteor.users.findOne({'_id':result})?.profile?.name
						rols.push({"rol":element})
						rols.push({"rol":usuario});
						roles.set(rols)
					}
				})
			}
		});
	},
	"keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myFiltro");
		let value  = filtro.val().toLowerCase();
    	$("#myTableDocentes tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
	}
})
//*************************************************************************************************************************/
//                                      CODIGO DE LA PLANTILLA DE DOCENTES
//*************************************************************************************************************************/
Template.sisaeDocentes.onCreated(function(){
	this.autorun(() =>{
		this.subscribe('docentesActivos');
		this.subscribe('roles');
	});
});
Template.sisaeDocentes.helpers({
	listaDocentes: function(){
        if (ordenarDocentes.get()=="A-Z")
		    return Meteor.users.find({'profile.tipo':'Docente'},{
                sort:{"profile.name":1}});
        else
        	return Meteor.users.find({'profile.tipo':'Docente'},{
            	sort:{"profile.name":-1}});
    }
}); 
Template.sisaeDocentes.events({
    "click .ordDocentes":function(){
        if (ordenarDocentes.get()=="A-Z")
            ordenarDocentes.set("Z-A");
        else
            ordenarDocentes.set("A-Z");
    }
});
//*************************************************************************************************************************/
//                              CODIGO DE LA PLANTILLA QUE MUESTRA CADA DOCENTE
//*************************************************************************************************************************/
Template.sisaeShowDocente.events({
    "click #btnDetallesDocente":function(){
		usuarioDetalles.set(this)
    },
	"click .sendEMail":function(){
		let email= {from:Meteor.user()?.emails[0]?.address,
					to:this?.emails[0]?.address,
					subject:""
				}
		Session.set("sendeMail",email)
	}
});
//*************************************************************************************************************************/
//                                   CODIGO DEL TEMPLATE QUE MUESTRA LOS ROLES
//*************************************************************************************************************************/
Template.sisaeRoles.helpers({
	roles:function(){
		return roles.get();
	}
});
//*************************************************************************************************************************/
//                                   CODIGO DEL TEMPLATE DETALLES DEL DOCENTE
//*************************************************************************************************************************/
Template.sisaeDetallesDocente.helpers({
	nombre:function(){
		return usuarioDetalles.get()?.profile?.name;
	},
	email:function(){
		if (usuarioDetalles.get().emails)
			return usuarioDetalles.get()?.emails[0]?.address
		return ""
	},
	descripcion:function(){
		if (usuarioDetalles.get()?.profile?.descripcion)
			return usuarioDetalles.get()?.profile?.descripcion;
		else
			return "El docente no ha agregado una descripción"
	},
	foto:function(){
		if (usuarioDetalles.get()?.profile?.foto)
			return Session.get("ipLocal")+Session.get("puerto")+"/fotos/docentes/"+usuarioDetalles.get()?.username+".jpg" 
		else
			return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	}
});