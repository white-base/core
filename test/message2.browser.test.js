

// import  koCode  from '../src/locales/ko.json' with { type: "json" };
// const MyLibrary = require("../dist/message2.umd.js");
// import  MyLibrary from "../dist/message2.umd.js";
// import  {Message}  from '../dist/message2.umd.js'

// import { jest } from "@jest/globals";
// // import  {Message}  from '../dist/message2.umd.js'
// // import  MessageModule  from '../dist/message2.umd.js'
// import  * as MessageModule  from '../dist/message2.umd.js'
// // import  Message  from '../dist/message2.umd.js'
// import  koCode  from '../src/locales/ko.json'

// const Message = MessageModule.Message

// import { createRequire } from "module";
// const require = createRequire(import.meta.url); // ✅ CommonJS `require()` 생성

// const {Message} = require("../dist/message2.umd.js");

const {Message} = require("../src/message2.js");

// const {Message} = require("../dist/message2.umd.js");
const koCode = require("../dist/locales/ko.json");

// const Message  = require('../dist/message2.cjs');

// import Message from '../src/message2.js';
// import {jest} from '@jest/globals';
// import koCode from '../dist/locales/ko.json'

// const {Message} = require("../dist/message2.umd.js");
// import { Message } from "../dist/message2.umd.js";

// const Message = MyLibrary.Message;


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
        // const { Message } = await import("../dist/message2.umd");
        // const { default: Message } = await import("../dist/message2.umd");
        // const { default: Message } = await import("../dist/message2.umd");
        // const Message = await import("../dist/message2.umd");
        // console.log(MessageModule.default);
        await Message.changeLanguage("ko");

        expect(Message.currentLang).toBe('ko');
        expect(Message.get('KO')).toBe('END');
        expect(Message.get('EN')).toBe('END');
    });
});
