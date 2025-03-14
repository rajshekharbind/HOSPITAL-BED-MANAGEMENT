const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const serviceRouter = express.Router();

serviceRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'service.html'));
});

module.exports = serviceRouter;