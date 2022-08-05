import express from 'express';
import fs from 'fs/promises';
import { create_funcionario, create_sede, create_vote_count, create_voting, create_voting_options, create_voting_user, get_contribuyentes, get_funcionarios, get_project_type, get_sedes, get_total_votes, get_vote_user, get_voting_counter, get_voting_counter_table, get_voting_data, update_funcionario, update_mesas, update_vote } from "../db.js";
import bcrypt from 'bcrypt'
import { format_for_table } from '../tools/datos_tabla.js';
import formatDate from '../tools/formatDate.js';



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
    const sede_id = req.params.sede

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
            req.flash('errors', 'usuario rut :' + rut + ' ya hizo proceso de votacion en sede : ' + sede.name)
            res.redirect('/registrar-voto')
        } else {
            await create_voting_user(rut, name, adress, edad, sede_id, periodo, numero_mesa);
            req.flash('mensaje', 'usuario registrado correctamente')
            res.redirect('/')
        }
    } else {
        await create_voting_user(rut, name, adress, edad, sede_id, periodo, numero_mesa);
        req.flash('mensaje', 'usuario registrado correctamente')
        res.redirect('/')
    }
})
router.post('/cerrar-mesa/:mesa_id', protected_route, async (req, res) => {
    // console.log(req.body);
    const counters = Object.values(req.body);
    // console.log(counters);
    const sede = req.session.user.sede_id;
    const n_mesa = req.params.mesa_id
    for (let i = 0; i < counters.length; i += 2) {
        // console.log(counters[i], counters[i + 1]);
        create_vote_count(parseInt(counters[i]), counters[i + 1], n_mesa, sede)
    }

    await update_mesas(sede, false)
    req.session.mesa.estado_mesa = false;
    res.redirect('/')
})
router.get('/cerrar-mesa', protected_route, async (req, res) => {

    const periodo = '2022'
    const sectoriales = await get_voting_data(1, periodo)
    const comunales = await get_voting_data(2, periodo)
    const infantiles = await get_voting_data(3, periodo)
    const juveniles = await get_voting_data(4, periodo)

    // console.log(sectoriales, comunales, infantiles, juveniles);


    res.render('votingClose.html', { sectoriales, comunales, infantiles, juveniles })
})


router.get('/nueva-votacion', protected_route, async (req, res) => {
    const project_types = await get_project_type()


    res.render('newVoting.html', { project_types })
})
router.post('/nueva-votacion', protected_route, async (req, res) => {
    // console.log(req.body);
    const data = req.body
    const dataProject = {};
    dataProject.periodo = data.periodo;
    dataProject.tipoProyecto = data.tipoProyecto;
    dataProject.option = data.name;
    dataProject.sector = data.sector;
    // console.log('largo data ' + Object.keys(data).length);



    await create_voting_options(dataProject);

    req.flash('mensaje', `item agregado con exito`)
    // req.flash('error', error)
    // console.log(dataProject);
    res.redirect('/nueva-votacion')
})

router.get('/abrir-mesa', protected_route, async (req, res) => {
    const user = req.session.user
    await update_mesas(user.sede_id, true)
    const sede = await get_sedes(user.sede_id)
    // console.log(sede);
    req.session.mesa.estado_mesa = true
    setTimeout(() => {

        res.redirect('/')
    }, 500)
})

router.post('/abrir-mesa', protected_route, async (req, res) => {
    // console.log(req.body);
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
    // console.log(sectoriales, comunales, infantiles, juveniles);



    res.render('editTable.html', { sectoriales, comunales, infantiles, juveniles })
})
router.post('/editar-mesa/:mesa/:sede_id', protected_route, async (req, res) => {
    const counters = Object.values(req.body);
    // console.log(counters);
    const sede = req.params.sede_id;
    const n_mesa = req.params.mesa
    console.log(sede, n_mesa);
    for (let i = 0; i < counters.length; i += 2) {
        console.log(counters[i], counters[i + 1]);
        update_vote(parseInt(counters[i]), counters[i + 1], n_mesa, sede)
    }

    req.flash('mensaje', 'votacion editada con exito')
    res.redirect('/')
})
router.get('/ver-resultados', async (req, res) => {
    // const mesa = req.params.mesa;
    // const sede_id = req.params.sede_id
    const periodo = 2022
    const sectoriales = await get_voting_counter(1, periodo)
    const comunales = await get_voting_counter(2, periodo)
    const infantiles = await get_voting_counter(3, periodo)
    const juveniles = await get_voting_counter(4, periodo)

    const stotales = await get_total_votes(1, periodo)
    const ctotales = await get_total_votes(2, periodo)
    const itotales = await get_total_votes(3, periodo)
    const jtotales = await get_total_votes(4, periodo)

    const array_proyectos_sectoriales = await format_for_table(sectoriales);
    const array_proyectos_comunales = await format_for_table(comunales);
    const array_proyectos_infantiles = await format_for_table(infantiles);
    const array_proyectos_juveniles = await format_for_table(juveniles);

    // console.log('array_proyectos', array_proyectos_sectoriales);



    // console.log('sectoriales', sectoriales);
    const sedes = await get_sedes();


    req.flash('mensaje', 'aun no se cierra ninguna mesa')
    let mensajes = req.flash('mensaje')

    //console.log(sectoriales.length);
    if (sectoriales.length != 0) {
        mensajes = null;
    }

    res.render('showResults.html', { array_proyectos_sectoriales, sedes, array_proyectos_juveniles, array_proyectos_infantiles, array_proyectos_comunales })
})


router.get('/asignar-funcionario', protected_route, async (req, res) => {
    const mensajes = req.flash('mensaje')
    const errors = req.flash('error');
    res.render('asignarFuncionarios.html', { errors, mensajes })
})
router.post('/asignar-funcionario', protected_route, async (req, res) => {
    const data = req.body;
    if (data.password == data.password_confirm) {
        const password_encrypt = await bcrypt.hash(data.password, 10)
        data.password = password_encrypt;
        // console.log(data);
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

router.get('/contribuyentes/:rut', protected_route, async (req, res) => {
    const rut = req.params.rut
    const data = await get_vote_user(rut)
    if (data) {
        data.nombres = data.name
        data.apellido_paterno = ''
        data.apellido_materno = ''
        data.domicilio = data.addres;
        data.edad = formatDate(data.birthdate)
        console.log(data);
        res.send(data)

    } else {
        const data_contribuyente = await get_contribuyentes(rut)
        res.send(data_contribuyente);

    }
    // console.log(data_contribuyente);
})





export default router