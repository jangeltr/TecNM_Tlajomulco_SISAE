let actividad = new ReactiveVar();
let alumno = new ReactiveVar();
let ncAlumno = new ReactiveVar();
let nAlumno=0;
//*************************************************************************************************************************/
//                                                   EXTRAESCOLARES JEFE
//*************************************************************************************************************************/
Template.extraescolaresDocente.onCreated(function(){
	this.autorun(() => {
        this.subscribe('docentesActivos');
		this.subscribe('miActividadExtraescolar',Session.get('periodo'),Meteor.userId())
		this.subscribe('alumno',ncAlumno.get())
	});
});
Template.extraescolaresDocente.helpers({
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
Template.extraescolaresDocente.events({
    "keyup .myTxtBoxFiltroExtraescolaresAlumno":function(){
        let filtro = "#myFiltroExtraescolaresAlumno"+this._id;
		let value  = $(filtro).val().toLowerCase();
		let tabla = '#myTableExtraescolaresAlumno'+this._id+' tr';
    	$(tabla).filter(function(){
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
    },
    "click .generarListaAsistencia":function(){
		actividad.set(this)
		nAlumno=0;
		BlazeLayout.render("impresion",{rellena2:"listaDeAsistenciaActividadExtraescolarDocente"});
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
})
//*************************************************************************************************************************/
//                                              EVALUAR LA ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.evaluarActividadExtraescolarDocente.helpers({
	actividad:function(){
		if (actividad.get()?.actividad)
        return actividad.get().actividad
	},
	alumno:function(){
		if (alumno.get()?.nombre)
			return alumno.get().nombre
		return ""
	},
	periodo:function(){
		return Session.get('periodo')
	}
})
Template.evaluarActividadExtraescolarDocente.events({
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
Template.verEvaluacionAlumnoEnActividadExtraescolarDocente.helpers({
	actividad:function(){
		if (actividad.get()?.actividad)
			return actividad.get().actividad
		return ""
	},
	alumno:function(){
		if (alumno.get()?.nombre)
			return alumno.get().nombre
		return ""
	},
	periodo:function(){
		return Session.get('periodo')
	},
	evaluacion:function(){
		if (alumno.get()?.evaluacion)
			return alumno.get().evaluacion
		return ""
	}
})
//*************************************************************************************************************************/
//                                  GENERAR LA LISTA DE ASISTENCIA A LA ACTIVIDAD EXTRAESCOLAR
//*************************************************************************************************************************/
Template.listaDeAsistenciaActividadExtraescolarDocente.helpers({
	docente:function(){
		if (actividad.get()?.docente)
			return actividad.get().docente
		return ""
	},
	actividad:function(){
		if (actividad.get()?.actividad)
			return actividad.get().actividad
		return ""
	},
	periodo:function(){
		return Session.get('periodo');
	},
	alumnos:function(){
		if (actividad.get()?.alumnos)
			return actividad.get().alumnos
		return ""
	},
	number:function(){
		nAlumno++
		return nAlumno
	}
})
Template.listaDeAsistenciaActividadExtraescolarDocente.events({
	"click .imprimirListaAsistencia":function(){
		document.getElementById("btnImprimir").style.visibility = "hidden";
		window.print()
		document.getElementById("btnImprimir").style.visibility = "visible";
	}
})
//*************************************************************************************************************************/
//                                               SUBIR LA LISTA DE ASISTENCIA
//*************************************************************************************************************************/
Template.uploadListaAsistenciaDocente.events({
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
Template.showDatosAlumnoPorActividadExtraescolarEnDocente.helpers({
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
		if (Meteor.users.findOne({'username':alumno.get()?.nc})?.emails)
		return Meteor.users.findOne({'username':alumno.get()?.nc}).emails[0].address;
	}
});