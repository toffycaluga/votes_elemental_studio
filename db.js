import pg from 'pg'


const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'votes',
    password: '1234',
    max: 12,
    min: 2,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000
})


export async function create_sede(sede) {
    const client = await pool.connect()
    try {

        await client.query({
            text: 'insert into sedes(name) values ($1)',
            values: [sede]
        })
        client.release()
    } catch (error) {
        console.log(error);
    }
}


export async function get_user(email) {
    const client = await pool.connect()
    try {

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
    } catch (error) {
        console.log(error);
    }

}

export async function create_user(name, email, password) {
    const client = await pool.connect()
    const user = await get_user();
    try {

        if (user.length == 0) {

            await client.query({
                text: `insert into users (name, email, password,es_admin) values ($1, $2, $3,'true')`,
                values: [name, email, password]
            })

            client.release();
        } else {

            await client.query({
                text: 'insert into users (name, email, password) values ($1, $2, $3)',
                values: [name, email, password]
            })

            client.release()
        }
    } catch (error) {
        console.log(error);
    }
}
export async function create_project_type(project_type) {
    const client = await pool.connect();
    try {

        await client.query({
            text: 'insert into project_type (name) values ($1)',
            values: [project_type]

        })
        client.release()
    } catch (error) {
        console.log(error);
    }
}

export async function get_project_type() {
    const client = await pool.connect()
    const { rows } = await client.query({
        text: 'select * from project_type '
    })
    client.release()
    return rows
}

export async function create_voting(dataProject,) {
    const client = await pool.connect();
    try {
        await client.query({
            text: 'insert into project_type(id,name) values($1,$2,$3)',
            values: [dataProject.tipoProyecto + '-' + dataProject.periodo, dataProject.tipoProyecto]
        })


    } catch (error) {
        return 'ya existe la opcion ' + dataProject.tipoProyecto + '-' + dataProject.periodo
    }
    client.release()
}
export async function create_voting_options(dataProject) {
    const client = await pool.connect();
    try {

        await client.query({
            text: 'insert into project_options(id,name,project_type_id,sector,periodo) values ($1,$2,$3,$4,$5)',
            values: [dataProject.id, dataProject.name, dataProject.project_type_id, dataProject.sector, dataProject.periodo]
        })
        client.release()
    } catch (error) {
        console.log(error);
    }
}

export async function get_voting_data(type, periodo) {
    const client = await pool.connect();
    try {

        const { rows } = await client.query({
            text: " select * from project_type join  project_options on (project_type.id=project_options.project_type_id) where project_type.id=$1 and project_options.periodo=$2",
            values: [type, periodo]

        })
        client.release()
        return rows
    } catch (error) {
        console.log(error);
    }

}
export async function get_voting_counter(type, periodo) {
    const client = await pool.connect();
    try {


        const { rows } = await client.query({
            text: " select project_options.name, sum(option_counters.cant_votes) as cant_votes from option_counters join project_options on (project_options.id=option_counters.project_option_id)where project_options.project_type_id=$1 and project_options.periodo=$2 group by( project_options.name)"
            ,
            values: [type, periodo]

        })
        client.release()
        return rows
    } catch (error) {
        console.log(error);
    }

}
export async function get_voting_counter_table(type, periodo, mesa, sede_id) {
    const client = await pool.connect();
    try {

        const { rows } = await client.query({
            text: " select option_counters.project_options_id as id,project_options.name, sum(option_counters.cant_votes) as cant_votes from option_counters join project_options on (project_options.id=option_counters.project_option_id)where project_options.project_type_id=$1 and project_options.periodo=$2 and option_counters.mesa_id=$3 and option_counters.sede_id=$4 group by( project_options.name)"
            ,
            values: [type, periodo, mesa, sede_id]

        })
        client.release()
        return rows

    } catch (error) {
        console.log(eror);
    }
}
export async function create_vote_count(cant_votes, project_option_id, numero_mesa, sede_id) {
    const client = await pool.connect()
    try {

        await client.query({
            text: 'insert into option_counters(cant_votes,project_option_id,mesa_id,sede_id) values ($1,$2,$3,$4)',
            values: [cant_votes, project_option_id, numero_mesa, sede_id]
        })


        client.release();
    } catch (error) {
        console.log(error);
    }

}

export async function create_voting_user(rut, name, adress, edad, sede, periodo, numero_mesa) {
    const client = await pool.connect();
    try {

        await client.query({
            text: 'insert into vote_user (name,addres,birthdate, sede_id,periodo,mesa,rut,id) values ($1,$2, $3,$4,$5,$6,$7,$8)',
            values: [name, adress, edad, sede, periodo, numero_mesa, rut, periodo + '-00' + rut]

        })
        client.release()
    } catch (error) {
        console.log(error);
    }
}
export async function get_vote_user(rut) {
    const client = await pool.connect();
    try {
        const { rows } = await client.query({
            text: 'select * from vote_user where rut=$1',
            values: [rut]
        })
        client.release()
        return rows[0]
    } catch (error) {
        console.log(error);
    }
}

export async function create_funcionario(data) {
    const client = await pool.connect();
    try {

        await client.query({
            text: 'insert into funcionarios (name,username,periodo,password,functions,sede_id,mesa) values ($1,$2,$3,$4,$5,$6,$7)',
            values: [data.name, data.username, data.periodo, data.password, data.functions, data.sede_id, data.mesa]
        })
        client.release()
    } catch (error) {
        console.log(error);
    }
}
export async function get_funcionarios(username) {
    const client = await pool.connect();
    try {

        if (username) {

            const { rows } = await client.query({
                text: ' select * from funcionarios where username=$1',
                values: [username]
            });
            client.release();
            return rows[0];
        } else {
            const { rows } = await client.query({
                text: ' select * from funcionarios ',
            });
            client.release();
            return rows;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function get_sedes(id) {
    const client = await pool.connect();
    try {

        if (id) {
            const { rows } = await client.query({
                text: ' select name from sedes where id=$1',
                values: [id]
            })
            client.release();
            return rows[0];
        } else {

            const { rows } = await client.query({
                text: ' select * from sedes'
            })
            client.release();
            return rows;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function update_funcionario(data) {
    const client = await pool.connect();
    try {

        await client.query({
            text: `update funcionarios set sede_id=$1,mesa=$2 where id=$3 and periodo=$4`,
            values: [data.sede_id, data.tablename, data.name_id, data.periodo]
        })
        client.release()
    } catch (error) {
        console.log(error);
    }

}

export async function create_mesas(mesas) {
    const client = await pool.connect()
    try {
        await client.query({
            text: 'insert into mesas (name, estado_mesa,sede_id)values ($1,$2,$3)',
            values: [mesas.name, mesas.estado_mesa, mesas.sede_id]
        })
        client.release()

    } catch (error) {
        console.log(error);
    }
}

export async function get_mesas(sede_id) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query({
            text: 'select * from mesas where sede_id=$1',
            values: [sede_id]
        })
        client.release()
        return rows[0]
    } catch (error) {
        console.log(error);
    }
}

export async function update_mesas(sede_id, estado) {
    const client = await pool.connect()

    try {
        await client.query({
            text: 'update mesas set estado_mesa=$1 where sede_id=$2 ',
            values: [estado, sede_id]
        })
        console.log('cambiando a true');
        client.release()
    } catch (error) {
        console.log(error);
    }


}