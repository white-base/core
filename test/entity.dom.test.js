/**
 * @jest-environment jsdom
 */
//==============================================================
// gobal defined
'use strict';

//==============================================================
// test

describe.skip("load: meta-entity.js <MetaEntity>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        require('../src/message');

        expect(() => require('../src/meta-entity')).toThrow(/ES011/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        require('../src/message');

        expect(() => require('../src/meta-entity')).toThrow(/Util/);
    });
    it("- 예외 : IGroupControl 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type'); 
        require('../src/util');
        
        require('../src/i-object');
        require('../src/i-marshal');

        require('../src/observer');
        require('../src/custom-error');
        
        // require('../src/i-control-all');

        expect(() => require('../src/meta-entity')).toThrow(/IGroupControl/);
    });
    it("- 예외 : IAllControl 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');

        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');

        require('../src/observer');
        require('../src/custom-error');

        expect(() => require('../src/meta-entity')).toThrow(/IAllControl/);
    });
    it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/meta-object');

        expect(() => require('../src/meta-entity')).toThrow(/MetaElement/);
    });
    it("- 예외 : MetaRowCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/meta-object');
        require('../src/meta-element');
        
        expect(() => require('../src/meta-entity')).toThrow(/MetaRowCollection/);
    });
    it("- 예외 : MetaRow 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');

        global._L.MetaRow = undefined;
        global._L.Meta.Entity.MetaRow = undefined;

        expect(() => require('../src/meta-entity')).toThrow(/MetaRow/);
    });
    it("- 예외 : MetaColumnCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        global._L.MetaColumnCollection = undefined;
        global._L.Meta.Entity.MetaColumnCollection = undefined;

        expect(() => require('../src/meta-entity')).toThrow(/MetaColumnCollection/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');

        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-list');
        require('../src/i-control-list');

        require('../src/i-element');
        require('../src/i-control-group');
        require('../src/i-control-schema');
        require('../src/i-control-export');
        require('../src/i-control-import');
        require('../src/i-serialize');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');

        require('../src/observer');
        require('../src/namespace-manager');
        require('../src/meta-registry');        
        require('../src/meta-object');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/trans-queue');
        require('../src/collection-transaction');
        require('../src/collection-property');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');

        require('../src/meta-entity');

        expect(global._L.MetaEntity).toBeDefined();
        expect(global._L.Meta.Entity.MetaEntity).toBeDefined();
    });
    
});
describe.skip("load: meta-table.js <MetaTable, MetaTableCollection>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        require('../src/message');

        expect(() => require('../src/meta-table')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        require('../src/message');
        
        expect(() => require('../src/meta-table')).toThrow(/Util/);
    });
    it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');

        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');

        require('../src/observer');
        require('../src/custom-error');
        require('../src/collection-base');
        require('../src/collection-array');

        expect(() => require('../src/meta-table')).toThrow(/PropertyCollection/);
    });
    it("- 예외 : MetaEntity 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');

        expect(() => require('../src/meta-table')).toThrow(/MetaEntity/);
    });
    it("- 예외 : MetaTableColumnCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        global._L.MetaTableColumnCollection = undefined;
        global._L.Meta.Entity.MetaTableColumnCollection = undefined;

        expect(() => require('../src/meta-table')).toThrow(/MetaTableColumnCollection/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-table');

        expect(global._L.MetaTable).toBeDefined();
        expect(global._L.Meta.Entity.MetaTable).toBeDefined();
    });
});
describe.skip("load: meta-view.js <MetaView, MetaViewCollection>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        require('../src/message');

        expect(() => require('../src/meta-view')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        require('../src/message');

        expect(() => require('../src/meta-view')).toThrow(/Util/);
    });
    it("- 예외 : PropertyCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');

        expect(() => require('../src/meta-view')).toThrow(/PropertyCollection/);
    });
    it("- 예외 : MetaObject 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');

        expect(() => require('../src/meta-view')).toThrow(/MetaObject/);
    });
    it("- 예외 : MetaEntity 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');

        expect(() => require('../src/meta-view')).toThrow(/MetaEntity/);
    });
    it("- 예외 : MetaViewColumnCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        global._L.MetaViewColumnCollection = undefined;
        global._L.Meta.Entity.MetaViewColumnCollection = undefined;

        expect(() => require('../src/meta-view')).toThrow(/MetaViewColumnCollection/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // require('../src/i-control-all');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-view');

        expect(global._L.MetaView).toBeDefined();
        expect(global._L.Meta.Entity.MetaView).toBeDefined();
    });
});
describe.skip("load: meta-set.js <MetaSet>", () => {
    beforeEach(() => {
        jest.resetModules();
        global._L = null;
        });
    it("- 예외 : 전체 로딩 안할 때", () => {
        require('../src/message');
        
        expect(() => require('../src/meta-set')).toThrow(/module load/);
    });
    it("- 예외 : Util 로딩이 안 된 경우", () => {
        require('../src/message');
        
        expect(() => require('../src/meta-set')).toThrow(/Util/);
    });
    it("- 예외 : ISchemaControl 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-import');
        require('../src/i-control-export');

        expect(() => require('../src/meta-set')).toThrow(/ISchemaControl/);
    });
    it("- 예외 : IAllControl 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');

        expect(() => require('../src/meta-set')).toThrow(/IAllControl/);
    });
    it("- 예외 : ITransaction 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        // require('../src/i-control-all');

        expect(() => require('../src/meta-set')).toThrow(/ITransaction/);
    });

    it("- 예외 : MetaElement 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        // require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/meta-object');

        expect(() => require('../src/meta-set')).toThrow(/MetaElement/);
    });
    it("- 예외 : MetaEntity 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        // require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        require('../src/meta-object');
        require('../src/meta-element');

        expect(() => require('../src/meta-set')).toThrow(/MetaEntity/);
    });
    it("- 예외 : MetaTableCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-view');

        expect(() => require('../src/meta-set')).toThrow(/MetaTableCollection/);
    });
    it("- 예외 : MetaViewCollection 로딩이 안 된 경우", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
        require('../src/meta-element');
        require('../src/meta-row');
        require('../src/meta-column');
        require('../src/meta-entity');
        require('../src/meta-table');

        expect(() => require('../src/meta-set')).toThrow(/MetaViewCollection/);
    });
    it("- 로딩 성공 ", () => {
        require('../src/message');
        require('../src/util-type');
        require('../src/util');
        require('../src/observer');
        require('../src/custom-error');
        require('../src/i-object');
        require('../src/i-marshal');
        require('../src/i-control-group');
        // require('../src/i-control-all');
        require('../src/i-control-import');
        require('../src/i-control-export');
        require('../src/i-control-schema');
        require('../src/i-transaction');
        // require('../src/i-control-part');
        // require('../src/i-control-lookup');
        // require('../src/i-collection-base');
        require('../src/i-collection');
        require('../src/i-collection-property');
        require('../src/i-collection-array');
        require('../src/collection-base');
        require('../src/collection-array');
        require('../src/collection-property');
        require('../src/meta-object');
        require('../src/trans-queue');
        require('../src/collection-trans');
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


