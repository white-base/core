/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("load: observer.js <Observer>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    //  it("- 예외 : 전체 로딩 안할 때", () => {
    //     require('../src/message');

    //     expect(() => require('../src/meta-entity')).toThrow(/ES011/);
    // });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        require('../src/message');

        expect(() => require('../src/observer')).toThrow(/Util/);
    });
    it("- namespace : observer.js ", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');

        require('../src/observer');
        
        expect(global._L.Observer).toBeDefined();
        expect(global._L.Common.Observer).toBeDefined();
    });
});
