/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
// const Util      = require('../src/util');

//==============================================================
// test
describe('Util.*', () => {
    beforeEach(() => {
        jest.resetModules();
    });
    afterEach(() => {
        jest.clearAllMocks()
    });
    it('- Array.isArray() : polyfill', () => {
        // polyfill 강제 지움
        Array.isArray = null;
        const Util      = require('../src/util');
        const arr = [];
        
        expect(Array.isArray(arr)).toBe(true);
    });
    it('- Util.inherits : Object.create() 제거 ', () => {
        const temp = Object.create; // 임시 저장
        Object.create = undefined;  // 비우기
        const Util      = require('../src/util');
        Object.create = temp;       // 복귀
        const Super = function() { this.foo = 1 };
        const Bar = function() { 
            Super.call(this);
            this.bar = 10 
        };
        Util.inherits(Bar, Super);
        const i = new Bar();

        expect(i.foo).toBe(1);
        expect(i.bar).toBe(10);
    });
    it('- Util.getArrayDepth() : 배열 깊이 얻기 ', () => {
        const Util      = require('../src/util');
        const lvl3 = [[[]]];
        // const lvl3 = [[[]]];

        expect(Util.getArrayDepth(lvl3)).toBe(3);
    });

    it('- Util.createGuid() : 난수 비교와 길이 검사 ', () => {
        const Util      = require('../src/util');
        const guid1 = Util.createGuid();
        const guid2 = Util.createGuid();

        expect(guid1.length).toBe(36);
        expect(guid2.length).toBe(36); // guid 길이
        expect(guid1).not.toBe(guid2);
    });
});
