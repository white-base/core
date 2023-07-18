/**
 * ES5
 */
var Util                       = require('./src/util');
var Observer                    = require("./src/observer").Observer;
var CustomError                 = require('./src/error-custom').CustomError;
var BaseCollection              = require("./src/collection-base").BaseCollection;
var ArrayCollection             = require("./src/collection-array").ArrayCollection;
var PropertyCollection          = require("./src/collection-property").PropertyCollection;
// var PropertyFunctionCollection  = require('./src/collection-property-function');    // TODO: 삭제 대기
var MetaObject                  = require("./src/meta-object").MetaObject;
var MetaElement                 = require("./src/meta-element").MetaElement;
// var ComplexElement              = require("./src/meta-element-complex");
var MetaEntity                      = require('./src/meta-entity').MetaEntity;
var MetaView                  = require('./src/meta-view').MetaView;
var MetaViewCollection        = require('./src/meta-view').MetaViewCollection;
var MetaTable                 = require('./src/meta-table').MetaTable;
var MetaTableCollection       = require('./src/meta-table').MetaTableCollection;
var MetaColumn                        = require('./src/meta-column').MetaColumn;
var MetaColumnCollection              = require('./src/meta-column').MetaColumnCollection;
var MetaViewColumnCollection          = require('./src/meta-column').MetaViewColumnCollection;
var MetaTableColumnCollection         = require('./src/meta-column').MetaTableColumnCollection;
var MetaRow                         = require('./src/meta-row').MetaRow;
var MetaRowCollection               = require('./src/meta-row').MetaRowCollection;
var IObject                     = require('./src/i-object').IObject;
var IMarshal                    = require('./src/i-marshal').IMarshal;
var ICollection                 = require('./src/i-collection').ICollection;
// var IControlCollection          = require('./src/i-collection-control');
var IPropertyCollection         = require('./src/i-collection-property').IPropertyCollection;
var IAllControl                 = require('./src/i-control-all').IAllControl;
var IExportControl              = require('./src/i-control-export').IExportControl;
var IGroupControl               = require('./src/i-control-group').IGroupControl;
var IImportControl              = require('./src/i-control-import').IImportControl;
var ILookupControl              = require('./src/i-control-lookup').ILookupControl;
var IPartControl                = require('./src/i-control-part').IPartControl;

module.exports = {
    Util: Util,
    Observer: Observer,
    CustomError: CustomError,
    BaseCollection: BaseCollection,
    ArrayCollection: ArrayCollection,
    PropertyCollection: PropertyCollection,
    // PropertyFunctionCollection: PropertyFunctionCollection,
    MetaObject: MetaObject,
    MetaElement: MetaElement,
    // ComplexElement: ComplexElement,
    MetaEntity: MetaEntity,
    MetaView: MetaView,
    MetaViewCollection: MetaViewCollection,
    MetaTable: MetaTable,
    MetaTableCollection: MetaTableCollection,
    MetaColumn: MetaColumn,
    MetaColumnCollection: MetaColumnCollection,
    MetaViewColumnCollection: MetaViewColumnCollection,
    MetaTableColumnCollection: MetaTableColumnCollection,
    MetaRow: MetaRow,
    MetaRowCollection: MetaRowCollection,
    IObject: IObject,
    IMarshal: IMarshal,
    ICollection: ICollection,
    // IControlCollection: IControlCollection,
    IPropertyCollection: IPropertyCollection,
    IAllControl: IAllControl,
    IExportControl: IExportControl,
    IGroupControl: IGroupControl,
    IImportControl: IImportControl,
    ILookupControl: ILookupControl,
    IPartControl: IPartControl,
    // namespace
    Common: {
        Util: Util,
        Observer: Observer,
        CustomError: CustomError,
    },
    Collection: {
        BaseCollection: BaseCollection,
        ArrayCollection: ArrayCollection,
        PropertyCollection: PropertyCollection,
    },
    Meta: {
        MetaObject: MetaObject,
        MetaElement: MetaElement,
        // ComplexElement: ComplexElement,
        Entity: {
            MetaEntity: MetaEntity,
            MetaView: MetaView,
            MetaViewCollection: MetaViewCollection,
            MetaTable: MetaTable,
            MetaTableCollection: MetaTableCollection,
            MetaColumn: MetaColumn,
            MetaColumnCollection: MetaColumnCollection,
            MetaViewColumnCollection: MetaViewColumnCollection,
            MetaTableColumnCollection: MetaTableColumnCollection,
            MetaRow: MetaRow,
            MetaRowCollection: MetaRowCollection,
        }
    },
    Interface: {
        IObject: IObject,
        IMarshal: IMarshal,
        ICollection: ICollection,
        // IControlCollection: IControlCollection,
        IPropertyCollection: IPropertyCollection,
        IAllControl: IAllControl,
        IExportControl: IExportControl,
        IGroupControl: IGroupControl,
        IImportControl: IImportControl,
        ILookupControl: ILookupControl,
        IPartControl: IPartControl,
    },
}