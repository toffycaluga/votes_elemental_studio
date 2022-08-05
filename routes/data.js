import express from 'express';
import { create_funcionario, create_mesas, create_project_type, create_sede, create_voting_options, delete_vote_count, update_mesas } from "../db.js";
import bcrypt from 'bcrypt'

const router = express.Router()

const elementosVotacion = [
    {
        id: 'C1',
        name: 'Drones para la comuna',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 2
    },
    {
        id: 'C2',
        name: 'Cuidado del medio ambiente',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 2
    },
    {
        id: 'C3',
        name: 'Encuentro de poesia y musica',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 2
    },
    {
        id: 'C4',
        name: 'Quebradas en accion',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 2
    },
    {
        id: 'C5',
        name: 'Taller de composicion musical para estudiantes de educacion no formal de la comuna',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 2
    },
    {
        id: 'Cnulo',
        name: 'Nulos',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 2
    },
    {
        id: 'S1',
        name: 'Con iluminacion vivimos mejor y seguro todos',
        sector: 'Isla Negra',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S2',
        name: 'Documental: "No es una isla cualquiera"',
        sector: 'Isla Negra',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S3',
        name: 'Juegos infantiles e implementos deportivos',
        sector: 'Punta de Tralca',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S4',
        name: 'Museo itinerante Punta de Tralca',
        sector: 'Punta de Tralca',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S5',
        name: 'Restauracion y mejoramiento de multicancha club Deportivo El Totoral',
        sector: 'El Totoral',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S6',
        name: 'Vigilando El Totoral',
        sector: 'El Totoral',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S7',
        name: 'Operativo canino El Quisco Sur',
        sector: 'El Quisco Sur',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S8',
        name: 'Recuperacion de areas verdes de interes medio ambiental',
        sector: 'El Quisco Sur',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S9',
        name: 'Reparemos nuestros espacios de El Quisco Sur',
        sector: 'El Quisco Sur',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S10',
        name: 'A la plaza todos llegan ',
        sector: 'Comunidades de av. España',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S11',
        name: 'Bancs de descanso de uso publico',
        sector: 'Comunidades de av. España',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S12',
        name: 'Multicancha La Union',
        sector: 'Comunidades de av. España',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S13',
        name: 'Iluminando el sector residencial del borde costero',
        sector: 'El Quisco Centro',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S14',
        name: 'Recuperando nuestros ecosistemas en la quebrada Pinomar',
        sector: 'El Quisco Centro',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S15',
        name: 'Camara de vigilancia',
        sector: 'Eje Pinomar',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S16',
        name: 'Juntos/as embellecemos y mejoramos nuestra sede El Mirador',
        sector: 'Eje Pinomar',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S17',
        name: 'Deporte es vida',
        sector: 'El Quisco Alto',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S18',
        name: 'Lomos de toro para Las Marinas y Padre Alvear',
        sector: 'El Quisco Alto',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S19',
        name: 'acceso hacia y desde la costanera al sector alto',
        sector: 'El Quisco Norte',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'S20',
        name: 'Alarmas comunitarias con boton de panico',
        sector: 'El Quisco Norte',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'Snulo',
        name: 'Nulos',
        sector: 'comunal',
        periodo: 2022,
        project_type_id: 1
    },
    {
        id: 'J1',
        name: 'Talleres deportivos, artisticos y culturales para niños niñas y jovenes de El Totoral',
        sector: 'El Totoral',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J2',
        name: 'Taller bailando aprendo ingles',
        sector: 'El Totoral',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J3',
        name: 'Huerto urbano comunitario',
        sector: 'Isla Negra / Punta de Tralca',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J4',
        name: 'Memoria de tierra y mar',
        sector: 'Isla Negra / Punta de Tralca',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J5',
        name: 'Musica de El Quisco para el mundo',
        sector: 'El Quisco Centro / Sur',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J6',
        name: 'OFAU-Oficios del art urbano',
        sector: 'El Quisco Centro / Sur',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J7',
        name: 'Servicio capilar gratuito y taller formativo para futuros estilistas',
        sector: 'El Quisco Centro / Sur',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J8',
        name: 'Implementacion de espacios artisticos-culturales sector Quisco Norte',
        sector: 'El Quisco Norte / Alto / Eje Pinomar',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'J9',
        name: 'Talleres de educacion sexual integral y prevencion de violencia de genero',
        sector: 'El Quisco Norte / Alto / Eje Pinomar',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'Jnulo',
        name: 'Nulos',
        sector: 'juvenil',
        periodo: 2022,
        project_type_id: 4
    },
    {
        id: 'I1',
        name: 'Espacios verdes para niños y niñas, un jardin sanador al cual cuidar',
        sector: 'El Totoral',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I2',
        name: 'Implementacion de muro de escalada Totoral',
        sector: 'El Totoral',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I3',
        name: 'Juegos recreativos para el primer y segundo ciclo Isla Negra',
        sector: 'Isla Negra / Punta de Tralca',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I4',
        name: 'Juego recreativos para Punta de Tralca',
        sector: 'Isla Negra / Punta de Tralca',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I5',
        name: 'Juegos recreativo para generar un espacio de encuentro para niños y niñas',
        sector: 'E Quisco Centro/ Sur',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I6',
        name: 'Juegos recreativos para la union comunal',
        sector: 'E Quisco Centro/ Sur',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I7',
        name: 'Taller de patinaje y voleibol en la playa para niños y niñas',
        sector: 'El Quisco Norte / Alto / Eje Pinomar',
        periodo: 2022,
        project_type_id: 3
    },
    {
        id: 'I8',
        name: 'casitas para perros callejeros',
        sector: 'El Quisco Norte / Alto / Eje Pinomar',
        periodo: 2022,
        project_type_id: 3
    }, {
        id: 'Inulo',
        name: 'Nulos',
        sector: 'infantil',
        periodo: 2022,
        project_type_id: 3
    },

]

const sedes = [
    "los copihues", "aguas claras", "el mirador", "cordillera", "los pinguinos", "isla negra", "los olivos", "tralcamahuida", "maipumar", "gimnasio municipal", "padre alvear", "escuela el totoral", "las marinas"
]
const funcionarios = [
    {
        name: 'Fabian Gonzalez Araya',
        functions: 'Ministro de Fe',
        username: 'fgonzales',
        password: 'gonzalez2022',
        periodo: 2022,
        sede_id: 13,
        mesa: 'M1'
    },
    {
        name: 'Fernanda Ahumada Ramirez',
        functions: 'Ministro de Fe',
        username: 'fahumada',
        password: 'ahumada2022',
        periodo: 2022,
        sede_id: 12,
        mesa: 'M1'
    },
    {
        name: 'Sandra Cardenas Marchant',
        functions: 'Ministro de Fe',
        username: 'scardenas',
        password: 'cardenas2022',
        periodo: 2022,
        sede_id: 11,
        mesa: 'M1'
    },
    {
        name: 'Jeniffer Alfaro Carrasco',
        functions: 'Ministro de Fe',
        username: 'jalfaro',
        password: 'alfaro2022',
        periodo: 2022,
        sede_id: 10,
        mesa: 'M1'
    },
    {
        name: 'Jacqueline Vidal',
        functions: 'Ministro de Fe',
        username: 'jvidal',
        password: 'vidal2022',
        periodo: 2022,
        sede_id: 9,
        mesa: 'M1'
    },
    {
        name: 'Isabel Rojas',
        functions: 'Ministro de Fe',
        username: 'irojas',
        password: 'rojas2022',
        periodo: 2022,
        sede_id: 8,
        mesa: 'M1'
    },
    {
        name: 'Eliana Rojas Gonzalez',
        functions: 'Ministro de Fe',
        username: 'erojas',
        password: 'rojas2022',
        periodo: 2022,
        sede_id: 7,
        mesa: 'M1'
    },
    {
        name: 'Andrea Moraga Garrido',
        functions: 'Ministro de Fe',
        username: 'amoraga',
        password: 'moraga2022',
        periodo: 2022,
        sede_id: 6,
        mesa: 'M1'
    },
    {
        name: 'Liliana Ibarra Caceres',
        functions: 'Ministro de Fe',
        username: 'libarra',
        password: 'ibarra2022',
        periodo: 2022,
        sede_id: 5,
        mesa: 'M1'
    },
    {
        name: 'Jose Martinez Cotelo',
        functions: 'Ministro de Fe',
        username: 'jmatinez',
        password: 'martinez2022',
        periodo: 2022,
        sede_id: 4,
        mesa: 'M1'
    },
    {
        name: 'Jeamileth Castillo',
        functions: 'Ministro de Fe',
        username: 'jcastillo',
        password: 'castillo2022',
        periodo: 2022,
        sede_id: 3,
        mesa: 'M1'
    },
    {
        name: 'Georgina Hidalgo',
        functions: 'Ministro de Fe',
        username: 'ghidalgo',
        password: 'hidalgo2022',
        periodo: 2022,
        sede_id: 2,
        mesa: 'M1'
    },
    {
        name: 'Patricia Garces',
        functions: 'Ministro de Fe',
        username: 'pgarces',
        password: 'garces2022',
        periodo: 2022,
        sede_id: 1,
        mesa: 'M1'
    },
    {
        name: 'Daniela Perez Diaz',
        functions: 'Encargado de Local',
        username: 'dperez',
        password: 'perez2022',
        periodo: 2022,
        sede_id: 13,
        mesa: 'M1'
    },
    {
        name: 'Claudia Cayur',
        functions: 'Encargado de Local',
        username: 'ccayur',
        password: 'cayur2022',
        periodo: 2022,
        sede_id: 12,
        mesa: 'M1'
    },
    {
        name: 'CarmenGloria Garrido Briceño',
        functions: 'Encargado de Local',
        username: 'cgarrido',
        password: 'garrido2022',
        periodo: 2022,
        sede_id: 11,
        mesa: 'M1'
    },
    {
        name: 'Consuelo Galleguillos',
        functions: 'Encargado de Local',
        username: 'cgalleguillos',
        password: 'galleguillos2022',
        periodo: 2022,
        sede_id: 10,
        mesa: 'M1'
    },
    {
        name: 'Francisca Navarro Aranda',
        functions: 'Encargado de Local',
        username: 'fnavarro',
        password: 'navarro2022',
        periodo: 2022,
        sede_id: 9,
        mesa: 'M1'
    },
    {
        name: 'Mitzael Araos Contreras',
        functions: 'Encargado de Local',
        username: 'maraos',
        password: 'araos2022',
        periodo: 2022,
        sede_id: 8,
        mesa: 'M1'
    },
    {
        name: 'Daniela Rojas',
        functions: 'Encargado de Local',
        username: 'drojas',
        password: 'rojas2022',
        periodo: 2022,
        sede_id: 7,
        mesa: 'M1'
    },
    {
        name: 'Sebastian Pena',
        functions: 'Encargado de Local',
        username: 'spena',
        password: 'pena2022',
        periodo: 2022,
        sede_id: 6,
        mesa: 'M1'
    },
    {
        name: 'Dario Lira Lira',
        functions: 'Encargado de Local',
        username: 'dlira',
        password: 'lira2022',
        periodo: 2022,
        sede_id: 5,
        mesa: 'M1'
    },
    {
        name: 'Manuel Galdamez',
        functions: 'Encargado de Local',
        username: 'mgaldamez',
        password: 'galdamez2022',
        periodo: 2022,
        sede_id: 4,
        mesa: 'M1'
    },
    {
        name: 'Fernanda Ubilla',
        functions: 'Encargado de Local',
        username: 'fubilla',
        password: 'ubilla2022',
        periodo: 2022,
        sede_id: 3,
        mesa: 'M1'
    },
    {
        name: 'Angel Trincado Moya',
        functions: 'Encargado de Local',
        username: 'atrincado',
        password: 'trincado2022',
        periodo: 2022,
        sede_id: 2,
        mesa: 'M1'
    },
    {
        name: 'Fernanda Casas',
        functions: 'Encargado de Local',
        username: 'fcasas',
        password: 'casas2022',
        periodo: 2022,
        sede_id: 1,
        mesa: 'M1'
    },
    {
        name: 'Edgar Villagran',
        functions: 'Digitador',
        username: 'evillagran',
        password: 'villagran2022',
        periodo: 2022,
        sede_id: 13,
        mesa: 'M1'
    },
    {
        name: 'Marjorie Leiva',
        functions: 'Digitador',
        username: 'mleiva',
        password: 'leiva2022',
        periodo: 2022,
        sede_id: 12,
        mesa: 'M1'
    },
    {
        name: 'Fancisca Catalan Maulen',
        functions: 'Digitador',
        username: 'fcatalan',
        password: 'catalan2022',
        periodo: 2022,
        sede_id: 11,
        mesa: 'M1'
    },
    {
        name: 'Benjamin Cesped Villanueva',
        functions: 'Digitador',
        username: 'bcesped',
        password: 'cesped2022',
        periodo: 2022,
        sede_id: 10,
        mesa: 'M1'
    },
    {
        name: 'Ignacio Ossandon',
        functions: 'Digitador',
        username: 'iossandon',
        password: 'ossandon2022',
        periodo: 2022,
        sede_id: 9,
        mesa: 'M1'
    },
    {
        name: 'Roman Cisternas',
        functions: 'Digitador',
        username: 'rcisternas',
        password: 'cisternas2022',
        periodo: 2022,
        sede_id: 8,
        mesa: 'M1'
    },
    {
        name: 'Amparo Carreno',
        functions: 'Digitador',
        username: 'acarreno',
        password: 'carreno2022',
        periodo: 2022,
        sede_id: 7,
        mesa: 'M1'
    },
    {
        name: 'Veronica Arias',
        functions: 'Digitador',
        username: 'varias',
        password: 'arias2022',
        periodo: 2022,
        sede_id: 6,
        mesa: 'M1'
    },
    {
        name: 'Katty Gonzalez',
        functions: 'Digitador',
        username: 'kgonzalez',
        password: 'gonzalez2022',
        periodo: 2022,
        sede_id: 5,
        mesa: 'M1'
    },
    {
        name: 'Constanza Castillo',
        functions: 'Digitador',
        username: 'ccastillo',
        password: 'castillo2022',
        periodo: 2022,
        sede_id: 4,
        mesa: 'M1'
    },
    {
        name: 'Maria Fernanda Gutierrez Silva',
        functions: 'Digitador',
        username: 'mgutierrez',
        password: 'gutierrez2022',
        periodo: 2022,
        sede_id: 3,
        mesa: 'M1'
    },
    {
        name: 'Carolina Romo',
        functions: 'Digitador',
        username: 'cromo',
        password: 'romo2022',
        periodo: 2022,
        sede_id: 2,
        mesa: 'M1'
    },
    {
        name: 'Janett Gaete',
        functions: 'Digitador',
        username: 'jgaete',
        password: 'gaete2022',
        periodo: 2022,
        sede_id: 1,
        mesa: 'M1'
    }



]
const mesas = [
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 1
    },
    {
        name: 'M2',
        estado_mesa: null,
        sede_id: 1
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 2
    },
    {
        name: 'M2',
        estado_mesa: null,
        sede_id: 2
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 3
    },
    {
        name: 'M2',
        estado_mesa: null,
        sede_id: 3
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 4
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 5
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 6
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 1
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 7
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 8
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 9
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 10
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 11
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 12
    },
    {
        name: 'M1',
        estado_mesa: null,
        sede_id: 13
    },
]

const project_type = [
    "sectorial", "comunal", "infantil", "juvenil"
];


router.get('/admin/llenar-tablas', async (req, res) => {
    try {

        for (let i = 0; i < sedes.length; i++) {
            await create_sede(sedes[i]);
        }
        for (let i = 0; i < mesas.length; i++) {
            await create_mesas(mesas[i]);
        }


        for (let i = 0; i < project_type.length; i++) {
            await create_project_type(project_type[i]);
        }

        for (let i = 0; i < elementosVotacion.length; i++) {
            await create_voting_options(elementosVotacion[i]);
        }


        for (let i = 0; i < funcionarios.length; i++) {
            funcionarios[i].password = await bcrypt.hash(funcionarios[i].password, 10)
            await create_funcionario(funcionarios[i]);
        }

        req.flash('mensaje', 'datos subidos con exito')
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }

})
router.get('/admin/restablecer-mesas', async (req, res) => {
    for (let i = 1; i <= 13; i++) {

        await update_mesas(i, null)
    }
    req.flash('mensaje', 'mesas restablecidas con exito')
    res.redirect('/')
})
router.get('/admin/restablecer-votos', async (req, res) => {

    await delete_vote_count();

    req.flash('mensaje', 'votos eliminados con exito')
    res.redirect('/')
})


export default router;