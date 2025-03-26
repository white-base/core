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
describe("[target: message.js]", () => {
    describe("CJS 환경 테스트", () => {
        beforeEach(() => {
            jest.restoreAllMocks();
            jest.resetModules();
            process.env.LANG = 'en_US.UTF-8';
        });

        it("CJS 방식으로 JSON 로드", async () => {
            const {Message} = require("../src/message.js");

            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('default')

            await Message.changeLanguage("ko");

            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
    });
});