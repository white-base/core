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

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                    = require('./util');
        MetaRegistry         = require('./meta-registry').MetaRegistry;
        ArrayCollection        = require('./collection-array').ArrayCollection;
        BaseCollection        = require('./collection-base').BaseCollection;
        PropertyCollection        = require('./collection-property').PropertyCollection;
        TransactionCollection        = require('./collection-transaction').TransactionCollection;
        CustomError        = require('./error-custom').CustomError;
        IArrayCollection        = require('./i-collection-array').IArrayCollection;
        IBaseCollection        = require('./i-collection-base').IBaseCollection;
        IPropertyCollection        = require('./i-collection-property').IPropertyCollection;
        ICollection        = require('./i-collection').ICollection;
        IAllControl        = require('./i-control-all').IAllControl;
        IExportControl        = require('./i-control-export').IExportControl;
        IGroupControl        = require('./i-control-group').IGroupControl;
        IImportControl        = require('./i-control-import').IImportControl;
        ILookupControl        = require('./i-control-lookup').ILookupControl;
        IPartControl        = require('./i-control-part').IPartControl;
        ISchemaControl        = require('./i-control-schema').ISchemaControl;
        IMarshal        = require('./i-marshal').IMarshal;
        IObject        = require('./i-object').IObject;
        ITransaction        = require('./i-transaction').ITransaction;
        MetaColumn        = require('./meta-column').MetaColumn;
        MetaColumnCollection        = require('./meta-column').MetaColumnCollection;
        MetaViewColumnCollection        = require('./meta-column').MetaViewColumnCollection;
        MetaTableColumnCollection        = require('./meta-column').MetaTableColumnCollection;
        MetaElement        = require('./meta-element').MetaElement;
        MetaEntity        = require('./meta-entity').MetaEntity;
        MetaObject        = require('./meta-object').MetaObject;
        MetaRow        = require('./meta-row').MetaRow;
        MetaRowCollection        = require('./meta-row').MetaRowCollection;
        MetaSet        = require('./meta-set').MetaSet;
        MetaTable        = require('./meta-table').MetaTable;
        MetaTableCollection        = require('./meta-table').MetaTableCollection;
        MetaView        = require('./meta-view').MetaView;
        MetaViewCollection        = require('./meta-view').MetaViewCollection;
        Observer        = require('./observer').Observer;
        TransactionQueue        = require('./trans-queue').TransactionQueue;

        
        // MetaObject              = require('./meta-object').MetaObject;
        // TransactionCollection   = require('./collection-transaction').TransactionCollection;
        // MetaRegistry            = require('./meta-registry').MetaRegistry;
    } else {    // COVER:
        // Util                    = _global._L.Util;
    }

    //==============================================================
    // 3. module dependency check
    // if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    // if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');
    // if (typeof IBaseCollection === 'undefined') throw new Error('[IBaseCollection] module load fail...');
    // if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    // // if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    // if (typeof TransactionCollection === 'undefined') throw new Error('[TransactionCollection] module load fail...');
    // if (typeof MetaRegistry === 'undefined') throw new Error('[MetaRegistry] module load fail...');
    // // if (typeof TransactionQueue === 'undefined') throw new Error('[TransactionQueue] module load fail...');

    //==============================================================
    // 4. module implementation   
    MetaRegistry.registerClass(MetaRegistry._ns, MetaRegistry.name, MetaRegistry);
    MetaRegistry.registerClass(MetaObject._ns, MetaObject.name, MetaObject);
    MetaRegistry.registerClass(MetaElement._ns, MetaElement.name, MetaElement);
    MetaRegistry.registerClass(ArrayCollection._ns, ArrayCollection.name, ArrayCollection);
    MetaRegistry.registerClass(BaseCollection._ns, BaseCollection.name, BaseCollection);
    MetaRegistry.registerClass(PropertyCollection._ns, PropertyCollection.name, PropertyCollection);
    MetaRegistry.registerClass(TransactionCollection._ns, TransactionCollection.name, TransactionCollection);
    MetaRegistry.registerClass(IArrayCollection._ns, IArrayCollection.name, IArrayCollection);
    MetaRegistry.registerClass(IBaseCollection._ns, IBaseCollection.name, IBaseCollection);
    MetaRegistry.registerClass(IPropertyCollection._ns, IPropertyCollection.name, IPropertyCollection);
    MetaRegistry.registerClass(ICollection._ns, ICollection.name, ICollection);
    MetaRegistry.registerClass(IAllControl._ns, IAllControl.name, IAllControl);
    MetaRegistry.registerClass(IExportControl._ns, IExportControl.name, IExportControl);
    MetaRegistry.registerClass(IGroupControl._ns, IGroupControl.name, IGroupControl);
    MetaRegistry.registerClass(IImportControl._ns, IImportControl.name, IImportControl);
    MetaRegistry.registerClass(ILookupControl._ns, ILookupControl.name, ILookupControl);
    MetaRegistry.registerClass(IPartControl._ns, IPartControl.name, IPartControl);
    MetaRegistry.registerClass(ISchemaControl._ns, ISchemaControl.name, ISchemaControl);
    MetaRegistry.registerClass(IMarshal._ns, IMarshal.name, IMarshal);
    MetaRegistry.registerClass(IObject._ns, IObject.name, IObject);
    MetaRegistry.registerClass(ITransaction._ns, ITransaction.name, ITransaction);
    MetaRegistry.registerClass(MetaColumn._ns, MetaColumn.name, MetaColumn);
    MetaRegistry.registerClass(MetaColumnCollection._ns, MetaColumnCollection.name, MetaColumnCollection);
    MetaRegistry.registerClass(MetaViewColumnCollection._ns, MetaViewColumnCollection.name, MetaViewColumnCollection);
    MetaRegistry.registerClass(MetaTableColumnCollection._ns, MetaTableColumnCollection.name, MetaTableColumnCollection);
    MetaRegistry.registerClass(MetaEntity._ns, MetaEntity.name, MetaEntity);
    MetaRegistry.registerClass(MetaRow._ns, MetaRow.name, MetaRow);
    MetaRegistry.registerClass(MetaRowCollection._ns, MetaRowCollection.name, MetaRowCollection);
    MetaRegistry.registerClass(MetaSet._ns, MetaSet.name, MetaSet);
    MetaRegistry.registerClass(MetaTable._ns, MetaTable.name, MetaTable);
    MetaRegistry.registerClass(MetaTableCollection._ns, MetaTableCollection.name, MetaTableCollection);
    MetaRegistry.registerClass(MetaView._ns, MetaView.name, MetaView);
    MetaRegistry.registerClass(MetaViewCollection._ns, MetaViewCollection.name, MetaViewCollection);
    MetaRegistry.registerClass(TransactionQueue._ns, TransactionQueue.name, TransactionQueue);
    MetaRegistry.registerClass(Observer._ns, Observer.name, Observer);
    MetaRegistry.registerClass(CustomError._ns, CustomError.name, CustomError);
    
    console.log(MetaRegistry.ns.list.join('\n'));
    
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
Util.CustomError

*/

    console.log(0);

    //==============================================================
    // 5. module export
    if (isNode) {     
        // exports.MetaRow = MetaRow;
        // exports.MetaRowCollection = MetaRowCollection;
    } else {
        // _global._L.MetaRow = MetaRow;
        // _global._L.MetaRowCollection = MetaRowCollection;
        // // namespace
        // _global._L.Meta.Entity.MetaRow = MetaRow;
        // _global._L.Meta.Entity.MetaRowCollection = MetaRowCollection;
    }

}(typeof window !== 'undefined' ? window : global));
