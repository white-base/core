/**
 * namespace _L.Meta.Entity.MetaTable
 * namespace _L.Meta.Entity.MetaTableCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaEntity;
    var PropertyCollection;
    var MetaTableColumnCollection;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                        = require('./util');
        MetaEntity                  = require('./meta-entity');
        PropertyCollection          = require('./collection-property');
        MetaTableColumnCollection   = require('./meta-column').MetaTableColumnCollection;
    } else {    
        Util                        = _global._L.Common.Util;
        MetaEntity                  = _global._L.Meta.Entity.MetaEntity;
        PropertyCollection          = _global._L.Collection.PropertyCollection;
        MetaTableColumnCollection   = _global._L.Meta.Entity.MetaTableColumnCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof MetaEntity === 'undefined') throw new Error('[MetaEntity] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof MetaTableColumnCollection === 'undefined') throw new Error('[MetaTableColumnCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaTable  = (function (_super) {
        /**
         * 테이블 엔티티
         * @constructs _L.Meta.Entity.MetaTable
         * @extends _L.Meta.Entity.MetaEntity
         * @param {*} p_name 
         */
        function MetaTable(p_name) {
            _super.call(this, p_name);

            this.columns = new MetaTableColumnCollection(this);
        }
        Util.inherits(MetaTable, _super);

        // /** @override **/
        // MetaTable.prototype.getTypes  = function() {
        //     var type = ['MetaTable'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };

        // /** @override */
        // MetaTable.prototype.getObject = function() {
        //     // TODO::
        // };

        /**
         * 테이블 엔티티를 복제한다.
         * @returns {*}
         */
        MetaTable.prototype.clone  = function() {
            var clone = new MetaTable(this.name);
            
            // columns 복제본 추가
            for(var i = 0; i < this.columns.count; i++) {
                clone.columns.add(this.columns[i].clone());
            }
            
            // rows 복제본 추가
            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone());
            }
            
            return clone;
        };

        MetaTable.prototype.acceptChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaTable.prototype.rejectChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaTable.prototype.getChanges  = function() {
            console.log('구현해야함');  // COVER:
        };

        return MetaTable;
    
    }(MetaEntity));
    

     //---------------------------------------
     var MetaTableCollection  = (function (_super) {
        /**
         * 테이블 컬렉션
         * @constructs _L.Meta.Entity.MetaTableCollection
         * @extends _L.Collection.PropertyCollection
         * @param {*} p_owner 소유자 
         */
        function MetaTableCollection(p_owner) {   // COVER:
            _super.call(this, p_owner);

            this.elementType = MetaTable;   // 컬렉션타입 설정
        }
        Util.inherits(MetaTableCollection, _super);

        /**
         * 테이블 컬렉션에 엔티티 추가한다.
         * @param {String | MetaColumn} p_object 
         * @returns {MetaColumn} 등록한 아이템
         */
        MetaTableCollection.prototype.add  = function(p_object) { // COVER:
            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new MetaTable(i_name);
            } else if (p_object instanceof MetaTable) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error('string | MetaTable object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        return MetaTableCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports.MetaTable = MetaTable;
        module.exports.MetaTableCollection = MetaTableCollection;
    } else {    // COVER:
        _global._L.MetaTable = MetaTable;
        _global._L.MetaTableCollection = MetaTableCollection;
        // namespace
        _global._L.Meta.Entity.MetaTable = MetaTable;
        _global._L.Meta.Entity.MetaTableCollection = MetaTableCollection;
    }

}(typeof window !== 'undefined' ? window : global));