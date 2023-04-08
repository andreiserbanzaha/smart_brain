
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const bodyParser = require('body-parser');

const image = require('./controllers/image');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const register = require('./controllers/register');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// APIs
app.get('/', (req, res) => { res.send('it works!') });
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db); });
app.put('/image', (req, res) => { image.handleImage(req, res, db); });
app.post('/imageurl', (req, res) => { image.handleFaceDetection(req, res); });

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening to port ${process.env.PORT}`);
});