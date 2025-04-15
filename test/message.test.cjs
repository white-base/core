//==============================================================
// gobal defined

//==============================================================
// test
describe("CJS ENV TEST", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
        process.env.LANG = 'en_US.UTF-8';
    });
    describe("Message.get() : 메시지 얻기", () => {
        it("- 기본 영어", async () => {
            process.env.LANG = 'ko_KR.UTF-8'; // 한글 환경에서도 autoDetect()가 실행되지 않음
            // const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
            
            const {Message} = require('logic-core');
            
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/There is no message for code. 'KO'/);
            expect(Message.get('EN')).toMatch(/OK/);
            // expect(warnSpy.mock.calls[0][0]).toMatch("ja")
        });             
    });
    describe("Message.autoDetect() : 언어자동 설정", () => {
        it("- 한글", async () => {
            process.env.LANG = 'ko_KR.UTF-8';
            // const {Message} = await import('../src/message');
            const {Message} = require('logic-core');
            await Message.autoDetect()
            
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
    });
    describe("Message.get() : 메세지 얻기", () => {
        it("- 기본 영어", async () => {
            const {Message} = require('logic-core');

            expect(Message.currentLang).toBe('default');
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
        });
        it.skip("- 한글", async () => {
            const {Message} = require('../src/message-wrap');
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            // const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
            const {Message} = require('logic-core');
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
            // expect(warnSpy.mock.calls[0][0]).toMatch("ko")
        });
        it("- 한글 : node", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            const {Message} = require('../dist/logic-core.node.cjs');
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : node 2", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            const {Message} = await import('../dist/logic-core.node.cjs');
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : browser", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            const {Message} = require('../dist/logic-core.browser.cjs');
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : umd", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            // const {Message} = require('../dist/logic-core.js');
            // const core = require('../dist/logic-core.js');
            // require('../dist/logic-core.js');
            // const {Message} = await import('../dist/logic-core.js');
            // await require('../dist/logic-core.js');
            await import('../dist/logic-core.js');
            const {Message} = _L;
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
        });
    });
});