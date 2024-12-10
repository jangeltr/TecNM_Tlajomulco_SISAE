variablesDeInicio=function(){
    //Session.set("ipLocal",'http://192.168.0.16')
    //Session.set("ipLocal",'http://201.151.178.70'); 					//ip donde se encuentra corriento el SISAE y el servidor de archivos
    //Session.set("puerto",':3000')  										//puerto por el que se encuentra corriendo el servidor de archivos para el SISAE
    //Session.set("periodo","Ene-Jun 2020")   							//periodo que aparecera seleccionado por default y es el perido en el que el usuario este trabajando
    Session.set("periodoActual",Session.get("periodo")) 				//ultimo periodo o periodo en curso
    Session.set("carrera",carreraDefault)		//carrera seleccionada por default
    Session.set("modulo",moduloDefault)									//modulo seleccionado por default
    Session.set("statusAlumno","Activo")
    let aviso={encabezado:"",aviso:"",positivo:false, uploading:false}
    Session.set("aviso",aviso)
}