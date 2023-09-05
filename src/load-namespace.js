/**
 * namespace _L.Common
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaRegistry;
    var NamespaceManager;
    var ArrayCollection;
    var BaseCollection;
    var PropertyCollection;
    var TransactionCollection;
    var CustomError;
    var IArrayCollection;
    var IBaseCollection;
    var IPropertyCollection;
    var ICollection;
    var IAllControl;
    var IExportControl;
    var IGroupControl;
    var IImportControl;
    var ILookupControl;
    var IPartControl;
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
    _global._L                  = _global._L || {};
    _global._L.Common           = _global._L.Common || {};
    _global._L.Common.Util      = _global._L.Common.Util || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                        = require('./util');
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        NamespaceManager            = require('./namespace-manager').NamespaceManager;
        ArrayCollection             = require('./collection-array').ArrayCollection;
        BaseCollection              = require('./collection-base').BaseCollection;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        TransactionCollection       = require('./collection-transaction').TransactionCollection;
        CustomError                 = require('./custom-error').CustomError;
        IArrayCollection            = require('./i-collection-array').IArrayCollection;
        IBaseCollection             = require('./i-collection-base').IBaseCollection;
        IPropertyCollection         = require('./i-collection-property').IPropertyCollection;
        ICollection                 = require('./i-collection').ICollection;
        IAllControl                 = require('./i-control-all').IAllControl;
        IExportControl              = require('./i-control-export').IExportControl;
        IGroupControl               = require('./i-control-group').IGroupControl;
        IImportControl              = require('./i-control-import').IImportControl;
        ILookupControl              = require('./i-control-lookup').ILookupControl;
        IPartControl                = require('./i-control-part').IPartControl;
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
        MetaRegistry.registerClass(MetaRegistry._NS, MetaRegistry.name, MetaRegistry);
        MetaRegistry.registerClass(MetaObject._NS, MetaObject.name, MetaObject);
        MetaRegistry.registerClass(MetaElement._NS, MetaElement.name, MetaElement);
        MetaRegistry.registerClass(ArrayCollection._NS, ArrayCollection.name, ArrayCollection);
        MetaRegistry.registerClass(BaseCollection._NS, BaseCollection.name, BaseCollection);
        MetaRegistry.registerClass(PropertyCollection._NS, PropertyCollection.name, PropertyCollection);
        MetaRegistry.registerClass(TransactionCollection._NS, TransactionCollection.name, TransactionCollection);
        MetaRegistry.registerClass(IArrayCollection._NS, IArrayCollection.name, IArrayCollection);
        MetaRegistry.registerClass(IBaseCollection._NS, IBaseCollection.name, IBaseCollection);
        MetaRegistry.registerClass(IPropertyCollection._NS, IPropertyCollection.name, IPropertyCollection);
        MetaRegistry.registerClass(ICollection._NS, ICollection.name, ICollection);
        MetaRegistry.registerClass(IAllControl._NS, IAllControl.name, IAllControl);
        MetaRegistry.registerClass(IExportControl._NS, IExportControl.name, IExportControl);
        MetaRegistry.registerClass(IGroupControl._NS, IGroupControl.name, IGroupControl);
        MetaRegistry.registerClass(IImportControl._NS, IImportControl.name, IImportControl);
        MetaRegistry.registerClass(ILookupControl._NS, ILookupControl.name, ILookupControl);
        MetaRegistry.registerClass(IPartControl._NS, IPartControl.name, IPartControl);
        MetaRegistry.registerClass(ISchemaControl._NS, ISchemaControl.name, ISchemaControl);
        MetaRegistry.registerClass(IMarshal._NS, IMarshal.name, IMarshal);
        MetaRegistry.registerClass(IObject._NS, IObject.name, IObject);
        MetaRegistry.registerClass(ITransaction._NS, ITransaction.name, ITransaction);
        MetaRegistry.registerClass(MetaColumn._NS, MetaColumn.name, MetaColumn);
        MetaRegistry.registerClass(MetaColumnCollection._NS, MetaColumnCollection.name, MetaColumnCollection);
        MetaRegistry.registerClass(MetaViewColumnCollection._NS, MetaViewColumnCollection.name, MetaViewColumnCollection);
        MetaRegistry.registerClass(MetaTableColumnCollection._NS, MetaTableColumnCollection.name, MetaTableColumnCollection);
        MetaRegistry.registerClass(MetaEntity._NS, MetaEntity.name, MetaEntity);
        MetaRegistry.registerClass(MetaRow._NS, MetaRow.name, MetaRow);
        MetaRegistry.registerClass(MetaRowCollection._NS, MetaRowCollection.name, MetaRowCollection);
        MetaRegistry.registerClass(MetaSet._NS, MetaSet.name, MetaSet);
        MetaRegistry.registerClass(MetaTable._NS, MetaTable.name, MetaTable);
        MetaRegistry.registerClass(MetaTableCollection._NS, MetaTableCollection.name, MetaTableCollection);
        MetaRegistry.registerClass(MetaView._NS, MetaView.name, MetaView);
        MetaRegistry.registerClass(MetaViewCollection._NS, MetaViewCollection.name, MetaViewCollection);
        MetaRegistry.registerClass(TransactionQueue._NS, TransactionQueue.name, TransactionQueue);
        MetaRegistry.registerClass(Observer._NS, Observer.name, Observer);
        MetaRegistry.registerClass(CustomError._NS, CustomError.name, CustomError);
        MetaRegistry.registerClass(NamespaceManager._NS, NamespaceManager.name, NamespaceManager);
        MetaRegistry.registerClass('Common', 'Util', Util);
    
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
