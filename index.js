/**
 * ES5
 */
var messageCode                 = require('./src/message-code').messageCode;
var Message                     = require('./src/message').Message;
var ExtendError                 = require('./src/extend-error').ExtendError;
var Type                        = require('./src/type');
var Util                        = require('./src/util');
var Observer                    = require("./src/observer").Observer;
var IObject                     = require('./src/i-object').IObject;
var IMarshal                    = require('./src/i-marshal').IMarshal;
var ICollection                 = require('./src/i-collection').ICollection;
var IPropertyCollection         = require('./src/i-collection-property').IPropertyCollection;
var IElement                    = require('./src/i-element').IElement;
var IList                       = require('./src/i-list').IList;
var IListControl                = require('./src/i-control-list').IListControl;
var ISerialize                  = require('./src/i-serialize').ISerialize;
var IArrayCollection            = require('./src/i-collection-array').IArrayCollection;
var NamespaceManager            = require('./src/namespace-manager').NamespaceManager;
var MetaRegistry                = require('./src/meta-registry').MetaRegistry;
var MetaObject                  = require("./src/meta-object").MetaObject;
var MetaElement                 = require("./src/meta-element").MetaElement;
var BaseCollection              = require("./src/base-collection").BaseCollection;
var ArrayCollection             = require("./src/collection-array").ArrayCollection;
var PropertyCollection          = require("./src/collection-property").PropertyCollection;

module.exports = {
    Util: Util,
    Type: Type,
    Observer: Observer,
    ExtendError: ExtendError,
    messageCode: messageCode,
    Message: Message,
    IObject: IObject,
    IMarshal: IMarshal,
    ICollection: ICollection,
    IPropertyCollection: IPropertyCollection,
    IElement: IElement,
    IList: IList,
    IListControl: IListControl,
    ISerialize: ISerialize,
    IArrayCollection: IArrayCollection,
    MetaObject: MetaObject,
    MetaElement: MetaElement,
    NamespaceManager: NamespaceManager,
    MetaRegistry: MetaRegistry,
    BaseCollection: BaseCollection,
    ArrayCollection: ArrayCollection,
    PropertyCollection: PropertyCollection,
    // namespace
    Common: {
        Util: Util,
        Type: Type,
        Observer: Observer,
        ExtendError: ExtendError,
        messageCode: messageCode,
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
    },
    Interface: {
        IObject: IObject,
        IMarshal: IMarshal,
        ICollection: ICollection,
        IPropertyCollection: IPropertyCollection,
        IElement: IElement,
        IList: IList,
        IListControl: IListControl,
        ISerialize: ISerialize,
        IArrayCollection: IArrayCollection,
    
    },
}