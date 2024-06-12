# Votes
## 📄Descripción del Proyecto📄
En este repositorio se encuentra una aplicación para el conteo de votos y la visualización de los resultados de un proceso de votación. La aplicación está diseñada para gestionar y facilitar la recolección de votos, así como para proporcionar una representación clara y precisa de los resultados obtenidos.
## Índice

- [Características](#características)
- [tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Datos](#datos)
- [Rutas para Datos](#rutas-para-datos)
- [Licencia](#licencia)

## 🚀Características🚀
- **Registro de Votantes :** Permite el registro de usuarios y garantiza que cada votante pueda emitir su voto de manera única.
- **Conteo de Votos :** Proporciona un sistema automatizado para el conteo de votos, asegurando precisión y eficiencia.
- **Visualización de Resultados :** Ofrece gráficos y tablas para una representación visual clara de los resultados de la votación.
- **Autenticación y Seguridad:** Implementa medidas de seguridad para proteger la integridad del proceso de votación.

## 🔧Tecnologías🔧
- **Backend :** ![Express.js](https://img.shields.io/badge/Express-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
- **Base de Datos :** ![postgresql](https://img.shields.io/badge/Postgresql-323330?style=for-the-badge&logo=postgresql&logoColor=009099)

- **Frontend:** ![HTML](https://img.shields.io/badge/html-323330?style=for-the-badge&logo=html5&logoColor=6699)![css](https://img.shields.io/badge/Express-323330?style=for-the-badge&logo=css3&logoColor=006699)![css](https://img.shields.io/badge/Javascript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)![nunjucks](https://img.shields.io/badge/Nunjucks-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)


<img width="1266" alt="Screen Shot 2022-06-19 at 2 18 18 PM" src="https://github.com/toffycaluga/votes_elemental_studio/blob/main/src/img/project-img2.png">

## Instalación 
1. Clona el repositorio :
```bash copy
    git clone https://github.com/toffycaluga/votes_elemental_studio.git

    cd votes_elemental_studio
    
```
2. Instala las dependencias:

``` bash copy
npm install
```
3. Configura la base de datos ejecutando el script SQL:

```bash copy
psql -f tables.sql
```

## Uso 
1. Inicia el servidor :
```bash copy 
npm start
```
2. abre **http://localhost:3000/** en tu navegador para ver la aplicación en funcionamiento.

## Estructura del proyecto
- **public/:** Archivos estáticos (imágenes, CSS, JavaScript).
- **routes/:** Rutas de la aplicación.
- **src/:** Código fuente de la aplicación.
- **templates/:** Plantillas de Nunjucks.
**tools/:** Herramientas y utilidades.

## Datos 

En la carpeta **src/data** encontraran los archivos generadores de datos necesarios para el proyecto :

- **digitadores.js**: contiene un arreglo de objetos con los digitadores del proceso de votación.

- **ministrosDeFe.js**: contiene un arreglo de objetos con los ministros de fe del proceso de votación.

- **encargadosDeLocal.js**: contiene un arreglo de objetos con los encargados de local del proceso de votación. 

- **elementosVotacion.js**: contiene un arreglo de objetos con las opciones a votar. 

- **mesas.js**: contiene un arreglo de objetos con las mesas del proceso de votación. 


- **projectType.js**: Contiene un arreglo con los tipos de proyectos que se usaran en el proceso.

- **sedes.js**: Contiene un arreglo con las sedes de votacion del proceso.



## Rutas para datos 
- **/admin/llenar-tablas**: Ruta que almacena toda los datos de los archivos de ***src/data*** en las base de datos.

- **/admin/reset-elementos-votacion**: En caso de un error en los elementos a votar , esta ruta limpia la tabla y vuelve a subir los datos de **elementosVotacion.js** .

- **/admin/restablecer-mesas** : Restablece las mesas al estado anterior a ser abiertas.
- **/admin/restablecer-votos**:Elimina los datos de usuarios que hayan votado y cantidad de votaciones . Ideal para usar desues de testing.
## Licencia

Este proyecto está licenciado bajo la Licencia MIT.

⌨️con ❤️por [Toffy Caluga](https://github.com/toffycaluga)