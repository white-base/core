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
    it("- namespace : util-type.js ", () => {
        require('../src/util-type');
        
        expect(global._L.Common.Util.getAllProperties).toBeDefined();
        expect(global._L.Common.Util.checkType).toBeDefined();
        expect(global._L.Common.Util.checkUnionType).toBeDefined();
        expect(global._L.Common.Util.validType).toBeDefined();
        expect(global._L.Common.Util.validUnionType).toBeDefined();
        expect(global._L.Common.Util.getTypeMap).toBeDefined();
    });
});

describe("< util.js >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : util.js ", () => {
        require('../src/util-type');
        require('../src/util');
        
        // util-type.js
        expect(global._L.Common.Util.getAllProperties).toBeDefined();
        expect(global._L.Common.Util.checkType).toBeDefined();
        expect(global._L.Common.Util.checkUnionType).toBeDefined();
        expect(global._L.Common.Util.validType).toBeDefined();
        expect(global._L.Common.Util.validUnionType).toBeDefined();
        expect(global._L.Common.Util.getTypeMap).toBeDefined();
        /// util.js
        expect(global._L.Common.Util.inherits).toBeDefined();
        expect(global._L.Common.Util.getArrayDepth).toBeDefined();
        expect(global._L.Common.Util.createGuid).toBeDefined();
        expect(global._L.Common.Util.implements).toBeDefined();
    });
    it("- 예외 : util-type.js 로딩이 인된경우", () => {
        expect(() => require('../src/util')).toThrow(/module load fail/);
    });
    it("- 예외 : util-type.js : getAllProperties 제거", () => {
        require('../src/util-type');
        delete global._L.Common.Util.getAllProperties;
        expect(() => require('../src/util')).toThrow(/getAllProperties/);
    });
    it("- 예외 : util-type.js : checkType 제거", () => {
        require('../src/util-type');
        delete global._L.Common.Util.checkType;
        expect(() => require('../src/util')).toThrow(/checkType/);
    });
    it("- 예외 : util-type.js : checkUnionType 제거", () => {
        require('../src/util-type');
        delete global._L.Common.Util.checkUnionType;
        expect(() => require('../src/util')).toThrow(/checkUnionType/);
    });
    it("- 예외 : util-type.js : validType 제거", () => {
        require('../src/util-type');
        delete global._L.Common.Util.validType;
        expect(() => require('../src/util')).toThrow(/validType/);
    });
    it("- 예외 : util-type.js : validUnionType 제거", () => {
        require('../src/util-type');
        delete global._L.Common.Util.validUnionType;
        expect(() => require('../src/util')).toThrow(/validUnionType/);
    });
});