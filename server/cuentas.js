import { Accounts } from 'meteor/accounts-base'

Accounts.emailTemplates.siteName='SISAE (Sistema de Servicios Academicos y Estudiantiles)';
Accounts.emailTemplates.from = 'SISAE-TecNM-Tlajomulco <SISAE@tlajomulco.tecnm.mx>';
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return 'TecNM Tlajomulco - SISAE - Solicitud de cambio de contraseña';
};

Accounts.emailTemplates.resetPassword.text = function (user, url){
    return 'Hola '+user.profile.name+
    '\n\n'+
    'Este es un correo generado de forma automática por el SISAE (Sistema de Servicios Academicos y Estudiantiles),\n'+
    'para facilitarte el poner una nueva contraseña en caso de olvidarla, por favor no respondas a este correo.'+
    '\n\n'+
    'Para resetear tu contraseña solo da click en el siguiente link'+
    '\n\n' + url;
};  