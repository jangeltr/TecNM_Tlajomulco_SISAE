catCarreras = ['Ingenieria en Sistemas Computacionales',
				'Ingenieria en Agronomia',
				'Ingenieria en Industrias Alimentarias',
                'Ingenieria en Innovacion Agricola',
                'Ingenieria Ambiental',
                'Maestria en Ciencias en Agrobiotecnologia',
                'Doctorado en Ciencias de los Alimentos y Biotecnologia',
                'Doctorado en Ciencias en Biotecnologia en Procesos Agropecuarios']
optCarreras = [
    {label:"Ingenieria en Sistemas Computacionales", value:"Ingenieria en Sistemas Computacionales"},
    {label:"Ingenieria en Agronomia", value:"Ingenieria en Agronomia"},
    {label:"Ingenieria en Industrias Alimentarias", value:"Ingenieria en Industrias Alimentarias"},
    {label:"Ingenieria en Innovacion Agricola", value:"Ingenieria en Innovacion Agricola"},
    {label:"Ingenieria Ambiental", value:"Ingenieria Ambiental"},
    {label:"Maestria en Ciencias en Agrobiotecnologia", value:"Maestria en Ciencias en Agrobiotecnologia"},
    {label:"Doctorado en Ciencias de los Alimentos y Biotecnologia", value:"Doctorado en Ciencias de los Alimentos y Biotecnologia"},
    {label:"Doctorado en Ciencias en Biotecnologia en Procesos Agropecuarios", value:"Doctorado en Ciencias en Biotecnologia en Procesos Agropecuarios"}]
carreraDefault = 'Ingenieria en Sistemas Computacionales'

catModalidad = ['Escolarizado','Mixto']
optModalidad =[{label:'Escolarizado',value:'Escolarizado'},
                {label:'Mixto',value:'Mixto'}]
modalidadDefault = 'Escolarizado'

catModulo = ['Tlajomulco','Sayula'];
optModulo = [{label:'Tlajomulco',value:'Tlajomulco'},
            {label:'Sayula',value:'Sayula'}]
moduloDefault ='Tlajomulco'

catTipoActividadAcademica = ['Abierta','Cerrada'];
optTipoActividadAcademica =[{label:'Abierta',value:'Abierta'},
                            {label:'Cerrada',value:'Cerrada'}]
tipoActividadAcademicaDefault = 'Abierta'

catNivelEscolar = ['Licenciatura','Maestria','Doctorado'];
optNivelEscolar = [ {label:'Licenciatura',value:'Licenciatura'},
					{label:'Maestria',value:'Maestria'},
					{label:'Doctorado',value:'Doctorado'}]
nivelEscolarDefault = 'Licenciatura'

catAreaDeAdscripcion = ['Direccion',
                        'Sub. Academica',
                        'Sub. Planeacion',
                        'Sub. Administrativa']
optAreaDeAdscripcion = [
                        {label:"Direccion",value:"Direccion"},
                        {label:"Sub. Academica",value:"Sub. Academica"},
                        {label:"Sub. Planeacion",value:"Sub. Planeacion"},
                        {label:"Sub. Administrativa",value:"Sub. Administrativa"}];
areaDeAdscripcionDefault = 'Sub. Academica'

catRoles = [
            'Subdirector Academico',
            'Depto de Ciencias Basicas',
            'Depto de Ciencias Agropecuarias',
            'Depto de Ingenierias',
            'Depto de Gestion Tecnologica y Vinculacion',
            'Depto Division de Estudios Profesionales',
            'Depto de Servicios Escolares',
            'DEPI',
            'Docente',
            'Jefe de Tutorias',
            'Jefe de Actividades Extraescolares',
            'Jefe de Actividades Academicas',
            'Jefe del Centro de Informacion'
        ]
optRoles = [
            {label:'Subdirector Academico',value:'Subdirector Academico'},
            {label:'Depto de Ciencias Básicas',value:'Depto de Ciencias Básicas'},
            {label:'Depto de Ciencias Agropecuarias',value:'Depto de Ciencias Agropecuarias'},
            {label:'Depto de Ingenierias',value:'Depto de Ingenierias'},
            {label:'Depto de Gestion Tecnologica y Vinculacion',value:'Depto de Gestion Tecnologica y Vinculacion'},
            {label:'Depto Division de Estudios Profesionales',value:'Depto Division de Estudios Profesionales'},
            {label:'Depto de Servicios Escolares',value:'Depto de Servicios Escolares'},
            {label:'DEPI',value:'DEPI'},
            {label:'Docente',value:'Docente'},
            {label:'Jefe de Tutorias',value:'Jefe de Tutorias'},
            {label:'Jefe de Actividades Extraescolares',value:'Jefe de Actividades Extraescolares'},
            {label:'Jefe de Actividades Academicas',value:'Jefe de Actividades Academicas'},
            {label:'Jefe del Centro de Informacion',value:'Jefe del Centro de Informacion'}
        ];
rolDefault = 'Docente'

catEstados = [  'Activo',
                'Inactivo']
optEstados = [  {label:'Activo',value:'Activo'},
                {label:'Inactivo',value:'Inactivo'}]
estadoDefault = 'Activo'

catDepartamentos = [ "Depto de Ciencias Básicas",
                    "Depto de Ciencias Agropecuarias",
                    "Depto de Ingenierias"]
optDepartamentos = [
            {label:"Depto de Ciencias Básicas", value:"Depto de Ciencias Básicas"},
            {label:"Depto de Ciencias Agropecuarias", value:"Depto de Ciencias Agropecuarias"},
            {label:"Depto de Ingenierias", value:"Depto de Ingenierias"}]
departamentoDeafult="Depto de Ingenierias"

catSexos = ["Masculino",
            "Femenino"]
optSexos = [{label:"Masculino", value:"Masculino"},
            {label:"Femenino", value:"Femenino"}]

catStatusAlumno = ['Activo',
    'Inscrito',
    'Baja temporal Voluntaria',
    'Baja temporal por adeudo de exámenes especiales',
    'Baja temporal por no inscripción',
    'Baja definitiva voluntaria',
    'Baja definitiva por reprobación en primer semestre',
    'Baja definitiva por examen especial reprobado',
    'Baja definitiva por alcanzar el número máximo semestres permitido',
    'Baja definitiva por no inscripción a segundo semestre',
    'Baja definitiva por no cumplir con requisito de inscripción',
    'Egresado',
    'Titulado',
    'Baja Temporal por Enfermedad',
    'Baja Definitiva por Enfermedad',
    'Baja Definitiva traslado S.A.',
    'Baja Definitiva traslado otro Tec',
    'Baja Definitiva 3 periodos fuera',
    'Baja Definitiva Fallecimiento',
    'Baja Definitiva Indisciplina']
optStatusAlumno = [{label:'Activo',value:'Activo'},
    {label:'Inscrito',value:'Inscrito'},
    {label:'Egresado',value:'Egresado'},
    {label:'Titulado',value:'Titulado'},
    {label:'Baja temporal Voluntaria',value:'Baja temporal Voluntaria'},
    {label:'Baja temporal por adeudo de exámenes especiales',value:'Baja temporal por adeudo de exámenes especiales'},
    {label:'Baja temporal por no inscripción',value:'Baja temporal por no inscripción'},
    {label:'Baja Temporal por Enfermedad',value:'Baja Temporal por Enfermedad'},
    {label:'Baja definitiva voluntaria',value:'Baja definitiva voluntaria'},
    {label:'Baja definitiva por reprobación en primer semestre',value:'Baja definitiva por reprobación en primer semestre'},
    {label:'Baja definitiva por examen especial reprobado',value:'Baja definitiva por examen especial reprobado'},
    {label:'Baja definitiva por alcanzar el número máximo semestres permitido',value:'Baja definitiva por alcanzar el número máximo semestres permitido'},
    {label:'Baja definitiva por no inscripción a segundo semestre',value:'Baja definitiva por no inscripción a segundo semestre'},
    {label:'Baja definitiva por no cumplir con requisito de inscripción',value:'Baja definitiva por no cumplir con requisito de inscripción'},
    {label:'Baja definitiva por Enfermedad',value:'Baja Definitiva por Enfermedad'},
    {label:'Baja definitiva traslado S.A.',value:'Baja Definitiva traslado S.A.'},
    {label:'Baja definitiva traslado otro Tec',value:'Baja Definitiva traslado otro Tec'},
    {label:'Baja definitiva 3 periodos fuera',value:'Baja Definitiva 3 periodos fuera'},
    {label:'Baja definitiva Fallecimiento',value:'Baja Definitiva Fallecimiento'},
    {label:'Baja definitiva Indisciplina',value:'Baja Definitiva Indisciplina'}]
statusAlumnoDefault='Activo'

catNivelDesempeñoActividadComplementaria = [
    '[0] Insuficiente',
    '[1] Suficiente',
    '[2] Bueno',
    '[3] Notable',
    '[4] Excelente',
]
optNivelDesempeñoActividadComplementaria = [
    {label:'[0] Insuficiente',value:'[0] Insuficiente'},
    {label:'[1] Suficiente',value:'[1] Suficiente'},
    {label:'[2] Bueno',value:'[2] Bueno'},
    {label:'[3] Notable',value:'[3] Notable'},
    {label:'[4] Excelente',value:'[4] Excelente'}
]
nivelDesempeñoActividadComplementariaDefault = '[0] Insuficiente'

catCriteriosEvaluacionActividadComplementaria = [
    "Cumple en tiempo y forma con las actividades encomendadas alcanzando los objetivos",
    "Trabaja en equipo y se adapta a las nuevas situaciones",
    "Muestra liderazgo en las actividades encomendadas",
    "Organiza su tiempo y trabaja de manera proactiva",
    "Interpreta la realidad y se sensibiliza aportando soluciones a la problemática con la actividad complementaria",
    "Realiza sugerencias innovadoras para beneficio o mejora del programa en el que participa",
    "Tiene iniciativa para ayudar en las actividades encomendadas y muetra espiritu de servicio"
]

catGiroRamoSectorEmpresa = [
    'Industrial',
    'Servicios',
    'Público',
    'Privado',
    'Otro'
];
optGiroRamoSectorEmpresa = [
    {label:'Industrial',value:'Industrial'},
    {label:'Servicios',value:'Servicios'},
    {label:'Público',value:'Público'},
    {label:'Privado',value:'Privado'},
    {label:'Otro',value:'Otro'}
];
giroRamoSectorEmpresaDefault = 'Servicios';

catSeguridadSocial = [
    'ISSSTE',
    'IMSS',
    'Otro'
]
optSeguridadSocial = [
    {label:'ISSSTE',value:'ISSSTE'},
    {label:'IMSS',value:'IMSS'},
    {label:'Otro',value:'Otro'}
]
seguridadSocialDefault = 'IMSS'

catModalidadServicioSocial = ['Interno','Externo'];
optModalidadServicioSocial =[
    {label:'Interno',value:'Interno'},
    {label:'Externo',value:'Externo'}
]
modalidadDefaultServicioSocial = 'Externo'

catTipoProgramaServicioSocial = [
    'Educación para adultos',
    'Actividades cívicas',
    'Desarrollo sustentable',
    'Desarrollo de comunidad',
    'Actividades culturales',
    'Apoyo a la salud',
    'Actividades deportivas',
    'Medio ambiente',
    'Otro'
]
optTipoProgramaServicioSocial =[
    {label:'Educación para adultos',value:'Educación para adultos'},
    {label:'Actividades cívicas',value:'Actividades cívicas'},
    {label:'Desarrollo sustentable',value:'Desarrollo sustentable'},
    {label:'Desarrollo de comunidad',value:'Desarrollo de comunidad'},
    {label:'Actividades culturales',value:'Actividades culturales'},
    {label:'Apoyo a la salud',value:'Apoyo a la salud'},
    {label:'Actividades deportivas',value:'Actividades deportivas'},
    {label:'Medio ambiente',value:'Medio ambiente'},
    {label:'Otro',value:'Otro'}
]
tipoProgramaDefaultServicioSocial = 'Actividades cívicas'