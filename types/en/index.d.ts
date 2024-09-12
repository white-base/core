/// <reference path='global.d.ts' />

// import ExtendError          = require('./extend-error');
// import EventEmitter         = require('./event-emitter');
// import Util                 = require('./util');
// import Type                 = require('./type');
// import Message              = require('./message');
// import IObject              = require('./i-object');
// import IMarshal             = require('./i-marshal');
// import ICollection          = require('./i-collection');
// import IPropertyCollection  = require('./i-collection-property');
// import IElement             = require('./i-element');
// import IList                = require('./i-list');
// import IListControl         = require('./i-control-list');
// import ISerialize           = require('./i-serialize');
// import IArrayCollection     = require('./i-collction-array');
// import NamespaceManager     = require('./namespace-manager');
// import MetaRegistry         = require('./meta-registry');
// import MetaObject           = require('./meta-object');
// import MetaElement          = require('./meta-element');
// import BaseCollection       = require('./base-collection');
// import ArrayCollection      = require('./collection-array');
// import PropertyCollection   = require('./collection-property');

import ExtendError          from './extend-error';
import EventEmitter         from './event-emitter';
import Util                 from './util';
import Type                 from './type';
import Message              from './message';
import IObject              from './i-object';
import IMarshal             from './i-marshal';
import ICollection          from './i-collection';
import IPropertyCollection  from './i-collection-property';
import IElement             from './i-element';
import IList                from './i-list';
import IListControl         from './i-control-list';
import ISerialize           from './i-serialize';
import IArrayCollection     from './i-collction-array';
import NamespaceManager     from './namespace-manager';
import MetaRegistry         from './meta-registry';
import MetaObject           from './meta-object';
import MetaElement          from './meta-element';
import BaseCollection       from './base-collection';
import ArrayCollection      from './collection-array';
import PropertyCollection   from './collection-property';

export {
    // T,
    Util,
    Type,
    ExtendError,
    EventEmitter,
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
}
export namespace Common {
    /** Util 네임스페이스 TODO: */
    var Util;
    /** Type 네임스페이스 TODO: */
    var Type;
    var ExtendError : ExtendError;
    var EventEmitter : EventEmitter;
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
