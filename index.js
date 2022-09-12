import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la base de datos
db.authenticate()
  .then( () => console.log('Base de datos conectada'))
  .catch(error => console.log(error));

const port = process.env.DB_HOST || 4000;

// Habilitar pug
app.set('view engine', 'pug');

// Obtener el year actual
app.use( (req, res, next) => {
  const year = new Date();
  res.locals.currentYear = year.getFullYear();
  res.locals.siteName = 'Agencia de Viajes'
  next();
})

// agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar router
app.use('/', router);

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});