/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const nothing   = require('../src/object-implement'); // _implements() : 폴리필
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
            this.m1 = function() { throw new Error('구현해야함') };
        }
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }

        expect(() => new CoClass()).toThrow(/대상 없음/);
    });
    it('- prototype 인터페이스 선언 : 예외 (인터페이스 미구현) ', () => {
        function ISuper() {}
        ISuper.prototype.m1 = function() {throw new Error('구현해야함')  };
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        
        expect(() => new CoClass()).toThrow(/대상 없음/);
    });
    it('- this 인터페이스 선언 <-- function 클래스 구현', () => {
        function ISuper() {
            this.m1 = function() { throw new Error('구현해야함')  };
        }
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        CoClass.prototype.m1 = function() { return 'C1'; }
        const i = new CoClass();

        expect(i.m1()).toBe('C1');
        expect(i._interface.length).toBe(1);
        expect(i.isImplementOf(ISuper)).toBe(true);
    });
    // it('- this 인터페이스 선언 <-- function 클래스 구현 : 타입검사', () => {
    //     function ISuper() {
    //         this.m1 = function() { throw new Error('구현해야함')  };
    //     }
    //     CoClass.prototype.m1 = function() { return 'C1'; }
    //     function CoClass() {
    //         this._implements(ISuper);    /** @implements */
    //     }
    //     const i = new CoClass();

    //     expect(i.m1()).toBe('C1');
    //     expect(i._interface.length).toBe(1);
    //     expect(i.isImplementOf(ISuper)).toBe(true);
    // });
});