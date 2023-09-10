/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const Util      = require('../src/util');

//==============================================================
// test
describe("[target: util.js]", () => {
    describe('Util.implements(this, interface)', () => {
        beforeAll(() => {
        });
        it('- this 인터페이스 선언 : 예외 (인터페이스 미구현)', () => {
            function ISuper() {
                this.m1 = Function;
            }
            function CoClass() {
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(() => new CoClass()).toThrow(/대상 없음/);
        });
        it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
            function ISuper() {}
            ISuper.prototype.m1 = Function;
            function CoClass() {
                Util.implements(this, ISuper);    /** @implements */
            }
            
            expect(() => new CoClass()).toThrow(/대상 없음/);
        });
    
        it('- class 인터페이스 선언 : 예외 (인터페이스 미구현)', () => {
            class ISuper {
                m1 = function() {};
            }
            class CoClass {
                constructor() {
                    Util.implements(this, ISuper);    /** @implements */
                }
            }
    
            expect(() => new CoClass()).toThrow(/대상 없음/);
        });
        it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
            function ISuper() {}
            ISuper.prototype.m1 = function() {};
            function CoClass() {
                Util.implements(this, ISuper);    /** @implements */
            }
            
            expect(() => new CoClass()).toThrow(/대상 없음/);
        });
    
        it('- this 인터페이스 선언 <-- 구현', () => {
            function ISuper() {
                this.m1 = Function;
            }
            // ISuper.prototype.m1 = function() { return 'C1' }
            function CoClass() {
                Util.implements(this, ISuper);    /** @implements */
            }
            CoClass.prototype.m1 = function() { return 'C1' }
            const i = new CoClass();
    
            expect(i.m1()).toBe('C1');
            expect(i._interface.length).toBe(1);
            // expect(i.isImplementOf(ISuper)).toBe(true);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = 인스턴스) ', () => {
            function AClass() {}
            function ISuper() {
                this.obj = AClass;    // 클래스 역활
            }
            function CoClass() {
                this.obj = /err/;    // 객체(Regex)
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass()).toThrow(/instance/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = function) ', () => {
            function ISuper() {
                this.obj = function AClass() {};    // 클래스 역활
            }
            function CoClass() {
                this.obj = 'err'
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass()).toThrow(/instance/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = array) ', () => {
            function ISuper() {
                this.arr = [];
            }
            function CoClass() {
                this.arr = 'err';
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass()).toThrow(/array/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = string) ', () => {
            function ISuper() {
                this.str = '';
            }
            function CoClass() {
                this.str = 1;
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass()).toThrow(/string/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = number) ', () => {
            function ISuper() {
                this.num = 0;
            }
            function CoClass() {
                this.num = 'err';
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass()).toThrow(/number/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = boolean) ', () => {
            function ISuper() {
                this.bool   = true;
            }
            function CoClass() {
                this.bool   = 'err';
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass()).toThrow(/boolean/);
        });
        it('- this 인터페이스 선언 <-- 구현 : (타입 = null) any 역활 ', () => {
            function ISuper() {
                this.bool   = null;
                this.num    = null;
                this.str    = null;
                this.arr    = null;
                this.obj    = null;
            }
            function CoClass() {
                this.bool   = -1;
                this.num    = '-1';
                this.str    = -1;
                this.arr    = -1;
                this.obj    = -1;
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(new CoClass()).toEqual({
                bool: -1,
                num: '-1',
                str: -1,
                arr: -1,
                obj: -1
            });
        });
    
        it('- this 인터페이스 선언 <-- 구현 : 예외 (하위 타입) ', () => {
            // 인터페이스
            function Fun() {};
            function ISuper() {
                this.sub = {
                    fun: Fun,
                    arr: [],
                    str: '',
                    num: 1,
                    bool: false,
                    any: null,
                };
            }
            ISuper.prototype.m1 = Fun;
            // 클래스 구현
            function CoClass1() {
                this.sub = {
                    fun: new Fun,
                    arr: [],
                    str: '',
                    num: 1,
                    bool: 'err',
                    any: 1,
                    add: {}     // 확장 속성
                };
                this.add = 1;   // 확장 속성
                Util.implements(this, ISuper);    /** @implements */
            }
            CoClass1.prototype.m1 = new Fun;
            function CoClass2() {
                this.sub = {
                    fun: 'err',
                    arr: [],
                    str: '',
                    num: 1,
                    bool: true,
                    any: 1,
                    add: {}     // 확장 속성
                };
                this.add = 1;   // 확장 속성
                Util.implements(this, ISuper);    /** @implements */
            }
            CoClass1.prototype.m1 = new Fun;
            function CoClass3() {
                this.sub = {
                    fun: new Fun,
                    arr: [],
                    str: '',
                    num: 1,
                    bool: true,
                    any: 1,
                    add: {}     // 확장 속성
                };
                this.add = 1;   // 확장 속성
                Util.implements(this, ISuper);    /** @implements */
            }
    
            expect(()=> new CoClass1()).toThrow(/bool/);
            expect(()=> new CoClass2()).toThrow(/fun/);
            expect(()=> new CoClass3()).toThrow(/m1/);
        });
        
        it('- this 인터페이스 선언 <-- 구현 : 예외 (복합 타입) ', () => {
            // 인터페이스
            function AClass() {};
            function ISuper() {
                this.fun = Function;
                this.obj = AClass;
                this.arr = [];
                this.str = '';
                this.num = 0;
                this.bool   = true;
                // this.date = Date;    // 날짜형
                this.any = null;
                this.objEmpty = {};
                this.sub = {
                    fun: Function,
                    arr: [],
                    str: '',
                    num: 1,
                    bool: false,
                    any: null,
                };
            }
            ISuper.prototype.m1 = Function;    // 예외
            // 클래스 구현
            function CoClass() {
                this.fun = function() {};
                this.obj = new AClass();
                this.arr = [];
                this.str = '';
                this.num = 0;
                this.bool   = true;
                // this.date = Date;    // 날짜형
                this.any = null;
                this.objEmpty = {};
                this.sub = {
                    fun: function() {},
                    arr: [],
                    str: '',
                    num: 1,
                    bool: false,
                    any: null,
                };
                Util.implements(this, ISuper);    /** @implements */
            }
            
            expect(()=> new CoClass()).toThrow(/m1/);
        });
        
        it('- class 다중 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            class Fun {}
            class ISuper1 {
                fun = Fun;
                m1 = Function;
            }
            class ISuper2 {
                arr = [];
                m2 = Function;
            }
            // 클래스 구현
            class CoClass1 {
                fun = new Fun;
                arr = [];
                constructor() { Util.implements(this, ISuper1, ISuper2); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            class CoClass2 {
                fun = new Fun;
                constructor() { Util.implements(this, ISuper1, ISuper2); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            let obj = new CoClass1();
    
            expect(obj.m1()).toBe('M1');
            expect(()=> new CoClass2()).toThrow(/arr/);
        });
        it('- class 다중 인터페이스 선언 : 중복 등록', () => {
            // 인터페이스
            class Fun {}
            class ISuper1 {
                fun = Fun;
                m1 = Function;
            }
            class ISuper2 {
                arr = [];
                m2 = Function;
            }
            // 클래스 구현
            class CoClass1 {
                fun = new Fun;
                arr = [];
                constructor() { Util.implements(this, ISuper1, ISuper2, ISuper1); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            let obj = new CoClass1();
    
            expect(obj._interface.length).toBe(2);
        });
        it('- class 인터페이스 구현 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            class ISuper {
                arr = [];
                // m1() {};
                m1 = Function;
            }
            class ISub {
                arr = [];           // 재정의
                fun = Function;
                constructor() { Util.implements(this, ISuper); }
                m1 = Function;            // 재정의
                m2 = Function;
            }
            // 클래스 구현
            class CoClass1 {
                arr = [];
                fun = function() { return 'FUN' };
                constructor() { Util.implements(this, ISub); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            class CoClass2 {
                fun = function() {};
                constructor() { Util.implements(this, ISub); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            let obj = new CoClass1();
    
            expect(obj.m1()).toBe('M1');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/arr/);
        });
        it('- function 인터페이스 구현 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            function ISuper() {
                this.arr = [];
            }
            ISuper.prototype.m1 = function() {};
            function ISub() {
                this.arr = [];                  // 재정의
                this.fun = function() {};
                Util.implements(this, ISuper);
            }
            ISub.prototype.m1 = function() {};  // 재정의
            ISub.prototype.m2 = function() {};
            // 클래스 구현
            function CoClass1() {
                this.fun = function() { return 'FUN' };
                this.arr = [];
                Util.implements(this, ISub);
            }
            CoClass1.prototype.m1 = function() { return 'M1' };
            CoClass1.prototype.m2 = function() { return 'M2' };
            function CoClass2() {
                this.fun = function() { return 'FUN' };
                Util.implements(this, ISub); 
            }
            CoClass2.prototype.m1 = function() { return 'M1' };
            CoClass2.prototype.m2 = function() { return 'M2' };
            let obj = new CoClass1();
    
            expect(obj.fun()).toBe('FUN');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/arr/);
        });
        it('- function 인터페이스 상속 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            function ISuper() {
                this.arr = [];
            }
            ISuper.prototype.m1 = function() {};
            function ISub() {
                ISuper.call(this); 
                this.fun = function() {};
            }
            Util.inherits(ISub, ISuper);
            ISub.prototype.m2 = function() {};
            // 클래스 정의
            function CoClass1() {   // 정상 작동
                this.fun = function() { return 'FUN' };
                this.arr = [];
                Util.implements(this, ISub);
            }
            CoClass1.prototype.m1 = function() { return 'M1' };
            CoClass1.prototype.m2 = function() { return 'M2' };
            function CoClass2() {
                this.fun = function() { return 'FUN' };
                Util.implements(this, ISub); 
            }
            CoClass2.prototype.m1 = function() { return 'M1' };
            CoClass2.prototype.m2 = function() { return 'M2' };
            let obj = new CoClass1();
    
            expect(obj.fun()).toBe('FUN');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/arr/);
        });
        it('- class 인터페이스 상속 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            class ISuper {
                arr = [];
                m1() {};
            }
            class ISub extends ISuper {
                fun = function() {};
                m2 = function() {};
            }
            // 클래스 정의
            function CoClass1() {
                this.fun = function() { return 'FUN' };
                this.arr = [];
                Util.implements(this, ISub);
            }
            CoClass1.prototype.m1 = function() { return 'M1' };
            CoClass1.prototype.m2 = function() { return 'M2' };
            function CoClass2() {
                this.fun = function() { return 'FUN' };
                Util.implements(this, ISub); 
            }
            CoClass2.prototype.m1 = function() { return 'M1' };
            CoClass2.prototype.m2 = function() { return 'M2' };
            let obj = new CoClass1();
    
            expect(obj.fun()).toBe('FUN');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/arr/);
        });
        it('- isImplementOf() : 예외 및 검사 ', () => {
            // 인터페이스
            class ISuper1 {
                arr = [];
            }
            class ISuper2 {
                arr2 = [];
            }
            // 클래스 정의
            function CoClass1() {
                this.arr = [];
                Util.implements(this, ISuper1);
            }
            let obj = new CoClass1();
    
            expect(obj.isImplementOf(ISuper1)).toBe(true);
            expect(obj.isImplementOf(ISuper2)).toBe(false);
            expect(() => obj.isImplementOf(-1)).toThrow('ES024');
        });
        it('- implements() : 예외 ', () => {
            function CoClass1() {
                this.arr = [];
                Util.implements(this, -1);
            }
    
            expect(()=> new CoClass1()).toThrow('ES021');
        });
        it('- implements(any) : object 가 아닌 객체 ', () => {
            function CoClass1() {
                this.arr = [];
            }
            // const i = new CoClass1();
            
            expect(()=> Util.implements(1, CoClass1)).toThrow(/object/);
            expect(()=> Util.implements(function(){}, CoClass1)).toThrow(/object/);
            expect(()=> Util.implements('str', CoClass1)).toThrow(/object/);
            expect(()=> Util.implements(true, CoClass1)).toThrow(/object/);
        });
        // it('- 속성 = null : 예외 및 검사', () => {
        // });
    });
});