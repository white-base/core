/**
 * namespace _L.Meta.Entity.EntityTable
 * namespace _L.Meta.Entity.EntityTableCollection
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Meta          = global._L.Meta || {};
    global._L.Meta.Entity   = global._L.Meta.Entity || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var Entity;
    var PropertyCollection;
    var ItemTableCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        Entity              = require('./entity-base');
        PropertyCollection  = require('./collection-property');
        ItemTableCollection = require('./entity-item').ItemTableCollection;
    } else {    
        Util                = global._L.Common.Util;
        Entity              = global._L.Meta.Entity.Entity;
        PropertyCollection  = global._L.Collection.PropertyCollection;
        ItemTableCollection = global._L.Meta.Entity.ItemTableCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof Entity === 'undefined') throw new Error('[Entity] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof ItemTableCollection === 'undefined') throw new Error('[ItemTableCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var EntityTable  = (function (_super) {
        /**
         * 테이블 엔티티
         * @constructs _L.Meta.Entity.EntityTable
         * @extends _L.Meta.Entity.Entity
         * @param {*} p_name 
         */
        function EntityTable(p_name) {
            _super.call(this, p_name);

            this.items = new ItemTableCollection(this);
        }
        Util.inherits(EntityTable, _super);

        // /** @override **/
        // EntityTable.prototype.getTypes  = function() {
        //     var type = ['EntityTable'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };

        // /** @override */
        // EntityTable.prototype.getObject = function() {
        //     // TODO::
        // };

        /**
         * 테이블 엔티티를 복제한다.
         * @returns {*}
         */
        EntityTable.prototype.clone  = function() {
            var clone = new EntityTable(this.name);
            
            // items 복제본 추가
            for(var i = 0; i < this.items.count; i++) {
                clone.items.add(this.items[i].clone());
            }
            
            // rows 복제본 추가
            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone());
            }
            
            return clone;
        };

        return EntityTable;
    
    }(Entity));
    

     //---------------------------------------
     var EntityTableCollection  = (function (_super) {
        /**
         * 테이블 컬렉션
         * @constructs _L.Meta.Entity.EntityTableCollection
         * @extends _L.Collection.PropertyCollection
         * @param {*} p_owner 소유자 
         */
        function EntityTableCollection(p_owner) {   // COVER:
            _super.call(this, p_owner);

            this.elementType = EntityTable;   // 컬렉션타입 설정
        }
        Util.inherits(EntityTableCollection, _super);

        /**
         * 테이블 컬렉션에 엔티티 추가한다.
         * @param {String | Item} p_object 
         * @returns {Item} 등록한 아이템
         */
        EntityTableCollection.prototype.add  = function(p_object) { // COVER:
            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new EntityTable(i_name);
            } else if (p_object instanceof EntityTable) {
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error('string | EntityTable object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
        };
        
        return EntityTableCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.EntityTable = EntityTable;
        module.exports.EntityTableCollection = EntityTableCollection;
    } else {    // COVER:
        global._L.EntityTable = EntityTable;
        global._L.EntityTableCollection = EntityTableCollection;
        // namespace
        global._L.Meta.Entity.EntityTable = EntityTable;
        global._L.Meta.Entity.EntityTableCollection = EntityTableCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));