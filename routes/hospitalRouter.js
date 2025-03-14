const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const hospitalRouter = express.Router();

hospitalRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'hospital.html'));
});

module.exports = hospitalRouter;