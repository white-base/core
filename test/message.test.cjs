//==============================================================
// gobal defined

// import { jest } from "@jest/globals";
// const {Message} = require("../src/message.js");
// const {Message} = require("../src/message.js");
// const {Message} = require("../dist/message2.cjs");
// const {Message} = require("logic-core");

// const {Message} = require("../src/message2.js");

//==============================================================
// test
describe("[target: logic-core]", () => {
    describe("CJS 환경 테스트", () => {
        beforeEach(() => {
            jest.restoreAllMocks();
            jest.resetModules();
            process.env.LANG = 'en_US.UTF-8';
        });

        // REVIEW: cjs 은 직접 가져오면 안되고 logic-core 식으로 가져와야함
        it.skip("CJS 방식으로 JSON 로드", async () => {
            // const {Message} = require("../src/message.js");
            // const {Message} = require("logic-core");
            
            // const {Message} = await import("../src/message.js");
            const {Message} = require("../src/message.js");

            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('default')

            await Message.changeLanguage("ko");

            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });

        it("Type 한글 오류 확인", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            
            const {Message, Type} = require("logic-core/ko");
            // const {Type} = require("logic-core");
            
            expect(Message.currentLang).toBe('default');

            await Message.autoDetect()
            
            expect(Message.currentLang).toBe('ko');
            expect(() => Type.allowType([[String, Number]], {})).toThrow('타입')
        });
    });
});