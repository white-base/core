/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test

describe("load: meta-entity.js <MetaEntity>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        expect(() => require('../src/meta-entity')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        expect(() => require('../src/meta-entity')).toThrow(/Util.*load/);
    });
    it("- 예외 : IGroupControl 로딩이 안 된 경우", () => {
        require('../src/util-type'); 
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-all');

        expect(() => require('../src/meta-entity')).toThrow(/IGroupControl.*load/);
    });
    it("- 예외 : IAllControl 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');

        expect(() => require('../src/meta-entity')).toThrow(/IAllControl.*load/);
    });
    it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/meta-object');

        expect(() => require('../src/meta-entity')).toThrow(/MetaElement.*load/);
    });
    it("- 예외 : MetaRowCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        
        expect(() => require('../src/meta-entity')).toThrow(/MetaRowCollection.*load/);
    });
    it("- 예외 : MetaRow 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');

        global._L.MetaRow = undefined;
        global._L.Meta.Entity.MetaRow = undefined;

        expect(() => require('../src/meta-entity')).toThrow(/MetaRow.*load/);
    });
    it("- 예외 : MetaColumnCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        global._L.MetaColumnCollection = undefined;
        global._L.Meta.Entity.MetaColumnCollection = undefined;

        expect(() => require('../src/meta-entity')).toThrow(/MetaColumnCollection.*load/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');

        expect(global._L.MetaEntity).toBeDefined();
        expect(global._L.Meta.Entity.MetaEntity).toBeDefined();
    });
    
});
describe("load: meta-table.js <MetaTable, MetaTableCollection>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        expect(() => require('../src/meta-table')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        expect(() => require('../src/meta-table')).toThrow(/Util.*load/);
    });
    it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');

        expect(() => require('../src/meta-table')).toThrow(/PropertyCollection.*load/);
    });
    it("- 예외 : MetaEntity 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');

        expect(() => require('../src/meta-table')).toThrow(/MetaEntity.*load/);
    });
    it("- 예외 : MetaTableColumnCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        global._L.MetaTableColumnCollection = undefined;
        global._L.Meta.Entity.MetaTableColumnCollection = undefined;

        expect(() => require('../src/meta-table')).toThrow(/MetaTableColumnCollection.*load/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-table');

        expect(global._L.MetaTable).toBeDefined();
        expect(global._L.Meta.Entity.MetaTable).toBeDefined();
    });
});
describe("load: meta-view.js <MetaView, MetaViewCollection>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        expect(() => require('../src/meta-view')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        expect(() => require('../src/meta-view')).toThrow(/Util.*load/);
    });
    it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');

        expect(() => require('../src/meta-view')).toThrow(/PropertyCollection.*load/);
    });
    it("- 예외 : MetaObject 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');

        expect(() => require('../src/meta-view')).toThrow(/MetaObject.*load/);
    });
    it("- 예외 : MetaEntity 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');

        expect(() => require('../src/meta-view')).toThrow(/MetaEntity.*load/);
    });
    it("- 예외 : MetaViewColumnCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        global._L.MetaViewColumnCollection = undefined;
        global._L.Meta.Entity.MetaViewColumnCollection = undefined;

        expect(() => require('../src/meta-view')).toThrow(/MetaViewColumnCollection.*load/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-view');

        expect(global._L.MetaView).toBeDefined();
        expect(global._L.Meta.Entity.MetaView).toBeDefined();
    });
});
describe("load: meta-set.js <MetaSet>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        expect(() => require('../src/meta-set')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        expect(() => require('../src/meta-set')).toThrow(/Util.*load/);
    });
    it("- 예외 : ISchemaControl 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-import');
        require('../src/i-control-export');

        expect(() => require('../src/meta-set')).toThrow(/ISchemaControl.*load/);
    });
    it("- 예외 : IAllControl 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');

        expect(() => require('../src/meta-set')).toThrow(/IAllControl.*load/);
    });
    it("- 예외 : ITransaction 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-control-all');

        expect(() => require('../src/meta-set')).toThrow(/ITransaction.*load/);
    });

    it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/meta-object');

        expect(() => require('../src/meta-set')).toThrow(/MetaElement.*load/);
    });
    it("- 예외 : MetaEntity 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/meta-object');
        require('../src/meta-element');

        expect(() => require('../src/meta-set')).toThrow(/MetaEntity.*load/);
    });
    it("- 예외 : MetaTableCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-view');

        expect(() => require('../src/meta-set')).toThrow(/MetaTableCollection.*load/);
    });
    it("- 예외 : MetaViewCollection 로딩이 안 된 경우", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-table');

        expect(() => require('../src/meta-set')).toThrow(/MetaViewCollection.*load/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/error-custom');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/i-control-part');
        require('../src/i-control-lookup');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-table');
        require('../src/meta-view');
        require('../src/meta-set');

        expect(global._L.MetaSet).toBeDefined();  
        expect(global._L.Meta.Entity.MetaSet).toBeDefined();
    });
});


