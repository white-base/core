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
        describe("MetaObject.get(): str <메세지 얻기>", () => {
            it("- get() : 메세지 얻기", () => {
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

                console.warn(msg);
                expect(msg).toMatch(/NamespaceManager/);
            });
            it("- get() : 메세지 얻기 : 한글", () => {
                Message.lang = 'kor';
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

                console.warn(msg);
                expect(msg).toMatch(/NamespaceManager/);
            });
            it("- get() : 짧은 메세지 얻기 : 한글", () => {
                Message.lang = 'kor';
                Message.isLong = false;
                const msg = Message.get('ES011', ['NamespaceManager', 'namespace-manager']);

                console.warn(msg);
                expect(msg).toMatch(/NamespaceManager/);
            });
            it("- get() : 없는 코드", () => {
                const msg = Message.get('AEEEe1', ['NamespaceManager', 'namespace-manager']);

                console.warn(msg);
                expect(msg).toMatch(/code/);
            });
        });
        describe("MetaObject.getInfo(): obj <메세지 객체>", () => {
            it("- getInfo() : 메세지 얻기", () => {
                const msg = Message.getInfo('ES011');

                console.warn(msg);
                expect(msg.memo).toMatch(/1/);
            });
        });
        
    });
});
