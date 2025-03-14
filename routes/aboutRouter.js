const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const aboutRouter = express.Router();

aboutRouter.get('/', (req, res,next) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'about.html'));
});

aboutRouter.post('/', (req, res,next) => {
    console.log('about page',req.body);
    res.sendFile(path.join(rootDir, 'views', 'about.html'));
});

module.exports = aboutRouter;
