// const express = require('express');
// const path = require('path');
// const rootDir = require('../utils/pathUtil');

// const signupRouter = express.Router();

// signupRouter.get('/', (req, res) => {
//     console.log('about page');
//     res.sendFile(path.join(rootDir, 'views', 'signup.html'));
// });

// module.exports = signupRouter;






// const express = require('express');
// const path = require('path');
// const rootDir = require('../utils/pathUtil');

// // Exporting users array for sharing
// const users = [];

// const signupRouter = express.Router();

// // Serve the signup HTML page
// signupRouter.get('/', (req, res) => {
//     res.sendFile(path.join(rootDir, 'views', 'signup.html'));
// });

// // Handle form submission for signup
// signupRouter.post('/', (req, res) => {
//     const { fullName, email, password, confirmPassword } = req.body;

//     // Check if all fields are provided
//     if (!fullName || !email || !password || !confirmPassword) {
//         return res.status(400).send(`
//             <div>
//                 <h3>All fields are required!</h3>
//                 <button onclick="window.location.href='/signup'">Back to Signup</button>
//             </div>
//         `);
//     }

//     // Check if passwords match
//     if (password !== confirmPassword) {
//         return res.status(400).send(`
//             <div>
//                 <h3>Passwords do not match!</h3>
//                 <button onclick="window.location.href='/signup'">Back to Signup</button>
//             </div>
//         `);
//     }

//     // Check if the email is already registered
//     const existingUser = users.find((user) => user.email === email);
//     if (existingUser) {
//         return res.status(409).send(`
//             <div>
//                 <h3>User already exists. Please sign in!</h3>
//                 <button onclick="window.location.href='/signup'">Back to Signup</button>
//             </div>
//         `);
//     }

//     // Create a new user
//     users.push({ fullName, email, password });

//     res.status(201).send(`
//         <div>
//             <h3>Account created successfully! Please sign in.</h3>
//             <button onclick="window.location.href='/signin'">Go to Sign In</button>
//         </div>
//     `);
// });

// // Export users and signupRouter
// module.exports = { users, signupRouter };




const express = require("express");
const path = require("path");
const rootDir = require("../utils/pathUtil");

// Exporting users array for sharing
const users = [];

const signupRouter = express.Router();

// Serve the signup HTML page
signupRouter.get("/", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "signup.html"));
});

// Function to generate the response HTML
const generateResponseHTML = (title, message, toastType, buttonText, buttonLink) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <script>
                function showToast(message, type) {
                    const toast = document.createElement("div");
                    toast.innerText = message;
                    toast.className = \`fixed top-5 right-5 px-4 py-2 rounded-md text-white shadow-lg transition-opacity duration-500 \${type === "error" ? "bg-red-500" : "bg-green-500"}\`;
                    document.body.appendChild(toast);
                    setTimeout(() => toast.style.opacity = "0", 2000);
                    setTimeout(() => toast.remove(), 2500);
                }
                window.onload = () => {
                    showToast("${message}", "${toastType}");
                };
            </script>
        </head>
        <body class="flex items-center justify-center h-screen bg-gray-100">
            <div class="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h3 class="text-xl font-semibold ${toastType === "error" ? "text-red-500" : "text-green-600"}">${message}</h3>
                <div class="mt-4">
                    <button onclick="window.location.href='${buttonLink}'"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                        ${buttonText}
                    </button>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Handle form submission for signup
signupRouter.post("/", (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!fullName || !email || !password || !confirmPassword) {
        return res.send(generateResponseHTML("Error", "All fields are required!", "error", "Back to Signup", "/signup"));
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.send(generateResponseHTML("Error", "Passwords do not match!", "error", "Back to Signup", "/signup"));
    }

    // Check if the email is already registered
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.send(generateResponseHTML("Error", "User already exists. Please sign in!", "error", "Back to Signup", "/signup"));
    }

    // Create a new user
    users.push({ fullName, email, password });

    return res.send(generateResponseHTML("Success", "Account created successfully! Please sign in.", "success", "Go to Sign In", "/signin"));
});

// Export users and signupRouter
module.exports = { users, signupRouter };

