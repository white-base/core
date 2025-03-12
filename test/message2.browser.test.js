import { jest } from "@jest/globals";
// import  koCode  from '../src/locales/ko.json' with { type: "json" };
import  koCode  from '../src/locales/ko.json'

describe("브라우저 환경 테스트", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(koCode),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("브라우저 환경에서 JSON 로드", async () => {
        const { Message } = await import("../dist/message2.cjs");
        await Message.changeLanguage("ko");

        expect(Message.currentLang).toBe('ko');
        expect(Message.get('KO')).toBe('END');
        expect(Message.get('EN')).toBe('END');
    });
});
