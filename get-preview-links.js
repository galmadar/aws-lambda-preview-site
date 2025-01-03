const axios = require('axios');
const cheerio = require('cheerio');

async function getLinkPreview(url) {
    try {
        // Fetch the HTML content
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Initialize result object
        const result = {
            url: url,
            title: '',
            description: '',
            image: '',
            favicon: ''
        };

        // Get Open Graph title
        result.title = $('meta[property="og:title"]').attr('content') ||
                      $('meta[name="twitter:title"]').attr('content') ||
                      $('title').text() ||
                      '';

        // Get Open Graph description
        result.description = $('meta[property="og:description"]').attr('content') ||
                           $('meta[name="twitter:description"]').attr('content') ||
                           $('meta[name="description"]').attr('content') ||
                           '';

        // Get Open Graph image
        result.image = $('meta[property="og:image"]').attr('content') ||
                      $('meta[name="twitter:image"]').attr('content') ||
                      $('link[rel="image_src"]').attr('href') ||
                      '';

        // Get favicon
        result.favicon = $('link[rel="icon"]').attr('href') ||
                        $('link[rel="shortcut icon"]').attr('href') ||
                        '/favicon.ico';

        // Handle relative URLs for image and favicon
        if (result.image && !result.image.startsWith('http')) {
            result.image = new URL(result.image, url).href;
        }
        if (result.favicon && !result.favicon.startsWith('http')) {
            result.favicon = new URL(result.favicon, url).href;
        }

        return result;

    } catch (error) {
        console.error('Error fetching link preview:', error);
        return null;
    }
}

// Example usage
const url = 'https://example.com';
getLinkPreview(url)
    .then(preview => {
        if (preview) {
            console.log('Link Preview:', preview);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });