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
    it("- 예외 : Util 로딩이 인된경우", () => {
        expect(() => require('../src/meta-object')).toThrow(/Util.*load/);
    });
    it("- 예외 : IObject 로딩이 인된경우", () => {
        require('../src/util-type');    // 참조 로딩
        require('../src/util');
        expect(() => require('../src/meta-object')).toThrow(/IObject.*load/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-object');
        require('../src/meta-object');

        expect(global._L.MetaObject).toBeDefined();
        expect(global._L.Meta.MetaObject).toBeDefined();
    });
    
});
describe("< MetaElement >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- 예외 : 전체 로딩 안할 때", () => {
        expect(() => require('../src/meta-element')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 인된경우", () => {
        expect(() => require('../src/meta-element')).toThrow(/Util.*load/);
    });
    it("- 예외 : IMarshal 로딩이 인된경우", () => {
        require('../src/util-type');    // 참조 로딩
        require('../src/util');
        expect(() => require('../src/meta-element')).toThrow(/IMarshal.*load/);
    });
    it("- 예외 : MetaObject 로딩이 인된경우", () => {
        require('../src/util-type');    // 참조 로딩
        require('../src/util');
        require('../src/i-object');     // 참조 로딩
        require('../src/i-marshal');

        expect(() => require('../src/meta-element')).toThrow(/MetaObject.*load/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/util-type');    // 참조 조링
        require('../src/util');
        require('../src/i-object');     // 참조 로딩
        require('../src/i-marshal');
        require('../src/meta-object');
        require('../src/meta-element');

        expect(global._L.MetaElement).toBeDefined();
        expect(global._L.Meta.MetaElement).toBeDefined();
    });
    
});