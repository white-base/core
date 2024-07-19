import axios from 'axios';
const fs = require('fs');

/**
 * 지정된 URL에서 웹 페이지를 가져와 결과를 파일에 저장합니다.
 * @param {string} url - 가져올 웹 페이지의 URL입니다.
 * @returns {Promise<void>} - 웹 페이지를 가져와 파일에 저장하는데 성공하면 해결되는 프로미스입니다.
 */
async function fetchWebpage(url) {
    try {
        const response = await axios.get(url);
        fs.writeFileSync('/path/to/output.txt', response.data);
        console.log('결과가 파일에 저장되었습니다');
    } catch (error) {
        console.error(error);
    }
}

const webpageUrl = 'https://www.naver.com';
fetchWebpage(webpageUrl);

