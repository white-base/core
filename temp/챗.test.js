const axios = require('axios');
const fs = require('fs');
const { fetchWebpage } = require('../src/fetch-webpage');

jest.mock('axios');

describe('fetchWebpage', () => {
    it('웹페이지를 가져와서 결과를 파일에 저장해야 합니다', async () => {
        const url = 'https://www.naver.com';
        const response = { data: '웹페이지 내용' };
        axios.get.mockResolvedValue(response);
        fs.writeFileSync = jest.fn();

        await fetchWebpage(url);

        expect(axios.get).toHaveBeenCalledWith(url);
        expect(fs.writeFileSync).toHaveBeenCalledWith('/path/to/output.txt', response.data);
        expect(console.log).toHaveBeenCalledWith('결과가 파일에 저장되었습니다');
    });

    it('웹페이지를 가져오는 중에 에러를 처리해야 합니다', async () => {
        const url = 'https://www.naver.com';
        const error = new Error('웹페이지 가져오기 실패');
        axios.get.mockRejectedValue(error);
        console.error = jest.fn();

        await fetchWebpage(url);

        expect(axios.get).toHaveBeenCalledWith(url);
        expect(console.error).toHaveBeenCalledWith(error);
    });
});
