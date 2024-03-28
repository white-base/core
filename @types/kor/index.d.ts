import ExtendError          = require("./extend-error");
import Observer             = require("./observer");
import Util                 = require("./util");
import Type                 = require("./type");
import Message              = require("./message");
import IObject              = require("./i-object");
import IMarshal             = require("./i-marshal");
import ICollection          = require("./i-collection");
import IPropertyCollection  = require("./i-collection-property");
import IElement             = require("./i-element");
import IList                = require("./i-list");
import IListControl         = require("./i-control-list");
import ISerialize           = require("./i-serialize");
import IArrayCollection     = require("./i-collction-array");
import NamespaceManager     = require("./namespace-manager");
import MetaRegistry         = require("./meta-registry");
import MetaObject           = require("./meta-object");
import MetaElement          = require("./meta-element");
import BaseCollection       = require("./base-collection");
import ArrayCollection      = require("./collection-array");
import PropertyCollection   = require("./collection-property");
import T                    = require("./T");

export {
    T,
    Util,
    Type,
    ExtendError,
    Observer,
    Message,
    IObject,
    IMarshal,
    ICollection,
    IPropertyCollection,
    IElement,
    IList,
    IListControl,
    ISerialize,
    IArrayCollection,
    NamespaceManager,
    MetaRegistry,
    MetaObject,
    MetaElement,
    BaseCollection,
    ArrayCollection,
    PropertyCollection
};
export namespace Common {
    /** Util 네임스페이스 TODO: */
    var Util;
    /** Type 네임스페이스 TODO: */
    var Type;
    var ExtendError : ExtendError;
    var Observer : Observer;
    var Message  : Message;
}
export namespace Interface {
    var IObject : IObject;
    var IMarshal : IMarshal;
    var ICollection : ICollection;
    var IPropertyCollection : IPropertyCollection;
    var IElement : IElement;
    var IList : IList;
    var IListControl : IListControl;
    var ISerialize : ISerialize;
    var IArrayCollection : IArrayCollection;
}
export namespace Meta {
    var NamespaceManager : NamespaceManager;
    var MetaRegistry : MetaRegistry;
    var MetaObject : MetaObject;
    var MetaElement : MetaElement;
}
export namespace Collection {
    var BaseCollection : BaseCollection;
    var ArrayCollection : ArrayCollection;
    var PropertyCollection : PropertyCollection;
}
