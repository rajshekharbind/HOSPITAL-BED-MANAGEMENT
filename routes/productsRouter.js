const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const productsRouter = express.Router();

// Define the API endpoint and options
const API_URL = 'https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=mens-watches';
const FETCH_OPTIONS = { method: 'GET', headers: { accept: 'application/json' } };

// Fetch data when accessing the route
productsRouter.get('/mens-watches', async (req, res) => {
    try {
        const response = await fetch(API_URL, FETCH_OPTIONS);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Send the fetched data as a JSON response
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch product data');
    }
});

module.exports = productsRouter;

