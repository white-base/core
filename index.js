const messageCode_core            = require('./src/message-code').messageCode;
const Message                     = require('./src/message').Message;
const ExtendError                 = require('./src/extend-error').ExtendError;
const Type                        = require('./src/type').Type;
const Util                        = require('./src/util').Util;
const Observer                    = require("./src/observer").Observer;
const IObject                     = require('./src/i-object').IObject;
const IMarshal                    = require('./src/i-marshal').IMarshal;
const ICollection                 = require('./src/i-collection').ICollection;
const IPropertyCollection         = require('./src/i-collection-property').IPropertyCollection;
const IElement                    = require('./src/i-element').IElement;
const IList                       = require('./src/i-list').IList;
const IListControl                = require('./src/i-control-list').IListControl;
const ISerialize                  = require('./src/i-serialize').ISerialize;
const IArrayCollection            = require('./src/i-collection-array').IArrayCollection;
const NamespaceManager            = require('./src/namespace-manager').NamespaceManager;
const MetaRegistry                = require('./src/meta-registry').MetaRegistry;
const MetaObject                  = require("./src/meta-object").MetaObject;
const MetaElement                 = require("./src/meta-element").MetaElement;
const BaseCollection              = require("./src/base-collection").BaseCollection;
const ArrayCollection             = require("./src/collection-array").ArrayCollection;
const PropertyCollection          = require("./src/collection-property").PropertyCollection;

module.exports = {
    Util: Util,
    Type: Type,
    Observer: Observer,
    ExtendError: ExtendError,
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
    messageCode: {
        core: messageCode_core
    }
}