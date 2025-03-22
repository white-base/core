//==============================================================
// gobal defined
// const {Message} = require("../src/message.js");
const koCode = require("../dist/locales/ko.json");

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
                const {Message} = require("../src/message.js");
    
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('default')
    
                await Message.changeLanguage("ko");
    
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('ko')
                expect(Message.get('KO')).toMatch(/OK/);
                expect(Message.get('EN')).toMatch(/OK/);
            });
        });
        describe("Message.autoDetect : 언어자동 감지", () => {
            it("- 활성화", async () => {
                const {Message} = require("../src/message.js");
                Message.autoDetect = true;
                await Message.init();

                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('default')
            });
        });
    });
});