/**
 * ES5
 */
var utils                       = require('./src/utils');
var Observer                    = require("./src/observer");
var CustomError                 = require('./src/error-custom');
var BaseCollection              = require("./src/collection-base");
var ArrayCollection             = require("./src/collection-array");
var PropertyCollection          = require("./src/collection-property");
var PropertyFunctionCollection  = require('./src/collection-property-function');    // TODO: 삭제 대기
var MetaObject                  = require("./src/meta-object");
var MetaElement                 = require("./src/meta-element");
var ComplexElement              = require("./src/meta-element-complex");
var Entity                      = require('./src/entity-base');
var EntityView                  = require('./src/entity-view').EntityView;
var EntityViewCollection        = require('./src/entity-view').EntityViewCollection;
var EntityTable                 = require('./src/entity-table').EntityTable;
var EntityTableCollection       = require('./src/entity-table').EntityTableCollection;
var Item                        = require('./src/entity-item').Item;
var ItemCollection              = require('./src/entity-item').ItemCollection;
var ItemViewCollection          = require('./src/entity-item').ItemViewCollection;
var ItemTableCollection         = require('./src/entity-item').ItemTableCollection;
var Row                         = require('./src/entity-row').Row;
var RowCollection               = require('./src/entity-row').RowCollection;
var RowCollection               = require('./src/entity-row').RowCollection;
var IObject                     = require('./src/i-object');
var IMarshal                    = require('./src/i-marshal');
var ICollection                 = require('./src/i-collection');
var IControlCollection          = require('./src/i-collection-control');
var IPropertyCollection         = require('./src/i-collection-property');
var IAllControl                 = require('./src/i-control-all');
var IExportControl              = require('./src/i-control-export');
var IGroupControl               = require('./src/i-control-group');
var IImportControl              = require('./src/i-control-import');
var ILookupControl              = require('./src/i-control-lookup');
var IPartControl                = require('./src/i-control-part');

module.exports = {
    util: utils,
    Observer: Observer,
    CustomError: CustomError,
    BaseCollection: BaseCollection,
    ArrayCollection: ArrayCollection,
    PropertyCollection: PropertyCollection,
    PropertyFunctionCollection: PropertyFunctionCollection,
    MetaObject: MetaObject,
    MetaElement: MetaElement,
    ComplexElement: ComplexElement,
    Entity: Entity,
    EntityView: EntityView,
    EntityViewCollection: EntityViewCollection,
    EntityTable: EntityTable,
    EntityTableCollection: EntityTableCollection,
    Item: Item,
    ItemCollection: ItemCollection,
    ItemViewCollection: ItemViewCollection,
    ItemTableCollection: ItemTableCollection,
    Row: Row,
    RowCollection: RowCollection,
    IObject: IObject,
    IMarshal: IMarshal,
    ICollection: ICollection,
    IControlCollection: IControlCollection,
    IPropertyCollection: IPropertyCollection,
    IAllControl: IAllControl,
    IExportControl: IExportControl,
    IGroupControl: IGroupControl,
    IImportControl: IImportControl,
    ILookupControl: ILookupControl,
    IPartControl: IPartControl,
    // namespace
    Common: {
        util: utils,
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
        ComplexElement: ComplexElement,
        Entity: {
            Entity: Entity,
            EntityView: EntityView,
            EntityViewCollection: EntityViewCollection,
            EntityTable: EntityTable,
            EntityTableCollection: EntityTableCollection,
            Item: Item,
            ItemCollection: ItemCollection,
            ItemViewCollection: ItemViewCollection,
            ItemTableCollection: ItemTableCollection,
            Row: Row,
            RowCollection: RowCollection,
        }
    },
    Interface: {
        IObject: IObject,
        IMarshal: IMarshal,
        ICollection: ICollection,
        IControlCollection: IControlCollection,
        IPropertyCollection: IPropertyCollection,
        IAllControl: IAllControl,
        IExportControl: IExportControl,
        IGroupControl: IGroupControl,
        IImportControl: IImportControl,
        ILookupControl: ILookupControl,
        IPartControl: IPartControl,
    },
}