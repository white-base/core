/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("< MetaObject >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- 예외 : 전체 로딩 안할 때", () => {
        expect(() => require('../src/meta-object')).toThrow(/module load/);
    });
    it("- 예외 : i-object 로딩이 인된경우", () => {
        expect(() => require('../src/meta-object')).toThrow(/Util.*load/);
    });
    it("- 예외 : i-object 로딩이 인된경우", () => {
        require('../src/util-type');    // 참조 로딩
        require('../src/util');
        expect(() => require('../src/meta-object')).toThrow(/IObject.*load/);
    });
    it("- namespace : util.js ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-object');
        require('../src/meta-object');

        expect(global._L.MetaObject).toBeDefined();
        expect(global._L.Meta.MetaObject).toBeDefined();
    });
    
});