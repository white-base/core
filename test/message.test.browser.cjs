//==============================================================
// gobal defined
const koCode = require("../dist/locales/ko.json");

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
        globalThis.isDOM = true;
        Object.defineProperty(navigator, 'languages', {
            configurable: true,
            get: () => ['en_US', 'en'],
        });
    });
    describe("Message.get() : 메시지 얻기", () => {
        it("- 기본 영어", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            const {Message} = require("logic-core/ko");
            
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
            const {Message} = require("logic-core/ko");
            await Message.autoDetect();

            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- logic-core", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = require("../dist/logic-core.browser.cjs");
            await Message.autoDetect()
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
    });
});