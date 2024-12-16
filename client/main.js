import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//*************************************************************************************************************************/
//                                      IMPORTACION DE ARCHIVOS PRINCIPALES
//*************************************************************************************************************************/
import './main.html';
import './router.js';
import './COMUNES/funciones.js';
import './COMUNES/variablesDeInicio.js';
import './COMUNES/catalogos.js';
import './COMUNES/collections.js';
import './COMUNES/schemas.js';
//*************************************************************************************************************************/
//                           IMPORTACION DE PLANTILLAS UTILIZADAS PARA OTRAS PLANTILLAS
//*************************************************************************************************************************/
import './COMUNES/plantillas/plantillas.html';
import './COMUNES/plantillas/plantillas.js';
//*************************************************************************************************************************/
//                                IMPORTACION DE PLANTILLAS DE MENUES DE SECCIONES
//*************************************************************************************************************************/
import './SISAE/menuSISAE.html'
import './SISAE/menuSISAE.js'

import './ADMON/menuADMON.html'
import './ADMON/menuADMON.js'

import './SAD/menuSAD.html'
import './SAD/menuSAD.js'

import './REPOSITORIOS/menuREPOSITORIOS.html'
import './REPOSITORIOS/menuREPOSITORIOS.js'

variablesDeInicio();

Accounts.ui.config({
	passwordSignupFields : 'USERNAME_AND_OPTIONAL_EMAIL'
});
Accounts.config({
	forbidClientAccountCreation : true,
	loginExpirationInDays: (1 / 24 / 60) * 60
});
/*****************************************************************************************************************/
Template.main.onCreated(function(){
	this.autorun(() => {
        this.subscribe('configuracion',{
			onReady:function(){
				let conf=configuracion.findOne({})
				Session.set("ipLocal",conf.IP)
				Session.set("puerto",conf.Puerto)
			}
		});
	});
});
/*****************************************************************************************************************/
Template.login.onCreated(function(){
	this.autorun(()=>{
		this.subscribe('frases')
	})
})
Template.login.helpers({
	foto:function(){
        if (Meteor.user().profile.foto)
			if (Meteor.user().profile.tipo=="Docente")
				return Session.get("ipLocal")+Session.get("puerto")+"/fotos/docentes/"+Meteor.user().username+".jpg"
			else
				return Session.get("ipLocal")+Session.get("puerto")+"/fotos/alumnos/"+Meteor.user().username+".jpg" 
        else
            return Session.get("ipLocal")+Session.get("puerto")+"/fotos/fotoPerfil.jpg";
    },
	tieneFoto:function(){
		if (Meteor.user().profile.foto)
			return true
		return false
	},
	frase:function(){
		return frases.findOne()
	}
});
/*****************************************************************************************************************/
Template.dateTime.onRendered(function(){
	let elemento = document.getElementById("hora")
	ponerHora(elemento)
});
Template.dateTime.helpers({
	fecha:function(){
		return fechaLarga(new Date())
	}
})
/*****************************************************************************************************************/
Template.opciones.onCreated(function(){
	this.autorun(() => {
		let conf=configuracion.findOne({})
		Session.set("periodo",conf.Periodo) 
	});
});
Template.opciones.helpers({
	esJefe:function(){
		if (isAdministrador()||isJefe())
			return true;
		else
			return false;
	},
	esDocente:function(){
		if (isDocente())
			return true;
		else
			return false;
	},
});