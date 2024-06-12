import express from 'express';
import { create_funcionario, create_mesas, create_project_type, create_sede, create_voting_options, delete_voting_options, delete_vote_count, delete_vote_user, update_mesas } from "../db.js";
import bcrypt from 'bcrypt'
import { sedes } from '../src/data/sedes.js';
import { elementosVotacion } from '../src/data/elementosVotacion.js';
import { funcionarios } from '../src/data/funcionarios.js';
import { mesas } from '../src/data/mesas.js';
import { projectType } from '../src/data/projectType.js';


const router = express.Router()






router.get('/admin/reset-elementos-votacion/', async (req, res) => {
    try {
        // borramos elementos anteriores 
        await delete_voting_options(2024);
        for (let i = 0; i < elementosVotacion.length; i++) {
            await create_voting_options(elementosVotacion[i]);
        }

        req.flash('mensaje', 'eset de elementos de votacion con exito')
        res.redirect('/');
    } catch (e) {
        req.flash('errrors', e)
        res.redirect('/');
    }
})


router.get('/admin/llenar-tablas', async (req, res) => {
    try {

        for (let i = 0; i < sedes.length; i++) {
            await create_sede(sedes[i]);
        }
        for (let i = 0; i < mesas.length; i++) {
            await create_mesas(mesas[i]);
        }


        for (let i = 0; i < projectType.length; i++) {
            await create_project_type(projectType[i]);
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
    await delete_vote_user()

    req.flash('mensaje', 'votos eliminados con exito')
    res.redirect('/')
})


export default router;