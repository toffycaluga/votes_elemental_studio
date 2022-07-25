import pg from 'pg'


const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'voting',
    password: '1234',
    max: 12,
    min: 2,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000
})

export async function get_user(email) {
    const client = await pool.connect()
    if (!email) {
        const { rows } = await client.query({
            text: 'select * from users ',

        })
        client.release()
        // console.log('qui toy');
        return rows
    } else {
        const { rows } = await client.query({
            text: 'select * from users where email=$1',
            values: [email]
        })
        client.release()
        return rows[0]
    }
}

export async function create_user(name, email, password) {
    const client = await pool.connect()
    const user = await get_user();
    if (user.length == 0) {

        await client.query({
            text: `insert into users (name, email, password,es_admin) values ($1, $2, $3,'true')`,
            values: [name, email, password]
        })

        client.release()
    } else {

        await client.query({
            text: 'insert into users (name, email, password) values ($1, $2, $3)',
            values: [name, email, password]
        })

        client.release()
    }
}



export async function create_voting(dataProject,) {
    const client = await pool.connect();
    try {
        await client.query({
            text: 'insert into project_type(id,name_project,period_project) values($1,$2,$3)',
            values: [dataProject.tipoProyecto + '-' + dataProject.periodo, dataProject.tipoProyecto, dataProject.periodo]
        })


    } catch (error) {
        return 'ya existe la opcion ' + dataProject.tipoProyecto + '-' + dataProject.periodo
    }
    client.release()
}
export async function create_voting_optios(dataProject, option) {
    const client = await pool.connect();
    await client.query({
        text: 'insert into project_options(name_option,project_type_id) values ($1,$2)',
        values: [option, dataProject.tipoProyecto + '-' + dataProject.periodo]
    })
    client.release()
}

export async function get_voting_data(type, periodo) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: " select * from project_type join  project_options on (project_type.id=project_options.project_type_id) where project_type.id=$1",
        values: [type + '-' + periodo]

    })
    client.release()
    return rows

}
export async function get_voting_counter(type, periodo) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: " select project_options.name_option, sum(option_counters.cant_votes) as cant_votes from option_counters join project_options on (project_options.id=option_counters.project_option_id)where project_options.project_type_id=$1 group by( project_options.name_option)"
        ,
        values: [type + '-' + periodo]

    })
    client.release()
    return rows

}
export async function create_vote_count(cant_votes, project_option_id, numero_mesa) {
    const client = await pool.connect()
    await client.query({
        text: 'insert into option_counters(cant_votes,project_option_id,numero_mesa) values ($1,$2,$3)',
        values: [cant_votes, project_option_id, numero_mesa]
    })


    client.release();

}

export async function create_voting_user(rut, name, adress, edad, sede, periodo, numero_mesa) {
    const client = await pool.connect();
    await client.query({
        text: 'insert into vote_user (nombre,direccion,edad, sede,periodo,numero_mesa,rut) values ($1,$2, $3,$4,$5,$6,$7)',
        values: [name, adress, edad, sede, periodo, numero_mesa, rut]

    })
    client.release()
}
export async function get_vote_user(rut) {
    const client = await pool.connect();
    const { rows } = await client.query({
        text: 'select * from vote_user where rut=$1',
        values: [rut]
    })
    client.release()
    return rows[0]
}