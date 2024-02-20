/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {Message}                  = require('../src/message');


//==============================================================
// test
describe("[target: message.js]", () => {
    describe("Message :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            Message.init();
        });
        describe("MetaObject.lang: str <언어 설정>", () => {
            it("- this.lang : 기본 언어 얻기", () => {
                expect(Message.lang).toBe('eng')
            });
            it("- this.lang : 예외", () => {
                expect(()=> Message.lang = 'jan').toThrow(/language does not exist/)
            });
        });
        describe("MetaObject.isLong: bool <긴 메세지 여부>", () => {
            it("- this.lang : 긴메시지여부  설정 및 확인", () => {
                Message.isLong = false;
                expect(Message.isLong).toBe(false)
            });
        });
        describe("MetaObject.get(): str <메세지 얻기>", () => {
            it("- get() : 메세지 얻기", () => {
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

                // console.warn(msg);
                expect(msg).toMatch(/ES011/);
            });
            it("- get() : 메세지 얻기 : 한글", () => {
                Message.lang = 'kor';
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

                // console.warn(msg);
                expect(msg).toMatch(/NamespaceManager/);
            });
            it("- get() : 짧은 메세지 얻기 : 한글", () => {
                Message.lang = 'kor';
                Message.isLong = false;
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

                // console.warn(msg);
                expect(msg).toMatch(/NamespaceManager/);
            });
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
                expect(msg2).toMatch(/IS011/);
                expect(msg3).toMatch(/There are no messages about the code./);
            });
            it("- get() : 오류 객체 코드", () => {
                const msg = Message.get({}, ['param1', 'param2']);

                // console.warn(msg);
                expect(msg).toMatch(/code/);
            });
        });
        describe("MetaObject.getInfo(): obj <메세지 객체>", () => {
            it("- getInfo() : 메세지 얻기", () => {
                const msg1 = Message.getInfo('ES011');
                const msg2 = Message.getInfo('IS011', ['A', 'B']);

                // console.warn(msg);
                expect(msg1.memo).toMatch(/1:/);
                expect(msg2.msg).toMatch(/2/);
            });
        });
        describe("MetaObject.warn(): obj <콘솔 경고 얻기>", () => {
            it("- getInfo() : 메세지 얻기", () => {
                // const mock = jest.fn(console.warn);
                // const spyFn = jest.spyOn(console, "warn");
                console.warn = jest.fn((val) => {
                    expect(val).toMatch(/ES011/);
                });

                Message.warn('ES011', []);
            });
        });
        describe("예외 및 COVER", () => {
            it("- cover", () => {
                const a = new Message()
            });
        }); 
    });
});
