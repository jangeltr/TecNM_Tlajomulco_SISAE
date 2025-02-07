let usuario = new ReactiveVar({})
let imagenEn64 = ''
let fileBlob
//*************************************************************************************************************************/
//                                                 CODIGO DE LA PLATILLA MI PERFIL
//*************************************************************************************************************************/
Template.miPerfil.onCreated(function(){
	this.autorun(() =>{
		usuario.set(Meteor.users.findOne({}));
	});
});
Template.miPerfil.helpers({
	datos: function(){
        return usuario.get();
    },
    soyDocente: function(){
        if (usuario.get().profile.tipo=="Docente")
            return true;
        else
            return false;
    },
    foto:function(){
        return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+Meteor.users.findOne({_id: Meteor.userId()}).username+".jpg"
    }
}); 
Template.miPerfil.events({
    
});
//*************************************************************************************************************************/
//                                                 CODIGO DE LA PLATILLA SI SOY ALUMNO
//*************************************************************************************************************************/
Template.siSoyAlumno.helpers({
    foto:function(){
        if (usuario.get().profile.foto)
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+usuario.get().username+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
    },
    username:function(){
        return usuario.get().username;
    },
    nombre:function(){
        return usuario.get().profile.name;
    },
    eMail:function(){
        return usuario.get().emails[0].address;
    },
    telefono: function(){
        return usuario.get().profile.telefono;
    },
    carrera:function(){
        return usuario.get().profile.carrera;
    },
    semestre:function(){
        return usuario.get().profile.semestre;
    },
    modalidad:function(){
        return usuario.get().profile.modalidad;
    },
    modulo:function(){
        return usuario.get().profile.modulo;
    },
    fechaNacimiento:function(){
        return usuario.get().profile.fechaNacimiento;
    },
    sexo:function(){
        return usuario.get().profile.sexo;
    },
    tieneFoto:function(){
        if (usuario.get().profile.foto)
            return true;
        else
            return false;
    }
});
Template.siSoyAlumno.events({
    "click #btnGuardarAlumno":function(){
        let u=usuario.get();
        let correo=true;
        if ($('#txtTelefono').val()!="")
            u.profile.telefono=$('#txtTelefono').val();
        if ($('#txteMail').val()!=""){
            let emails=[];
            let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test($('#txteMail').val())){
                emails.push({"address":$('#txteMail').val()})
                u.emails = emails;
            }
            else{
                let wrongEmail=$('#txteMail').val()
                let aviso={encabezado:"Mi perfil",aviso:'El email:'+ wrongEmail+', esta mal escrito',positivo:false}
                Session.set("aviso",aviso)
                correo=false;
            } 
        }
        if(correo){
            let aviso={encabezado:"Mi perfil",aviso:'Cambios registrados',positivo:true}
            Session.set("aviso",aviso)
            Meteor.call('actualizarMiPerfil',u)
        }
    }
})
//*************************************************************************************************************************/
//                                                 CODIGO DE LA PLATILLA SI SOY DOCENTE
//*************************************************************************************************************************/
Template.siSoyDocente.helpers({
    foto:function(){
        if (usuario.get().profile.foto)
            return `${Session.get("ipLocal")}${Session.get("puerto")}/fotos/docentes/${usuario.get().username}.jpg?${new Date().getTime()}`
        return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
    },
    nombre:function(){
        return usuario.get().profile.prefijo + ' '+ usuario.get().profile.name;
    },
    cuenta:function(){
        return usuario.get().username
    },
    areaDeAdscripcion:function(){
        return usuario.get().profile.areaDeAdscripcion;
    },
    eMail:function(){
        return usuario.get().emails[0].address;
    },
    telefono: function(){
        return usuario.get().profile.telefono;
    },
    descripcion:function(){
        return usuario.get().profile.descripcion;
    },
    tieneFoto:function(){
        if (usuario.get().profile.foto)
            return true;
        return false;
    },
    tieneFirma:function(){
        if (usuario.get().profile.firma)
            return true;
        return false;
    },
    firma:function(){
        if (usuario.get().profile.firma)
            return `${Session.get("ipLocal")}${Session.get("puerto")}/fotos/docentes/Firma_${usuario.get().username}.jpg?${new Date().getTime()}` 
        return Session.get("ipLocal")+Session.get("puerto")+"/fotos/sinFirma.jpg";
    }
});
Template.siSoyDocente.events({
    "click #btnGuardarDocente":function(){
        let u=usuario.get();
        let correo=true;
        if ($('#txtTelefono').val()!="")
            u.profile.telefono=$('#txtTelefono').val();
        if ($('#txtDescripcion').val()!="")
            u.profile.descripcion=$('#txtDescripcion').val();
        if ($('#txteMail').val()!=""){
            let emails=[];
            let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test($('#txteMail').val())){
                emails.push({"address":$('#txteMail').val()})
                u.emails = emails;
            }
            else{
                let wrongEmail=$('#txteMail').val()
                let aviso={encabezado:"Mi perfil",aviso:'El email:'+ wrongEmail+', esta mal escrito',positivo:false}
                Session.set("aviso",aviso)
                correo=false;
            } 
        }
        if(correo){
            let aviso={encabezado:"Mi perfil",aviso:'Cambios registrados',positivo:true}
            Session.set("aviso",aviso)
            Meteor.call('actualizarMiPerfil',u)
        }
    }
})
//*************************************************************************************************************************/
//                                           CODIGO DE LA PLATILLA PARA SUBIR LA FOTO
//*************************************************************************************************************************/
Template.uploadFotoMiPerfil.events({
    "click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFileMiPerfil2")
		btnFile.click()
	},
    "click .btnGuardar":function(){
        let reader = new FileReader();
        let tipo=""
        if (usuario.get().profile.tipo=="Docente"){
            tipo="fotoDocente";
        }
        else{
            tipo="fotoAlumno";
        }
        reader.onload=function(fileLoadEvent){
            let buffer = new Uint8Array(reader.result)
        
            Meteor.call('fileUpload',usuario.get().username+".jpg",buffer,tipo)
            Meteor.call('cambieMiFoto')
        }
        document.getElementById('imgFotoPerfil').src = imagenEn64
        document.getElementById("imgCargoMiFotoPerfil").style.display = "inline"
        reader.readAsArrayBuffer(fileBlob);
	},
	"change .file-upload-input": function(event, template){
        document.querySelector("#dos").style.display="inline"
        document.querySelector("#tres").style.display="none"
        document.querySelector("#cuatro").style.display="none"
		let file = event.currentTarget.files[0]
        
        const previewCanvas = document.querySelector('#previewCanvas')
        const contexto = previewCanvas.getContext('2d')
        contexto.clearRect(0, 0, previewCanvas.width, previewCanvas.height)//cada que seleccione un archivo limpia el canvas en caso de estar visible

        const previewImg = document.querySelector('#previewImg')
        previewImg.style.width="250px"

        let urlImage = URL.createObjectURL(file)

        const divImg1 = document.querySelector('#divImg1')  //Aqui obtiene el div donde se colocara el elemento img con la imagen completa
        divImg1.innerHTML = ''                              //Se limpia cada que selecciona una diferente
        let imgCompleta = document.createElement('img');    //Se crea el elemento con la imagen seleccionada
        imgCompleta.setAttribute('id', 'imgCompleta');
        imgCompleta.style.width="500px"
        divImg1.appendChild(imgCompleta);
        imgCompleta.setAttribute('src',urlImage)

        new Croppr('#imgCompleta', {        //Crea el objeto que se encargara del recorte de la imagen con el id del elemento que contiene la imagen
            aspectRatio: 1,
            startSize: [70, 70],
            onCropEnd: recortarImagen       //Funcion que sera llamada al seleccionar un area a recortar
        })

        function recortarImagen(data) {     //Funcion que se ejecuta cada que se selecciona un area a recortar
            document.querySelector("#tres").style.display="inline"
            document.querySelector("#cuatro").style.display="inline"
            const inicioX = data.x;
            const inicioY = data.y;
            const anchoDelRecorte = data.width;
            const alturaDelRecorte = data.height;
            const zoom = 1;
            
            // El canvas donde se mostraria la imagen recortada pero esta oculto porque si la imagen recortada es muy grande se sale de la modal
            contexto.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
            previewCanvas.width = anchoDelRecorte * zoom;
            previewCanvas.height = alturaDelRecorte * zoom;
            
            let miNuevaImagenTemp = new Image()
            miNuevaImagenTemp.onload = function() { // Cuando la imagen completa se carge se procederá al recorte
                // Se recorta
                contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, anchoDelRecorte, alturaDelRecorte, 0, 0, anchoDelRecorte * zoom, alturaDelRecorte * zoom);
                
                imagenEn64 = previewCanvas.toDataURL("image/jpeg")  // Se transforma a base64
                previewCanvas.toBlob(function(blob) {
                    fileBlob = blob
                }, 'image/jpeg', 0.8)
                previewImg.setAttribute('src',imagenEn64)           // Se coloca en el elemento Img
            }
            miNuevaImagenTemp.src = urlImage    // Contiene la imagen completa sin recorte
        }
	},
    "click .btnCerrar":function(){
		document.getElementById("imgCargoMiFotoPerfil").style.display = "none"
	}
});
//*************************************************************************************************************************/
//                                           CODIGO DE LA PLATILLA PARA SUBIR LA FIRMA
//*************************************************************************************************************************/
Template.uploadFotoMiFirma.events({
    "click .btnSubirArchivo":function(){
		let btnFile = document.getElementById("btnFileMiFirma")
		btnFile.click()
	},
    "click .btnGuardar":function(){
        let reader = new FileReader();
        let tipo="fotoDocente"
        reader.onload=function(fileLoadEvent){
            let buffer = new Uint8Array(reader.result)
            Meteor.call('fileUpload','Firma_'+usuario.get().username+".jpg",buffer,tipo)
            Meteor.call('cambieMiFirma')
        }
        document.getElementById('imgFirmaPerfil').src = imagenEn64
        document.getElementById("imgCargoMiFotoFirma").style.display = "inline"
        reader.readAsArrayBuffer(fileBlob);
	},
	"change .file-upload-input": function(event, template){
        document.querySelector("#dosFirma").style.display="inline"
        document.querySelector("#tresFirma").style.display="none"
        document.querySelector("#cuatroFirma").style.display="none"
		let file = event.currentTarget.files[0]
        
        const previewCanvas = document.querySelector('#previewCanvasFirma')
        const contexto = previewCanvas.getContext('2d')
        contexto.clearRect(0, 0, previewCanvas.width, previewCanvas.height)//cada que seleccione un archivo limpia el canvas en caso de estar visible

        const previewImg = document.querySelector('#previewImgFirma')
        previewImg.style.width="250px"

        let urlImage = URL.createObjectURL(file)

        //const divImg1 = document.querySelector('#divImgFirma')  //Aqui obtiene el div donde se colocara el elemento img con la imagen completa
        const divImg1 = document.getElementById('divImgFirma')
        divImg1.innerHTML = ''                              //Se limpia cada que selecciona una diferente
        let imgCompleta = document.createElement('img');    //Se crea el elemento con la imagen seleccionada
        imgCompleta.setAttribute('id', 'imgCompletaFirma');
        imgCompleta.style.width="500px"
        divImg1.appendChild(imgCompleta);
        imgCompleta.setAttribute('src',urlImage)

        new Croppr('#imgCompletaFirma', {        //Crea el objeto que se encargara del recorte de la imagen con el id del elemento que contiene la imagen
            aspectRatio: 0,
            startSize: [70, 70],
            onCropEnd: recortarImagen       //Funcion que sera llamada al seleccionar un area a recortar
        })

        function recortarImagen(data) {     //Funcion que se ejecuta cada que se selecciona un area a recortar
            document.querySelector("#tresFirma").style.display="inline"
            document.querySelector("#cuatroFirma").style.display="inline"
            const inicioX = data.x;
            const inicioY = data.y;
            const anchoDelRecorte = data.width;
            const alturaDelRecorte = data.height;
            const zoom = 1;
            
            // El canvas donde se mostraria la imagen recortada pero esta oculto porque si la imagen recortada es muy grande se sale de la modal
            contexto.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
            previewCanvas.width = anchoDelRecorte * zoom;
            previewCanvas.height = alturaDelRecorte * zoom;
            
            let miNuevaImagenTemp = new Image()
            miNuevaImagenTemp.onload = function() { // Cuando la imagen completa se carge se procederá al recorte
                // Se recorta
                contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, anchoDelRecorte, alturaDelRecorte, 0, 0, anchoDelRecorte * zoom, alturaDelRecorte * zoom);
                
                imagenEn64 = previewCanvas.toDataURL("image/jpeg")  // Se transforma a base64
                previewCanvas.toBlob(function(blob) {
                    fileBlob = blob
                }, 'image/jpeg', 0.8)
                previewImg.setAttribute('src',imagenEn64)           // Se coloca en el elemento Img
            }
            miNuevaImagenTemp.src = urlImage    // Contiene la imagen completa sin recorte
        }
	},
    "click .btnCerrar":function(){
		document.getElementById("imgCargoMiFotoPerfil").style.display = "none"
	}
});