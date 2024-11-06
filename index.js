const axios = require("axios");
const fs = require("fs");
require('dotenv').config();

// HubSpot API URL and Token
const HUBSPOT_API_URL = 'https://api.hubapi.com/deals/v1/deal/paged';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_accessToken;
const OUTPUT_FILE = 'high_priority_deals.json';  // JSON file to log deals

// Function to retrieve high-priority deals from HubSpot
async function getHighPriorityDeals() {
    try {
        const response = await axios.get(HUBSPOT_API_URL, {
            headers: {
                Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`, // Authorization in headers
            },
            params: {
                limit: 100,  // Retrieve up to 100 deals per request
            }
        });

        // Filter high-priority deals 
        const highPriorityDeals = response.data.deals.filter(deal => deal.priority === 'high');

        // Log high-priority deals to a JSON file
        logDealsToJSON(highPriorityDeals);

    } catch (error) {
        // Handle the error
        if (error.response) {
            console.error(`API error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            console.error('No response from API:', error.message);
        } else {
            console.error('Error in setting up request:', error.message);
        }
    }
}

// Function to log deals into a local JSON file
function logDealsToJSON(deals) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(deals, null, 2), 'utf8');
    console.log(`Logged ${deals.length} high-priority deals to ${OUTPUT_FILE}`);
}

// Call the function to fetch and log high-priority deals
getHighPriorityDeals();
