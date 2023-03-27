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
    it('- 인터페이스 선언 ', () => {
        function ISuper() {
            this.m1 = function() { return 'I1'; };
        }
        const i = new ISuper();
        
        expect(i.m1()).toBe('I1');
    });
    it('- 인터페이스 선언 :: this 형태 ', () => {
        function ISuper() {
            this.m1 = function() { return 'I1'; };
        }
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        const c = new CoClass();

        // expect(i.m1()).toBe('I1');
    });

    it('- 인터페이스 선언 <- 클래스 구현 ', () => {
        function ISuper() {}
        ISuper.prototype.m1 = function() { return 'I1'; };
        function CoClass() {
            this._implements(ISuper);    /** @implements */
        }
        // CoClass.prototype.m1 = function() { return 'C1'; }
        const c = new CoClass();
        
        // expect(c.m1()).toBe('C1');
        // expect(c._interface.length).toBe(1);
        // expect(c.isImplementOf(ISuper)).toBe(true);
    });
    // it('- 인터페이스 선언 <- 클래스 구현 : 예외 ', () => {
    //     function ISuper() {}
    //     ISuper.prototype.m1 = function() { return 'I1'; };
    //     function CoClass() {
    //         this._implements(ISuper);      /** @implements */
    //     }
    //     const c = new CoClass();
        
    // });
});