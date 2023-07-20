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
    var MetaEntity;
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
        MetaEntity              = require('./meta-entity').MetaEntity;
        MetaTableCollection     = require('./meta-table').MetaTableCollection;
        MetaViewCollection      = require('./meta-view').MetaViewCollection;
    } else {
        Util                    = _global._L.Common.Util;
        ISchemaControl           = _global._L.Interface.ISchemaControl;
        IAllControl             = _global._L.Interface.IAllControl;
        ITransaction            = _global._L.Interface.ITransaction;
        MetaElement             = _global._L.Meta.MetaElement;
        MetaEntity              = _global._L.Meta.Entity.MetaEntity;
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
    if (typeof MetaEntity === 'undefined') throw new Error('[MetaEntity] module load fail...');
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

        MetaSet.prototype._loadMetaSet = function(p_metaSet, p_option) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            var _this = this;

            if (!(p_metaSet instanceof MetaEntity)) throw new Error('Only [p_metaSet] type "MetaEntity" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            if (p_metaSet.tables) loadEntity(p_metaSet.tables, this.tables); 
            if (p_metaSet.views) loadEntity(p_metaSet.views, this.views); 


            function loadEntity(p_target, p_orignal) {
                if (!(p_target instanceof MetaTableCollection || p_target instanceof MetaViewCollection )) {
                    throw new Error('[p_target] 컬렉션이 아닙니다.');
                }
                for (var i = 0; i < p_target.count; i++) {
                    var key = p_target.keyOf(i);
                    if (p_orignal.exist(key))  throw new Error('기존에 entity 가 존재합니다.');
                    p_orignal._loadEntity(p_target[i], opt);
                }
            }
        };

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

        
        MetaSet.prototype.clear  = function() {
            for(var i = 0; i < this.tables.count; i++) this.tables[i].clear();
            for(var i = 0; i < this.views.count; i++) this.views[i].clear();
        };
        
        MetaSet.prototype.reset  = function() {
            this.tables.clear();
            this.views.clear();
        };
        
        MetaSet.prototype.load  = function(p_target, p_opt) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;

            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');
            
            if (p_target instanceof MetaSet) {
                this._loadMetaSet(p_target, opt);
            } else if (typeof p_target === 'object') {
                this.read(p_target, opt);
            } else {
                throw new Error('[p_target] 처리할 수 없는 타입입니다. ');
            }
        };

        MetaSet.prototype.read  = function(p_json, p_opt) {
            var metaSet = null;
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            
            if (typeof p_json !== 'object') throw new Error('Only [p_json] type "object" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            metaSet = p_json['metaSet'] || p_json['dataSet'] || p_json;

            if (opt % 2 === 1) this.readSchema(p_json, opt === 3 ? true : false); // opt: 1, 3
            if (Math.floor(opt / 2) >= 1) this.readData(p_json); // opt: 2, 3
        };

        MetaSet.prototype.write  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaSet.prototype.readSchema  = function(p_json) {
            var metaSet = null;
            
            metaSet = p_json['metaSet'] || p_json['dataSet'] || p_json;

            if (metaSet['tables']) createEntity(metaSet['tables'], this.tables);
            if (metaSet['views']) createEntity(metaSet['views'], this.views);
            return;

            function createEntity(p_entity, p_collec) {
                for (var key in p_entity) {
                    if (Object.hasOwnProperty.call(p_entity, key)) {
                        if (p_collec.exist(key)) throw new Error('"'+ key +'"가 존재하여, entity를 추가 할 수 없습니다.');
                        p_collec.add(key);
                        p_collec[key].readSchema(p_entity[key], true);
                    }
                }
            }
        };

        MetaSet.prototype.writeSchema  = function() {
            console.log('구현해야함');  // COVER:
        };

        /**
         * row 들을 불러 온다
         * @param {object} p_json object
         */
        MetaSet.prototype.readData  = function(p_json) {
            var metaSet = null;
            var rows;

            if (typeof metaSet !== 'object') throw new Error('Only [p_json] type "object" can be added');
            
            metaSet = p_json['metaSet'] || p_json['dataSet'] || p_json;
            
            if (metaSet['tables']) createRow(metaSet['tables'], this.tables);
            if (metaSet['views']) createRow(metaSet['views'], this.views);

            function createRow(p_entity, p_collec) {
                for (var key in p_entity) {
                    if (Object.hasOwnProperty.call(p_entity, key) && p_collec.exist(key)) {
                        p_collec[key].readData(p_entity[key]);
                    }
                }
            }
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