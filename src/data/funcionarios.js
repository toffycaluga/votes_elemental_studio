//? id sedes 

// 'SEDE SOCIAL QUISCO NORTE':1,
// 'SEDE SOCIAL CORDILLERA':2,
// 'SEDE SOCIAL EL MIRADOR':3,
// 'SEDE SOCIAL VILLA MAIPUMAR':4,
// 'SEDE SOCIAL VILLA PADRE ALVEAR':5,
// 'SEDE SOCIAL LOS COPIHUES':6,
// 'SEDE SOCIAL UNION COMUNAL DE JUNTAS DE VECINOS':7,
// 'EX HOTEL ITALIA':8,
// 'SEDE SOCIAL AGUAS CLARAS':9,
// 'SEDE SOCIAL LOS OLIVOS':10,
// 'SEDE SOCIAL VILLA NUEVA':11,
// 'SEDE SOCIAL COMUNITARIA ISLA NEGRA':12,
// 'ESCUELA BÁSICA EL TOTORAL':13
import { ministrosDeFe } from "./ministrosDeFe.js";
import { encargadosDeLocal } from "./encargadosDeLocal.js";
import { digitadores } from "./digitadores.js";


// se almacenan en funcionarios ministros de fe , encargados de mesa y digitadores en un solo arreglo de objetos
export const funcionarios = [...ministrosDeFe, ...encargadosDeLocal, ...digitadores];

// console.log("funcionarios :", funcionarios)