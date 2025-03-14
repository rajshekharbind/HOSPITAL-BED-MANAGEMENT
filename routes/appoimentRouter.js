
// const express = require('express');
// const path = require('path');
// const rootDir = require('../utils/pathUtil');
// const bodyParser = require('body-parser');

// const appoimentRouter = express.Router();

// // Middleware to parse form data
// appoimentRouter.use(bodyParser.urlencoded({ extended: true }));
// appoimentRouter.use(bodyParser.json());

// // Default slots for each day
// const defaultSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM"];

// // Store booked appointments
// let bookedAppointments = 
//     {
//         "2025-03-01": ["10:00 AM", "2:00 PM"],
//         "2025-03-02": ["9:00 AM", "1:00 PM", "4:00 PM"],
//         "2025-03-03": ["11:00 AM", "2:00 PM"],
//         "2025-03-04": ["10:00 AM", "11:00 AM", "1:00 PM"],
//         "2025-03-05": ["9:00 AM", "3:00 PM"],
//         "2025-03-06": ["2:00 PM", "4:00 PM"],
//         "2025-03-07": ["9:00 AM", "10:00 AM", "1:00 PM"],
//         "2025-03-08": ["11:00 AM", "3:00 PM", "4:00 PM"],
//         "2025-03-09": ["10:00 AM", "2:00 PM"],
//         "2025-03-10": ["9:00 AM", "1:00 PM", "4:00 PM"],
//         "2025-03-11": ["11:00 AM", "2:00 PM"],
//         "2025-03-12": ["10:00 AM", "11:00 AM", "1:00 PM"],
//         "2025-03-13": ["9:00 AM", "3:00 PM"],
//         "2025-03-14": ["2:00 PM", "4:00 PM"],
//         "2025-03-15": ["9:00 AM", "10:00 AM", "1:00 PM"],
//         "2025-03-16": ["11:00 AM", "3:00 PM", "4:00 PM"],
//         "2025-03-17": ["10:00 AM", "2:00 PM"],
//         "2025-03-18": ["9:00 AM", "1:00 PM", "4:00 PM"],
//         "2025-03-19": ["11:00 AM", "2:00 PM"],
//         "2025-03-20": ["10:00 AM", "11:00 AM", "1:00 PM"],
//         "2025-03-21": ["9:00 AM", "3:00 PM"],
//         "2025-03-23": ["2:00 PM", "4:00 PM"],
//         "2025-03-24": ["9:00 AM", "10:00 AM", "1:00 PM"],
//         "2025-03-25": ["11:00 AM", "3:00 PM", "4:00 PM"],
//         "2025-03-26": ["10:00 AM", "2:00 PM"],
//         "2025-03-27": ["9:00 AM", "1:00 PM", "4:00 PM"],
//         "2025-03-28": ["11:00 AM", "2:00 PM"],
//         "2025-03-29": ["10:00 AM", "11:00 AM", "1:00 PM"],
//         "2025-03-30": ["9:00 AM", "3:00 PM"],
        
//       };
      
// // Stores pre-filled booked slots

// // Function to generate a random number of booked slots per day
// const generateRandomBookings = () => {
//     let currentDate = new Date();
//     let futureMonths = 6; // Generate bookings for 6 months

//     for (let i = 0; i < futureMonths * 30; i++) { // Approx. 6 months
//         let dateStr = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
//         let numBookedSlots = Math.floor(Math.random() * (defaultSlots.length - 1)); // Random 0 to 5 slots
//         let bookedSlots = [];

//         while (bookedSlots.length < numBookedSlots) {
//             let randomSlot = defaultSlots[Math.floor(Math.random() * defaultSlots.length)];
//             if (!bookedSlots.includes(randomSlot)) {
//                 bookedSlots.push(randomSlot);
//             }
//         }

//         bookedAppointments[dateStr] = bookedSlots;
//         currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//     }
// };

// // Call the function to pre-fill booked slots
// generateRandomBookings();

// // Function to get available slots for any given date
// const getAvailableSlots = (date) => {
//     let bookedSlots = bookedAppointments[date] || [];
//     return defaultSlots.filter(slot => !bookedSlots.includes(slot));
// };

// // Serve the appointment form
// appoimentRouter.get('/', (req, res) => {
//     res.sendFile(path.join(rootDir, 'views', 'appoiment.html'));
// });

// // Get available slots for any selected date
// appoimentRouter.get('/available-slots', (req, res) => {
//     const { date } = req.query;

//     if (!date) {
//         return res.status(400).json({ error: "Date parameter is required" });
//     }

//     console.log(`Fetching slots for date: ${date}`);
//     res.json(getAvailableSlots(date));
// });

// // Handle appointment booking
// appoimentRouter.post('/submit', (req, res) => {
//     const { name, email, phone, date, slot } = req.body;

//     // Validate form data
//     if (!name || !email || !phone || !date || !slot) {
//         return res.status(400).send(`
//             <div class="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div class="text-center p-8 bg-white shadow-lg rounded-lg">
//                     <h3 class="text-2xl md:text-3xl font-bold text-red-600 mb-4">
//                         Submission Failed!
//                     </h3>
//                     <p class="text-gray-700 text-lg mb-6">
//                         Please fill all fields correctly and try again.
//                     </p>
//                     <button 
//                         onclick="window.location.href='/appoiment'" 
//                         class="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
//                         Go Back to Appoiment Page
//                     </button>
//                 </div>
//             </div>
//             <script src="https://cdn.tailwindcss.com"></script>
//         `);
//     }

//     // Save the booked slot
//     if (!bookedAppointments[date]) {
//         bookedAppointments[date] = [];
//     }
//     bookedAppointments[date].push(slot); // Add slot to booked list

//     console.log(`Appoiment booked for ${name} on ${date} at ${slot}`);

//     res.status(200).send(`
//         <div class="flex items-center justify-center min-h-screen bg-gray-100">
//             <div class="text-center p-8 bg-white shadow-lg rounded-lg">
//                 <h3 class="text-2xl md:text-3xl font-bold text-green-600 mb-4">
//                     Thank You, ${name}!
//                 </h3>
//                 <p class="text-gray-700 text-lg mb-6">
//                     Your appoiment on ${date} at ${slot} has been successfully booked.
//                 </p>
//                 <button 
//                     onclick="window.location.href='/appoiment'" 
//                     class="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
//                     Go Back to Appoiment Page
//                 </button>
//             </div>
//         </div>
//         <script src="https://cdn.tailwindcss.com"></script>
//     `);
// });

// module.exports = appoimentRouter;


const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const appoimentRouter = express.Router();
const appoimentFile = path.join(__dirname, "../public/languages/appoiment.json"); // Path to JSON file
console.log("Resolved file path:", appoimentFile);
// Middleware to parse form data
appoimentRouter.use(bodyParser.urlencoded({ extended: true }));
appoimentRouter.use(bodyParser.json());

// Default slots for each day
const defaultSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "4:00 PM"];

// Function to read the JSON file
const readAppointments = () => {
    try {
        if (fs.existsSync(appoimentFile)) {
            const data = fs.readFileSync(appoimentFile);
            return JSON.parse(data);
        } else {
            return {}; // Return empty object if file doesn't exist
        }
    } catch (err) {
        console.error("Error reading appointments:", err);
        return {};
    }
};

// Function to write to the JSON file
const writeAppointments = (data) => {
    try {
        fs.writeFileSync(appoimentFile, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error writing appointments:", err);
    }
};

// Load existing appointments on server start
let bookedAppointments = readAppointments();

// Function to get available slots for a given date
const getAvailableSlots = (date) => {
    let bookedSlots = bookedAppointments[date] || [];
    return defaultSlots.filter((slot) => !bookedSlots.includes(slot));
};

// Serve the appointment form
appoimentRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/appoiment.html"));
});

// Get available slots for a selected date
appoimentRouter.get("/available-slots", (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: "Date parameter is required" });
    }

    console.log(`Fetching slots for date: ${date}`);
    res.json(getAvailableSlots(date));
});

// Handle appointment booking
appoimentRouter.post("/submit", (req, res) => {
    const { name, email, phone, date, slot } = req.body;

    // Validate form data
    if (!name || !email || !phone || !date || !slot) {
        return res.status(400).send(`
            <div class="flex items-center justify-center min-h-screen bg-gray-100">
                <div class="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h3 class="text-2xl md:text-3xl font-bold text-red-600 mb-4">
                        Submission Failed!
                    </h3>
                    <p class="text-gray-700 text-lg mb-6">
                        Please fill all fields correctly and try again.
                    </p>
                    <button 
                        onclick="window.location.href='/appoiment'" 
                        class="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                        Go Back to Appointment Page
                    </button>
                </div>
            </div>
            <script src="https://cdn.tailwindcss.com"></script>
        `);
    }

    // Save the booked slot
    if (!bookedAppointments[date]) {
        bookedAppointments[date] = [];
    }
    bookedAppointments[date].push(slot);

    // Write updated appointments to JSON file
    writeAppointments(bookedAppointments);

    console.log(`Appointment booked for ${name} on ${date} at ${slot}`);

    res.status(200).send(`
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="text-center p-8 bg-white shadow-lg rounded-lg">
                <h3 class="text-2xl md:text-3xl font-bold text-green-600 mb-4">
                    Thank You, ${name}!
                </h3>
                <p class="text-gray-700 text-lg mb-6">
                    Your appointment on ${date} at ${slot} has been successfully booked.
                </p>
                <button 
                    onclick="window.location.href='/haspit'" 
                    class="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    Explore More hospital Information
                </button>
            </div>
        </div>
        <script src="https://cdn.tailwindcss.com"></script>
    `);
});

module.exports = appoimentRouter;



