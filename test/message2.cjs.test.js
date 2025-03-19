// import { jest } from "@jest/globals";
const {Message} = require("../src/message2.js");
// const {Message} = require("../src/message.js");
// const {Message} = require("../dist/message2.cjs");
// const {Message} = require("logic-core");

// const {Message} = require("../src/message2.js");

describe("CJS 환경 테스트", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
        Message.init();
    });

    it("CJS 방식으로 JSON 로드", async () => {
        // const { default: Message } = await import("../src/message2.js");
        // const Message = require("../src/message2.js");
        await Message.changeLanguage("ko");

        expect(Message.currentLang).toBe('ko');
        expect(Message.get('KO')).toMatch(/END/);
        expect(Message.get('EN')).toMatch(/END/);
    });
    // it("- this.autoDetect : 언어 자동감지", async () => {
                
    //     expect(Message.currentLang).toBe('default')
        
    //     Message.autoDetect = true;
        
    //     expect(Message.currentLang).toBe('ko')
    // });
});
