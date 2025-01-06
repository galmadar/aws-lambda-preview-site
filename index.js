const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: 'Hello World' }),
    // };
    console.log({event});

    const url = event?.url;


    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'URL is required' }),
        };
    }

    try {
        // Fetch the HTML content of the URL
        const response = await axios.get(url);
        //console.log("got respone", response);
        
        const html = response.data;
        //console.log("got html", html);

        // Parse the HTML with cheerio
        const $ = cheerio.load(html);
        //// console.log("got cheerio.load", $);

        const title = $('meta[property="og:title"]').attr('content') || $('title').text();
        const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
        const image = $('meta[property="og:image"]').attr('content');

        //console.log({title, description, image});

        const body = JSON.stringify({
            title,
            description,
            image,
        });

        // Return the extracted metadata
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body,
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
