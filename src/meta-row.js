/**
 * namespace _L.Meta.Entity.MetaRow
 * namespace _L.Meta.Entity.MetaRowCollection
 */
// var $local = {};

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaObject;
    var PropertyCollection;
    var ArrayCollection;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                = require('./util');
        MetaObject          = require('./meta-object');
        PropertyCollection  = require('./collection-property');
        ArrayCollection     = require('./collection-array');
    } else {    // COVER:
        Util                = _global._L.Common.Util;
        MetaObject          = _global._L.Meta.MetaObject;
        PropertyCollection  = _global._L.Collection.PropertyCollection;
        ArrayCollection     = _global._L.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof ArrayCollection === 'undefined') throw new Error('[ArrayCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaRow  = (function (_super) {
        /**
         * 로우
         * @constructs _L.Meta.Entity.MetaRow
         * @extends _L.Collection.PropertyCollection
         */
        function MetaRow(p_entity) {
            _super.call(this, p_entity);
            
            var __entity        = null;
            var itemName;

            // MetaEntity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaObject && p_entity.instanceOf('MetaEntity')) {
                __entity    = p_entity;

                for (var i = 0; i < __entity.items.count; i++) {
                    
                    // 별칭 가져오기로 수정함
                    // itemName = __entity.items[i].name;   
                    itemName = __entity.items[i].alias;
                    _super.prototype.add.call(this, itemName, null);
                }
            }

            /**
             * 로우의 소유 엔티티
             * @member {MetaEntity} _L.Meta.Entity.MetaRow#entity
             */
            Object.defineProperty(this, 'entity', 
            {
                get: function() { return __entity; },
                configurable: true,
                enumerable: true
            });            
        }
        Util.inherits(MetaRow, _super);

        // /** @override **/
        // MetaRow.prototype.getTypes  = function() {
        //     var type = ['MetaRow'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };

        /**
         * 로우를 복사한다. (생성 후 복제)
         * @param {Object} p_filter 필터객체
         */
        MetaRow.prototype.copy = function(p_filter) {   // COVER:
            var clone = new MetaRow(this.entity);
            
            if (this.value) clone['value'] = this.value;
        };
        
        /**
         * 로우를 복제한다.
         * @returns {MetaRow}
         */
        MetaRow.prototype.clone  = function() {
            var clone = new MetaRow(this.entity);
            var itemName;

            for (var i = 0; i < this.entity.items.count; i++) {
                itemName = this.entity.items[i].name;
                clone[itemName] = this[itemName];
            }

            return clone;
        };
        
        return MetaRow;
    
    }(PropertyCollection));
    
    //---------------------------------------
    var MetaRowCollection  = (function (_super) {
        /**
         * 로우 컬렉션
         * @constructs _L.Meta.Entity.MetaRowCollection
         * @extends _L.Collection.ArrayCollection
         * @param {*} p_owner 소유자 
         */
        function MetaRowCollection(p_owner) {
            _super.call(this, p_owner);

            this.elementType = MetaRow;   // 컬렉션타입 설정
        }
        Util.inherits(MetaRowCollection, _super);

        /**
         * 로우컬렉션에 로우를 추가한다.
         * @param {String | MetaColumn} p_row 
         * @returns {MetaRow} 등록한 로우
         */
        MetaRowCollection.prototype.add  = function(p_row) {
            var i_value;

            if (typeof p_row === 'undefined') {      
                i_value = new MetaRow(this._owner);
            } else if (p_row instanceof MetaRow) {
                i_value = p_row;
            } else {
                throw new Error('MetaRow | MetaRow object [p_row].');   // COVER:
            }

            return _super.prototype.add.call(this, i_value);
        };

        return MetaRowCollection;
        
    }(ArrayCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports.MetaRow = MetaRow;
        module.exports.MetaRowCollection = MetaRowCollection;
    } else {
        _global._L.MetaRow = MetaRow;
        _global._L.MetaRowCollection = MetaRowCollection;
        // namespace
        _global._L.Meta.Entity.MetaRow = MetaRow;
        _global._L.Meta.Entity.MetaRowCollection = MetaRowCollection;
    }

}(typeof window !== 'undefined' ? window : global));
