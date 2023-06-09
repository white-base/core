/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

// const { TextEncoder, TextDecoder } = require('util');
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
// const { JSDOM } = require('jsdom');

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
});

describe("< IObject >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IObject ", () => {
        require('../src/i-object');
        
        expect(global._L.IObject).toBeDefined();
        expect(global._L.Interface.IObject).toBeDefined();
    });
});

describe("< IMarshal >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IMarshal ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-object');
        require('../src/i-marshal');
        
        expect(global._L.IMarshal).toBeDefined();
        expect(global._L.Interface.IMarshal).toBeDefined();
    });
    it("- 예외 : Util 로딩이 인된경우", () => {
        expect(() => require('../src/i-marshal')).toThrow(/Util/);
    });
    it("- 예외 : IObject 로딩이 인된경우", () => {
        require('../src/util-type');
        require('../src/util');
        expect(() => require('../src/i-marshal')).toThrow(/IObject/);
    });
});
describe("< IPartControl >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IPartControl ", () => {
        require('../src/i-control-part');
        
        expect(global._L.IPartControl).toBeDefined();
        expect(global._L.Interface.IPartControl).toBeDefined();
    });
});
describe("< ILookupControl >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : ILookupControl ", () => {
        require('../src/i-control-lookup');
        
        expect(global._L.ILookupControl).toBeDefined();
        expect(global._L.Interface.ILookupControl).toBeDefined();
    });
});
describe("< IImportControl >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IImportControl ", () => {
        require('../src/i-control-import');
        
        expect(global._L.IImportControl).toBeDefined();
        expect(global._L.Interface.IImportControl).toBeDefined();
    });
});
describe("< IGroupControl >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IGroupControl ", () => {
        require('../src/i-control-group');
        
        expect(global._L.IGroupControl).toBeDefined();
        expect(global._L.Interface.IGroupControl).toBeDefined();
    });
});
describe("< IExportControl >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IExportControl ", () => {
        require('../src/i-control-export');
        
        expect(global._L.IExportControl).toBeDefined();
        expect(global._L.Interface.IExportControl).toBeDefined();
    });
});
describe("< IAllControl >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IAllControl ", () => {
        require('../src/i-control-all');
        
        expect(global._L.IAllControl).toBeDefined();
        expect(global._L.Interface.IAllControl).toBeDefined();
    });
});
describe("< ICollection >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : ICollection ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-lookup');
        require('../src/i-control-part');
        require('../src/i-collection');

        expect(global._L.ICollection).toBeDefined();
        expect(global._L.Interface.ICollection).toBeDefined();
    });
    it("- 예외 : IPartControl 로딩이 인된경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-lookup');
        expect(() => require('../src/i-collection')).toThrow(/IPartControl/);
    });
    it("- 예외 : ILookupControl 로딩이 인된경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-part');
        expect(() => require('../src/i-collection')).toThrow(/ILookupControl/);
    });
    it("- 예외 : Util 로딩이 인된경우", () => {
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        expect(() => require('../src/i-collection')).toThrow(/Util/);
    });
    it("- 예외 : 모두 로딩이 인된경우", () => {
        expect(() => require('../src/i-collection')).toThrow(/module load/);
    });
});

describe("< IPropertyCollection >", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
     });
    it("- namespace : IPropertyCollection ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-lookup');
        require('../src/i-control-part');
        require('../src/i-collection');
        require('../src/i-collection-property');

        expect(global._L.IPropertyCollection).toBeDefined();
        expect(global._L.Interface.IPropertyCollection).toBeDefined();
    });
    it("- 예외 : ICollection 로딩이 인된경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-lookup');
        require('../src/i-control-part');

        expect(() => require('../src/i-collection-property')).toThrow(/ICollection/);
    });
    it("- 예외 : 모두 로딩이 인된경우", () => {
        expect(() => require('../src/i-collection-property')).toThrow(/module load/);
    });
});
