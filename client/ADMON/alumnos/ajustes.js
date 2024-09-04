let periodoSelect = new ReactiveVar()
let alumnosPorSemestre = new ReactiveVar()
let per = new  ReactiveVar("")
//*************************************************************************************************************************/
//                                                        AJUSTES EN ALUNNOS
//*************************************************************************************************************************/
Template.alumnosAjustes.onCreated(function(){
	this.autorun(() =>{
		if (Session.get("isAdministrador")||Session.get("isJefe")||Session.get("isSubAcademico")){
            Meteor.call('getPeriodosIngreso',function(error,result){
                if (error) alert("error")
                else  if (result){
                    periodoSelect.set(result);
                    per.set(result[0].periodo)
                }
            })
            Meteor.call('getAlumnosPorSemestre',function(error,result){
                if (error) alert("error")
                else  if (result){
                    alumnosPorSemestre.set(result);
                }
            })
		}	
    })
})
Template.alumnosAjustes.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true
        return false
	},
	periodos: function(){
        return periodoSelect.get()
    },
    semestres: function(){
        return alumnosPorSemestre.get()
    }
})
Template.alumnosAjustes.events({
	"change .selectPeriodo":function(event){
        let c = event.currentTarget;
        per.set(c.value);
    },
    "click .guardar":function(event){
        let sem=document.getElementById('semestre').value;
        Meteor.call('actualizarSemestre',per.get(),sem)
        let aviso={encabezado:"Alumnos",aviso:"Ha modificado el semestre para los alumnos que ingresaron en "+per.get(),positivo:true};
        Session.set("aviso",aviso);
        Meteor.call('getAlumnosPorSemestre',function(error,result){
            if (error) alert("error")
            else  if (result){
                alumnosPorSemestre.set(result);
            }
        })
    }
})