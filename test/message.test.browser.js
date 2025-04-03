//==============================================================
// gobal defined
import koCode from "../dist/locales/ko.json";
import { jest } from '@jest/globals';

//==============================================================
// test
describe("BROWSER ENV TEST", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(koCode),
            })
        );
        Object.defineProperty(navigator, 'languages', {
            configurable: true,
            get: () => ['en_US', 'en'],
        });
        globalThis.isDOM = true;
    });
    describe("Message.get() : 메시지 얻기", () => {
        it("- 기본 영어", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            const {Message} = await import("logic-core");
            
            expect(Message.currentLang).toBe('default')
            expect(Message.get('KO')).toMatch(/There is no message for code. 'KO'/);
            expect(Message.get('EN')).toMatch(/OK/);
        });             
    });
    describe("Message.autoDetect() : 언어자동 감지", () => {
        it("- index.js", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = await import("../index.js");
            await Message.autoDetect();

            expect(Message.currentLang).toBe('ko')
        });
        it("- logic-core", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = await import("logic-core");
            await Message.autoDetect()
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
    });
});