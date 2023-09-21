/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const {loadNamespace}                  = require('../src/load-namespace');
const {MetaRegistry}        = require('../src/meta-registry');


//==============================================================
// test
describe("[target: load-namespace.js]", () => {
    describe("loadNamespace :: 함수", () => {
        beforeEach(() => {
            jest.resetModules();
            // Message.init();
        });
        describe("loadNamespace() <전체 네임스페이스 불러오기>", () => {
            it("- loadNamespace() ", () => {
                loadNamespace()

                expect(MetaRegistry.ns.find('Meta.MetaObject')).toBeDefined()
                
            });
        });
    });
});
