const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const loginRouter = express.Router();

loginRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'login.html'));
});

module.exports = loginRouter;