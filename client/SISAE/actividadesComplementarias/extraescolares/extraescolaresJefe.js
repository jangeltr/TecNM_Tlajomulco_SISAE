let actividad 	= new ReactiveVar();
let alumno 		= new ReactiveVar();
let ncAlumno 	= new ReactiveVar();
let nc = new ReactiveVar(null)
let nAlumno		= 0;
let jefeServiciosEcolares = new ReactiveVar()
const position = { x: 0, y: 0 }
//*************************************************************************************************************************/
//                                         BARRA DE HERRAMIENTAS DE EXTRAESCOLES JEFE
//*************************************************************************************************************************/
Template.toolBoxExtraescolaresJefe.helpers({
	
}); 
Template.toolBoxExtraescolaresJefe.events({
	
})
//*************************************************************************************************************************/
//                                                   EXTRAESCOLARES JEFE
//*************************************************************************************************************************/
Template.extraescolaresJefe.onCreated(function(){
	this.autorun(() => {
        this.subscribe('docentesActivos');
		this.subscribe('actividadExtraescolar',Session.get('periodo'),nc.get())
		this.subscribe('alumno',ncAlumno.get())
	});
});
Template.extraescolaresJefe.helpers({
	ip:function(){
		return Session.get("ipLocal")+Session.get("puerto")+"/";
	},
    actividadExtraescolar:function(){
        return actividadExtraescolar.find({})
	},
	tieneAlumnos:function(){
		if(this.alumnos && this.alumnos.length>0)
			return true;
		else 
			return false
	},
	subioListaAsistencia:function(){
		if (this.listaAsistencia)
			return true
		else 
			return false
	},
	aceptado:function(){
		if (this.aceptado)
			return true
		else
			return false
	},
	evaluado:function(){
		if (this.evaluacion)
			return true
		else
			return false
	},
	numSolicitudes:function(){
		return this.alumnos.length;
	},
	numAceptados:function(){
		let al=this.alumnos;
		let numAcept = al.reduce(function (n, a) {
			return n + (a.aceptado == true);
		}, 0);
		return numAcept;
	}
})
Template.extraescolaresJefe.events({
    "keyup .myTxtBoxFiltroExtraescolares":function(){
		let filtro = $("#myFiltroExtraescolares");
		let value  = filtro.val().toLowerCase();
    	$("#myTableExtraescolares tr").filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    	});
    },
	"keyup .myTxtBoxNC":function(){
		let filtro = $("#myFiltroNC");
		let value  = filtro.val().toLowerCase();
		nc.set(value)
    },
    "keyup .myTxtBoxFiltroExtraescolaresAlumno":function(){
        let filtro = "#myFiltroExtraescolaresAlumno"+this._id;
		let value  = $(filtro).val().toLowerCase();
		let tabla = '#myTableExtraescolaresAlumno'+this._id+' tr';
    	$(tabla).filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
    },
    "click .borrar":function(){
        let aviso={encabezado:"Actividad Extraescolar",aviso:`La actividad ha sido borrada`,positivo:true}
        Session.set("aviso",aviso)
        Meteor.call('removeActividadExtraescolar',this._id)
    },
    "click .generarListaAsistencia":function(){
		actividad.set(this)
		nAlumno=0;
		BlazeLayout.render("impresion",{rellena2:"listaDeAsistenciaActividadExtraescolarJefe"});
	},
	"click .subirListaAsistencia":function(){
		actividad.set(this)
	},
    "click .expandirActividad":function(){
        actividad.set(this)
    },
	"click .aceptarAlumno":function(){
		Meteor.call('aceptarAlumnoEnActividadExtraescolar',actividad.get()._id,this._id,this.nc)
	},
	"click .quitarAlumno":function(){
		Meteor.call('quitarAlumnoDeActividadExtraescolar',actividad.get()._id,this._id,this.nc)
	},
	"click .evaluar":function(){
        alumno.set(this)
	},
	"click .verEvaluacion":function(){
		alumno.set(this)
	},
	"click .datos":function(){
		ncAlumno.set(this.nc)
		alumno.set(this)
    },
	"click .generarConstancia":function(){
		Meteor.call('idUsuarioDelRole',"Depto de Servicios Escolares",function(error,result){
            if (error) 
				alert("error")
            else 
				jefeServiciosEcolares.set(Meteor.users.findOne({'_id':result}))
        })
		alumno.set(this)
	},
	"click .subirConstancia":function(){
		alumno.set(this)
	},
})
//*************************************************************************************************************************/
//                                             AGREGAR ACTIVIDADES EXTRAESCOLARES
//*************************************************************************************************************************/
Template.addActividadExtraescolar.helpers({
    periodo:function(){
        return Session.get('periodo')
    }
})
Template.addActividadExtraescolar.events({
    "click .agregar":function(event){
        let x=document.getElementById("schemaAddActividadExtraescolar");
        let nameDoc=document.getElementById("findDocenteName").value;
        let doc=Meteor.users.findOne({'profile.name':nameDoc})
        if (doc){
            let a={};
            a.periodo=Session.get("periodo");
            a.idDocente=doc._id;
            a.docente=doc.profile.name;
            a.modalidad=x.modalidad.value;
            a.actividad=x.actividad.value;
            a.horario=x.horario.value;
            a.sede=x.sede.value;
            a.esSeleccion=x.esSeleccion.value;
            let aviso={encabezado:"Actividad Extraescolar",aviso:`La actividad ${a.actividad} ha sido agregada`,positivo:true}
            Session.set("aviso",aviso)
            Meteor.call("addActividadExtraescolar",a);
        }
        else{
            let aviso={encabezado:"Actividad Extraescolar",aviso:`La actividad ${x.actividad.value} no ha sido agregada porque el profesor no existe`,positivo:false}
            Session.set("aviso",aviso)
        }
	}
})
//*************************************************************************************************************************/
//                                              EVALUAR LA ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.evaluarActividadExtraescolarJefe.helpers({
	actividad:function(){
        return actividad.get()?.actividad
	},
	alumno:function(){
		return alumno.get()?.nombre;
	},
	periodo:function(){
		return Session.get('periodo')
	}
})
Template.evaluarActividadExtraescolarJefe.events({
	"click .addEvaluacion":function(){
		var x=document.getElementById("evaluacionActividadComplementaria");
		var evaluacion=[];
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[0],'R':x.uno.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[1],'R':x.dos.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[2],'R':x.tres.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[3],'R':x.cuatro.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[4],'R':x.cinco.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[5],'R':x.seis.value})
		evaluacion.push({'P':catCriteriosEvaluacionActividadComplementaria[6],'R':x.siete.value})
		var v1 = parseInt(x.uno.value.substring(1,2));
		var v2 = parseInt(x.dos.value.substring(1,2));
		var v3 = parseInt(x.tres.value.substring(1,2));
		var v4 = parseInt(x.cuatro.value.substring(1,2));
		var v5 = parseInt(x.cinco.value.substring(1,2));
		var v6 = parseInt(x.seis.value.substring(1,2));
		var v7 = parseInt(x.siete.value.substring(1,2));
		var prom =(v1+v2+v3+v4+v5+v6+v7)/7;
		var nivelDeDesempeño=""
		if (prom>=3.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Excelente'
		else if (prom>=2.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Notable'
		else if (prom>=1.5) nivelDeDesempeño = '['+prom.toFixed(2)+'] Bueno'
		else if (prom>=1) nivelDeDesempeño = '['+prom.toFixed(2)+'] Suficiente'
		else nivelDeDesempeño = '['+prom.toFixed(2)+'] insuficiente'
		Meteor.call('addEvaluacionActividadExtraescolar',actividad.get()._id,alumno.get(),evaluacion,nivelDeDesempeño)
	}
})
//*************************************************************************************************************************/
//                                 VER LA EVALUACIÓN DE UN ALUMNO EN LA ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.verEvaluacionAlumnoEnActividadExtraescolarJefe.helpers({
	actividad:function(){
        return actividad.get()?.actividad
	},
	alumno:function(){
		return alumno.get()?.nombre;
	},
	periodo:function(){
		return Session.get('periodo')
	},
	evaluacion:function(){
		return alumno.get()?.evaluacion;
	}
})
Template.verEvaluacionAlumnoEnActividadExtraescolarJefe.events({
	"click .eliminarEvaluacion":function(){
		Meteor.call('eliminarEvaluacionActividadExtraescolar',actividad.get()._id,alumno.get()._id)
	}
})
//*************************************************************************************************************************/
//                                  GENERAR LA LISTA DE ASISTENCIA A LA ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.listaDeAsistenciaActividadExtraescolarJefe.helpers({
	docente:function(){
		return actividad.get()?.docente;
	},
	actividad:function(){
		return actividad.get()?.actividad;
	},
	periodo:function(){
		return Session.get('periodo');
	},
	alumnos:function(){
		return actividad.get()?.alumnos;
	},
	number:function(){
		nAlumno++
		return nAlumno
	}
})
Template.listaDeAsistenciaActividadExtraescolarJefe.events({
	"click .imprimirListaAsistencia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                                            SUBIR LA LISTA DE ASISTENCIA
//*************************************************************************************************************************/
Template.uploadListaAsistenciaJefe.helpers({

})
Template.uploadListaAsistenciaJefe.events({
	"change .file-upload-input": function(event, template){
		var file = event.currentTarget.files[0];
		var reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			var buffer = new Uint8Array(reader.result);
			var act = actividad.get()
			var fileName = act.periodo+'-'+act.docente+'-'+act.actividad+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'ListaAsistenciaActividadExtraescolar');
			Meteor.call('subiListaAsistenciaActividadExtraescolar',act,fileName);
		};
		reader.readAsArrayBuffer(file);
	}
})
//*************************************************************************************************************************/
//                                            MUESTRA LOS DATOS DEL ALUMNO
//*************************************************************************************************************************/
Template.showDatosAlumnoPorActividadExtraescolarEnJefe.helpers({
	foto:function(){
		if (Meteor.users.findOne({'username':alumno.get()?.nc})?.profile?.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+alumno.get()?.nc+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
	},
	alumnoDatos:function(){
		return Meteor.users.findOne({'username':alumno.get()?.nc})  
	},
	eMailAlumno:function(){
		return Meteor.users.findOne({'username':alumno.get()?.nc})?.emails[0]?.address;
	}
});
//*************************************************************************************************************************/
//                              SOLICITUD DE LOS DATOS PARA LA CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
let datosConstanciaTerminacion = new ReactiveVar()
Template.solicitudDatosParaConstanciaTerminacionActividadExtraescolar.rendered = function() {
    Meteor.typeahead.inject();
};
Template.solicitudDatosParaConstanciaTerminacionActividadExtraescolar.helpers({
    docente:function(){
        return Meteor.users.find().fetch().map(function(it){return it.profile?.name})
    },
	jefeDeptoServiciosEscolares:function(){
		return jefeServiciosEcolares.get()?.profile?.name
	},
	jefe:function(){
		return Meteor.user()?.profile?.name
	}
})
Template.solicitudDatosParaConstanciaTerminacionActividadExtraescolar.events({
    "click .generarConstanciaTerminacionActividadExtraescolar":function(){
        let datos={}
        datos.nombreJefeDeptoServiciosEscolares = document.getElementById("nombreJefeDeptoServiciosEscolares").value
        datos.nombreJefeDeptoAcademico = document.getElementById("nombreJefeDeptoAcademico").value
        datos.responsableActividad = actividad.get().docente
		datos.alumnoNombre = alumno.get().nombre
		datos.alumnoNC = alumno.get().nc
		datos.alumnoCarrera = alumno.get().carrera
		datos.actividadNombre = actividad.get().actividad
		datos.alumnoNivelDesempeño = alumno.get().nivelDeDesempeño.substring(alumno.get().nivelDeDesempeño.lastIndexOf("]")+1)
		datos.valorNumerico = alumno.get().nivelDeDesempeño.slice(1,alumno.get().nivelDeDesempeño.lastIndexOf("]"))
		datos.periodoEscolar = actividad.get().periodo
        datosConstanciaTerminacion.set(datos)
        BlazeLayout.render("impresion",{rellena2:"vistaConstanciaTerminacionActividadExtraescolar"})
		/* setTimeout(() => {
            BlazeLayout.render("impresion", { rellena2: "vistaConstanciaTerminacionActividadExtraescolar" });
        }, 300); */
    }
});
//*************************************************************************************************************************/
//                                   CONSTANCIA DE TERMINACION DE ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.vistaConstanciaTerminacionActividadExtraescolar.onRendered(function(){
	const position = { x: 0, y: 0 }

	interact('.draggable').draggable({
		listeners: {
			start (event) {
				
			},
			move (event) {
				position.x += event.dx
				position.y += event.dy
				event.target.style.transform =`translate(${position.x}px, ${position.y}px)`
			},
		}
	})

	interact(singleAxisTarget).draggable({startAxis: 'xy',lockAxis: 'start'});
	interact(horizontalTarget).draggable({startAxis: 'x',lockAxis: 'x'});
})
Template.vistaConstanciaTerminacionActividadExtraescolar.helpers({
	datos:function(){
		return datosConstanciaTerminacion.get()
	},
	dia:function(){
		return  new Date().getDate()
	},
	mes:function(){
		const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
		return months[new Date().getMonth()]
	},
	año:function(){
		return new Date().getFullYear()
	}
})
Template.vistaConstanciaTerminacionActividadExtraescolar.events({
	"click .imprimirConstancia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		document.getElementById("btnRegresarActExtraescolares").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
		document.getElementById("btnRegresarActExtraescolares").style.visibility = "visible";
	},
	"click .regresarActExtraescolares":function(){
        BlazeLayout.render("main",{rellenaMenu:"menuSISAE",rellenaCuerpoSISAE:"sisaeExtraescolares"});
    }
})
//*************************************************************************************************************************/
//                                          SUBIR LA CONSTANCIA DE TERMINACION
//*************************************************************************************************************************/
Template.uploadConstanciaTermicacionActividadExtraescolar.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0];
		let reader = new FileReader();
		reader.onload=function(fileLoadEvent){
			let buffer = new Uint8Array(reader.result);
			let act = actividad.get()
			let fileName = act.periodo+'-'+act.docente+'-'+'Constancia-'+act.actividad+'-'+alumno.get().nc+obtenerExtension(file.name);
			Meteor.call('fileUpload',fileName,buffer,'ConstanciaTermicacionActividadExtraescolarDelDepto');
			Meteor.call('subiConstanciaTermicacionActividadExtraescolarDelDepto',act._id,alumno.get()._id,fileName);
		};
		reader.readAsArrayBuffer(file);
	}
})