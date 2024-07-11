/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
// const Util      = require('../src/util').util;

//==============================================================
// test
describe('Util.*', () => {
    beforeEach(() => {
        jest.resetModules();
        global.OLD_ENV = false;
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });
    // REVIEW: 강제로 지우면 오류
    // it('- Array.isArray() : polyfill', () => {
    //     // polyfill 강제 지움
    //     Array.isArray = null;
    //     const Util      = require('../src/util').util;
    //     const arr = [];
        
    //     expect(Array.isArray(arr)).toBe(true);
    // });
    // // it.skip('- Object.keys() : polyfill', () => {
    // //     // polyfill 강제 지움
    // //     Object.keys = null;
    // //     const Util      = require('../src/util').util;
    // //     const arr = ['aa'];
    // //     const obj1 = {aa: {bb: 1}}
        
    // //     expect(Object.keys(arr)).toEqual(['0']);
    // //     expect(Object.keys(obj1)).toEqual(['aa']);
    // //     expect(()=> Object.keys(undefined)).toThrow(/Object.keys/)
    // // });
    
    it('- Util.getArrayDepth() : 배열 깊이 얻기 ', () => {
        const Util      = require('../src/util').Util;
        const lvl3 = [[[]]];
        // const lvl3 = [[[]]];

        expect(Util.getArrayDepth(lvl3)).toBe(3);
    });

    it('- Util.createGuid() : 난수 비교와 길이 검사 ', () => {
        const Util      = require('../src/util').Util;
        const guid1 = Util.createGuid();
        const guid2 = Util.createGuid();
        
        expect(guid1.length).toBe(36);
        expect(guid2.length).toBe(36); // guid 길이
        expect(guid1).not.toBe(guid2);
    });

    it('- Util.deepCopy() : 깊은 복사 ', () => {
        const Util      = require('../src/util').Util;
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
        expect(reg1).toEqual(reg2);
    });
    it('- Util.deepCopy() : prototype 복제 안함 ', () => {
        const Util      = require('../src/util').Util;
        var sup01 = Object.create({aa: 1})
        sup01.bb = 2
        var obj01 = Object.create(sup01)
        obj01.cc = 3
        
        const obj02 = Util.deepCopy(obj01);

        expect(obj01).toEqual(obj02);
    });
    it('- Util.inherits : Object.create() 제거 ', () => {
        // const temp = Object.create; // 임시 저장
        // delete Object.create;  // 비우기
        global.OLD_ENV = true;  // 디버깅 
        const Util      = require('../src/util').Util;

        // Object.create = temp;       // 복귀
        const Super = function() { this.foo = 1 };
        const Bar = function() { 
            Super.call(this);
            this.bar = 10 
        };
        // delete Object.create;  // 비우기

        Util.inherits(Bar, Super);
        const i = new Bar();

        expect(i.foo).toBe(1);
        expect(i.bar).toBe(10);
    });
    it('- Util.inherits : Object.create() ', () => {
        const Util      = require('../src/util').Util;
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
        const Util      = require('../src/util').Util;
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
    it('- Util.inherits : 부모 삽입 안함, old env ', () => {
        global.OLD_ENV = true;  // 디버깅 
        const Util      = require('../src/util').Util;
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

    // it('- Util.inherits : Object.create() 제거 및 부모 삽입 안함', () => {

    //     const temp = Object.create; // 임시 저장
    //     Object.create = undefined;  // 비우기
    //     const Util      = require('../src/util').util;
    //     Object.create = temp;       // 복귀
    //     const Super = function() { this.foo = 1 };
    //     const Bar = function() { 
    //         Super.call(this);
    //         this.bar = 10 
    //     };
    //     Util.inherits(Bar);
    //     const i = new Bar();

    //     expect(Bar.super).not.toEqual(Super);   // Super 가 아님
    //     expect(i.foo).toBe(1);
    //     expect(i.bar).toBe(10);
    // });
    it('- Type.getTypes() :  생성자의 타입 목록 얻기, ES5 ', () => {
        const Util      = require('../src/util').Util;
        const Type      = require('../src/type').Type;

        // const IClassA = function IClassA() {this.a = true}
        // const IClassB = function IClassB() {this.b = true}
        // const IClassC = function IClassC() {this.c = true}
        // Util.inherits(IClassB, IClassC);
        const ClassA = function ClassA() {this.a = true}
        const ClassB = function ClassB() {this.b = true}
        Util.inherits(ClassB, ClassA);
        // ClassA._UNION = [IClassA, IClassB]
        // ClassB._UNION = [IClassB]

        var arr = Type.getTypes(ClassB);
        expect(arr.length).toBe(2);
    });
    it('- Type.getTypes() :  생성자의 타입 목록 얻기, ES5 ', () => {
        const Util      = require('../src/util').Util;
        const Type      = require('../src/type').Type;

        const IClassA = function IClassA() {this.a = true}
        const IClassB = function IClassB() {this.b = true}
        const IClassC = function IClassC() {this.c = true}
        Util.inherits(IClassB, IClassC);
        const ClassA = function ClassA() {this.a = true}
        const ClassB = function ClassB() {this.b = true}
        Util.inherits(ClassB, ClassA);
        ClassA._UNION = [IClassA, IClassB]
        ClassB._UNION = [IClassB]

        var arr = Type.getTypes(ClassB);
        expect(arr.length).toBe(5);
    });
    it('- Type.getTypes() :  생성자의 타입 목록 얻기, ES6 + ES5 class ', () => {
        const Util      = require('../src/util').util;
        const Type      = require('../src/type').Type;
        
        const Class0 = function Class0() {this.a = true}
        class ClassA extends Class0{ aa = true; }
        class ClassB extends ClassA { bb = true; }

        var arr = Type.getTypes(ClassB);
        expect(arr.length).toBe(3);
    });
    it('- Type.getTypes() :  생성자의 타입 목록 얻기, ES6 class ', () => {
        const Util      = require('../src/util').util;
        const Type      = require('../src/type').Type;
        
        class IClassA { a = true; }
        class IClassC { b = true; }
        class IClassB extends IClassC { b = true; }
        class ClassA { aa = true; }
        class ClassB extends ClassA { bb = true; }
        ClassA._UNION = [IClassA, IClassB]
        ClassB._UNION = [IClassB]

        var arr = Type.getTypes(ClassB);
        expect(arr.length).toBe(5);
    });

    it('- Type.isProtoChain() : 상속 여부 검사 ', () => {    // TODO: util-type 이동 요망
        const Util      = require('../src/util').Util;
        const Type      = require('../src/type').Type;
        
        const IClassA = function IClassA() {this.ia = true}
        const IClassA1 = function IClassA1() {this.ia1 = true}
        const IClassB = function IClassB() {this.ib = true}
        Util.inherits(IClassB, IClassA1);
        const ClassA = function ClassA() {this.a = true}
        const ClassB = function ClassB() {this.b = true}
        Util.inherits(ClassB, ClassA);
        ClassA._UNION = [IClassA, IClassB]
        ClassB._UNION = [IClassB]

        expect(Type.isProtoChain(ClassB, ClassA)).toBe(true);
        expect(Type.isProtoChain(ClassB, IClassA1)).toBe(false);
    });

    it('- Type.hasType() : 상속 또는 인터페이스 타입 검사 ', () => {    // TODO: util-type 이동 요망
        const Util      = require('../src/util').Util;
        const Type      = require('../src/type').Type;
        
        const IClassA = function IClassA() {this.ia = true}
        const IClassA1 = function IClassA1() {this.ia1 = true}
        const IClassB = function IClassB() {this.ib = true}
        Util.inherits(IClassB, IClassA1);
        const ClassA = function ClassA() {this.a = true}
        const ClassB = function ClassB() {this.b = true}
        Util.inherits(ClassB, ClassA);
        ClassA._UNION = [IClassA, IClassB]
        ClassB._UNION = [IClassB]

        expect(Type.hasType(null, ClassA)).toBe(false);
        expect(Type.hasType(ClassB, null)).toBe(false);
        
        expect(Type.hasType(ClassB, ClassA)).toBe(true);
        expect(Type.hasType(ClassB, IClassA1)).toBe(true);
        expect(Type.hasType(ClassB, 'ClassA')).toBe(true);
        expect(Type.hasType(ClassB, 'ClassZ')).toBe(false);
        expect(Type.hasType(ClassB, 'IClassA1')).toBe(true);
    });

    // describe("예외, 커버리지 ", () => {
    //     it("-  ", () => {
    //     });
    // });
});
