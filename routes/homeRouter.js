const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

const homeRouter = express.Router();

// List of navigation links
const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Services', path: '/service' },
    { name: 'Doctors', path: '/docter' },
    { name: 'Hospitals', path: '/haspit' },
    { name: 'About Us', path: '/about' },
    { name: 'SignUp', path: '/signup' },
    { name: 'SignIn', path: '/signin' },
    { name: 'Otp', path: '/otp' },
    { name: 'Details', path: '/details' },
    { name: 'Appointment', path: '/appoiment' },
];

// Route to serve the Home page
homeRouter.get('/', (req, res) => {
    console.log('Home page accessed');
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

// Route to serve the Cart page
homeRouter.get('/cart', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Cart</title>
        </head>
        <body>
            <h2>Navigation Cart</h2>
            <ul>
                ${navLinks
                    .map(
                        (link) =>
                            `<li><a href="${link.path}">${link.name}</a></li>`
                    )
                    .join('')}
            </ul>
            <a href="/home">Back to Home</a>
        </body>
        </html>
    `);
});

module.exports = homeRouter;

