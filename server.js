import express from 'express';
import nunjucks from 'nunjucks';
import session from 'express-session';
import flash from 'connect-flash';
import auth from './routes/auth.js';
import router from './routes/routes.js';
import data_database from './routes/data.js';

const app = express()

// CONFIGURACIONES
app.use(express.static('static'))

nunjucks.configure("templates", {
    express: app,
    autoscape: true,
    watch: true,
});



app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session({
    secret: 'mi-clave',
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.use(flash())

// para dejar el user como variable global de los templates
app.use(function (req, res, next) {
    res.locals.user = req.session.user
    // console.log(req.session.user);
    next()
})
app.use(function (req, res, next) {
    res.locals.mesa = req.session.mesa
    // console.log(req.session.mesa);
    next();
})
app.use(function (req, res, next) {
    res.locals.sedes = ["los copihues", "aguas claras", "el mirador", "cordillera", "los pinguinos", "isla negra", "los olivos", "tralcamahuida", "maipumar", "gimnasio municipal", "padre alvear", "escuela el totoral", "las marinas"]
    next()
})

// RUTAS
app.use(auth)
app.use(router)
app.use(data_database)




const PORT = 3000
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))



