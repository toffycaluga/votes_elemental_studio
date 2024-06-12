import express from 'express';
import { create_funcionario, create_vote_count, create_voting_options, create_voting_user, get_contribuyentes, get_funcionarios, get_project_type, get_sedes, get_total_votes, get_ultimo_voto, get_vote_folio, get_vote_user, get_voting_counter, get_voting_counter_table, get_voting_data, update_funcionario, update_mesas, update_vote, get_vote_user_periodo, get_vote_folio_periodo } from "../db.js";
import bcrypt from 'bcrypt'
import { format_for_table } from '../tools/datos_tabla.js';
import formatDate from '../tools/formatDate.js';


const periodo = 2024

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


    // let folio = 20220001;
    const mensajes = req.flash('mensaje')
    const errors = req.flash('errors')
    // let folio = 0
    // let data = await get_ultimo_voto();
    // console.log(data);
    // if (data) {
    //     folio = parseInt(data.id)

    //     folio += 1
    //     console.log(folio);
    // } else {
    //     folio = 20220001
    // }

    res.render('votingRecord.html', { mensajes, errors })
})

router.post('/registrar-voto/:sede/:numero_mesa', protected_route, async (req, res) => {

    const sede_id = req.params.sede

    // console.log(sede);

    const numero_mesa = req.params.numero_mesa;
    const rut = req.body.rut;

    const adress = req.body.adress;
    const edad = req.body.edad;
    const name = req.body.name;
    const folio = req.body.folio



    const folio_existente = await get_vote_folio(folio);
    if (folio_existente) {
        const sede = await get_sedes(folio_existente.sede_id);
        req.flash('errors', 'el numero de folio :' + folio + ' ya fue utilizado en sede : ' + sede.name)
        return res.redirect('/registrar-voto')
    }



    const usuario_existente = await get_vote_user(rut)
    if (usuario_existente) {
        console.log(usuario_existente);

        const sede = await get_sedes(usuario_existente.sede_id);
        if (usuario_existente.periodo == periodo) {
            req.flash('errors', 'usuario rut :' + rut + ' ya hizo proceso de votacion en sede : ' + sede.name)
            return res.redirect('/registrar-voto')
        } else {
            await create_voting_user(rut, name, adress, edad, sede_id, periodo, numero_mesa, folio);
            req.flash('mensaje', 'usuario registrado correctamente')
            return res.redirect('/')
        }
    } else {
        await create_voting_user(rut, name, adress, edad, sede_id, periodo, numero_mesa, folio);
        req.flash('mensaje', 'usuario registrado correctamente')
        return res.redirect('/')
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


    const sectoriales = await get_voting_data(1, periodo.toString())
    const comunales = await get_voting_data(2, periodo.toString())
    const infantiles = await get_voting_data(3, periodo.toString())
    const juveniles = await get_voting_data(4, periodo.toString())

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
    try {

        console.log(req.params);
        const { mesa, sede_id } = req.params;

        console.log("mesa : ", mesa);

        console.log("sede id :", sede_id);
        console.log("cargando datos de tablas...");
        const sectoriales = await get_voting_counter_table(1, periodo, mesa, sede_id)
        console.log("añadiendo sectoriales...");
        const comunales = await get_voting_counter_table(2, periodo, mesa, sede_id)
        console.log("añadiendo comunales");
        const infantiles = await get_voting_counter_table(3, periodo, mesa, sede_id)
        console.log("añadiendo infantiles");
        const juveniles = await get_voting_counter_table(4, periodo, mesa, sede_id)
        // console.log(sectoriales, comunales, infantiles, juveniles);
        console.log("añadiendo jueveniles");
        console.log("datos cargados con exito!");
        res.render('editTable.html', { sectoriales, comunales, infantiles, juveniles })
    } catch (e) {
        console.log(e);
    }
})
router.post('/editar-mesa/:mesa/:sede_id', protected_route, async (req, res) => {
    try {

        const counters = Object.values(req.body);
        // console.log(req.body);
        const sede = req.params.sede_id;
        const n_mesa = req.params.mesa
        // console.log(sede, n_mesa);
        console.log('editando....');
        for (let i = 0; i < counters.length; i += 2) {
            // console.log(counters[i], counters[i + 1]);
            await update_vote(parseInt(counters[i]), counters[i + 1], n_mesa, sede)
            // console.log();
        }

        req.flash('mensaje', 'votacion editada con exito')
        res.redirect('/')
    } catch (e) {
        console.log("error", e);
        req.flash('error', e.code)
        res.redirect('/')
    }
})
router.get('/ver-resultados', async (req, res) => {
    // const mesa = req.params.mesa;
    // const sede_id = req.params.sede_id

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
    try {

        const data = await get_vote_user(rut)

        if (data) {
            data.nombres = data.name
            data.apellido_paterno = ''
            data.apellido_materno = ''
            data.domicilio = data.addres;
            data.edad = formatDate(data.birthdate);
            console.log(data);
            res.send(data)

        } else {
            const data_contribuyente = await get_contribuyentes(rut)
            res.status(200).send(data_contribuyente);

        }
    } catch (e) {
        console.log("error busqueda:", e);
    }
    // console.log(data_contribuyente);
})

router.get('/votes-exist/:dato', protected_route, async (req, res) => {
    const { dato } = req.params

    try {
        let mensaje
        let data = await get_vote_user_periodo(dato, periodo)
        if (data) {
            const sede = await get_sedes(data.sede_id);
            // console.log(sede);
            mensaje = `rut :${dato} ya hizo proceso de votacion en sede : ${sede.name}`
            console.log("usuario encontrada");
        } else {
            data = await get_vote_folio_periodo(dato, periodo)
            const sede = await get_sedes(data.sede_id);
            mensaje = `Folio :${dato} ya se utilizo en otro voto,en sede :${sede.name} `
            console.log("folio encontrado");
        }
        return res.status(200).send({ mensaje })


    } catch (e) {
        // console.log(e);
        // mensaje = e
        res.status(404).send({ mensaje: "no encontrado" })
    }
})



export default router