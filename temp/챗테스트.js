const axios = require('axios');



console.log('33');


// const cheerio = require('cheerio');

// async function scrapeNaver() {
//     try {
//         const response = await axios.get('https://www.naver.com');
//         const $ = cheerio.load(response.data);

//         // Example: Scraping the top 5 trending keywords
//         const trendingKeywords = [];
//         $('.ah_roll .ah_k').each((index, element) => {
//             if (index < 5) {
//                 trendingKeywords.push($(element).text());
//             }
//         });

//         console.log('Trending Keywords:', trendingKeywords);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// scrapeNaver();
