const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const notificationRouter = express.Router();

notificationRouter.get('/', (req, res) => {
    console.log('about page');
    res.sendFile(path.join(rootDir, 'views', 'notification.html'));
});

module.exports = notificationRouter;