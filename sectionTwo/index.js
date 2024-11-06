const axios = require('axios');


//Original Code (with issues)
async function fetchData() {
    const response = await axios.get('https://api.example.com/data');
    return response.data;
}

fetchData().then(data => {
    console.log(data);
}).catch(error => {
    console.error(error);
});



//Fixed Code 
const axios = require('axios');

async function fetchData(retryCount = 3) {
    try {
        const response = await axios.get('https://api.example.com/data');

        // Validate if the response contains valid data
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid or empty response data');
        }

        return response.data;

    } catch (error) {
        // Handle network errors or API response errors
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error(`API error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            // No response received (network issue or API down)
            console.error('No response from API:', error.message);
        } else {
            // Something else caused the error
            console.error('Error in setting up request:', error.message);
        }

        // Retry mechanism for transient errors (e.g., network issues)
        if (retryCount > 0) {
            console.log(`Retrying... Attempts left: ${retryCount}`);
            return fetchData(retryCount - 1);
        } else {
            console.error('Failed after multiple retries.');
            throw error;  // Re-throw the error if all retries fail
        }
    }
}

fetchData()
    .then(data => {
        console.log('Fetched data:', data);
    })
    .catch(error => {
        console.error('Error fetching data:', error.message);
    });
