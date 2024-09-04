let asignacionAEditar = new ReactiveVar();
let materia = new ReactiveVar();
let deptoPlaneacion = new ReactiveVar("De todos los Departamentos");
let numMateriasAsignadas = new ReactiveVar();

function selectedFile(file,txtFN,imgCargo){
    let txtFileName=document.getElementById(txtFN)
	txtFileName.classList.remove("text-danger")
	txtFileName.classList.add("text-success")
    txtFileName.innerHTML = file.name
	document.getElementById(imgCargo).style.display = "inline"
}
function closeUploadFile(txtFN,imgCargo){
    let txtFileName=document.getElementById(txtFN)
	txtFileName.classList.remove("text-success")
	txtFileName.classList.add("text-danger")
	txtFileName.innerHTML = "Sin archivo"
	document.getElementById(imgCargo).style.display = "none"
}
//*************************************************************************************************************************/
//                                  BARRA DE HERRAMIENTAS PARA LA INSTRUMENTACION
//*************************************************************************************************************************/
Template.toolBoxInstrumentaciones.helpers({
	esJefe: function(){
        if (Session.get("isAdministrador")||Session.get("isJefe"))
            return true;
    },
    deptoPlaneacion:function(){
		return deptoPlaneacion.get();
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto");
	},
    numAsignaciones:function(){
        if (asignaciones.find().count()>0)
            return asignaciones.find().count()
        return 0
    }
}); 
Template.toolBoxInstrumentaciones.events({
	"change .selectDepto":function(event){
		let c = event.currentTarget;
		deptoPlaneacion.set(c.options[c.selectedIndex].value);
    },
});
//*************************************************************************************************************************/
//                                              INSTRUMENTACIONES
//*************************************************************************************************************************/
Template.instrumentaciones.onCreated(function(){
	this.autorun(() => {
		if (Session.get("isAdministrador")||Session.get("isJefe")){
            this.subscribe('asignaciones',Session.get("periodo"));
		}
		else
		{
            let u=Meteor.users.findOne({_id:Meteor.userId()});
            this.subscribe('asignacionesEnDe',Session.get("periodo"),u.profile.name)
            this.subscribe('materiasEnDe',Session.get("periodo"),u.profile.name)
            if (this.subscriptionsReady())
                asignacionAEditar.set(asignaciones.findOne({'docente':u.profile.name}))
		}
	});
});
Template.instrumentaciones.helpers({
	asignaciones:function(){
		return asignaciones.find({});
	},
	puedeModificar:function(){
		if (Session.get("isAdministrador")||Session.get("isJefe"))
			return true
		return false
    },
    esDocente:function(){
		return Session.get("isDocente")
    },
    ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")+"/"
    },
    path:function(){
        if (materias.findOne({'_id':this.id})?.path)
            return materias.findOne({'_id':this.id}).path
        return ""
    },
    cantidadDeMaterias:function(){
        if (deptoPlaneacion.get()=="De todos los Departamentos")
            return this.materia.length
        else{
            let count=0;
            this.materia.forEach((element)=>{
                if (element.departamento==deptoPlaneacion.get())
                    count++;
            })
            return count;
        }
    },
    linkPlaneacion:function(){
		if (this.pathPlaneacion) return true;
		else return false;
	},
	linkEvidencia:function(){
		if (this.pathEvidencia) return true;
		else return false;
    },
    esDelDepto:function(){
        if (deptoPlaneacion.get()=="De todos los Departamentos")
            return true;
        else if (this.departamento==deptoPlaneacion.get())
                return true;
            else return false;
    }
});
Template.instrumentaciones.events({
    "keyup .myTxtBoxFiltroAsignacionMaterias":function(){
		let filtro = $("#myFiltroAsignacionMaterias");
		let value  = filtro.val().toLowerCase();
        $("#myTableAsignacionMaterias tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    },
    "click .editar":function(){
		asignacionAEditar.set(this);
    },
    "click .subirPlaneacion":function(){
        materia.set(this);
    },
    "click .subirEvidencia":function(){
        materia.set(this);
    },
    "click .revisado":function(){
        materia.set(this);
        let valor;
        if (this.revisado==true)
            valor = false;
        else 
            valor = true;
        Meteor.call('planeacionRevisada',asignacionAEditar.get(),materia.get(),valor);
    },
});
//*************************************************************************************************************************/
//                                    GRAFICA DE INSTRUMENTACIONES ENTREGADAS
//*************************************************************************************************************************/
Template.graficaInstrumentaciones.onCreated(function(){
	this.autorun(() => { 
		Meteor.call('materiasAsignadas',Session.get("periodo"),deptoPlaneacion.get(),function(error,result){
            if (error) alert("error")
            else {
                totalMateriasAsignadas=result;
                Meteor.call('gestionesEntregadas',Session.get("periodo"),deptoPlaneacion.get(),function(error,result){
                    if (error) alert("error")
                    else {
                        numMateriasAsignadas.set(result);
                        totalGestionesEntregadas=result;
                        let container=document.getElementById("myChart");
                        container.innerHTML="";
                        let entregados=totalGestionesEntregadas;
                        let no_entregados=totalMateriasAsignadas-entregados;
                        let datos=[
                            {x:'Entregados',value:entregados,fill:"#405d27"},
                            {x:'No entregados',value:no_entregados,fill:"#c83349"}
                        ];
                        let chart =  anychart.pie(datos);
                        chart.legend()
                            .position('bottom')
                            .itemsLayout('horizontal')
                            .align('center')
                            .title('Entrega de Planeaciónes de Curso');
                        chart.animation(true);
                        chart.fill("aquastyle");
                        chart.container(container).draw();
                    }
                });
            }
        });
	});
});
Template.graficaInstrumentaciones.helpers({
    periodo:function(){
        return Session.get("periodo");
    },
    depto:function(){
        return deptoPlaneacion.get();
    },
    numAsignadas:function(){
        return numMateriasAsignadas.get()
    }
});
//*************************************************************************************************************************/
//                                          MODAL PARA SUBIR PLANEACION
//*************************************************************************************************************************/
Template.uploadPlaneacion.events({
    "click .btnSubirArchivo":function(){
		let btnFile = document.querySelector("#btnFilePlaneacion")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
            selectedFile(file,"txtFileNamePlaneacion","imgCargoPlaneacion")

			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get("periodo")+asignacionAEditar.get().docente+"Planeacion"+materia.get().id+materia.get().grupo+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'instrumentacion');
            Meteor.call('addInstrumentacion',asignacionAEditar.get(),materia.get(),fileName);
		};
		reader.readAsArrayBuffer(file);
	},
	"click .btnCerrar":function(){
		closeUploadFile("txtFileNamePlaneacion","imgCargoPlaneacion")
	}
});
//*************************************************************************************************************************/
//                                  MODAL PARA SUBIR LA EVIDENCIA DE LA PLANEACION
//*************************************************************************************************************************/
Template.uploadEvidenciaPlaneacion.events({
    "click .btnSubirArchivo":function(){
		let btnFile = document.querySelector("#btnFileEvidenciaEntregaPlaneacion")
		btnFile.click()
	},
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
            selectedFile(file,"txtFileNameEvidenciaEntregaPlaneacion","imgCargoEvidenciaEntregaPlaneacion")

			let buffer = new Uint8Array(reader.result);
			let fileName = Session.get("periodo")+asignacionAEditar.get().docente+"Evidencia"+materia.get().id+materia.get().grupo+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'evidenciaInstrumentacion');
            Meteor.call('addEvidenciaInstrumentacion',asignacionAEditar.get(),materia.get(),fileName);
		};
		reader.readAsArrayBuffer(file);
	},
    "click .btnCerrar":function(){
		closeUploadFile("txtFileNameEvidenciaEntregaPlaneacion","imgCargoEvidenciaEntregaPlaneacion")
	}
});