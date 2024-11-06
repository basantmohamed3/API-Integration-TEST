const axios = require('axios');

// Your API Key or Token
const API_KEY = 'API_KEY';

async function fetchData() {
    try {
        const response = await axios.get('https://api.example.com/data', {
            headers: {
                // Add the Authorization header with the API key or token
                Authorization: `Bearer ${API_KEY}`
            }
        });

        // Validate if the response contains valid data
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid or empty response data');
        }

        return response.data;

    } catch (error) {
        if (error.response) {
            // Handle authorization error
            if (error.response.status === 401) {
                console.error('Authorization error: Invalid API key or token.');
            } else if (error.response.status === 403) {
                console.error('Forbidden: You do not have permission to access this resource.');
            } else {
                // Handle other types of API errors
                console.error(`API error: ${error.response.status} - ${error.response.statusText}`);
            }
        } else if (error.request) {
            // Handle network errors (e.g., no response from API)
            console.error('No response from API:', error.message);
        } else {
            // Handle request setup errors
            console.error('Error in setting up request:', error.message);
        }

        // Re-throw the error after logging it
        throw error;
    }
}

fetchData()
    .then(data => {
        console.log('Fetched data:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error.message);
    });
