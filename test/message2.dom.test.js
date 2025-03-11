/**
 * @jest-environment jsdom
 */

//==============================================================
// gobal defined
import {jest} from '@jest/globals';

// import Message from '../src/message2';

//==============================================================
// test
describe("loadJSON function", () => {
    afterEach(() => {
        jest.restoreAllMocks(); // 각 테스트 후 모킹을 복원
        // jest.resetModules();
    });

    test("Node.js CommonJS 환경에서 JSON 파일 로드", async () => {
        // jest.mock("fs", () => ({
        //     readFileSync: jest.fn(() => '{"name": "Test", "value": 42}'),
        // }));

        // jest.doMock("fs", () => ({
        //     readFileSync: jest.fn(() => '{"name": "Test", "value": 42}'),
        // }));

        const { default: Message } = await import("../src/message2.js");

        await Message.changeLanguage("ko");
        
        expect(result).toEqual({ name: "Test", value: 42 });
        
    });

    // test("브라우저 환경에서 fetch로 JSON 파일 로드", async () => {
    //     global.fetch = jest.fn(() =>
    //         Promise.resolve({
    //             json: () => Promise.resolve({ name: "Test", value: 42 }),
    //         })
    //     );

    //     const result = await loadJSON("/data.json");
    //     expect(result).toEqual({ name: "Test", value: 42 });

    //     expect(fetch).toHaveBeenCalledWith("/data.json");
    // });

    // test("Node.js ESM 환경에서 import() 사용", async () => {
    //     const mockData = { name: "Test", value: 42 };
    //     jest.unstable_mockModule("./mockData.json", () => ({
    //         default: mockData,
    //     }));

    //     const result = await import("./mockData.json");
    //     expect(result.default).toEqual(mockData);
    // });
});