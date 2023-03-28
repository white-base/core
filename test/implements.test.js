/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const nothing   = require('../src/object-implement'); // Object._implements() : 폴리필
const util      = require('../src/utils');

//==============================================================
// test
describe('this._implements(interface)', () => {
    beforeAll(() => {
    });
    // it('- this형 인터페이스 선언 ', () => {
    //     function ISuper() {
    //         this.m1 = function() { return 'I1'; };
    //     }
    //     const i = new ISuper();
        
    //     expect(i.m1()).toBe('I1');
    // });
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
            this.m1 = function() {  };
        }
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
    
    /**
     * 테스트 항목
     *  - 다중 인터페이스 
     *      - 중복된 인터페이스 명칭은 ? 각각 검사함 타입이 다를 경우 오류 : any 만 유효할듯
     *  - 인터페이스 상속 인터페이스
     *      - 상속한 인터페이스를 구현한 경우 검사 : extends, inherits()
     *  - 인터페이스 구현 인터페이스
     */

});