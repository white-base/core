/**** base-collection.js | _L.Collection.BaseCollection ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';
import Util from './util.js';
import Type from './type.js';
import EventEmitter from './event-emitter.js';
import ICollection from './i-collection.js';
import IList from './i-list.js';
import MetaRegistry from './meta-registry.js';
import MetaObject from './meta-object.js';

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!EventEmitter) throw new Error(Message.get('ES011', ['EventEmitter', 'event-emitter']));
if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));
if (!IList) throw new Error(Message.get('ES011', ['IList', 'i-list']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

//==============================================================
// 3. module implementation
var BaseCollection  = (function (_super) {
    /**
    * 기본 컬렉션을 생성합니다.
    * @abstract
    * @extends _L.Meta.MetaObject
    * @constructs _L.Collection.BaseCollection
    * @implements {_L.Interface.ICollection}
    * @implements {_L.Interface.IList}
    * @param {object} [p_owner] 소유객체
    */
    function BaseCollection(p_owner) { 
        _super.call(this);
        
        // private variable
        var $event = new EventEmitter();
        var $elements = [];
        var $descriptors = [];
        var $KEYWORD = [];
        
        // protected variable
        var _owner ;
        var _elemTypes  = [];

        /** 
         * 이벤트 객체입니다.
         * @private
         * @member {EventEmitter} _L.Collection.BaseCollection#$event  
         */
        Object.defineProperty(this, '$event', 
        {
            get: function() { return $event; },
            configurable: false,
            enumerable: false,
        });

        /**
         * 컬렉션 요소들입니다.
         * @private
         * @member {string} _L.Meta.Entity.BaseColumn#$elements
         */
        Object.defineProperty(this, '$elements',
        {
            get: function() { return $elements; },
            set: function(nVal) { $elements = nVal; },
            configurable: false,
            enumerable: false,
        });

        /**
         * 컬렉션 요소의 기술자들 (getter, setter)입니다.
         * @private
         * @member {string} _L.Meta.Entity.BaseColumn#$descriptors
         */
        Object.defineProperty(this, '$descriptors',
        {
            get: function() { return $descriptors; },
            set: function(nVal) { $descriptors = nVal; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 예약어입니다.
         * @private
         * @member {array<string>}  _L.Collection.BaseCollection#$KEYWORD
         */
        Object.defineProperty(this, '$KEYWORD', 
        {
            get: function() { return $KEYWORD; },
            set: function(newVal) { $KEYWORD = $KEYWORD.concat(newVal); },  // REVIEW: 예약어 중복
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 소유자입니다.
         * @protected 
         * @member {object} _L.Collection.BaseCollection#_owner  
         */
        Object.defineProperty(this, '_owner', 
        {   
            get: function() { return _owner; },
            set: function(val) { _owner = val; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 요소의 타입 제약조건입니다.
         * @protected 
         * @member {array<any>}  _L.Collection.BaseCollection#_elemTypes  
         */
        Object.defineProperty(this, '_elemTypes', 
        {
            get: function() { return _elemTypes; },
            set: function(val) {
                var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                var reg = /^_[a-zA-Z]+_/;
                var arr1 = arrType.length > 0 && typeof arrType[0] === 'string' ? arrType[0] : '';
                
                // var result;
                if (arrType.length > 0  && reg.exec(arr1) === null) arrType = ['_req_'].concat(arrType);
                    
                // result = reg.exec(val);
                // if (result !== null) return result[0].toUpperCase();
                _elemTypes = arrType;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * 컬렉션 요소의 목록입니다.
         * @protected 
         * @readonly
         * @member {array}  _L.Collection.BaseCollection#_list  
         */
        Object.defineProperty(this, '_list', 
        {
            get: function() {
                var arr = [];
                for (var i = 0; i < $elements.length; i++) arr.push(this.$elements[i]);
                return arr;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * 컬렉션 요소의 갯수입니다.
         * @readonly
         * @member {number} _L.Collection.BaseCollection#count 
         */
        Object.defineProperty(this, 'count', 
        {
            get: function() { return this.$elements.length; },
            enumerable: false,
            configurable: false
        });

        /**
         * 컬렉션 요소의 갯수입니다.
         * @readonly
         * @member {number} _L.Collection.BaseCollection#length 
         */
        Object.defineProperty(this, 'length', 
        {
            get: function() { return this.$elements.length; },
            enumerable: false,
            configurable: false
        });


        /**
         * 컬렉션 요소를 추가 전에 발생하는 이벤트 입니다.
         * @event _L.Collection.BaseCollection#onAdd
         * @param {function}    p_callback
         * @param {number}      p_callback.p_idx 삭제하는 index
         * @param {any}         p_callback.p_elem 삭제하는 value
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onAdd', 
        {
            set: function(fun) { this.$event.on('add', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 요소를 추가한 후에 발생하는 이벤트입니다.
         * @event _L.Collection.BaseCollection#onAdded
         * @param {function}    p_callback
         * @param {number}      p_callback.p_idx 삭제하는 index
         * @param {any}         p_callback.p_elem 삭제하는 value
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onAdded', 
        {
            set: function(fun) { this.$event.on('added', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 요소를 삭제하기 전에 발생하는 이벤트입니다.
         * @event _L.Collection.BaseCollection#onRemove
         * @param {function}    p_callback
         * @param {number}      p_callback.p_idx 삭제하는 index
         * @param {any}         p_callback.p_elem 삭제하는 value
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onRemove', 
        {
            set: function(fun) { this.$event.on('remove', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 요소를 삭제한 후에 발생하는 이벤트입니다.
         * @event _L.Collection.BaseCollection#onRemoved
         * @param {function}    p_callback
         * @param {number}      p_callback.p_idx 삭제하는 index
         * @param {any}         p_callback.p_elem 삭제하는 value
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onRemoved', 
        {
            set: function(fun) { this.$event.on('removed', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         *컬렉션을 초기화하기 전에 발생하는 이벤트입니다.
            * @event _L.Collection.BaseCollection#onClear
            * @param {function}    p_callback
            * @param {this}        p_callback.p_this 현재 컬렉션
            */
        Object.defineProperty(this, 'onClear', 
        {
            set: function(fun) { this.$event.on('clear', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션을 초기화한 후에 발생하는 이벤트입니다.
         * @event _L.Collection.BaseCollection#onCleared
         * @param {function}    p_callback
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onCleared', 
        {
            set: function(fun) { this.$event.on('cleared', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 요소를 변경하기 전에 발생하는 이벤트 입니다.
         * @event _L.Collection.BaseCollection#onChanging 
         * @param {function}    p_callback
         * @param {number}      p_callback.p_idx 삭제하는 index
         * @param {any}         p_callback.p_elem 삭제하는 value
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onChanging', 
        {
            set: function(fun) { this.$event.on('changing', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * 컬렉션 요소를 변경한 후에 발생하는 이벤트 입니다.
         * @event _L.Collection.BaseCollection#onChanged 
         * @param {function}    p_callback
         * @param {number}      p_callback.p_idx 삭제하는 index
         * @param {any}         p_callback.p_elem 삭제하는 value
         * @param {this}        p_callback.p_this 현재 컬렉션
         */
        Object.defineProperty(this, 'onChanged', 
        {
            set: function(fun) { this.$event.on('changed', fun); },
            configurable: false,
            enumerable: false,
        });

        // object settging
        this._owner = p_owner || null;

        // 예약어 등록
        this.$KEYWORD = ['$event', '_owner', '$elements', '$descriptors', '_elemTypes', '_list', 'count', 'length', '$KEYWORD'];
        this.$KEYWORD = ['onAdd', 'onAdded', 'onRemove', 'onRemoved', 'onClear', 'onCleared', 'onChanging', 'onChanged'];
        this.$KEYWORD = ['_onAdd', '_onAdded', '_onRemove', '_onRemoved', '_onClear', '_onCleared', '_onChanging', '_onChanged'];
        this.$KEYWORD = ['_getPropDescriptor', 'getObject', 'setObject', '_guid', '_type'];
        this.$KEYWORD = ['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'add', 'clear'];

        Util.implements(BaseCollection, this);          // strip:
    }
    Util.inherits(BaseCollection, _super);
    
    BaseCollection._UNION = [ICollection, IList];
    BaseCollection._NS = 'Collection';
    BaseCollection._PARAMS = ['_owner'];
    BaseCollection._KIND = 'abstract';
    
    /**
     * onAdd 이벤트를 발생시킵니다.
     * @param {any} p_elem 요소
     * @param {number} p_idx 인덱스 번호
     * @listens _L.Collection.BaseCollection#onAdd
     */
    BaseCollection.prototype._onAdd = function(p_elem, p_idx) {
        return this.$event.emit('add', p_elem, p_idx, this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onAdd', {
        enumerable: false
    });

    /**
     * onAdded 이벤트를 발생시킵니다.
     * @param {any} p_elem 요소
     * @param {number} p_idx 인덱스 번호
     * @listens _L.Collection.BaseCollection#onAdded
     */
    BaseCollection.prototype._onAdded = function(p_elem, p_idx) {
        return this.$event.emit('added', p_elem, p_idx, this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onAdded', {
        enumerable: false
    });

    /**
     * onRemove 이벤트를 발생시킵니다.
     * @param {any} p_elem 요소
     * @param {number} p_idx 인덱스 번호
     * @listens _L.Collection.BaseCollection#onRemove
     */
    BaseCollection.prototype._onRemove = function(p_elem, p_idx) {
        return this.$event.emit('remove', p_elem, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onRemove', {
        enumerable: false
    });

    /**
     * onRemoved 이벤트를 발생시킵니다.
     * @param {any} p_elem 요소
     * @param {number} p_idx 인덱스 번호
     * @listens _L.Collection.BaseCollection#onRemoved
     */
    BaseCollection.prototype._onRemoved = function(p_elem, p_idx) {
        return this.$event.emit('removed', p_elem, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onRemoved', {
        enumerable: false
    });

    /** 
     * onClear 이벤트를 발생시킵니다.
     * @listens _L.Collection.BaseCollection#onClear
     */
    BaseCollection.prototype._onClear = function() {
        return this.$event.emit('clear', this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onClear', {
        enumerable: false
    });

    /** 
     * onCheared 이벤트를 발생시킵니다.
     * @listens _L.Collection.BaseCollection#onCleared
     */
    BaseCollection.prototype._onCleared = function() {
        return this.$event.emit('cleared', this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onCleared', {
        enumerable: false
    });

    /** 
     * onChanging 이벤트를 발생시킵니다.
     * @param {any} p_nVal 변경값
     * @param {any} p_oVal 기존값
     * @param {number} p_idx 인덱스 번호
     * @listens _L.Collection.BaseCollection#onChanging
     */
    BaseCollection.prototype._onChanging = function(p_nVal, p_oVal, p_idx) {
        return this.$event.emit('changing', p_nVal, p_oVal, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onChanging', {
        enumerable: false
    });

    /** 
     * onChanged 이벤트를 발생시킵니다.
     * @param {any} p_nVal 변경값
     * @param {any} p_oVal 기존값
     * @param {number} p_idx 인덱스 번호
     * @listens _L.Collection.BaseCollection#onChanged
     */        
    BaseCollection.prototype._onChanged = function(p_nVal, p_oVal, p_idx) {
        return this.$event.emit('changed', p_nVal, p_oVal, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onChanged', {
        enumerable: false
    });

    /**
     * 컬렉션에 요소를 추가할 때 설정되는 기본 기술자입니다.
     * @protected
     * @param {number} p_idx 인덱스 번호
     */
    BaseCollection.prototype._getPropDescriptor = function(p_idx, p_enum) {
        if (typeof p_enum !== 'boolean') p_enum = true;
        return {
            get: function() { return this.$elements[p_idx]; },
            set: function(nVal) {
                var oVal = this.$elements[p_idx];
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], nVal);
                this._onChanging(nVal, oVal, p_idx);  // before event
                this.$elements[p_idx] = nVal;
                this._onChanged(nVal, oVal, p_idx);   // after event
            },
            configurable: true,
            enumerable: p_enum,
        };
    };
    Object.defineProperty(BaseCollection.prototype, '_getPropDescriptor', {
        enumerable: false
    });

    /** 
     * 컬렉션의 요소를 삭제합니다. (내부 사용)
     * @abstract 
     */
    BaseCollection.prototype._remove  = function() {
        throw new ExtendError(/EL04111/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * 컬렉션 객체를 직렬화(guid 타입) 객체로 반환합니다.  
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
    BaseCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
        var _elems = [];
        
        if (!Type.deepEqual(this.$event['$storage'], {})) {
            obj['$storage'] = this.$event.$storage;
        }
        if (vOpt < 2 && vOpt > -1 && this._owner) {
            obj['_owner'] = MetaRegistry.createReferObject(this._owner);
        }
        for (var i = 0; i < this._elemTypes.length; i++) {
            var elem = this._elemTypes[i];
            if (typeof elem === 'function') _elems.push(MetaRegistry.createNsReferObject(elem));
            else _elems.push(elem);
        }
        obj['_elemTypes'] = _elems;
        return obj;                        
    };
    Object.defineProperty(BaseCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
     * (객체는 초기화 된다.)
     * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
     * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        
        var owner;
        var origin = p_origin ? p_origin : p_oGuid;
        
        this.clear();
        if (p_oGuid['$storage']) {
            this.$event.$storage = p_oGuid['$storage'];
        }
        if (p_oGuid['_owner']) {
            owner = MetaRegistry.findSetObject(p_oGuid['_owner']['$ref'], origin);
            if (!owner) throw new ExtendError(/EL04112/, null, [p_oGuid['_owner']['$ref']]);    // Branch:
            this._owner = owner;            
        }
        if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
            this._elemTypes = p_oGuid['_elemTypes'];
        }
    };
    Object.defineProperty(BaseCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * 컬렉션에 요소를 삭제합니다.
     * @param {any} p_elem 요소
     * @returns {number} 삭제한 인덱스 번호
     */
    BaseCollection.prototype.remove = function(p_elem) {
        var idx = this.$elements.indexOf(p_elem);

        if (idx >= 0 && this.removeAt(idx)) return idx;
        return -1;
    };
    Object.defineProperty(BaseCollection.prototype, 'remove', {
        enumerable: false
    });
    
    /**
     * 컬렉션에서 지정된 위치의 요소를 삭제합니다.
     * @param {number} p_pos 인덱스 번호
     * @returns {boolean} 처리 결과  
     */
    BaseCollection.prototype.removeAt = function(p_pos) {
        var elem;
        
        if (typeof p_pos !== 'number') throw new ExtendError(/EL04113/, null, [typeof p_pos]);
        if (p_pos < 0 ) return false;
        
        elem = this.$elements[p_pos];
        if (this.$elements.length > p_pos) {
            // this._onRemove(p_pos, elem);
            if (typeof this._onRemove(elem, p_pos) === 'undefined') return false;

            if (!this._remove(p_pos)) return false;
            this._onRemoved(elem, p_pos);
            return true;
        }
        return false;
    };
    Object.defineProperty(BaseCollection.prototype, 'removeAt', {
        enumerable: false
    });

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param {any} p_elem 요소
     * @returns {boolean}
     */
    BaseCollection.prototype.contains = function(p_elem) {
        return this.$elements.indexOf(p_elem) > -1;
    };
    Object.defineProperty(BaseCollection.prototype, 'contains', {
        enumerable: false
    });

    /**
     *  컬렉션에서 요소를 조회합니다.
     * @param {any} p_elem 요소
     * @returns {number} 0 보다 작으면 존재하지 않음
     */
    BaseCollection.prototype.indexOf = function(p_elem) {
        return this.$elements.indexOf(p_elem);
    };
    Object.defineProperty(BaseCollection.prototype, 'indexOf', {
        enumerable: false
    });

    /** 
     * 컬렉션에 요소를 추가합니다.
     * @abstract 
     */
    BaseCollection.prototype.add  = function() {
        throw new ExtendError(/EL04114/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, 'add', {
        enumerable: false
    });
    
    /**
     * 컬렉션을 초기화 합니다.
     * @abstract 
     */
    BaseCollection.prototype.clear  = function() {
        throw new ExtendError(/EL04115/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, 'clear', {
        enumerable: false
    });

    return BaseCollection;
    
}(MetaObject));

//==============================================================
// 4. module export
export default BaseCollection;
// export { BaseCollection };