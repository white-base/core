/**
 * ES5
 */
var Util                        = require('./src/util');
var Observer                    = require("./src/observer").Observer;
var ExtendError                 = require('./src/extend-error').ExtendError;
var Message                     = require('./src/message').Message;
var BaseCollection              = require("./src/base-collection").BaseCollection;
var ArrayCollection             = require("./src/collection-array").ArrayCollection;
var PropertyCollection          = require("./src/collection-property").PropertyCollection;
var MetaObject                  = require("./src/meta-object").MetaObject;
var MetaElement                 = require("./src/meta-element").MetaElement;
var BaseEntity                  = require('./src/base-entity').BaseEntity;
var MetaView                    = require('./src/meta-view').MetaView;
var MetaViewCollection          = require('./src/meta-view').MetaViewCollection;
var MetaTable                   = require('./src/meta-table').MetaTable;
var MetaTableCollection         = require('./src/meta-table').MetaTableCollection;
var MetaColumn                  = require('./src/meta-column').MetaColumn;
var BaseColumnCollection        = require('./src/meta-column').BaseColumnCollection;
var MetaViewColumnCollection    = require('./src/meta-column').MetaViewColumnCollection;
var MetaTableColumnCollection   = require('./src/meta-column').MetaTableColumnCollection;
var MetaRow                     = require('./src/meta-row').MetaRow;
var MetaRowCollection           = require('./src/meta-row').MetaRowCollection;
var MetaRegistry                = require('./src/meta-registry').MetaRegistry;
var NamespaceManager            = require('./src/namespace-manager').NamespaceManager;
var IObject                     = require('./src/i-object').IObject;
var IMarshal                    = require('./src/i-marshal').IMarshal;
var ICollection                 = require('./src/i-collection').ICollection;
var IPropertyCollection         = require('./src/i-collection-property').IPropertyCollection;
var IExportControl              = require('./src/i-control-export').IExportControl;
var IGroupControl               = require('./src/i-control-group').IGroupControl;
var IImportControl              = require('./src/i-control-import').IImportControl;
var IElement                    = require('./src/i-element').IElement;
var IList                       = require('./src/i-list').IList;
var IListControl                = require('./src/i-control-list').IListControl;
var ISchemaControl              = require('./src/i-control-schema').ISchemaControl;
var ITransaction                = require('./src/i-transaction').ITransaction;
var ISerialize                  = require('./src/i-serialize').ISerialize;
var IArrayCollection            = require('./src/i-collection-array').IArrayCollection;

module.exports = {
    Util: Util,
    Observer: Observer,
    ExtendError: ExtendError,
    Message: Message,
    BaseCollection: BaseCollection,
    ArrayCollection: ArrayCollection,
    PropertyCollection: PropertyCollection,
    MetaObject: MetaObject,
    MetaElement: MetaElement,
    BaseEntity: BaseEntity,
    MetaView: MetaView,
    MetaViewCollection: MetaViewCollection,
    MetaTable: MetaTable,
    MetaTableCollection: MetaTableCollection,
    MetaColumn: MetaColumn,
    BaseColumnCollection: BaseColumnCollection,
    MetaViewColumnCollection: MetaViewColumnCollection,
    MetaTableColumnCollection: MetaTableColumnCollection,
    MetaRow: MetaRow,
    MetaRowCollection: MetaRowCollection,
    MetaRegistry: MetaRegistry,
    NamespaceManager: NamespaceManager,
    IObject: IObject,
    IMarshal: IMarshal,
    ICollection: ICollection,
    IPropertyCollection: IPropertyCollection,
    IExportControl: IExportControl,
    IGroupControl: IGroupControl,
    IImportControl: IImportControl,
    IElement: IElement,
    IList: IList,
    IListControl: IListControl,
    ISchemaControl: ISchemaControl,
    ITransaction: ITransaction,
    ISerialize: ISerialize,
    IArrayCollection: IArrayCollection,
    // namespace
    Common: {
        Util: Util,
        Observer: Observer,
        ExtendError: ExtendError,
        Message: Message,
    },
    Collection: {
        BaseCollection: BaseCollection,
        ArrayCollection: ArrayCollection,
        PropertyCollection: PropertyCollection,
    },
    Meta: {
        MetaObject: MetaObject,
        MetaElement: MetaElement,
        MetaRegistry: MetaRegistry,
        NamespaceManager: NamespaceManager,        
        Entity: {
            BaseEntity: BaseEntity,
            MetaView: MetaView,
            MetaViewCollection: MetaViewCollection,
            MetaTable: MetaTable,
            MetaTableCollection: MetaTableCollection,
            MetaColumn: MetaColumn,
            BaseColumnCollection: BaseColumnCollection,
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
        IPropertyCollection: IPropertyCollection,
        IExportControl: IExportControl,
        IGroupControl: IGroupControl,
        IImportControl: IImportControl,
        IElement: IElement,
        IList: IList,
        IListControl: IListControl,
        ISchemaControl: ISchemaControl,
        ITransaction: ITransaction,
        ISerialize: ISerialize,
        IArrayCollection: IArrayCollection,
    
    },
}