const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
    const url = event.queryStringParameters?.url;

    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required' }),
        };
    }

    try {
        // Fetch the HTML content of the URL
        const response = await axios.get(url);
        const html = response.data;

        // Parse the HTML with cheerio
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content') || $('title').text();
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        // Return the extracted metadata
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                image,
            }),
        };
    } catch (error) {
        console.error('Error fetching the website:', error.message);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: 'Failed to fetch the website.' }),
        };
    }
};
