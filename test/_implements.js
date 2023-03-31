/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const none      = require('../src/_object-implement'); // Object._implements() : 폴리필
const Util     = require('../src/Util');

//==============================================================
// test
describe('this._implements(interface)', () => {
    beforeAll(() => {
    });
    it('- this 인터페이스 선언 : 예외 (인터페이스 미구현)', () => {
        function ISuper() {
            this.m1 = function() {};
        }
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }

        expect(() => new CoClass()).toThrow(/대상 없음/);
    });
    it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
        function ISuper() {}
        ISuper.prototype.m1 = function() {};
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        
        expect(() => new CoClass()).toThrow(/대상 없음/);
    });

    it('- class 인터페이스 선언 : 예외 (인터페이스 미구현)', () => {
        class ISuper {
            m1 = function() {};
        }
        class CoClass {
            constructor() {
                this._implements(ISuper);    /** @implements */
            }
        }

        expect(() => new CoClass()).toThrow(/대상 없음/);
    });
    it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
        function ISuper() {}
        ISuper.prototype.m1 = function() {};
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        
        expect(() => new CoClass()).toThrow(/대상 없음/);
    });

    it('- this 인터페이스 선언 <-- 구현', () => {
        function ISuper() {
            this.m1 = function() { };
        }
        ISuper.prototype.m1 = function() { return 'C1' }
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        CoClass.prototype.m1 = function() { return 'C1' }
        const i = new CoClass();

        expect(i.m1()).toBe('C1');
        expect(i._interface.length).toBe(1);
        expect(i.isImplementOf(ISuper)).toBe(true);
    });
    it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = 인스턴스) ', () => {
        function ISuper() {
            this.obj = function AClass() {};    // 클래스 역활
        }
        function CoClass() {
            this.obj = /err/;    // 객체(Regex)
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass()).toThrow(/AClass/);
    });
    it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = function) ', () => {
        function ISuper() {
            this.obj = function AClass() {};    // 클래스 역활
        }
        function CoClass() {
            this.obj = 'err'
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass()).toThrow(/function/);
    });
    it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = array) ', () => {
        function ISuper() {
            this.arr = [];
        }
        function CoClass() {
            this.arr = 'err';
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass()).toThrow(/array/);
    });
    it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = string) ', () => {
        function ISuper() {
            this.str = '';
        }
        function CoClass() {
            this.str = 1;
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass()).toThrow(/string/);
    });
    it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = number) ', () => {
        function ISuper() {
            this.num = 0;
        }
        function CoClass() {
            this.num = 'err';
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass()).toThrow(/number/);
    });
    it('- this 인터페이스 선언 <-- 구현 : 예외 (타입 = boolean) ', () => {
        function ISuper() {
            this.bool   = true;
        }
        function CoClass() {
            this.bool   = 'err';
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass()).toThrow(/boolean/);
    });

    it('- this 인터페이스 선언 <-- 구현 : 예외 (하위 타입) ', () => {
        function ISuper() {
            this.sub = {
                fun: function() {},
                arr: [],
                str: '',
                num: 1,
                bool: false,
                any: null,
            };
        }
        ISuper.prototype.m1 = function() {};
        // 구현 예외 종류
        function CoClass1() {
            this.sub = {
                fun: function() {},
                arr: [],
                str: '',
                num: 1,
                bool: 'err',
                any: 1,
                add: {}     // 확장 속성
            };
            this.add = 1;   // 확장 속성
            this._implements(ISuper);    /** @implements */
        }
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
            this._implements(ISuper);    /** @implements */
        }

        expect(()=> new CoClass1()).toThrow(/boolean/);
        expect(()=> new CoClass2()).toThrow(/function/);
    });
    
    it('- this 인터페이스 선언 <-- 구현 : 예외 (복합 타입) ', () => {
        function AClass() {};
        function ISuper() {
            this.fun = function() {};
            this.obj = AClass;
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
        }
        ISuper.prototype.m1 = function() {};    // 예외
        // 구현
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
            this._implements(ISuper);    /** @implements */
        }
        
        expect(()=> new CoClass()).toThrow(/m1/);
    });
    
    it('- class 다중 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
        class ISuper1 {
            fun = function() {};
            m1() {};
        }
        class ISuper2 {
            arr = [];
            m2() {};
        }
        class CoClass1 {
            fun = function() {};
            arr = [];
            constructor() { this._implements(ISuper1, ISuper2); }
            m1() { return 'M1' };
            m2() { return 'M2' };
        }
        class CoClass2 {
            fun = function() {};
            constructor() { this._implements(ISuper1, ISuper2); }
            m1() { return 'M1' };
            m2() { return 'M2' };
        }
        let obj = new CoClass1();

        expect(obj.m1()).toBe('M1');
        expect(()=> new CoClass2()).toThrow(/arr/);
    });
    
    it('- class 인터페이스 구현 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
        class ISuper {
            arr = [];
            m1() {};
        }
        class ISub {
            arr = [];           // 재정의
            fun = function() {};
            constructor() { this._implements(ISuper); }
            m1() {};            // 재정의
            m2() {};
        }
        class CoClass1 {
            arr = [];
            fun = function() { return 'FUN' };
            constructor() { this._implements(ISub); }
            m1() { return 'M1' };
            m2() { return 'M2' };
        }
        class CoClass2 {
            fun = function() {};
            constructor() { this._implements(ISub); }
            m1() { return 'M1' };
            m2() { return 'M2' };
        }
        let obj = new CoClass1();

        expect(obj.m1()).toBe('M1');
        expect(obj.m2()).toBe('M2');
        expect(()=> new CoClass2()).toThrow(/arr/);
    });
    it('- function 인터페이스 구현 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
        function ISuper() {
            this.arr = [];
        }
        ISuper.prototype.m1 = function() {};
        function ISub() {
            this.arr = [];                  // 재정의
            this.fun = function() {};
            this._implements(ISuper);
        }
        ISub.prototype.m1 = function() {};  // 재정의
        ISub.prototype.m2 = function() {};
        function CoClass1() {   // 정상 작동
            this.fun = function() { return 'FUN' };
            this.arr = [];
            this._implements(ISub);
        }
        CoClass1.prototype.m1 = function() { return 'M1' };
        CoClass1.prototype.m2 = function() { return 'M2' };
        function CoClass2() {
            this.fun = function() { return 'FUN' };
            this._implements(ISub); 
        }
        CoClass2.prototype.m1 = function() { return 'M1' };
        CoClass2.prototype.m2 = function() { return 'M2' };
        let obj = new CoClass1();

        expect(obj.fun()).toBe('FUN');
        expect(obj.m2()).toBe('M2');
        expect(()=> new CoClass2()).toThrow(/arr/);
    });

    it('- function 인터페이스 상속 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
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
            this._implements(ISub);
        }
        CoClass1.prototype.m1 = function() { return 'M1' };
        CoClass1.prototype.m2 = function() { return 'M2' };
        function CoClass2() {
            this.fun = function() { return 'FUN' };
            this._implements(ISub); 
        }
        CoClass2.prototype.m1 = function() { return 'M1' };
        CoClass2.prototype.m2 = function() { return 'M2' };
        let obj = new CoClass1();

        expect(obj.fun()).toBe('FUN');
        expect(obj.m2()).toBe('M2');
        expect(()=> new CoClass2()).toThrow(/arr/);
    });
    it('- class 인터페이스 상속 인터페이스 선언 <-- 구현 : 예외 및 구현 ', () => {
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
            this._implements(ISub);
        }
        CoClass1.prototype.m1 = function() { return 'M1' };
        CoClass1.prototype.m2 = function() { return 'M2' };
        function CoClass2() {
            this.fun = function() { return 'FUN' };
            this._implements(ISub); 
        }
        CoClass2.prototype.m1 = function() { return 'M1' };
        CoClass2.prototype.m2 = function() { return 'M2' };
        let obj = new CoClass1();

        expect(obj.fun()).toBe('FUN');
        expect(obj.m2()).toBe('M2');
        expect(()=> new CoClass2()).toThrow(/arr/);
    });
    
    /**
     * 테스트 항목
     *  - 다중 인터페이스 
     *      + 중복된 인터페이스 명칭은 ? 각각 검사함 타입이 다를 경우 오류 : any 만 유효할듯
     *  - 인터페이스 상속 인터페이스
     *      + 상속한 인터페이스를 구현한 경우 검사 : extends, inherits()
     *  - 인터페이스 구현 인터페이스
     *  - 예외 조건
     *      + cover 참조
     */


});