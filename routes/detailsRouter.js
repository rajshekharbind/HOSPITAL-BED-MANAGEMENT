
// module.exports = detailsRouter;
const express = require('express');
const path = require('path');
const rootDir = require('../utils/pathUtil');

// Array to store registered details
const userDetails = [];

const detailsRouter = express.Router();

// Serve the details page
detailsRouter.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'details.html'));
});

// Handle form submission
detailsRouter.post('/', (req, res) => {
    const {
        'first-name': firstName,
        'last-name': lastName,
        'contact-number': contactNumber,
        age,
        gender,
        'blood-group': bloodGroup,
        address,
    } = req.body;

    // Check required fields
    if (!firstName || !lastName || !contactNumber || !age || !gender || !bloodGroup || !address) {
        return res.status(400).send(`
            <div style="text-align: center; margin-top: 20px;">
                <h3>All fields in the personal details section are required!</h3>
                <button onclick="window.location.href='/details'" style="padding: 10px 20px;">Back to Details Page</button>
            </div>
        `);
    }

    // Save the data (simulating saving to a database)
    const newUser = {
        firstName,
        lastName,
        contactNumber,
        age,
        gender,
        bloodGroup,
        address,
        medicalHistory: {
            coExistingDisease: req.files?.['co-existing']?.name || 'Not provided',
            drugsConsumed: req.files?.['drugs-consumed']?.name || 'Not provided',
            drugAllergies: req.files?.['drug-allergies']?.name || 'Not provided',
        },
    };
    userDetails.push(newUser);

    // Success response
   // Success response
res.status(201).send(`
    <div style="text-align: center; margin-top: 20px; font-family: Arial, sans-serif;">
        <h3 class="text-2xl md:text-3xl font-bold text-green-600 mb-4">
            Details Registered Successfully!
        </h3>
        <button 
            onclick="showMessageAndRedirect()" 
            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
            Back to home Page
        </button>
    </div>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        function showMessageAndRedirect() {
            alert('Redirecting to the Details Page...');
            window.location.href = '/home';
        }
    </script>
`);

    


});

module.exports = detailsRouter;




