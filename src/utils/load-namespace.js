/**** load-namespace.js loadNamespace ****/
//==============================================================
// 1. import module
import Message from '../message.js';
import ExtendError from '../extend-error.js';
import Type from '../type';
import Util from '../util.js';
import MetaRegistry from '../meta-registry.js';
import NamespaceManager from '../namespace-manager.js';
import ArrayCollection from '../collection-array.js';
import BaseCollection from '../base-collection.js';
import PropertyCollection from '../collection-property.js';
import IArrayCollection from '../i-collection-array.js';
import IPropertyCollection from '../i-collection-property';
import ICollection from '../i-collection.js';
import IMarshal from '../i-marshal.js';
import IObject from '../i-object.js';
import MetaElement from '../meta-element.js';
import MetaObject from '../meta-object.js';
import EventEmitter from '../event-emitter.js';

//==============================================================
// 2. module dependency check

//==============================================================
// 3. module implementation
var loadNamespace = function() {
    MetaRegistry.registerClass(Message, Message._NS, Message.name);
    MetaRegistry.registerClass(ExtendError, ExtendError._NS, ExtendError.name);
    MetaRegistry.registerClass(Type, 'Common', 'Type');
    MetaRegistry.registerClass(MetaRegistry, MetaRegistry._NS, MetaRegistry.name);
    MetaRegistry.registerClass(MetaObject, MetaObject._NS, MetaObject.name, );
    MetaRegistry.registerClass(MetaElement, MetaElement._NS, MetaElement.name);
    MetaRegistry.registerClass(ArrayCollection, ArrayCollection._NS, ArrayCollection.name);
    MetaRegistry.registerClass(BaseCollection, BaseCollection._NS, BaseCollection.name);
    MetaRegistry.registerClass(PropertyCollection, PropertyCollection._NS, PropertyCollection.name);
    MetaRegistry.registerClass(IArrayCollection, IArrayCollection._NS, IArrayCollection.name);
    MetaRegistry.registerClass(IPropertyCollection, IPropertyCollection._NS, IPropertyCollection.name);
    MetaRegistry.registerClass(ICollection, ICollection._NS, ICollection.name);
    MetaRegistry.registerClass(IMarshal, IMarshal._NS, IMarshal.name);
    MetaRegistry.registerClass(IObject, IObject._NS, IObject.name);
    MetaRegistry.registerClass(EventEmitter, EventEmitter._NS, EventEmitter.name);
    MetaRegistry.registerClass(NamespaceManager, NamespaceManager._NS, NamespaceManager.name);
    MetaRegistry.registerClass(Util, 'Common', 'Util');
};

//==============================================================
// 4. module export
export default loadNamespace;
export { loadNamespace };