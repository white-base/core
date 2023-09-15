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
    it('- Util.inherits : Object.create() ', () => {
        const Util      = require('../src/util');
        const Super = function() { this.foo = 1 };
        const Bar = function() { 
            Super.call(this);
            this.bar = 10 
        };
        Util.inherits(Bar, Super);
        const i = new Bar();

        expect(Bar.super).toEqual(Super);
        expect(i.foo).toBe(1);
        expect(i.bar).toBe(10);
    });
    it('- Util.inherits : 부모 삽입 안함 ', () => {
        const Util      = require('../src/util');
        const Super = function() { this.foo = 1 };
        const Bar = function() { 
            Super.call(this);
            this.bar = 10 
        };
        Util.inherits(Bar);
        const i = new Bar();

        expect(Bar.super).not.toEqual(Super);   // Super 가 아님
        expect(i.foo).toBe(1);
        expect(i.bar).toBe(10);
    });
    it('- Util.inherits : Object.create() 제거 및 부모 삽입 안함', () => {
        const temp = Object.create; // 임시 저장
        Object.create = undefined;  // 비우기
        const Util      = require('../src/util');
        Object.create = temp;       // 복귀
        const Super = function() { this.foo = 1 };
        const Bar = function() { 
            Super.call(this);
            this.bar = 10 
        };
        Util.inherits(Bar);
        const i = new Bar();

        expect(Bar.super).not.toEqual(Super);   // Super 가 아님
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

    it('- Util.deepCopy() : 깊은 복사 ', () => {
        const Util      = require('../src/util');
        const arr1 = [{aa: {bb:1}}];
        const arr2 = Util.deepCopy(arr1);
        const obj1 = {aa: {bb:1}};
        const obj2 = Util.deepCopy(obj1);
        const fun1 = {aa: function(){return 'AA'}};
        const fun2 = Util.deepCopy(fun1);
        const str1 = "AA";
        const str2 = Util.deepCopy(str1);
        const reg1 = /REG/;
        const reg2 = Util.deepCopy(reg1);

        expect(arr1).toEqual(arr2);
        expect(obj1).toEqual(obj2);
        expect(fun1).toEqual(fun2);
        expect(str1).toEqual(str2);
        expect(reg1).toEqual(reg1);
    });
});
