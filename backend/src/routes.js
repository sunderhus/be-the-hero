const express = require('express');

const OngControler = require('./controllers/OngController.js');
const IncidentController = require('./controllers/IncidentController.js');
const ProfileController = require('./controllers/ProfileController.js');
const SessionController = require('./controllers/SessionController.js');

const routes = express.Router();
//session router
routes.post('/session', SessionController.create);
//ongs routes
routes.get('/ongs', OngControler.list);
routes.post('/ongs', OngControler.create);
// profile routes
routes.get('/profile', ProfileController.list);
//incidents routes
routes.get('/incidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;