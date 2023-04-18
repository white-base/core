/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const index   = require('../');

//==============================================================
// test
describe('index 타입 검사', () => {
    beforeAll(() => {
    });
    it('- _L.Common.* ', () => {
        expect(typeof index.Observer).toBe('function');
        expect(typeof index.CustomError).toBe('function');
        expect(typeof index.Util.inherits).toBe('function');
        expect(typeof index.Util.getArrayDepth).toBe('function');
        expect(typeof index.Util.createGUID).toBe('function');
        expect(typeof index.Util.checkType).toBe('function');
        expect(typeof index.Util.checkUnionType).toBe('function');
        expect(typeof index.Util.validType).toBe('function');
        expect(typeof index.Util.validUnionType).toBe('function');
        // expect(typeof index.Util.validSelector).toBe('function');
        expect(typeof index.Util.getAllProperties).toBe('function');
        expect(typeof index.Util.implements).toBe('function');
        // namespace
        expect(typeof index.Common).toBe('object');
        expect(typeof index.Common.Observer).toBe('function');
        expect(typeof index.Common.CustomError).toBe('function');
        expect(typeof index.Common.Util.inherits).toBe('function');
        expect(typeof index.Common.Util.getArrayDepth).toBe('function');
        expect(typeof index.Common.Util.createGUID).toBe('function');
        expect(typeof index.Common.Util.checkType).toBe('function');
        expect(typeof index.Common.Util.checkUnionType).toBe('function');
        expect(typeof index.Common.Util.validType).toBe('function');
        expect(typeof index.Common.Util.validUnionType).toBe('function');
        // expect(typeof index.Common.Util.validSelector).toBe('function');
        expect(typeof index.Common.Util.getAllProperties).toBe('function');
        expect(typeof index.Common.Util.implements).toBe('function');
    });
    it('- _L.Collection.* ', () => {
        expect(typeof index.BaseCollection).toBe('function');
        expect(typeof index.ArrayCollection).toBe('function');
        expect(typeof index.PropertyCollection).toBe('function');
        // namespace
        expect(typeof index.Collection).toBe('object');
        expect(typeof index.Collection.BaseCollection).toBe('function');
        expect(typeof index.Collection.ArrayCollection).toBe('function');
        expect(typeof index.Collection.PropertyCollection).toBe('function');
    });
    it('- _L.Meta.* ', () => {
        expect(typeof index.MetaObject).toBe('function');
        expect(typeof index.MetaElement).toBe('function');
        expect(typeof index.ComplexElement).toBe('function');
        // namespace
        expect(typeof index.Meta).toBe('object');
        expect(typeof index.Meta.MetaObject).toBe('function');
        expect(typeof index.Meta.MetaElement).toBe('function');
        expect(typeof index.Meta.ComplexElement).toBe('function');
    });
    it('- _L.Meta.Entity.* ', () => {
        expect(typeof index.Entity).toBe('function');
        expect(typeof index.EntityViewCollection).toBe('function');
        expect(typeof index.EntityTable).toBe('function');
        expect(typeof index.EntityTableCollection).toBe('function');
        expect(typeof index.Item).toBe('function');
        expect(typeof index.ItemCollection).toBe('function');
        expect(typeof index.ItemViewCollection).toBe('function');
        expect(typeof index.ItemTableCollection).toBe('function');
        expect(typeof index.Row).toBe('function');
        expect(typeof index.RowCollection).toBe('function');
        // namespace
        expect(typeof index.Meta.Entity).toBe('object');
        expect(typeof index.Meta.Entity.Entity).toBe('function');
        expect(typeof index.Meta.Entity.EntityViewCollection).toBe('function');
        expect(typeof index.Meta.Entity.EntityTable).toBe('function');
        expect(typeof index.Meta.Entity.EntityTableCollection).toBe('function');
        expect(typeof index.Meta.Entity.Item).toBe('function');
        expect(typeof index.Meta.Entity.ItemCollection).toBe('function');
        expect(typeof index.Meta.Entity.ItemViewCollection).toBe('function');
        expect(typeof index.Meta.Entity.ItemTableCollection).toBe('function');
        expect(typeof index.Meta.Entity.Row).toBe('function');
        expect(typeof index.Meta.Entity.RowCollection).toBe('function');
    });
    it('- _L.Interface.* ', () => {
        expect(typeof index.IObject).toBe('function');
        expect(typeof index.IMarshal).toBe('function');
        expect(typeof index.ICollection).toBe('function');
        expect(typeof index.IControlCollection).toBe('function');
        expect(typeof index.IPropertyCollection).toBe('function');
        expect(typeof index.IAllControl).toBe('function');
        expect(typeof index.IExportControl).toBe('function');
        expect(typeof index.IGroupControl).toBe('function');
        expect(typeof index.IImportControl).toBe('function');
        expect(typeof index.ILookupControl).toBe('function');
        expect(typeof index.IPartControl).toBe('function');
        // namespace
        expect(typeof index.Interface).toBe('object');
        expect(typeof index.Interface.IObject).toBe('function');
        expect(typeof index.Interface.IMarshal).toBe('function');
        expect(typeof index.Interface.ICollection).toBe('function');
        expect(typeof index.Interface.IControlCollection).toBe('function');
        expect(typeof index.Interface.IPropertyCollection).toBe('function');
        expect(typeof index.Interface.IAllControl).toBe('function');
        expect(typeof index.Interface.IExportControl).toBe('function');
        expect(typeof index.Interface.IGroupControl).toBe('function');
        expect(typeof index.Interface.IImportControl).toBe('function');
        expect(typeof index.Interface.ILookupControl).toBe('function');
        expect(typeof index.Interface.IPartControl).toBe('function');

    });
});
