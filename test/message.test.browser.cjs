//==============================================================
// gobal defined
// const {Message} = require("../src/message.js");
const koCode = require("../dist/locales/ko.json");

// import koCode from "../dist/locales/ko.json";
// import {jest} from '@jest/globals';
// import {Message} from 'logic-core';
// import aaa from '../dist/logic-core.umd.js';
// import {Message} from '../dist/logic-core.umd';
// const {Message} = aaa;

// require("../dist/logic-core.umd.js")
// const logicCore = require("../dist/logic-core.umd.js");

//==============================================================
// test
describe("[target: message.js]", () => {
    describe("BROWSER ENV TEST", () => {
        beforeEach(() => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(koCode),
                })
            );
            process.env.LANG = 'ko_KR.UTF-8';
            jest.restoreAllMocks();
        });
        describe("Message.changeLanguage() : 언어 변경", () => {
            it("- 언어 변경", async () => {
                // const {Message} = require("logic-core");
                // const logicCore = require("logic-core");
                // require("logic-core");
    
                // const {Message} = globalThis._L;
                // const {Message} = logicCore
                // await import("logic-core");
                // await import("../dist/logic-core.umd.js");
                // require("../dist/logic-core.umd.js");
                const _L = require("../dist/logic-core.umd.js");
                
                const {Message} = _L;
                
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('default')
    
                await Message.changeLanguage("ko");
    
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('ko')
                expect(Message.get('KO')).toMatch(/OK/);
                expect(Message.get('EN')).toMatch(/OK/);
            });
        });
        describe("Message.autoDetect() : 언어자동 감지", () => {
            it("- 활성화", async () => {
                // globalThis.navigator.languages = ['ko-KR', 'ko'];

                // globalThis.navigator = {
                //     languages: ['ko-KR', 'ko'],
                //     language: 'ko-KR',
                // };
                // process.env.LANG = 'ko_KR.UTF-8';
                Object.defineProperty(navigator, 'languages', {
                    configurable: true,
                    get: () => ['ko-KR', 'ko'],
                });

                const _L = require("../dist/logic-core.umd.js");
                const {Message} = _L;
                // const {Message} = require("../src/message.js");

                await Message.autoDetect();

                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('ko')
            });
        });
    });
});