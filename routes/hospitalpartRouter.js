const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const hospitalPartRouter = express.Router();

hospitalPartRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'hospitalpart.html'));
});

module.exports = hospitalPartRouter;