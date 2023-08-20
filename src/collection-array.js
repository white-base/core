/**
 * namespace _L.Collection.ArrayCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var BaseCollection;
    var IArrayCollection;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};
    _global._L.Collection    = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                = require('./util');
        IArrayCollection = require('./i-collection-array').IArrayCollection;
        BaseCollection      = require('./collection-base').BaseCollection;
    } else {    
        Util                = _global._L.Common.Util;
        IArrayCollection = _global._L.Interface.IArrayCollection;
        BaseCollection      = _global._L.Collection.BaseCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IArrayCollection === 'undefined') throw new Error('[IArrayCollection] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ArrayCollection  = (function (_super) {
        /**
         * 배열타입 컬렉션 클래스
         * @constructs _L.Collection.ArrayCollection
         * @implements {_L.Interface.IArrayCollection}
         * @extends _L.Collection.BaseCollection
         * @param {Object} p_owner 소유객체
         */
        function ArrayCollection(p_owner) {
            _super.call(this, p_owner);

            Util.implements(this, IArrayCollection);
        }
        Util.inherits(ArrayCollection, _super);

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        ArrayCollection.prototype.getObject  = function() {
            var obj = _super.prototype.getObject.call(this);

            obj.elementType = this.elementType;
            obj._elem = [];
            for (var i = 0; i < this._element.length; i++) {
                var elem = this._element[i];
                if (elem instanceof MetaObject) obj._elem.push(elem.getObject());
                else obj._elem.push(elem);
            }
            return obj;                        
        };

        /**
         * TODO: setObject 시점에 초기화 해야함
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        ArrayCollection.prototype.setObject  = function(mObj) {
            _super.prototype.setObject.call(this, mObj);
            
            this.clear();
            for(var i = 0; i < mObj._elem.length; i++) {
                var elem = mObj._elem[i];
                if (elem['_guid'] && elem['_type']) {   // REVIEW: add() 통해서 생성되는 데이터 타입도 검사해야함
                    this.add(elem);
                    this[i].setObject(elem);
                } else {
                    this.add(elem);
                }
            }
            // TODO: add(desc) 이것도 별도로 저장해둬야 함
            // obj.metaName = mObj.name;
        };


        /**
         * 배열속성 컬렉션을 삭제한다.(내부처리) [구현]
         * @protected
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype._remove = function(p_idx) {
            var count = this._element.length - 1;   // [idx] 포인트 이동
            
            this._element.splice(p_idx, 1);
            
            if (p_idx < count) {
                // 참조 변경(이동)
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));   // REVIEW: 기존에 desc 복사해야함!
                }
                delete this[count];                      // 마지막 idx 삭제
            } else {
                delete this[p_idx];                      // idx 삭제 (끝일 경우)
            }
        };

        /**
         * 배열속성 컬렉션을 추가한다. [구현]
         * @param {*} p_value [필수] 속성값
         * @returns {boolean} 처리결과
         */
        ArrayCollection.prototype.add = function(p_value, p_desc) {
            // // var typeName;
            // var index   = this._element.length;
            
            // // if (typeof p_value === 'undefined') throw new Error('p_value param request fail...');
            // if (this.elementType.length > 0) Util.validType(p_value, this.elementType);
            // // index = this._element.length;
            // // before event
            // this._onChanging();
            // this._onAdd(index, p_value);
            // // process
            // this._element.push(p_value);
            // if (typeof p_desc === 'object') {
            //     Object.defineProperty(this, [index], p_desc);
            // } else {
            //     Object.defineProperty(this, [index], this._getPropDescriptor(index));
            // }
            // // after event
            // this._onChanged();
            // return true;

            return this.insertAt(this._element.length, p_value, p_desc);
        };

                /**
         * 지정 위치에 삽입
         * @param {*} p_pos 
         * @param {*} p_value 
         * @param {*} p_desc 
         * @returns 
         */
        ArrayCollection.prototype.insertAt = function(p_pos, p_value, p_desc) {
            var index   = this._element.length;
            
            if (typeof p_pos !== 'number') throw new Error('Only [p_idx] type "number" can be added');
            if (index < p_pos) throw new Error('[p_pos] size 를 초과하였습니다.');
            if (p_pos < 0) throw new Error('[p_pos] 0 보다 작을 수 없습니다.');
            if (this.elementType.length > 0) Util.validType(p_value, this.elementType);
            // before event
            this._onChanging();
            this._onAdd(p_pos, p_value);
            // process
            this._element.splice(p_pos, 0, p_value);            

            if (typeof p_desc === 'object') {
                Object.defineProperty(this, [p_pos], p_desc);
            } else {
                Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
            }
            // index 재정렬
            for (var i = p_pos + 1; i < this._element.length; i++) {
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
            }

            // after event
            this._onChanged();
            return true;
        };

        /**
         * 배열속성 컬렉션을 전체삭제한다. [구현]
         */
        ArrayCollection.prototype.clear = function() {
            // before evnet
            this._onChanging();
            // process
            for (var i = 0; i < this._element.length; i++) delete this[i];
            this._element = [];
            // after event
            this._onClear();
            this._onChanged();
        };



        return ArrayCollection;

    }(BaseCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ArrayCollection = ArrayCollection;
    } else {    
        _global._L.ArrayCollection = ArrayCollection;
        _global._L.Collection.ArrayCollection = ArrayCollection;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));