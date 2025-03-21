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
        it("- changeLanguage() : 언어변경", async () => {
            const {Message} = require("../src/message.js");
            // const { Message } = await import("../dist/message2.umd");
            // const { default: Message } = await import("../dist/message2.umd");
            // const { default: Message } = await import("../dist/message2.umd");
            // const Message = await import("../dist/message2.umd");
            // console.log(MessageModule.default);
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('default')

            // await Message.init();

            await Message.changeLanguage("ko");

            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko')

            expect(Message.get('KO')).toMatch(/END/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
    });
});
