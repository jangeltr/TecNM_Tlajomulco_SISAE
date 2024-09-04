let cantAlumnos = new  ReactiveVar(0)
let alumnosSistemas = new ReactiveVar(0)
let alumnosAgronomia = new ReactiveVar(0)
let alumnosIndustrias = new ReactiveVar(0)
let alumnosInnovacion = new ReactiveVar(0)
let alumnosAmbiental = new ReactiveVar(0)
let listaAlumnosNuevoIngreso = new ReactiveVar([])
let carrera = new ReactiveVar("")
function fromCarrera(alumno){
    if (alumno.carrera == carrera.get())
    return alumno
}
//*************************************************************************************************************************/
//                                                        AGREGAR  ALUMNOS
//*************************************************************************************************************************/
Template.agregarAlumnos.helpers({
    esJefe:function(){
        if (isJefe()||isAdministrador())
            return true;
        else
            return false;
    },
    esAdministrador:function(){
        if (isAdministrador())
            return true;
        else
            return false;
	},
})
Template.agregarAlumnos.events({//Metodo no usado, solo para referencias futuras sobre importar archivos JSON desde un servidor http
    "click .importaremos":function(event){
        let request = new XMLHttpRequest()
        request.open('GET', 'http://localhost/public/alumnos.json')
        request.responseType = 'json'
        request.send()

        request.onload = function() {
            let alumnosJSON = request.response
            let alumnosArrayJSON = alumnosJSON["alumnos"]
            let doc={}
            
            alert('Alumnos a importar: '+alumnosArrayJSON.length)
		}
    }
})
//*************************************************************************************************************************/
//                                              SUBIR LISTA DE ALUMNOS DE NUEVO INGRESO
//*************************************************************************************************************************/
Template.subirAlumnosNuevoIngreso.helpers({
    alumnos:function(){
        return cantAlumnos.get()
    },
    alumnosSistemas: function(){
        return alumnosSistemas.get()
    },
    alumnosAgronomia : function(){
        return alumnosAgronomia.get()
    },
    alumnosIndustrias : function(){
        return alumnosIndustrias.get()
    },
    alumnosInnovacion : function(){
        return alumnosInnovacion.get()
    },
    alumnosAmbiental : function(){
        return alumnosAmbiental.get()
    },
    alumnosTodos: function(){
        return (alumnosSistemas.get()+alumnosAgronomia.get()+alumnosIndustrias.get()+alumnosInnovacion.get()+alumnosAmbiental.get())
    },
    puedecargar : function(){
        if (cantAlumnos.get()>0)
            return true
        return false
    }
})
Template.subirAlumnosNuevoIngreso.events({
	"change .file-upload-input": function(event, template){
		let file = event.currentTarget.files[0]
		let reader = new FileReader()
		reader.onload=function(fileLoadEvent){
			let listAlumnos = JSON.parse(reader.result)
            cantAlumnos.set(listAlumnos.length)
            listaAlumnosNuevoIngreso.set(listAlumnos)

            carrera.set("Ingenieria en Sistemas Computacionales")
            let listAlu = listAlumnos.filter(fromCarrera)
            alumnosSistemas.set(listAlu.length)

            carrera.set("Ingenieria en Agronomia")
            listAlu = listAlumnos.filter(fromCarrera)
            alumnosAgronomia.set(listAlu.length)

            carrera.set("Ingenieria en Industrias Alimentarias")
            listAlu = listAlumnos.filter(fromCarrera)
            alumnosIndustrias.set(listAlu.length)

            carrera.set("Ingenieria en Innovacion Agricola")
            listAlu = listAlumnos.filter(fromCarrera)
            alumnosInnovacion.set(listAlu.length)

            carrera.set("Ingenieria Ambiental")
            listAlu = listAlumnos.filter(fromCarrera)
            alumnosAmbiental.set(listAlu.length)
		};
		reader.readAsText(file);
	},
    "click .cargar": function(){
        let listaAlumnos = listaAlumnosNuevoIngreso.get()
        let alumno = {}
        let periodoIngreso = document.getElementById("periodoIngreso").value
        for (let a of listaAlumnos){
            alumno.username=a.NC;
            //alumno.email=a.email;
            alumno.email=`l${a.NC}@tlajomulco.tecnm.mx`
            alumno.password="abc123.";
            alumno.nombre=a.nombre.toUpperCase();
            alumno.carrera=a.carrera;
            alumno.semestre = 1;
            alumno.periodoIngreso=periodoIngreso;
            alumno.fechaNacimiento = a.nacimiento;
            alumno.telefono = '';
            alumno.modalidad=a.modalidad;
            alumno.modulo='Tlajomulco';
            //Nivel Escolar
            if (a.nivel=="L")
                alumno.nivelEscolar='Licenciatura';
            else
                alumno.nivelEscolar='Postgrado';
            //Sexo
            if (a.sexo=='M')
                alumno.sexo='Masculino';
            else 
                alumno.sexo='Femenino';
			Meteor.call('addAlumno',alumno);
        };
        let aviso={encabezado:"Alta de alumnos",aviso:"Se han agregado alumnos de nuevo ingreso",positivo:true};
        Session.set("aviso",aviso);
    }
});