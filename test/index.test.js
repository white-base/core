/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const index   = require('../');

//==============================================================
// test
describe("[target: index.js]", () => {
    describe('Observer, CustomError, Util', () => {
        it('- _L.*  ', () => {
            expect(typeof index.Observer).toBe('function');
            expect(typeof index.CustomError).toBe('function');
            expect(typeof index.Util.inherits).toBe('function');
            expect(typeof index.Util.getArrayDepth).toBe('function');
            expect(typeof index.Util.createGuid).toBe('function');
            expect(typeof index.Util.checkType).toBe('function');
            expect(typeof index.Util.checkUnionType).toBe('function');
            expect(typeof index.Util.validType).toBe('function');
            expect(typeof index.Util.validUnionType).toBe('function');
            // expect(typeof index.Util.validSelector).toBe('function');
            expect(typeof index.Util.getAllProperties).toBe('function');
            expect(typeof index.Util.implements).toBe('function');
        });
        it('- _L.Common.* ', () => { 
            // namespace
            expect(typeof index.Common).toBe('object');
            expect(typeof index.Common.Observer).toBe('function');
            expect(typeof index.Common.CustomError).toBe('function');
            expect(typeof index.Common.Util.inherits).toBe('function');
            expect(typeof index.Common.Util.getArrayDepth).toBe('function');
            expect(typeof index.Common.Util.createGuid).toBe('function');
            expect(typeof index.Common.Util.checkType).toBe('function');
            expect(typeof index.Common.Util.checkUnionType).toBe('function');
            expect(typeof index.Common.Util.validType).toBe('function');
            expect(typeof index.Common.Util.validUnionType).toBe('function');
            // expect(typeof index.Common.Util.validSelector).toBe('function');
            expect(typeof index.Common.Util.getAllProperties).toBe('function');
            expect(typeof index.Common.Util.implements).toBe('function');
        });
    });
    describe(`IObject, IMarshal, 
    ICollection, IPropertyCollection,
    IAllControl, IGroupControl, ILookupControl, IPartControl,
    IExportControl, IImportControl`, () => {
        it('- _L.* ', () => {
            expect(typeof index.IObject).toBe('function');
            expect(typeof index.IMarshal).toBe('function');
            expect(typeof index.ICollection).toBe('function');
            // expect(typeof index.IControlCollection).toBe('function');
            expect(typeof index.IPropertyCollection).toBe('function');
            expect(typeof index.IAllControl).toBe('function');
            expect(typeof index.IExportControl).toBe('function');
            expect(typeof index.IGroupControl).toBe('function');
            expect(typeof index.IImportControl).toBe('function');
            expect(typeof index.ILookupControl).toBe('function');
            expect(typeof index.IPartControl).toBe('function');
        });
        it('- _L.Interface.* ', () => { 
            // namespace
            expect(typeof index.Interface).toBe('object');
            expect(typeof index.Interface.IObject).toBe('function');
            expect(typeof index.Interface.IMarshal).toBe('function');
            expect(typeof index.Interface.ICollection).toBe('function');
            // expect(typeof index.Interface.IControlCollection).toBe('function');
            expect(typeof index.Interface.IPropertyCollection).toBe('function');
            expect(typeof index.Interface.IAllControl).toBe('function');
            expect(typeof index.Interface.IExportControl).toBe('function');
            expect(typeof index.Interface.IGroupControl).toBe('function');
            expect(typeof index.Interface.IImportControl).toBe('function');
            expect(typeof index.Interface.ILookupControl).toBe('function');
            expect(typeof index.Interface.IPartControl).toBe('function');
    
        });
    });
    describe('BaseCollection, ArrayCollection, PropertyCollection', () => {
        it('- _L.* ', () => {
            expect(typeof index.BaseCollection).toBe('function');
            expect(typeof index.ArrayCollection).toBe('function');
            expect(typeof index.PropertyCollection).toBe('function');
        });
        
        it('- _L.Collection.* ', () => {
            // namespace
            expect(typeof index.Collection).toBe('object');
            expect(typeof index.Collection.BaseCollection).toBe('function');
            expect(typeof index.Collection.ArrayCollection).toBe('function');
            expect(typeof index.Collection.PropertyCollection).toBe('function');
        });
    });
    describe('MetaObject, MetaElement', () => {
        it('- _L.* ', () => {
            expect(typeof index.MetaObject).toBe('function');
            expect(typeof index.MetaElement).toBe('function');
            // expect(typeof index.ComplexElement).toBe('function');
            // namespace
        });
            
        it('- _L.Meta.* ', () => {
            expect(typeof index.Meta).toBe('object');
            expect(typeof index.Meta.MetaObject).toBe('function');
            expect(typeof index.Meta.MetaElement).toBe('function');
            // expect(typeof index.Meta.ComplexElement).toBe('function');
        });
    });
    describe(`MetaEntity, 
    MetaView, MetaViewCollection, 
    MetaTable, MetaTableCollection,
    MetaColumn, MetaColumnCollection, MetaViewColumnCollection, MetaTableColumnCollection,
    MetaRow, MetaRowCollection`, () => {
        it('- _L.* ', () => {
            expect(typeof index.MetaEntity).toBe('function');
            expect(typeof index.MetaView).toBe('function');
            expect(typeof index.MetaViewCollection).toBe('function');
            expect(typeof index.MetaTable).toBe('function');
            expect(typeof index.MetaTableCollection).toBe('function');
            expect(typeof index.MetaColumn).toBe('function');
            expect(typeof index.MetaColumnCollection).toBe('function');
            expect(typeof index.MetaViewColumnCollection).toBe('function');
            expect(typeof index.MetaTableColumnCollection).toBe('function');
            expect(typeof index.MetaRow).toBe('function');
            expect(typeof index.MetaRowCollection).toBe('function');
            // namespace
        });
        it('- _L.Meta.Entity.* ', () => {
            expect(typeof index.Meta.Entity).toBe('object');
            expect(typeof index.Meta.Entity.MetaEntity).toBe('function');
            expect(typeof index.Meta.Entity.MetaView).toBe('function');
            expect(typeof index.Meta.Entity.MetaViewCollection).toBe('function');
            expect(typeof index.Meta.Entity.MetaTable).toBe('function');
            expect(typeof index.Meta.Entity.MetaTableCollection).toBe('function');
            expect(typeof index.Meta.Entity.MetaColumn).toBe('function');
            expect(typeof index.Meta.Entity.MetaColumnCollection).toBe('function');
            expect(typeof index.Meta.Entity.MetaViewColumnCollection).toBe('function');
            expect(typeof index.Meta.Entity.MetaTableColumnCollection).toBe('function');
            expect(typeof index.Meta.Entity.MetaRow).toBe('function');
            expect(typeof index.Meta.Entity.MetaRowCollection).toBe('function');
        });
    });
});

