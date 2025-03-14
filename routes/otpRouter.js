const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const otpRouter = express.Router();

otpRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'otp.html'));
});

module.exports = otpRouter;