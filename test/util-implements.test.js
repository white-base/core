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
                Util.implements(CoClass, this, ISuper);
            }
    
            expect(() => new CoClass()).toThrow(/ES017/);
            // expect(() => new CoClass()).toThrow(/ES017/);
        });
        it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
            function ISuper() {}
            ISuper.prototype.m1 = Function;
            function CoClass() {
                Util.implements(CoClass, this, ISuper);
            }
            
            expect(() => new CoClass()).toThrow(/ES017/);
        });
    
        it('- class 인터페이스 선언 : 예외 (인터페이스 미구현)', () => {
            class ISuper {
                m1 = function() {};
            }
            class CoClass {
                constructor() {
                    Util.implements(CoClass, this, ISuper);
                }
            }
    
            expect(() => new CoClass()).toThrow(/ES017/);
        });
        it('- class 인터페이스 선언 : _UNION 예외 (인터페이스 미구현)', () => {
            class ISuper {
                m1 = function() {};
            }
            class CoClass {
                constructor() {
                    Util.implements(CoClass, this);
                }
            }
            CoClass._UNION = [ISuper]
    
            expect(() => new CoClass()).toThrow(/ES017/);
        });
        it('- class 인터페이스 선언 : _UNION', () => {
            class ISuper {
                m1 = Number
                f1 = function() {};
            }
            class CoClass {
                m1 = 10
                constructor() {
                    Util.implements(CoClass, this);
                }
                f1() {} //  => 예외 발생 안힘 !!
            }
            CoClass._UNION = [ISuper]
            class ISub {
                m2 = String
                f2 = function() {};
            }
            class CoSub extends CoClass {
                m2 = 'str'
                constructor() {
                    super();
                    Util.implements(CoSub, this);
                }
                f2() {}
            }
            CoSub._UNION = [ISub]
            var c2 = new CoSub();
            
            // class CoSub2 extends CoClass {
            //     constructor() {
            //         super();
            //         Util.implements(this);
            //     }
            // }
            // CoSub2._UNION = [ISub]

            // expect(() => new CoSub2()).toThrow(/ES017(.|\s)*ES027/);
        });

        it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
            function ISuper() {}
            ISuper.prototype.m1 = function() {};
            function CoClass() {
                Util.implements(CoClass, this, ISuper);    
            }
            
            expect(() => new CoClass()).toThrow(/ES017/);
        });
    
        it('- this 인터페이스 선언 <-- 구현', () => {
            function ISuper() {
                this.m1 = Function;
            }
            // ISuper.prototype.m1 = function() { return 'C1' }
            function CoClass() {
                Util.implements(CoClass, this, ISuper);    
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
                Util.implements(CoClass, this, ISuper);
            }
    
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = function) ', () => {
            function ISuper() {
                this.obj = function AClass() {};    // 클래스 역활
            }
            function CoClass() {
                this.obj = 'err'
                Util.implements(CoClass, this, ISuper);
            }
    
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = array) ', () => {
            function ISuper() {
                this.arr = [];
            }
            function CoClass() {
                this.arr = 'err';
                Util.implements(CoClass, this, ISuper);
            }
    
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = string) ', () => {
            function ISuper() {
                this.str = '';
            }
            function CoClass() {
                this.str = 1;
                Util.implements(CoClass, this, ISuper);    
            }
    
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = number) ', () => {
            function ISuper() {
                this.num = 0;
            }
            function CoClass() {
                this.num = 'err';
                Util.implements(CoClass, this, ISuper);    
            }
    
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = boolean) ', () => {
            function ISuper() {
                this.bool   = true;
            }
            function CoClass() {
                this.bool   = 'err';
                Util.implements(CoClass, this, ISuper);    
            }
    
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        it('- this 인터페이스 선언 <-- 구현 : (타입 = null) any 역활 ', () => {
            function ISuper() {
                this.bool   = [['_any_']];
                this.num    = [['_any_']];
                this.str    = [['_any_']];
                this.arr    = [['_any_']];
                this.obj    = [['_any_']];
            }
            function CoClass() {
                this.bool   = -1;
                this.num    = '-1';
                this.str    = -1;
                this.arr    = -1;
                this.obj    = -1;
                Util.implements(CoClass, this, ISuper);    
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
                    any: [['_any_']]
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
                Util.implements(CoClass1, this, ISuper);    
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
                Util.implements(CoClass2, this, ISuper);    
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
                Util.implements(CoClass3, this, ISuper);    
            }
    
            expect(()=> new CoClass1()).toThrow(/ES017/);
            expect(()=> new CoClass2()).toThrow(/ES017/);
            expect(()=> new CoClass3()).toThrow(/ES017/);
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
                Util.implements(CoClass, this, ISuper);    
            }
            
            expect(()=> new CoClass()).toThrow(/ES017/);
        });
        
        it('- class 다중 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            class Fun {}
            class ISuper1 {
                fun = Fun;
                m1 = Function;
            }
            class ISuper2 {
                arr = Array;
                m2 = Function;
            }
            // 클래스 구현
            class CoClass1 {
                fun = new Fun;
                arr = [];
                constructor() { Util.implements(CoClass1, this, ISuper1, ISuper2); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            class CoClass2 {
                fun = new Fun;
                constructor() { Util.implements(CoClass2, this, ISuper1, ISuper2); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            let obj = new CoClass1();
    
            expect(obj.m1()).toBe('M1');
            expect(()=> new CoClass2()).toThrow(/ES017/);
        });
        it('- class 다중 인터페이스 선언 : 중복 등록', () => {
            // 인터페이스
            class Fun {}
            class ISuper1 {
                fun = Fun;
                m1 = Function;
            }
            class ISuper2 {
                arr = Array;
                m2 = Function;
            }
            // 클래스 구현
            class CoClass1 {
                fun = new Fun;
                arr = [];
                constructor() { Util.implements(CoClass1, this, ISuper1, ISuper2, ISuper1); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            let obj = new CoClass1();
    
            expect(obj._interface.length).toBe(2);
        });
        it('- class 인터페이스 구현 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            class ISuper {
                arr = Array;
                m1 = Function;
            }
            class ISub {
                arr = Array;           // 재정의
                fun = Function;
                constructor() { Util.implements(ISub, this, ISuper); }
                m1 = Function;            // 재정의
                m2 = Function;
            }
            ISub._KIND = 'interface';
            // 클래스 구현
            class CoClass1 {
                arr = [];
                fun = function() { return 'FUN' };
                constructor() { Util.implements(CoClass1, this, ISub); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            class CoClass2 {
                fun = function() {};
                constructor() { Util.implements(CoClass2, this, ISub); }
                m1() { return 'M1' };
                m2() { return 'M2' };
            }
            let obj = new CoClass1();
    
            expect(obj.m1()).toBe('M1');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/ES017/);
        });
        it('- function 인터페이스 구현 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            function ISuper() {
                this.arr = Array;
            }
            ISuper.prototype.m1 = function() {};
            function ISub() {
                this.arr = Array;                  // 재정의
                this.fun = function() {};
                Util.implements(ISub, this, ISuper);
            }
            ISub._KIND = 'interface';
            ISub.prototype.m1 = function() {};  // 재정의
            ISub.prototype.m2 = function() {};
            // 클래스 구현
            function CoClass1() {
                this.fun = function() { return 'FUN' };
                this.arr = [];
                Util.implements(CoClass1, this, ISub);
            }
            CoClass1.prototype.m1 = function() { return 'M1' };
            CoClass1.prototype.m2 = function() { return 'M2' };
            function CoClass2() {
                this.fun = function() { return 'FUN' };
                Util.implements(CoClass2, this, ISub); 
            }
            CoClass2.prototype.m1 = function() { return 'M1' };
            CoClass2.prototype.m2 = function() { return 'M2' };
            let obj = new CoClass1();
    
            expect(obj.fun()).toBe('FUN');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/ES017/);
        });
        it('- function 인터페이스 상속 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            function ISuper() {
                this.arr = Array;
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
                Util.implements(CoClass1, this, ISub);
            }
            CoClass1.prototype.m1 = function() { return 'M1' };
            CoClass1.prototype.m2 = function() { return 'M2' };
            function CoClass2() {
                this.fun = function() { return 'FUN' };
                Util.implements(CoClass2, this, ISub); 
            }
            CoClass2.prototype.m1 = function() { return 'M1' };
            CoClass2.prototype.m2 = function() { return 'M2' };
            let obj = new CoClass1();
    
            expect(obj.fun()).toBe('FUN');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/EL01143/);
        });
        it('- class 인터페이스 상속 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
            // 인터페이스
            class ISuper {
                arr = Array;
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
                Util.implements(CoClass1, this, ISub);
            }
            CoClass1.prototype.m1 = function() { return 'M1' };
            CoClass1.prototype.m2 = function() { return 'M2' };
            function CoClass2() {
                this.fun = function() { return 'FUN' };
                Util.implements(CoClass2, this, ISub); 
            }
            CoClass2.prototype.m1 = function() { return 'M1' };
            CoClass2.prototype.m2 = function() { return 'M2' };
            let obj = new CoClass1();
    
            expect(obj.fun()).toBe('FUN');
            expect(obj.m2()).toBe('M2');
            expect(()=> new CoClass2()).toThrow(/EL01143/);
        });
        it('- isImplementOf() : 예외 및 검사 ', () => {
            // 인터페이스
            class ISuper1 {
                arr = Array;
            }
            class ISuper2 {
                arr2 = Array;
            }
            // 클래스 정의
            function CoClass1() {
                this.arr = [];
                Util.implements(CoClass1, this, ISuper1);
            }
            let obj = new CoClass1();
    
            expect(obj.isImplementOf(ISuper1)).toBe(true);
            expect(obj.isImplementOf('ISuper1')).toBe(true);
            expect(obj.isImplementOf(ISuper2)).toBe(false);
            expect(obj.isImplementOf('ISuper2')).toBe(false);
            expect(() => obj.isImplementOf(-1)).toThrow('ES021');
        });
        
        it('- implements(any) : object 가 아닌 객체 ', () => {
            function CoClass1() {
                this.arr = [];
            }
            // const i = new CoClass1();
            
            expect(()=> Util.implements(1, CoClass1)).toThrow(/ES024/);
            expect(()=> Util.implements(function(){}, CoClass1)).toThrow(/ES024/);
            expect(()=> Util.implements('str', CoClass1)).toThrow(/ES024/);
            expect(()=> Util.implements(true, CoClass1)).toThrow(/ES024/);
        });
        it('- implements() : 예외 ', () => {
            function CoClass1() {
                this.arr = [];
                Util.implements(CoClass1, this, -1);
            }
    
            expect(()=> new CoClass1()).toThrow('ES021');
        });
        it('- implements() : 예외 ', () => {
            function CoClass1() {
                this.arr = [];
                Util.implements(CoClass1, this, null);
            }
    
            expect(()=> new CoClass1()).toThrow('ES021');
        });
        it('- implements() : 예외 ', () => {
            function CoClass1() {
                this.arr = [];
                Util.implements(null, null, null);
            }
    
            expect(()=> new CoClass1()).toThrow('ES024');
        });
    });
});