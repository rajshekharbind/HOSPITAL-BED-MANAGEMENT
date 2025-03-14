const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Required to parse form data
const rootDir = require('../utils/pathUtil');

const contactusRouter = express.Router();

// Middleware to parse form data
contactusRouter.use(bodyParser.urlencoded({ extended: false }));

// GET Route: Serve the Contact Us Page
contactusRouter.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html')); 
});
 
// POST Route: Handle Form Submission
contactusRouter.post('/', (req, res) => {
    console.log('Form Data Received:', req.body);
    // Respond with a success message
    res.send(`
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="text-center p-8 bg-white shadow-lg rounded-lg">
                <h3 class="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    Thank You, ${req.body.name}!
                </h3>
                <p class="text-gray-700 text-lg mb-6">
                    You are registered successfully.
                </p>
                <button 
                    onclick="showMessageAndRedirect('/home')" 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            function showMessageAndRedirect(url) {
                alert('Redirecting to Home Page...');
                window.location.href = url;
            }
        </script>
    `);
    
});

module.exports = contactusRouter;
