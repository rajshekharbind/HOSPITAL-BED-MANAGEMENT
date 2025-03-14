const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const docterRouter = express.Router();

docterRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'docter.html'));
});

module.exports = docterRouter;