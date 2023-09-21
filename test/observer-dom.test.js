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
    it("- namespace : observer.js ", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');

        require('../src/observer');
        
        expect(global._L.Observer).toBeDefined();
        expect(global._L.Common.Observer).toBeDefined();
    });
});
