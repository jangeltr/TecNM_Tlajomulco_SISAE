let from = new ReactiveVar("")
let start = new ReactiveVar(new Date())
let end = new ReactiveVar(new Date())
//*************************************************************************************************************************/
//                                                 BITACORA DE MOVIMIENTOS
//*************************************************************************************************************************/
Template.emails.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
			this.subscribe('emails',from.get(),start.get(),end.get())
		}
        if(this.subscriptionsReady()){
            //from.set(Meteor.user()?.emails[0]?.address)
        }
    })
})
Template.emails.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true
        return false
	},
	emails: function(){
        return emails.find({})
    },
    from:function(){
        return from.get()
    },
    start:function(){
        return start.get().toISOString().slice(0,10)
    },
    end: function(){
        return end.get().toISOString().slice(0,10)
    }
})
Template.emails.events({
    "keyup .myTxtBoxFiltro":function(){
		let filtro = $("#myEMailsFiltro");
		let value  = filtro.val().toLowerCase();
        $("#myTableEMails tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
	},
	"click .buscar":function(event){
		let fr = document.getElementById("fromEMail").value
        let st = document.getElementById("start").value
        let en = document.getElementById("end").value
		from.set(fr)
        start.set(new Date(st))
        end.set(new Date(en))
    }
})