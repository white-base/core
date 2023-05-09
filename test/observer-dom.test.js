/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test
describe("< Util.type >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : observer.js ", () => {
        require('../src/observer');
        
        expect(global._L.Observer).toBeDefined();
        expect(global._L.Common.Observer).toBeDefined();
    });
});
