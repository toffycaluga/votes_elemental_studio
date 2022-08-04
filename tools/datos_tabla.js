export async function format_for_table(data) {
    let proyectos_sectoriales = data.map(elem => elem.id)
    proyectos_sectoriales = [...new Set(proyectos_sectoriales)]

    const array_proyectos = proyectos_sectoriales.map(proyecto => {
        const datos_sedes = data.filter(dato => dato.id == proyecto)
        const obj = {
            proyecto
        }
        let total = 0
        for (let i = 1; i <= 13; i++) {
            const dato_sede_i = datos_sedes.find(dato => dato.sede_id == i)
            if (dato_sede_i) {
                obj['sede_' + i] = dato_sede_i.cant_votes
                total += dato_sede_i.cant_votes
            } else {
                obj['sede_' + i] = '--'
            }
        }
        obj['total'] = total
        return obj
    })
    return array_proyectos;
}