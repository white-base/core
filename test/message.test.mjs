//==============================================================
// gobal defined
import {Message} from '../src/message.js';
// import {Message} from '../src/message2.js';
// import {Message} from '../src/message3.js';
import {jest} from '@jest/globals';

const T = true;
//==============================================================
// test
describe("[target: message.js]", () => {
    describe("Message :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            globalThis.isESM = true
            process.env.LANG = 'ko_KR.UTF-8';

        });
        describe("Message.$storage : 메세지 저장소", () => {
            it("- $storage : 기본 언어 얻기", () => {
                expect(typeof Message.$storage).toBe('object')
                expect(typeof Message.$storage.lang).toBe('object')
                expect(typeof Message.$storage.lang.default).toBe('object')
                expect(Message.$storage.path.length > 0).toBe(T)
            });
        });
        describe("Message.autoDetect : 언어자동 감지", () => {
            it("- 활성화", async () => {
                Message.autoDetect = true;
                await Message.init();

                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('ko')
                // console.warn(Message.currentLang)
            });
            it("- 비활성화", async () => {
                Message.autoDetect = false;
                await Message.init();
                
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('default')
            });
        });
        describe("Message.getMessageByCode() : 메시지 반환", () => {
            it("- 오류 코드 메세지 : ES010",() => {
                const code = 'ES010'
                const value = 'Other errors'

                expect(Message.getMessageByCode(code)).toBe(value)
            });
            it("- 없는 메세지",() => {
                const code = 'EEEEE'
                const value = 'Other errors'

                expect(Message.getMessageByCode(code)).toBe(undefined)
            });
        });
        describe("Message.importMessage() : 저장소에 메세지 추가", () => {
            it("- 추가",() => {
                Message.importMessage({EEEEE: 'NamespaceManager'}, './test')

                expect(Message.$storage.path.includes('./test')).toBe(T)
                expect(Message.$storage.path.length > 1).toBe(T)
                expect(Message.getMessageByCode('EEEEE')).toBe('NamespaceManager')
            });
            it("- 경로 없이 추가",() => {
                Message.importMessage({EEEEE: 'NamespaceManager'})

                expect(Message.$storage.path.length > 0).toBe(T)
                expect(Message.getMessageByCode('EEEEE')).toBe('NamespaceManager')
            });
        });
        describe("Message.changeLanguage() : 언어 변경", () => {
            it("- 확장 추가",() => {
                Message.changeLanguage('ko')
                expect(Message.getMessageByCode('KO')).toBe('OK')
            });
            it("- 없는 언어 추가",() => {
                Message.importMessage({EEEEE: 'NamespaceManager'})

                expect(Message.$storage.path.length > 0).toBe(T)
                expect(Message.getMessageByCode('EEEEE')).toBe('NamespaceManager')
            });
        });
        describe("Message.get(): str <메세지 얻기>", () => {
            
            it("- get() : 메세지 얻기", () => {
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);
                // console.warn(msg);
                expect(msg).toMatch(/ES011/);
            });
            it("- get() : 메세지 얻기, isLong", () => {
                Message.isLong = true;
                const msg1 = Message.get('ES010', []);
                Message.isLong = false;
                const msg2 = Message.get('ES010', []);

                // console.warn(msg);
                expect(msg1).toMatch(/ES010/);
                expect(msg2).toMatch(/ES010/);
            });
            // it("- get() : 메세지 얻기 : 한글", () => {
            //     Message.lang = 'kor';
            //     const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

            //     // console.warn(msg);
            //     expect(msg).toMatch(/NamespaceManager/);
            // });
            // it("- get() : 짧은 메세지 얻기 : 한글", () => {
            //     Message.lang = 'kor';
            //     Message.isLong = true;
            //     const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

            //     // console.warn(msg);
            //     expect(msg).toMatch(/NamespaceManager/);
            // });
            it("- get() : 없는 코드", () => {
                const msg = Message.get('AEEEe1', ['NamespaceManager', 'namespace-manager']);

                // console.warn(msg);
                expect(msg).toMatch(/code/);
            });
            it("- get() : 경고, 정보 코드", () => {
                const msg1 = Message.get('WS011', []);
                const msg2 = Message.get('IS011', []);
                const msg3 = Message.get('QS011', []);  // 없는 코드

                // console.warn(msg);
                expect(msg1).toMatch(/WS011/);
                // expect(msg2).toMatch(/IS011/);
                // expect(msg3).toMatch(/There are no messages about the code./);
                expect(msg3).toMatch(/There is no message for code./);
            });
            it("- get() : 오류 객체 코드", () => {
                const msg = Message.get({}, ['param1', 'param2']);

                // console.warn(msg);
                expect(msg).toMatch(/code/);
            });
            it.skip("- 스토리지 설정 ", () => {
                var storage = { en: {aaa: '', bbb: {}, zzz: 'etc'} }
                // Message.$storage = storage;
                const msg1 = Message.get('aaa', []);
                const msg2 = Message.get('bbb', []);
                const msg3 = Message.get('ccc', []);
                const msg4 = Message.get('zzz', []);
                
                expect(msg1).toBe('There is no message for code. ')
                expect(msg2).toBe('There is no message for code. ')
                expect(msg3).toBe('There is no message for code.')
                expect(msg4).toMatch(/etc/);
            });
        });
        // describe("MetaObject.getObject(): obj <메세지 객체>", () => {
        //     it("- getInfo() : 메세지 얻기", () => {
        //         const msg1 = Message.getObject('ES011');
        //         const msg2 = Message.getObject('IS011', ['A', 'B']);

        //         // console.warn(msg);
        //         expect(msg1.memo).toMatch(/1:/);
        //         expect(msg2.msg).toMatch(/2/);
        //     });
        // });
        describe.skip("Message.error(code, value) ", () => {
            it("- error() : 코드값으로 예외 발생", () => {
                expect(()=> Message.error('ES011', [])).toThrow('ES011')
            });
        });
        describe.skip("Message.warn(): obj <콘솔 경고 얻기>", () => {
            it("- getInfo() : 메세지 얻기", () => {
                // const mock = jest.fn(console.warn);
                // const spyFn = jest.spyOn(console, "warn");
                console.warn = jest.fn((val) => {
                    expect(val).toMatch(/ES011/);
                });

                Message.warn('ES011', []);
            });
        });
        // describe("예외 및 COVER", () => {
        //     it("- cover", () => {
        //         const a = new Message()
        //     });
        // }); 
    });
});
