// import { jest } from "@jest/globals";
// const {Message} = require("../src/message2.js");
// const {Message} = require("../src/message2.js");
const {Message} = require("../dist/message2.cjs");

describe("CJS 환경 테스트", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
    });

    test("CJS 방식으로 JSON 로드", async () => {
        // const { default: Message } = await import("../src/message2.js");
        // const Message = require("../src/message2.js");
        await Message.changeLanguage("ko");

        expect(Message.currentLang).toBe('ko');
        expect(Message.get('KO')).toBe('END');
        expect(Message.get('EN')).toBe('END');
    });
});