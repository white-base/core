/**
 * namespace _L.Common
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var MetaRegistry;
    var NamespaceManager;
    var ArrayCollection;
    var BaseCollection;
    var PropertyCollection;
    var TransactionCollection;
    var CustomError;
    var IArrayCollection;
    // var IBaseCollection;
    var IPropertyCollection;
    var ICollection;
    var IAllControl;
    var IExportControl;
    var IGroupControl;
    var IImportControl;
    // var ILookupControl;
    // var IPartControl;
    var ISchemaControl;
    var IMarshal;
    var IObject;
    var ITransaction;
    var MetaColumn;
    var MetaColumnCollection;
    var MetaViewColumnCollection;
    var MetaTableColumnCollection;
    var MetaElement;
    var MetaEntity;
    var MetaObject;
    var MetaRow;
    var MetaRowCollection;
    var MetaSet;
    var MetaTable;
    var MetaTableCollection;
    var MetaView;
    var MetaViewCollection;
    var Observer;
    var TransactionQueue;


    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};
    _global._L.Common.Util          = _global._L.Common.Util || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        NamespaceManager            = require('./namespace-manager').NamespaceManager;
        ArrayCollection             = require('./collection-array').ArrayCollection;
        BaseCollection              = require('./collection-base').BaseCollection;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        TransactionCollection       = require('./collection-transaction').TransactionCollection;
        CustomError                 = require('./custom-error').CustomError;
        IArrayCollection            = require('./i-collection-array').IArrayCollection;
        // IBaseCollection             = require('./i-collection-base').IBaseCollection;
        IPropertyCollection         = require('./i-collection-property').IPropertyCollection;
        ICollection                 = require('./i-collection').ICollection;
        // IAllControl                 = require('./i-control-all').IAllControl;
        IExportControl              = require('./i-control-export').IExportControl;
        IGroupControl               = require('./i-control-group').IGroupControl;
        IImportControl              = require('./i-control-import').IImportControl;
        // ILookupControl              = require('./i-control-lookup').ILookupControl;
        // IPartControl                = require('./i-control-part').IPartControl;
        ISchemaControl              = require('./i-control-schema').ISchemaControl;
        IMarshal                    = require('./i-marshal').IMarshal;
        IObject                     = require('./i-object').IObject;
        ITransaction                = require('./i-transaction').ITransaction;
        MetaColumn                  = require('./meta-column').MetaColumn;
        MetaColumnCollection        = require('./meta-column').MetaColumnCollection;
        MetaViewColumnCollection    = require('./meta-column').MetaViewColumnCollection;
        MetaTableColumnCollection   = require('./meta-column').MetaTableColumnCollection;
        MetaElement                 = require('./meta-element').MetaElement;
        MetaEntity                  = require('./meta-entity').MetaEntity;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaRow                     = require('./meta-row').MetaRow;
        MetaRowCollection           = require('./meta-row').MetaRowCollection;
        MetaSet                     = require('./meta-set').MetaSet;
        MetaTable                   = require('./meta-table').MetaTable;
        MetaTableCollection         = require('./meta-table').MetaTableCollection;
        MetaView                    = require('./meta-view').MetaView;
        MetaViewCollection          = require('./meta-view').MetaViewCollection;
        Observer                    = require('./observer').Observer;
        TransactionQueue            = require('./trans-queue').TransactionQueue;
    } else {
    }

    //==============================================================
    // 3. module dependency check
    
    //==============================================================
    // 4. module implementation
    var loadNamespace = function() {
        MetaRegistry.registerClass(Message, Message._NS, Message.name);
        MetaRegistry.registerClass(MetaRegistry, MetaRegistry._NS, MetaRegistry.name);
        MetaRegistry.registerClass(MetaObject, MetaObject._NS, MetaObject.name, );
        MetaRegistry.registerClass(MetaElement, MetaElement._NS, MetaElement.name);
        MetaRegistry.registerClass(ArrayCollection, ArrayCollection._NS, ArrayCollection.name);
        MetaRegistry.registerClass(BaseCollection, BaseCollection._NS, BaseCollection.name);
        MetaRegistry.registerClass(PropertyCollection, PropertyCollection._NS, PropertyCollection.name);
        MetaRegistry.registerClass(TransactionCollection, TransactionCollection._NS, TransactionCollection.name);
        MetaRegistry.registerClass(IArrayCollection, IArrayCollection._NS, IArrayCollection.name);
        // MetaRegistry.registerClass(IBaseCollection, IBaseCollection._NS, IBaseCollection.name);
        MetaRegistry.registerClass(IPropertyCollection, IPropertyCollection._NS, IPropertyCollection.name);
        MetaRegistry.registerClass(ICollection, ICollection._NS, ICollection.name);
        // MetaRegistry.registerClass(IAllControl, IAllControl._NS, IAllControl.name);
        MetaRegistry.registerClass(IExportControl, IExportControl._NS, IExportControl.name);
        MetaRegistry.registerClass(IGroupControl, IGroupControl._NS, IGroupControl.name);
        MetaRegistry.registerClass(IImportControl, IImportControl._NS, IImportControl.name);
        // MetaRegistry.registerClass(ILookupControl, ILookupControl._NS, ILookupControl.name);
        // MetaRegistry.registerClass(IPartControl, IPartControl._NS, IPartControl.name);
        MetaRegistry.registerClass(ISchemaControl._NS, ISchemaControl.name);
        MetaRegistry.registerClass(IMarshal, IMarshal._NS, IMarshal.name);
        MetaRegistry.registerClass(IObject, IObject._NS, IObject.name);
        MetaRegistry.registerClass(ITransaction, ITransaction._NS, ITransaction.name);
        MetaRegistry.registerClass(MetaColumn, MetaColumn._NS, MetaColumn.name);
        MetaRegistry.registerClass(MetaColumnCollection, MetaColumnCollection._NS, MetaColumnCollection.name);
        MetaRegistry.registerClass(MetaViewColumnCollection, MetaViewColumnCollection._NS, MetaViewColumnCollection.name);
        MetaRegistry.registerClass(MetaTableColumnCollection, MetaTableColumnCollection._NS, MetaTableColumnCollection.name);
        MetaRegistry.registerClass(MetaEntity, MetaEntity._NS, MetaEntity.name);
        MetaRegistry.registerClass(MetaRow, MetaRow._NS, MetaRow.name, MetaRow);
        MetaRegistry.registerClass(MetaRowCollection, MetaRowCollection._NS, MetaRowCollection.name);
        MetaRegistry.registerClass(MetaSet, MetaSet._NS, MetaSet.name, MetaSet);
        MetaRegistry.registerClass(MetaTable, MetaTable._NS, MetaTable.name);
        MetaRegistry.registerClass(MetaTableCollection, MetaTableCollection._NS, MetaTableCollection.name);
        MetaRegistry.registerClass(MetaView, MetaView._NS, MetaView.name, MetaView);
        MetaRegistry.registerClass(MetaViewCollection, MetaViewCollection._NS, MetaViewCollection.name);
        MetaRegistry.registerClass(TransactionQueue, TransactionQueue._NS, TransactionQueue.name);
        MetaRegistry.registerClass(Observer, Observer._NS, Observer.name);
        MetaRegistry.registerClass(CustomError, CustomError._NS, CustomError.name);
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
    Meta.Entity.MetaColumnCollection
    Meta.Entity.MetaViewColumnCollection
    Meta.Entity.MetaTableColumnCollection
    Meta.Entity.MetaEntity
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
    // 5. module export
    if (isNode) {     
        exports.loadNamespace = loadNamespace;
    } else {
        _global._L = loadNamespace;
        _global._L.Common.Util.loadNamespace = loadNamespace;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));
