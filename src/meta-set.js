/**
 * namespace _L.Meta.Entity.MetaSet
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var ISchemaControl;
    var IAllControl;
    var ITransaction;
    var MetaElement;
    var MetaTableCollection;
    var MetaViewCollection;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};    
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                    = require('./util');
        ISchemaControl          = require('./i-control-schema').ISchemaControl;
        IAllControl             = require('./i-control-all').IAllControl;
        ITransaction            = require('./i-transaction').ITransaction;
        MetaElement             = require('./meta-element').MetaElement;
        MetaTableCollection     = require('./meta-table').MetaTableCollection;
        MetaViewCollection      = require('./meta-view').MetaViewCollection;
    } else {
        Util                    = _global._L.Common.Util;
        ISchemaControl           = _global._L.Interface.ISchemaControl;
        IAllControl             = _global._L.Interface.IAllControl;
        ITransaction            = _global._L.Interface.ITransaction;
        MetaElement             = _global._L.Meta.MetaElement;
        MetaTableCollection     = _global._L.Meta.Entity.MetaTableCollection;
        MetaViewCollection      = _global._L.Meta.Entity.MetaViewCollection;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ISchemaControl === 'undefined') throw new Error('[ISchemaControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');
    if (typeof ITransaction === 'undefined') throw new Error('[ITransaction] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof MetaTableCollection === 'undefined') throw new Error('[MetaTableCollection] module load fail...');
    if (typeof MetaViewCollection === 'undefined') throw new Error('[MetaViewCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaSet  = (function (_super) {
        /**
         * 엔티티
         * @constructs _L.Meta.Entity.MetaSet
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.ISchemaControl}
         * @implements {_L.Interface.IAllControl}
         * @implements {_L.Interface.ITransaction}
         * @param {*} p_name 
         */
        function MetaSet(p_name) {
            _super.call(this, p_name);

            var tables = new MetaTableCollection(this);
            var views  = new MetaViewCollection(this);

            /**
             * 메타 테이블 컬렉션
             * @member {MetaTableCollection} _L.Meta.Entity.MetaSet#tables
             */
            Object.defineProperty(this, 'tables', 
            {
                get: function() { return tables; },
                // set: function(newValue) { 
                //     if (!(newValue instanceof MetaTableCollection)) throw new Error('Only [tables] type "MetaTableCollection" can be added');
                //     tables = newValue;
                // },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 메타 뷰 컬렉션
             * @member {MetaViewCollection} _L.Meta.Entity.MetaSet#views
             */
            Object.defineProperty(this, 'views', 
            {
                get: function() { return views; },
                // set: function(newValue) {
                //     if (!(newValue instanceof MetaViewCollection)) throw new Error('Only [views] type "MetaViewCollection" can be added'); 
                //     views = newValue;
                // },
                configurable: false,
                enumerable: true
            });

            // this._implements(ISchemaControl, IAllControl);
            Util.implements(this, ISchemaControl, IAllControl, ITransaction);
        }
        Util.inherits(MetaSet, _super);

        MetaSet.prototype.clone  = function() {
            var clone = new MetaSet(this.name);
            
            for(var i = 0; i < this.tables.count; i++) {
                clone.tables.add(this.tables[i].clone());
            }

            for(var i = 0; i < this.views.count; i++) {
                clone.views.add(this.views[i].clone());
            }
            return clone;
        };

        MetaSet.prototype.load  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.clear  = function() {
            for(var i = 0; i < this.tables.count; i++) this.tables[i].clear();
            for(var i = 0; i < this.views.count; i++) this.views[i].clear();
        };

        MetaSet.prototype.reset  = function() {
            this.tables.clear();
            this.views.clear();
        };

        MetaSet.prototype.merge  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.read  = function(p_json) {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.write  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.readSchema  = function(p_json) {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.writeSchema  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.acceptChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        
        MetaSet.prototype.rejectChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        
        MetaSet.prototype.getChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        
        MetaSet.prototype.hasChanges  = function() {
            console.log('구현해야함');  // COVER:
        };

        return MetaSet;
    
    }(MetaElement));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        exports.MetaSet = MetaSet;
    } else {
        _global._L.MetaSet = MetaSet;
        _global._L.Meta.Entity.MetaSet = MetaSet;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));