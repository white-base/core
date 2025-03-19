/**** collection-array.js | ArrayCollection ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';    
import Util from './util.js';
import Type from './type.js';
import IArrayCollection from './i-collection-array.js';
import MetaRegistry from './meta-registry.js';
import MetaObject from './meta-object.js';
import {BaseCollection} from './base-collection.js';

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!IArrayCollection) throw new Error(Message.get('ES011', ['IArrayCollection', 'i-collection-array']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
if (!BaseCollection) throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));

//==============================================================
// 3. module implementation
var ArrayCollection  = (function (_super) {
    /**
     * 배열 컬렉션을 생성합니다.
     * @constructs ArrayCollection
     * @implements {IArrayCollection}
     * @extends BaseCollection
     * @param {object} [p_owner] 소유 객체
     */
    function ArrayCollection(p_owner) {
        _super.call(this, p_owner);

        this.$KEYWORD = ['insertAt'];

        Util.implements(ArrayCollection, this);     // strip:
    }
    Util.inherits(ArrayCollection, _super);
    
    ArrayCollection._UNION = [IArrayCollection];
    ArrayCollection._NS = 'Collection';     // namespace
    ArrayCollection._PARAMS = ['_owner'];   // creator parameter

    // local function
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }
    
    /**
     * 배열 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
     * @protected
     * @param {number} p_pos 인덱스 위치
     * @returns {boolean}
     */
    ArrayCollection.prototype._remove = function(p_pos) {
        var count = this.count - 1;   // [idx] 포인트 이동
        
        this.$elements.splice(p_pos, 1);
        this.$descriptors.splice(p_pos, 1);
        
        if (p_pos < count) {
            for (var i = p_pos; i < count; i++) {   // 참조 변경(이동)
                var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                Object.defineProperty(this, [i], desc);
            }
            delete this[count];     // 마지막 idx 삭제
        } else {
            delete this[p_pos];     // idx 삭제 (끝일 경우)
        }
        return true;
    };
    Object.defineProperty(ArrayCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * 배열 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
     * (순환참조는 $ref 값으로 대체된다.)  
     * @param {number} [p_vOpt=0] 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
     * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
     * @returns {object}  guid 타입 객체
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    ArrayCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        if (this.$descriptors.length > 0) {
            obj['_desc'] = [];
            for (var i = 0; i < this.$descriptors.length; i++) {
                obj['_desc'].push(this.$descriptors[i]);
            }
        }
        obj['_elem'] = [];
        for (var j = 0; j < this.$elements.length; j++) {
            var elem = this.$elements[j];
            if (elem instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(elem, owned)) {
                    obj['_elem'].push(MetaRegistry.createReferObject(elem));
                } else obj['_elem'].push(elem.getObject(vOpt, owned));
            } else obj['_elem'].push(elem);
        }
        return obj;                        
    };
    Object.defineProperty(ArrayCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * 직렬화(guid 타입) 객체를 배열 컬렉션 객체에 설정합니다.  
     * (객체는 초기화 된다.)
     * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
     * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    ArrayCollection.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        var origin = p_origin ? p_origin : p_oGuid;

        if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
            for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                this.$descriptors.push(p_oGuid['_desc'][i]);
            }
        }
        for(var j = 0; j < p_oGuid['_elem'].length; j++) {
            Object.defineProperty(this, [j], this._getPropDescriptor(j));
        }

        for(var k = 0; k < p_oGuid['_elem'].length; k++) {
            var elem = p_oGuid['_elem'][k];
            if (MetaRegistry.isGuidObject(elem)) {
                var obj = MetaRegistry.createMetaObject(elem, origin);
                obj.setObject(elem, origin);
                this.$elements.push(obj);
                
            } else if (elem['$ref']) {
                var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                if (!meta) throw new ExtendError(/EL04211/, null, [k, elem['$ref']]);
                this.$elements.push(meta);  
            
            } else this.$elements.push(elem);
        }
    };        
    Object.defineProperty(ArrayCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * 배열 컬렉션에 요소를 추가합니다.
     * @param {any} p_elem 요소
     * @param {object} [p_desc] 프로퍼티 기술자 객체
     * @returns {number} 추가한 인덱스
     */
    ArrayCollection.prototype.add = function(p_elem, p_desc) {
        var pos = this.count;
        this.insertAt(pos, p_elem, p_desc);
        return pos;
    };
    Object.defineProperty(ArrayCollection.prototype, 'add', {
        enumerable: false
    });

    /**
     * 배열 컬렉션을 초기화 합니다.
     * 대상 : _element =[], _descriptors = []  
     */
    ArrayCollection.prototype.clear = function() {
        // this._onClear();    // event
        if (this._onClear() === false) return -1;

        for (var i = 0; i < this.count; i++) delete this[i];
        this.$elements = [];
        this.$descriptors = [];
        
        this._onCleared();    // event
    };
    Object.defineProperty(ArrayCollection.prototype, 'clear', {
        enumerable: false
    });

    /**
     * 배열 컬렉션의 지정위치에 요소를 추가합니다.
     * @param {number} p_pos 인덱스 위치
     * @param {any} p_elem 요소
     * @param {object} [p_desc] 프로퍼티 기술자 객체
     * @returns {boolean} 
     */
    ArrayCollection.prototype.insertAt = function(p_pos, p_elem, p_desc) {
        try {
            var index   = this.count;

            if (typeof p_pos !== 'number') throw new ExtendError(/EL04212/, null, [typeof p_pos]);
            if (index < p_pos) throw new ExtendError(/EL04213/, null, [p_pos, index]);
            if (p_pos < 0) throw new ExtendError(/EL04214/, null, [p_pos]);
            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
            if (_isObject(p_desc) && p_desc.configurable === false) {
                console.warn(Message.get('WS011', ['configurable = false', 'element']));
                // Message.warn('WS011', ['configurable = false', 'element']); 
            }
            if (_isObject(p_desc) && p_desc.writable === false ) {
                console.warn(Message.get('WS011', ['writable = false', 'element']));
                // Message.warn('WS011', ['writable = false', 'element']);
            }

            if (this._onAdd(p_elem, p_pos) === false) return false;

            // data process
            this.$elements.splice(p_pos, 0, p_elem);            
            this.$descriptors.splice(p_pos, 0, p_desc);
            // property define
            if (_isObject(p_desc)) {
                Object.defineProperty(this, [p_pos], p_desc);
            } else {
                Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
            }
            // reindexing
            for (var i = p_pos + 1; i < this.count; i++) {
                var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                Object.defineProperty(this, [i], desc);
            }
            this._onAdded(p_elem, p_pos);
            
            return true;

        } catch (error) {
            throw new ExtendError(/EL04215/, error, [p_pos, p_elem]);
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'insertAt', {
        enumerable: false
    });

    /**
     * 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
     * @param {Function} callback 콜백함수 (currentValue, index, array) => any[]
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     * @returns  {Array}
     */
    ArrayCollection.prototype.map  = function(callback, thisArg) {
        var newArr = [];

        if (typeof callback != 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
    
        for (var i = 0; i < this.length; i++) {
            newArr[i] = callback.call(thisArg || this, this[i], i, this._list);
        }
        return newArr;
    };
    Object.defineProperty(ArrayCollection.prototype, 'map', {
        enumerable: false
    });

    /**
     * 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다
     * @param {Function} callback 콜백함수 (currentValue, index, array) => any[]
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     * @returns  {Array}
     */
    ArrayCollection.prototype.filter = function (callback, thisArg) {
        let newArr = [];

        if (typeof callback != 'function') throw new ExtendError(/EL04117/, null, [typeof callback]);

        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg || this, this[i], i, this._list)) {
                newArr.push(this[i]);
            }
        }
        return newArr;
    };
    Object.defineProperty(ArrayCollection.prototype, 'filter', {
        enumerable: false
    });

    /**
     * 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
     * @param {Function} callback 콜백함수 (accumulator, currentValue, index, array) => any
     * @param {any} initialValue 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용합니다.
     * @returns  {any}
     */
    ArrayCollection.prototype.reduce = function(callback, initialValue) {
        var acc = initialValue;

        if (typeof callback != 'function') throw new ExtendError(/EL04118/, null, [typeof callback]);

        for(let i=0; i < this.length; i++) {
            acc = acc ? callback(acc, this[i], i, this._list) : this[i];
        }
        return acc;
    }
    Object.defineProperty(ArrayCollection.prototype, 'reduce', {
        enumerable: false
    });

    /**
     * 제공된 테스트 함수를 만족하는 첫 번째 요소를 반환합니다
     * @param {Function} callback 콜백함수 (currentValue, index, array) => any
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     * @returns  {any}
     */
    ArrayCollection.prototype.find = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL04119/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            if ( callback.call(thisArg || this, this[i], i, this._list) ) {
            return this[i];
            }
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'find', {
        enumerable: false
    });

    /**
     * 각 요소에 대해 제공된 함수를 한 번씩 실행합니다.
     * @param {Function} callback 콜백함수 (currentValue, index, array) => void
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     */
    ArrayCollection.prototype.forEach = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041110/, null, [typeof callback]);
        
        for (var i = 0; i <this.length; i++) {
            callback.call(thisArg || this, this[i], i, this._list);
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'forEach', {
        enumerable: false
    });

    /**
     * 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 
     * @param {Function} callback 콜백함수 (currentValue, index, array) => boolean
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     * @returns  {boolean}
     */
    ArrayCollection.prototype.some = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041111/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            if (callback.call(thisArg || this, this[i], i, this._list)) return true;
        }
        return false;
    };
    Object.defineProperty(ArrayCollection.prototype, 'some', {
        enumerable: false
    });

    /**
     * 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트합니다. 
     * @param {Function} callback 콜백함수 (currentValue, index, array) => boolean
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     * @returns  {boolean}
     */
    ArrayCollection.prototype.every = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041112/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            if (!callback.call(thisArg || this, this[i], i, this._list)) return false;
            }
            return true;
    };
    Object.defineProperty(ArrayCollection.prototype, 'every', {
        enumerable: false
    });

    /**
     * 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 
     * @param {Function} callback 콜백함수 (currentValue, index, array) => number
     * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
     * @returns  {any}
     */
    ArrayCollection.prototype.findIndex = function(callback, thisArg) {
        if (typeof callback != 'function') throw new ExtendError(/EL041113/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            if ( callback.call(thisArg || this, this[i], i, this._list) ) {
            return i;
            }
        }
        return -1;
    };
    Object.defineProperty(ArrayCollection.prototype, 'findIndex', {
        enumerable: false
    });


    return ArrayCollection;

}(BaseCollection));

//==============================================================
// 4. module export
export default ArrayCollection;
export {ArrayCollection};