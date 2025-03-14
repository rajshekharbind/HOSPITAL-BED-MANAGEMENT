

const express = require("express");
const path = require("path");
const rootDir = require("../utils/pathUtil");

// Import the shared users array
const { users } = require("./signupRouter");

const signinRouter = express.Router();

// Serve the signin HTML page
signinRouter.get("/", (req, res) => {
    res.sendFile(path.join(rootDir, "views", "signin.html"));
});

// Function to generate the response HTML
const generateResponseHTML = (title, message, toastType) => {
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
            <div class="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 class="text-xl font-semibold ${toastType === "error" ? "text-red-500" : "text-green-600"}">${message}</h3>
                <div class="mt-4 flex justify-center gap-3">
                    <button onclick="window.location.href='/appoiment'"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                        Go to Appoiment Page
                    </button>
                </div>
            </div>
        </body>
        </html>
    `;
};

// Handle form submission for signin
signinRouter.post("/", (req, res) => {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.send(generateResponseHTML("Error", "Email and password are required!", "error"));
    }

    // Check if user exists and password matches
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
        return res.send(generateResponseHTML("Success", `Welcome, ${user.fullName}! You have successfully signed in.`, "success"));
    } else {
        return res.send(generateResponseHTML("Error", "Invalid email or password!", "error"));
    }
});

module.exports = signinRouter;



