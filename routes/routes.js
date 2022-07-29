import express from 'express';
import fs from 'fs/promises';
import { create_funcionario, create_sede, create_vote_count, create_voting, create_voting_optios, create_voting_user, get_funcionarios, get_project_type, get_sedes, get_vote_user, get_voting_counter, get_voting_counter_table, get_voting_data, update_funcionario } from "../db.js";
import bcrypt from 'bcrypt'



const router = express.Router()

function protected_route(req, res, next) {
    if (!req.session.user) {
        // si quiere trabajar sin rutas prptegidas, comente la siguiente línea
        // return res.redirect('/login')
    }
    next()
}

// RUTAS
router.get('/', async (req, res) => {

    // const sedes = ["los copihues", "aguas claras", "el mirador", "cordillera", "los pinguinos", "isla negra", "los olivos", "tralcamahuida", "maipumar", "gimnasio municipal", "padre alvear", "escuela el totoral", "las marinas"]
    // for (let i = 0; i < sedes.length; i++) {
    //     await create_sede(sedes[i]);

    // }

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
    const sede_id = req.body.sede

    // console.log(sede);

    const numero_mesa = req.params.numero_mesa;
    const rut = req.body.rut;
    const periodo = parseInt(req.body.periodo)
    const adress = req.body.adress;
    const edad = req.body.edad;
    const name = req.body.name;
    const usuario_existente = await get_vote_user(rut)
    console.log(usuario_existente);
    if (usuario_existente) {

        const sede = await get_sedes(usuario_existente.sede_id);
        if (usuario_existente.periodo == periodo) {
            req.flash('errors', 'usuario rut:' + rut + 'ya hizo proceso de votacion en sede: ' + sede.name)
            res.redirect('/registrar-voto')
        } else {
            await create_voting_user(rut, name, adress, edad, sede_id, periodo, numero_mesa);
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
    // console.log(counters);
    const sede = req.session.user.sede_id;
    const n_mesa = req.params.mesa_id
    for (let i = 0; i < counters.length; i += 2) {
        console.log(counters[i], counters[i + 1]);
        create_vote_count(parseInt(counters[i]), counters[i + 1], n_mesa, sede)
    }


    req.session.mesa.estado_mesa = false;
    res.redirect('/')
})
router.get('/cerrar-mesa', protected_route, async (req, res) => {

    const periodo = '2022'
    const sectoriales = await get_voting_data(1, periodo)
    const comunales = await get_voting_data(2, periodo)
    const infantiles = await get_voting_data(3, periodo)
    const juveniles = await get_voting_data(4, periodo)

    console.log(sectoriales, comunales, infantiles, juveniles);


    res.render('votingClose.html', { sectoriales, comunales, infantiles, juveniles })
})


router.get('/nueva-votacion', protected_route, async (req, res) => {
    const project_types = await get_project_type()


    res.render('newVoting.html', { project_types })
})
router.post('/nueva-votacion', protected_route, async (req, res) => {
    console.log(req.body);
    const data = req.body
    const dataProject = {};
    dataProject.periodo = data.periodo;
    dataProject.tipoProyecto = data.tipoProyecto;
    dataProject.option = data.name;
    dataProject.sector = data.sector;
    // console.log('largo data ' + Object.keys(data).length);



    await create_voting_optios(dataProject);

    req.flash('mensaje', `item agregado con exito`)
    // req.flash('error', error)
    console.log(dataProject);
    res.redirect('/nueva-votacion')
})

router.get('/abrir-mesa', protected_route, async (req, res) => {
    const user = req.session.user
    const sede = await get_sedes(user.sede_id)
    console.log(sede);

    req.session.mesa = {
        encargado: user.name, numero_mesa: user.mesa, sede: sede.name, estado_mesa: true
    }
    res.redirect('/')
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

router.get('/editar-mesa/:mesa/:sede_id', protected_route, async (req, res) => {
    const mesa = req.params.mesa;
    const sede_id = req.params.sede_id
    const periodo = 2022
    const sectoriales = await get_voting_counter_table(1, periodo, mesa, sede_id)
    const comunales = await get_voting_counter_table(2, periodo, mesa, sede_id)
    const infantiles = await get_voting_counter_table(3, periodo, mesa, sede_id)
    const juveniles = await get_voting_counter_table(4, periodo, mesa, sede_id)
    console.log(sectoriales, comunales, infantiles, juveniles);



    res.render('editTable.html', { sectoriales, comunales, infantiles, juveniles })
})
router.post('/editar-mesa/:mesa/:sede_id', protected_route, async (req, res) => {

    req.flash('mensaje', 'votacion editada con exito')
    res.redirect('/')
})
router.get('/ver-resultados', protected_route, async (req, res) => {
    // const mesa = req.params.mesa;
    // const sede_id = req.params.sede_id
    const periodo = 2022
    const sectoriales = await get_voting_counter(1, periodo)
    const comunales = await get_voting_counter(2, periodo)
    const infantiles = await get_voting_counter(3, periodo)
    const juveniles = await get_voting_counter(4, periodo)
    console.log(sectoriales, comunales, infantiles, juveniles);

    res.render('showResults.html', { sectoriales, comunales, infantiles, juveniles })
})


router.get('/asignar-funcionario', async (req, res) => {
    const mensajes = req.flash('mensaje')
    const errors = req.flash('error');
    res.render('asignarFuncionarios.html', { errors, mensajes })
})
router.post('/asignar-funcionario', async (req, res) => {
    const data = req.body;
    if (data.password == data.password_confirm) {
        const password_encrypt = await bcrypt.hash(data.password, 10)
        data.password = password_encrypt;
        await create_funcionario(data);
        req.flash('mensaje', 'agregado con exito!')
    } else {
        req.flash('error', 'contraseña no coincide')
    }
    res.redirect('/asignar-funcionario')
})


router.get('/asignar-mesa', protected_route, async (req, res) => {
    const funcionarios = await get_funcionarios();
    const sedes = await get_sedes();
    const mensajes = req.flash('mensaje')


    res.render('asignarMesa.html', { funcionarios, sedes, mensajes })
})

router.post('/asignar-mesa', protected_route, async (req, res) => {
    const data = req.body;
    data.sede_id = parseInt(data.sede_id)
    data.name_id = parseInt(data.name_id)
    console.log(data);
    await update_funcionario(data);
    req.flash('mensaje', 'asignado con exito')
    res.redirect('/asignar-mesa')
})





export default router