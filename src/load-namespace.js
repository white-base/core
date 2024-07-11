/**** load-namespace.js | _L.Common.- ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {     
        var Message                     = require('./message').Message;
        var ExtendError                 = require('./extend-error').ExtendError;
        var Type                        = require('./type');
        var Util                        = require('./util').Util;
        var MetaRegistry                = require('./meta-registry').MetaRegistry;
        var NamespaceManager            = require('./namespace-manager').NamespaceManager;
        var ArrayCollection             = require('./collection-array').ArrayCollection;
        var BaseCollection              = require('./base-collection').BaseCollection;
        var PropertyCollection          = require('./collection-property').PropertyCollection;
        // var TransactionCollection       = require('./collection-transaction').TransactionCollection;
        // CustomError                 = require('./custom-error').CustomError;
        var IArrayCollection            = require('./i-collection-array').IArrayCollection;
        // IBaseCollection             = require('./i-base-collection').IBaseCollection;
        var IPropertyCollection         = require('./i-collection-property').IPropertyCollection;
        var ICollection                 = require('./i-collection').ICollection;
        // IAllControl                 = require('./i-control-all').IAllControl;
        // var IExportControl              = require('./i-control-export').IExportControl;
        // var IGroupControl               = require('./i-control-group').IGroupControl;
        // var IImportControl              = require('./i-control-import').IImportControl;
        // var ILookupControl              = require('./i-control-lookup').ILookupControl;
        // var IPartControl                = require('./i-control-part').IPartControl;
        // var ISchemaControl              = require('./i-control-schema').ISchemaControl;
        var IMarshal                    = require('./i-marshal').IMarshal;
        var IObject                     = require('./i-object').IObject;
        // var ITransaction                = require('./i-transaction').ITransaction;
        // var MetaColumn                  = require('./meta-column').MetaColumn;
        // var BaseColumnCollection        = require('./collection-column').BaseColumnCollection;
        // var MetaViewColumnCollection    = require('./collection-column').MetaViewColumnCollection;
        // var MetaTableColumnCollection   = require('./collection-column').MetaTableColumnCollection;
        var MetaElement                 = require('./meta-element').MetaElement;
        // var BaseEntity                  = require('./base-entity').BaseEntity;
        var MetaObject                  = require('./meta-object').MetaObject;
        // var MetaRow                     = require('./meta-row').MetaRow;
        // var MetaRowCollection           = require('./meta-row').MetaRowCollection;
        // var MetaSet                     = require('./meta-set').MetaSet;
        // var MetaTable                   = require('./meta-table').MetaTable;
        // var MetaTableCollection         = require('./meta-table').MetaTableCollection;
        // var MetaView                    = require('./meta-view').MetaView;
        // var MetaViewCollection          = require('./meta-view').MetaViewCollection;
        var Observer                    = require('./observer').Observer;
        // var TransactionQueue            = require('./trans-queue').TransactionQueue;
    } else {
    }

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
        // MetaRegistry.registerClass(TransactionCollection, TransactionCollection._NS, TransactionCollection.name);
        MetaRegistry.registerClass(IArrayCollection, IArrayCollection._NS, IArrayCollection.name);
        // MetaRegistry.registerClass(IBaseCollection, IBaseCollection._NS, IBaseCollection.name);
        MetaRegistry.registerClass(IPropertyCollection, IPropertyCollection._NS, IPropertyCollection.name);
        MetaRegistry.registerClass(ICollection, ICollection._NS, ICollection.name);
        // MetaRegistry.registerClass(IAllControl, IAllControl._NS, IAllControl.name);
        // MetaRegistry.registerClass(IExportControl, IExportControl._NS, IExportControl.name);
        // MetaRegistry.registerClass(IGroupControl, IGroupControl._NS, IGroupControl.name);
        // MetaRegistry.registerClass(IImportControl, IImportControl._NS, IImportControl.name);
        // MetaRegistry.registerClass(ILookupControl, ILookupControl._NS, ILookupControl.name);
        // MetaRegistry.registerClass(IPartControl, IPartControl._NS, IPartControl.name);
        // MetaRegistry.registerClass(ISchemaControl, ISchemaControl._NS, ISchemaControl.name);
        MetaRegistry.registerClass(IMarshal, IMarshal._NS, IMarshal.name);
        MetaRegistry.registerClass(IObject, IObject._NS, IObject.name);
        // MetaRegistry.registerClass(ITransaction, ITransaction._NS, ITransaction.name);
        // MetaRegistry.registerClass(MetaColumn, MetaColumn._NS, MetaColumn.name);
        // MetaRegistry.registerClass(BaseColumnCollection, BaseColumnCollection._NS, BaseColumnCollection.name);
        // MetaRegistry.registerClass(MetaViewColumnCollection, MetaViewColumnCollection._NS, MetaViewColumnCollection.name);
        // MetaRegistry.registerClass(MetaTableColumnCollection, MetaTableColumnCollection._NS, MetaTableColumnCollection.name);
        // MetaRegistry.registerClass(BaseEntity, BaseEntity._NS, BaseEntity.name);
        // MetaRegistry.registerClass(MetaRow, MetaRow._NS, MetaRow.name, MetaRow);
        // MetaRegistry.registerClass(MetaRowCollection, MetaRowCollection._NS, MetaRowCollection.name);
        // MetaRegistry.registerClass(MetaSet, MetaSet._NS, MetaSet.name, MetaSet);
        // MetaRegistry.registerClass(MetaTable, MetaTable._NS, MetaTable.name);
        // MetaRegistry.registerClass(MetaTableCollection, MetaTableCollection._NS, MetaTableCollection.name);
        // MetaRegistry.registerClass(MetaView, MetaView._NS, MetaView.name, MetaView);
        // MetaRegistry.registerClass(MetaViewCollection, MetaViewCollection._NS, MetaViewCollection.name);
        // MetaRegistry.registerClass(TransactionQueue, TransactionQueue._NS, TransactionQueue.name);
        MetaRegistry.registerClass(Observer, Observer._NS, Observer.name);
        // MetaRegistry.registerClass(CustomError, CustomError._NS, CustomError.name);
        MetaRegistry.registerClass(NamespaceManager, NamespaceManager._NS, NamespaceManager.name);
        MetaRegistry.registerClass(Util, 'Common', 'Util');
    
    };
    // console.log(MetaRegistry.ns.list.join('\n'));
    // console.log(MetaRegistry.ns.count);
    
    /*
    Meta.MetaRegistry
    Meta.MetaObject
    Meta.MetaElement
    Meta.Entity.MetaColumn
    Meta.Entity.BaseColumnCollection
    Meta.Entity.MetaViewColumnCollection
    Meta.Entity.MetaTableColumnCollection
    Meta.Entity.BaseEntity
    Meta.Entity.MetaRow
    Meta.Entity.MetaRowCollection
    Meta.Entity.MetaSet
    Meta.Entity.MetaTable
    Meta.Entity.MetaTableCollection
    Meta.Entity.MetaView
    Meta.Entity.MetaViewCollection
    Collection.ArrayCollection
    Collection.BaseCollection
    Collection.PropertyCollection
    Collection.TransactionCollection
    Collection.TransactionQueue
    Interface.IArrayCollection
    Interface.IBaseCollection
    Interface.IPropertyCollection
    Interface.ICollection
    Interface.IAllControl
    Interface.IExportControl
    Interface.IGroupControl
    Interface.IImportControl
    Interface.ILookupControl
    Interface.IPartControl
    Interface.ISchemaControl
    Interface.IMarshal
    Interface.IObject
    Interface.ITransaction
    Common.Observer
    Common.CustomError
    Common.NamespaceManager
    Common.Util
    */

    // console.log(0);

    //==============================================================
    // 4. module export
    if (isNode) exports.loadNamespace = loadNamespace;      // strip:
    
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    _global._L.loadNamespace = loadNamespace;
    _global._L.Common.loadNamespace = loadNamespace;

}(typeof window !== 'undefined' ? window : global));
