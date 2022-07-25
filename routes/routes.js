import express from 'express';
import fs from 'fs/promises';
import { create_vote_count, create_voting, create_voting_optios, create_voting_user, get_vote_user, get_voting_counter, get_voting_data } from "../db.js";



const router = express.Router()

function protected_route(req, res, next) {
    if (!req.session.user) {
        // si quiere trabajar sin rutas prptegidas, comente la siguiente línea
        return res.redirect('/login')
    }
    next()
}

// RUTAS
router.get('/', protected_route, async (req, res) => {
    //   const games = await get_games();
    // await formatDate(games)

    const mensajes = req.flash('mensaje')
    const errors = req.flash('errors')


    res.render('index.html', { mensajes, errors })
})
router.get('/registrar-voto', protected_route, async (req, res) => {



    const mensajes = req.flash('mensaje')
    const errors = req.flash('errors')


    res.render('votingRecord.html', { mensajes, errors })
})

router.post('/registrar-voto/:sede/:numero_mesa', protected_route, async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const sede = req.params.sede;
    const numero_mesa = req.params.numero_mesa;
    const rut = req.body.rut;
    const periodo = parseInt(req.body.periodo)
    const adress = req.body.adress;
    const edad = req.body.edad;
    const name = req.body.name;
    const usuario_existente = await get_vote_user(rut)
    if (usuario_existente) {
        if (usuario_existente.periodo == periodo) {
            req.flash('errors', 'usuario rut:' + rut + 'ya hizo proceso de votacion en sede:' + sede)
            res.redirect('/registrar-voto')
        } else {
            await create_voting_user(rut, name, adress, edad, sede, periodo, numero_mesa);
            req.flash('mensaje', 'usuario registrado correctamente')
            res.redirect('/')
        }
    } else {
        await create_voting_user(rut, name, adress, edad, sede, periodo, numero_mesa);
        req.flash('mensaje', 'usuario registrado correctamente')
        res.redirect('/')
    }
})
router.post('/cerrar-mesa/:mesa_id', protected_route, async (req, res) => {
    console.log(req.body);
    const counters = Object.values(req.body);
    console.log(counters);
    const n_mesa = req.params.mesa_id
    for (let i = 0; i < counters.length; i += 2) {
        console.log(counters[i], counters[i + 1]);
        create_vote_count(counters[i], counters[i + 1], n_mesa)
    }


    req.session.mesa.estado_mesa = false;
    res.redirect('/')
})
router.get('/cerrar-mesa', protected_route, async (req, res) => {

    const periodo = '2022'
    const sectoriales = await get_voting_data('sectorial', periodo)
    const comunales = await get_voting_data('comunal', periodo)
    const infantiles = await get_voting_data('infantil', periodo)
    const juveniles = await get_voting_data('juvenil', periodo)

    console.log(sectoriales, comunales, infantiles, juveniles);


    res.render('votingClose.html', { sectoriales, comunales, infantiles, juveniles })
})


router.get('/nueva-votacion', protected_route, async (req, res) => {


    res.render('newVoting.html')
})
router.post('/nueva-votacion', protected_route, async (req, res) => {
    console.log(req.body);
    const data = req.body
    const dataProject = {};
    dataProject.periodo = data.periodo;
    dataProject.tipoProyecto = data.tipoProyecto;
    console.log('largo data ' + Object.keys(data).length);
    const opciones = [];
    for (const [clave, valor] of Object.entries(data)) {

        if (clave == 'periodo') {
            continue
        }
        if (clave == 'tipoProyecto') {
            continue
        }
        opciones.push(valor);


    }

    const error = create_voting(dataProject);
    setTimeout(() => {
        console.log('subiendo datos');
        for (let i = 0; i < opciones.length; i++) {
            create_voting_optios(dataProject, opciones[i]);
        }
    }, 1000)
    req.flash('mensaje', `item agregado con exito`)
    req.flash('error', error)
    console.log(dataProject, opciones);
    res.redirect('/nueva-votacion')
})

router.get('/abrir-mesa', protected_route, async (req, res) => {
    res.render('openTable.html')
})

router.post('/abrir-mesa', protected_route, async (req, res) => {
    console.log(req.body);
    const encargado = req.body.encargado;
    const numero_mesa = req.body.numero_mesa;
    const estado_mesa = true;
    const sede = req.body.sede;
    req.session.mesa = {
        encargado, numero_mesa, sede, estado_mesa
    }
    res.redirect('/')
})

router.get('/editar-mesa/', protected_route, async (req, res) => {
    res.render('editTable.html')
})
router.post('/editar-mesa/', protected_route, async (req, res) => {
    req.session.mesa.encargado = req.body.encargado;
    req.session.mesa.numero_mesa = req.body.numero_mesa;
    req.session.mesa.sede = req.body.sede;

    res.redirect('/')
})
router.get('/ver-resultados', protected_route, async (req, res) => {
    const periodo = '2022'
    const sectoriales = await get_voting_counter('sectorial', periodo)
    const comunales = await get_voting_counter('comunal', periodo)
    const infantiles = await get_voting_counter('infantil', periodo)
    const juveniles = await get_voting_counter('juvenil', periodo)
    console.log(sectoriales, comunales, infantiles, juveniles);

    res.render('showResults.html', { sectoriales, comunales, infantiles, juveniles })
})
// router.get('/new_question', protected_route, async (req, res) => {

//   res.render('new_question.html',)
// })
// router.get('/lets_play', protected_route, async (rec, res) => {
//   const preguntas = await get_random_questions()
//   preguntas.map(pregunta => {
//     const respuestas = [pregunta.correct, pregunta.fake_1, pregunta.fake_2]
//     pregunta.respuestas = respuestas.sort((a, b) => 0.5 - Math.random())
//   })

//   res.render('lets_play.html', { preguntas })
// })


// router.post('/lets_play/:user_id/', protected_route, async (req, res) => {
//   const nscore = await score(req.body);
//   console.log(nscore);
//   await insert_games(req.params.user_id, nscore.score)
//   req.flash('mensaje', `has logrado ${nscore.score}/3 (${nscore.porcentaje}%) `)
//   res.redirect('/',)
// })




// router.post('/new_question', async (req, res) => {
//   await create_question(req.body);
//   res.redirect('/new_question')
// });
export default router