// año periodo de votación cambiar segun año
const periodo = 2024

/**
 * ids tipos de proyectos 
 * "sectorial"= 1
 * "comunal"= 2
 * "infantil" =3
 * "juvenil"=4
 */


// aqui esta la lista de iniciativas a la papeleta , para actualizar cambiar infotmacion por la correspondiente
export const elementosVotacion = [
    {
        id: 'C1',
        name: 'Los años dorados bailan y se divierten',
        sector: 'comunal',
        periodo,
        project_type_id: 2 //id del tipo de proyecto 
    },
    {
        id: 'C2',
        name: 'Hitos históricos de El Quisco',
        sector: 'comunal',
        periodo,
        project_type_id: 2
    },
    {
        id: 'C3',
        name: 'Encuentro de poesia y musica',
        sector: 'comunal',
        periodo,
        project_type_id: 2
    },
    {
        id: 'C4',
        name: 'Integración intergeneracional a través de la música',
        sector: 'comunal',
        periodo,
        project_type_id: 2
    },
    {
        id: 'Cnulo',
        name: 'Nulos',
        sector: 'comunal',
        periodo,
        project_type_id: 2
    },
    {
        id: 'S1',
        name: 'Alarmas comunitarias, conectadas con Seguridad Pública',
        sector: 'QUISCO CENTRO',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S2',
        name: 'Iluminación y vigilancia para el Borde Costero',
        sector: 'QUISCO CENTRO',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S3',
        name: 'Cámaras de seguridad para Quisco Alto',
        sector: 'QUISCO ALTO',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S4',
        name: 'Seguridad Vial para el Quisco Alto',
        sector: 'QUISCO ALTO',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S5',
        name: 'Comunidad Protegida: El Quisco Norte Seguro',
        sector: 'QUISCO NORTE',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S6',
        name: 'Fiesta Barrial: Raíces y Ritmos',
        sector: 'QUISCO NORTE',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S7',
        name: 'Vivamos Seguro',
        sector: 'QUISCO SUR',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S8',
        name: 'Embelleciendo nuestras plazas y fortaleciendo nuestra comunidad',
        sector: 'QUISCO SUR',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S9',
        name: 'Mejorando y reparando nuestra casa, Sede Maipumar',
        sector: 'EJE DE PINOMAR',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S10',
        name: 'Mirador Piedra del Gallo',
        sector: 'EJE DE PINOMAR',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S11',
        name: 'Iluminación Compartida',
        sector: 'COMUNIDADES DE AVENIDA ESPAÑA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S12',
        name: 'Nueva identidad a nuestro sector',
        sector: 'COMUNIDADES DE AVENIDA ESPAÑA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S13',
        name: 'Recuperemos nuestras áreas verdes y quebradas',
        sector: 'ISLA NEGRA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S14',
        name: 'Protección animal',
        sector: 'ISLA NEGRA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S15',
        name: 'Seguridad y recuperación de espacios',
        sector: 'ISLA NEGRA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S16',
        name: 'Generando Luz y Seguridad',
        sector: 'PUNTA DE TRALCA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S17',
        name: 'Vecinos seguros',
        sector: 'PUNTA DE TRALCA',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S18',
        name: 'Control de incendios',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 1
    },
    {
        id: 'S19',
        name: 'Totoral Seguro',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 1
    },
    {
        id: 'Snulo',
        name: 'Nulos',
        sector: 'comunal',
        periodo,
        project_type_id: 1
    },
    {
        id: 'J1',
        name: 'Escuela de talentos artisticos',
        sector: 'QUISCO CENTRO / QUISCO SUR / COMUNIDADES AVENIDA ESPAÑA',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J2',
        name: 'Parque de calistenia',
        sector: 'QUISCO CENTRO / QUISCO SUR / COMUNIDADES AVENIDA ESPAÑA',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J3',
        name: 'Cocina social: "Sabor sin etiquetas"',
        sector: 'QUISCO NORTE / QUISCO ALTO / EJE DE PINOMAR',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J4',
        name: 'Juntas en la cancha: Torneo de babyfútbol femenino de El Quisco',
        sector: 'QUISCO NORTE / QUISCO ALTO / EJE DE PINOMAR',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J5',
        name: 'Código joven, artes, convivencia y sentido de pertenencia para las nuevas generaciones ',
        sector: 'ISLA NEGRA / PUNTA DE TRALCA',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J6',
        name: 'Escuela de artes integrativas para festival galeria local',
        sector: 'ISLA NEGRA / PUNTA DE TRALCA',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J7',
        name: 'Talleres para la comunidad El Totoral',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 4
    },
    {
        id: 'J8',
        name: 'Ferias tematicas para El Totoral',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 4
    },
    {
        id: 'Jnulo',
        name: 'Nulos',
        sector: 'juvenil',
        periodo,
        project_type_id: 4
    },
    {
        id: 'I1',
        name: 'Plaza e la alegria',
        sector: 'QUISCO CENTRO / QUISCO SUR / COMUNIDADES AVENIDA ESPAÑA',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I2',
        name: 'Mi super refugio',
        sector: 'QUISCO CENTRO / QUISCO SUR / COMUNIDADES AVENIDA ESPAÑA',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I3',
        name: 'Sala de entretenimiento audivisual',
        sector: 'QUISCO CENTRO / QUISCO SUR / COMUNIDADES AVENIDA ESPAÑA',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I4',
        name: 'Nuestro Rincón de Diversión',
        sector: 'QUISCO NORTE / QUISCO ALTO / EJE DE PINOMAR',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I5',
        name: 'Equiparnos para la acción',
        sector: 'QUISCO NORTE / QUISCO ALTO / EJE DE PINOMAR',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I6',
        name: 'Barras Kyo Sport',
        sector: 'ISLA NEGRA / PUNTA DE TRALCA',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I7',
        name: 'Exploraciencia',
        sector: 'ISLA NEGRA / PUNTA DE TRALCA',
        periodo,
        project_type_id: 3
    },
    {
        id: 'I8',
        name: 'Juego y aprendo',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 3
    }, {
        id: 'I9',
        name: 'Al aire libre aprendo y me nutro',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 3
    }, {
        id: 'I10',
        name: 'Mas herramientas para nuestros deportes',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 3
    }, {
        id: 'I11',
        name: 'Mi campo de juegos',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 3
    }, {
        id: 'I12',
        name: 'Nuestro espacio de refugio y de calma',
        sector: 'EL TOTORAL',
        periodo,
        project_type_id: 3
    }, {
        id: 'Inulo',
        name: 'Nulos',
        sector: 'infantil',
        periodo,
        project_type_id: 3
    },

]
