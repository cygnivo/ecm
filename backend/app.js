
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/ContentServer/ContentServer.dll', routes.legacy);
app.use('/sapcs', routes.sapcs);
app.use('/admin', routes.admin);

module.exports = app;
