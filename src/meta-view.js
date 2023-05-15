/**
 * namespace _L.Meta.Entity.MetaView
 * namespace _L.Meta.Entity.MetaViewCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaObject;
    var MetaEntity;
    var MetaViewColumnCollection;
    var PropertyCollection;

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
        MetaEntity              = require('./meta-entity');
        MetaViewColumnCollection  = require('./meta-column').MetaViewColumnCollection;
        PropertyCollection  = require('./collection-property');
    } else {    // COVER:
        Util                = _global._L.Common.Util;
        MetaObject          = _global._L.Meta.MetaObject;
        MetaEntity              = _global._L.Meta.Entity.MetaEntity;
        MetaViewColumnCollection  = _global._L.Meta.Entity.MetaViewColumnCollection;
        PropertyCollection  = _global._L.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof MetaEntity === 'undefined') throw new Error('[MetaEntity] module load fail...');
    if (typeof MetaViewColumnCollection === 'undefined') throw new Error('[MetaViewColumnCollection] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaView  = (function (_super) {
        /**
         * 뷰 엔티티
         * @constructs _L.Meta.Entity.MetaView
         * @extends _L.Meta.Entity.MetaEntity
         * @param {*} p_name 
         * @param {*} p_baseEntity 
         */
        function MetaView(p_name, p_baseEntity) {
            _super.call(this, p_name);

            var refCollection;

            if (p_baseEntity && p_baseEntity instanceof MetaObject && p_baseEntity.instanceOf('MetaEntity')) {
                refCollection = p_baseEntity.columns;
            }
            
            this._refEntity = p_baseEntity;
            
            this._refEntities = [];

            this.columns = new MetaViewColumnCollection(this, refCollection);
        }
        Util.inherits(MetaView, _super);

        /**
         * 뷰 엔티티에 참조를 등록한다.
         * @param {MetaEntity} p_entity 
         */
        MetaView.prototype._regRefer  = function(p_entity) {
            if (!(p_entity instanceof MetaEntity)) throw new Error('Only [p_entity] type "MetaEntity" can be added');
            if (this._refEntities.indexOf(p_entity) < 0) this._refEntities.push(p_entity);
        };
        
        // /** @override **/
        // MetaView.prototype.getTypes  = function() {
        //     var type = ['MetaView'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };
        
        // /** @override */
        // MetaView.prototype.getObject = function() {
        //     // TODO::
        // };

        /**
         * 뷰 엔티티를 복제한다.
         * @returns {*}
         */
        MetaView.prototype.clone  = function() {
            var clone = new MetaView(this.name);  // 뷰를 복제하면 참조타입 >> 엔티티타입으로 변경

            // 참조 복제 REVIEW::  필요성 검토 필요
            // for(var i = 0; i < this._refEntities.length; i++) {
            //     clone._refEntities.push(this._refEntities[i]);
            // }
           
            for(var i = 0; i < this.columns.count; i++) {
                clone.columns.add(this.columns[i].clone());
            }

            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone());
            }
            
            return clone;
        };        
        
        return MetaView;
    
    }(MetaEntity));
    
    //---------------------------------------
    var MetaViewCollection  = (function (_super) {
        /**
         * 뷰 엔티티 컬렉션
         * @constructs _L.Meta.Entity.MetaViewCollection
         * @extends _L.Meta.Entity.PropertyCollection
         * @param {*} p_owner 소유자 
         */
        function MetaViewCollection(p_owner) {    // COVER:
            _super.call(this, p_owner);

            this.elementType = MetaView;   // 컬렉션타입 설정
        }
        Util.inherits(MetaViewCollection, _super);

        /**
         * 뷰 컬렉션에 뷰 엔티티를 추가한다.
         * @param {string | MetaView} p_object 
         * @param {?MetaColumnCollection} p_baseEntity
         * @returns {MetaView} 등록한 아이템
         * @example
         *  - string                    : 생성후   string      이름으로 등록 
         *  - string, colltion          : 생성후   string      이름으로  등록 (collection보냄)
         *  - entityView                :         entityView  이름으로 등록
         *  - entityView, collection    :         entityView  이름으로 등록 (collection보냄) => 오류발생
         */
        MetaViewCollection.prototype.add  = function(p_object, p_baseEntity) {    // COVER:

            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new MetaView(i_name, p_baseEntity);
            } else if (p_object instanceof MetaView) {
                if (p_baseEntity) throw new Error(' MetaView 객체와 refEntity객체를 동시에 입력할 수 없습니다. !!');
                i_name  = p_object.name;
                i_value = p_object;
            } else {
                throw new Error('string | MetaView object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return MetaViewCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports.MetaView = MetaView;
        module.exports.MetaViewCollection = MetaViewCollection;
    } else {    // COVER:
        _global._L.MetaView = MetaView;
        _global._L.MetaViewCollection = MetaViewCollection;
        // namespace
        _global._L.Meta.Entity.MetaView = MetaView;
        _global._L.Meta.Entity.MetaViewCollection = MetaViewCollection;
    }

}(typeof window !== 'undefined' ? window : global));