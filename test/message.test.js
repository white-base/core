//==============================================================
// gobal defined
import {jest} from '@jest/globals';

const T = true;

//==============================================================
// test
describe("[target: message.js]", () => {
    beforeEach(async () => {
        jest.resetModules();
        jest.restoreAllMocks();
        globalThis.isESM = true
    });
    describe("Message.$storage : 메세지 저장소", () => {
        it("- $storage : 기본 언어 얻기", async () => {
            const {Message} = await import('../src/message');

            expect(typeof Message.$storage).toBe('object')
            expect(typeof Message.$storage.lang).toBe('object')
            expect(typeof Message.$storage.lang.default).toBe('object')
            expect(Message.$storage.path.length > 0).toBe(T)
        });
    });
    describe("Message.autoDetect() : 언어자동 설정", () => {
        it("- 한글", async () => {
        process.env.LANG = 'ko_KR.UTF-8';
            const {Message} = await import('../src/message');
            await Message.autoDetect()
            
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- 영어 환경", async () => {
            process.env.LANG = 'en_US.UTF-8';
            const {Message} = await import('../src/message');
            await Message.autoDetect()
            
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('default')
        });
        it("- 일어 환경", async () => {
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

            process.env.LANG = 'ja_JP.UTF-8';
            const {Message} = await import('../src/message');
            await Message.autoDetect()
            
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ja')
            expect(warnSpy.mock.calls[0][0]).toMatch("ja")
        });
        it("Type 한글 오류 확인", async () => {
            process.env.LANG = 'ko_US.UTF-8';
            
            const {Message, Type} = await import('logic-core/ko');
            // const {Message, Type} = await import('../dist/logic-core.js');
            
            expect(Message.currentLang).toBe('default');

            await Message.autoDetect()
            
            expect(Message.currentLang).toBe('ko');
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
            expect(() => Type.allowType([[String, Number]], {})).toThrow('타입')
        });
    });
    describe("Message.getMessageByCode() : 메시지 반환", () => {
        it("- 오류 코드 메세지 : ES010", async () => {
            const {Message} = await import('../src/message');
            const code = 'ES010'
            const value = 'Other errors'

            expect(Message.getMessageByCode(code)).toBe(value)
        });
        it("- 없는 메세지", async () => {
            const {Message} = await import('../src/message');
            const code = 'EEEEE'
            const value = 'Other errors'

            expect(Message.getMessageByCode(code)).toBe(undefined)
        });
    });
    describe("Message.importMessage() : 저장소에 메세지 추가", () => {
        it("- 추가", async() => {
            const {Message} = await import('../src/message');
            Message.importMessage({EEEEE: 'NamespaceManager'}, './test')

            expect(Message.$storage.path[1].indexOf('/test') > -1).toBe(T)
            expect(Message.$storage.path.length > 1).toBe(T)
            expect(Message.getMessageByCode('EEEEE')).toBe('NamespaceManager')
        });
        it("- 경로 없이 추가", async () => {
            const {Message} = await import('../src/message');
            Message.importMessage({EEEEE: 'NamespaceManager'})

            expect(Message.$storage.path.length > 0).toBe(T)
            expect(Message.getMessageByCode('EEEEE')).toBe('NamespaceManager')
        });
    });
    describe("Message.changeLanguage() : 언어 변경", () => {
        it("- 언어 변경", async () => {
            const {Message} = await import('../src/message');
            await Message.changeLanguage('ko')

            expect(Message.currentLang).toBe('ko')
            expect(Message.getMessageByCode('KO')).toBe('OK')
        });
        it("- 없는 언어 추가", async () => {
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
            const {Message} = await import('../src/message')
            await Message.changeLanguage('jp')
            
            expect(Message.currentLang).toBe('jp')
            expect(warnSpy.mock.calls[0][0]).toMatch("jp")
        });
    });
    describe("Message.get() : 메세지 얻기", () => {
        it("- 메세지 얻기", async () => {
            const {Message} = await import('../src/message');
            const msg = Message.get('ES011');
            
            expect(msg).toMatch(/ES011/);
        });
        it("- 없는 코드", async () => {
            const {Message} = await import('../src/message');
            const msg = Message.get('EEEE',);
            
            expect(msg).toBe("There is no message for code. 'EEEE'")
        });
        it("- 코드 매칭", async () => {
            const {Message} = await import('../src/message');
            Message.importMessage({TEST: 'aa=${aa}, bb=${bb}, [0]=$1, [1]=$2'})
            
            const msg1 = Message.get('TEST', {aa: 'AA', bb: 'BB'});
            const msg2 = Message.get('TEST', ['10', 20]);
            
            expect(msg1).toBe(" [TEST] aa=AA, bb=BB, [0]=$1, [1]=$2")
            expect(msg2).toBe(" [TEST] aa=${aa}, bb=${bb}, [0]=10, [1]=20")
        });
    });
    describe("Message.init() : 언어 ", () => {
        it("- 확인", async () => {
            const {Message} = await import('../src/message');
            await Message.changeLanguage('ko')

            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('ko')

            await Message.resetLang();
            
            expect(Message.defaultLang).toBe('default')
            expect(Message.currentLang).toBe('default')
        });
    });
});