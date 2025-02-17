/**** collection-property.js | _L.Collection.PropertyCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                                   // strip:
        var _Message                    = require('./message').Message;                             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;                    // strip:
        var _Type                       = require('./type').Type;                                   // strip:
        var _Util                       = require('./util').Util;                                   // strip:
        var _IPropertyCollection        = require('./i-collection-property').IPropertyCollection;   // strip:
        var _BaseCollection             = require('./base-collection').BaseCollection;              // strip:
        var _MetaObject                 = require('./meta-object').MetaObject;                      // strip:
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;                  // strip:
    }                                                                                               // strip:
    var $Message                    = _global._L.Message;               // modify:
    var $ExtendError                = _global._L.ExtendError;           // modify:
    var $Type                       = _global._L.Type;                  // modify:
    var $Util                       = _global._L.Util;                  // modify:
    var $IPropertyCollection        = _global._L.IPropertyCollection;   // modify:
    var $BaseCollection             = _global._L.BaseCollection;        // modify:
    var $MetaObject                 = _global._L.MetaObject;            // modify:
    var $MetaRegistry               = _global._L.MetaRegistry;          // modify:

    var Message                 = _Message              || $Message;                                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;                            // strip:
    var Type                    = _Type                 || $Type;                                   // strip:
    var Util                    = _Util                 || $Util;                                   // strip:
    var IPropertyCollection     = _IPropertyCollection  || $IPropertyCollection;                    // strip:
    var BaseCollection          = _BaseCollection       || $BaseCollection;                         // strip:
    var MetaObject              = _MetaObject           || $MetaObject;                             // strip:
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;                           // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IPropertyCollection) throw new Error(Message.get('ES011', ['IPropertyCollection', 'i-collection-property']));
    if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (!BaseCollection) throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));
    
    //==============================================================
    // 3. module implementation   
    var PropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션을 생성합니다.
         * @constructs _L.Collection.PropertyCollection
         * @implements {_L.Interface.IPropertyCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} p_owner 소유 객체
         */
        function PropertyCollection(p_owner) {
            _super.call(this, p_owner); 

            var $keys = [];

            /**
             * 내부 변수 접근
             * @member {string} _L.Collection.PropertyCollection#$keys
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$keys',
            {
                get: function() { return $keys; },
                set: function(nVal) { $keys = nVal; },
                configurable: false,
                enumerable: false,
            });

            // /** 
            //  * 컬렉션 요소의 키값들
            //  * @readonly
            //  * @member {array<string>} _L.Collection.PropertyCollection#_keys 
            //  */
            // Object.defineProperty(this, '_keys',
            // {
            //     get: function() {
            //         var arr = [];
            //         for (var i = 0; i < _keys.length; i++) arr.push(_keys[i]);
            //         return arr;
            //     },
            //     configurable: false,
            //     enumerable: false
            // });

            // 예약어 등록 
            this.$KEYWORD = ['$keys', 'indexOf', 'exist', 'indexToKey'];

            Util.implements(PropertyCollection, this);      // strip:
        }
        Util.inherits(PropertyCollection, _super);
        
        PropertyCollection._UNION = [IPropertyCollection];
        PropertyCollection._NS = 'Collection';      // namespace
        PropertyCollection._PARAMS = ['_owner'];    // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }

        /**
         * 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
         * @protected
         * @param {number} p_pos 인덱스 위치
         * @returns {boolean} 
         */
        PropertyCollection.prototype._remove = function(p_pos) {
            var count = this.count - 1;
            var propName = this.indexToKey(p_pos);   // number 검사함
            
            delete this[propName];      // 프로퍼티 삭제

            this.$elements.splice(p_pos, 1);
            this.$keys.splice(p_pos, 1);
            this.$descriptors.splice(p_pos, 1);
            
            if (p_pos < count) {        // 참조 자료 변경
                for (var i = p_pos; i < count; i++) {
                    // var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                    propName = this.indexToKey(i);
                    Object.defineProperty(this, [i], this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i, false));
                    Object.defineProperty(this, propName, this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i));
                }
                delete this[count];     // 마지막 idx 삭제
            } else {
                delete this[p_pos];     // idx 삭제 (끝일 경우)
            }
            return true;
        };
        Object.defineProperty(PropertyCollection.prototype, '_remove', {
            enumerable: false
        });

        /**
         * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
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
        PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
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
            for (var i = 0; i < this.count; i++) {
                var elem = this.$elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }
            obj['_key'] = [];
            for (var i = 0; i < this.$keys.length; i++) {
                var key = this.$keys[i];
                obj['_key'].push(key);
            }
            return obj;                        
        };
        Object.defineProperty(PropertyCollection.prototype, 'getObject', {
            enumerable: false
        });

        /**
         * 직렬화(guid 타입) 객체를 프로퍼티 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) throw new ExtendError(/EL04221/, null, [p_oGuid['_elem'].length, p_oGuid['_key'].length]);
            
            if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
                if (p_oGuid['_elem'].length !== p_oGuid['_desc'].length) throw new ExtendError(/EL04222/, null, [p_oGuid['_elem'].length, p_oGuid['_desc'].length]);
                for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                    this.$descriptors.push(p_oGuid['_desc'][i]);
                }
            }

            this.$keys = [];
            for(var i = 0; i < p_oGuid['_key'].length; i++) {
                var key = p_oGuid['_key'][i];
                this.$keys.push(key);
                Object.defineProperty(this, [i], this._getPropDescriptor(i, false));
                Object.defineProperty(this, key, this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.$elements.push(obj);
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) throw new ExtendError(/EL04223/, null, [i, elem['$ref']]);
                    this.$elements.push(meta);
                    
                } else this.$elements.push(elem);
            }
        };
        Object.defineProperty(PropertyCollection.prototype, 'setObject', {
            enumerable: false
        });

        // /**
        //  * 프로퍼티 컬렉션의 인덱스 값을 조회합니다.
        //  * @param {string | any} p_target 키 또는 요소
        //  * @param {boolean} [p_isKey=false] 키로 조회 여부
        //  * @returns {number} 없을시 -1
        //  */
        // PropertyCollection.prototype.indexOf = function(p_target, p_isKey) {
        //     var isKey = p_isKey || false;
            
        //     if (!isKey) return this.$elements.indexOf(p_target);
        //     else {
        //         if (!_isString(p_target))  throw new ExtendError(/EL04224/, null, [typeof p_target]);
        //         return this.$keys.indexOf(p_target);
        //     }
        // };
        
        /**
         * 프로퍼티 컬렉션에 요소를 추가합니다.
         * @param {string} p_key 키
         * @param {any} [p_elem] 요소
         * @param {object} [p_desc] 기술자
         * @returns {number} index 번호
         */
        PropertyCollection.prototype.add = function(p_key, p_elem, p_desc) {
            try {
                var index   = this.count;
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
                // var types = ['_req_'];

                // types = [types.concat(this._elemTypes)];
                
                if (!_isString(p_key)) throw new ExtendError(/EL04225/, null, [p_key]);
                if(!regex.test(p_key)) throw new ExtendError(/EL04226/, null, [p_key, regex.source]);
                if (this.$KEYWORD.indexOf(p_key) > -1) throw new ExtendError(/EL04227/, null, [p_key]);
                if (this.exist(p_key)) throw new ExtendError(/EL04228/, null, [p_key]);
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
                // if (this._elemTypes.length > 0) Util.matchType(types, p_elem);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                        Message.warn('WS011', ['configurable = true', 'element']);
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = true', 'element']);
                }

                // this._onAdd(index, p_elem);
                if (typeof this._onAdd(p_elem, index) === 'undefined') return -1;

                // data process
                this.$elements.push(p_elem);
                this.$keys.push(p_key);
                this.$descriptors.push(p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [index], p_desc);
                    Object.defineProperty(this, p_key, p_desc);
                } else {
                    Object.defineProperty(this, [index], this._getPropDescriptor(index, false));
                    Object.defineProperty(this, p_key, this._getPropDescriptor(index));
                }
                this._onAdded(p_elem, index);

                return index;

            } catch (error) {
                throw new ExtendError(/EL04229/, error, [p_key, p_elem]);
            }
        };
        Object.defineProperty(PropertyCollection.prototype, 'add', {
            enumerable: false
        });

        /**
         * 프로러티 컬렉션을 초기화 합니다.
         * - 대상 : _element = [], _descriptors = [], _keys = []  
         * - 이벤트는 초기화 되지 않습니다.
         */
        PropertyCollection.prototype.clear = function() {
            // this._onClear();
            if (typeof this._onClear() === 'undefined') return -1;
            
            for (var i = 0; i < this.count; i++) {
                var propName = this.indexToKey(i);
                delete this[i];
                delete this[propName];
            }
            this.$elements = [];
            this.$descriptors = [];
            this.$keys = [];
            
            this._onCleared();
        };
        Object.defineProperty(PropertyCollection.prototype, 'clear', {
            enumerable: false
        });
    
        /**
         * 프로퍼티 컬렉션키의 인덱스 값을 조회합니다.
         * @param {string} p_key 키
         * @returns {number} 없을시 -1
         */
        PropertyCollection.prototype.keyToIndex = function(p_key) {
            if (!_isString(p_key))  throw new ExtendError(/EL04224/, null, [typeof p_key]);
            return this.$keys.indexOf(p_key);
        };
        Object.defineProperty(PropertyCollection.prototype, 'keyToIndex', {
            enumerable: false
        });

        /**
         * 프로퍼티 컬렉션의 인덱스에 대한 키값을 조회합니다.
         * @param {number} p_idx 인덱스 값
         * @returns {string}
         */
        PropertyCollection.prototype.indexToKey = function(p_idx) {
            if (typeof p_idx !== 'number') throw new ExtendError(/EL0422A/, null, [typeof p_idx]);
            return this.$keys[p_idx];
        };
        Object.defineProperty(PropertyCollection.prototype, 'indexToKey', {
            enumerable: false
        });

        /**
         * 프로퍼티 컬렉션의 키 존재하는지 확인합니다.
         * @param {string} p_key 키
         * @returns {boolean}
         */
        PropertyCollection.prototype.exist = function(p_key) {
            if (!_isString(p_key)) throw new ExtendError(/EL0422B/, null, [typeof p_key]);
            return Object.prototype.hasOwnProperty.call(this, p_key);
        };
        Object.defineProperty(PropertyCollection.prototype, 'exist', {
            enumerable: false
        });


        /**
         * 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
         * @param {Function} callback 콜백함수 (currentValue, index, array) => any[]
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         * @returns  {Array}
         */
        PropertyCollection.prototype.map  = function(callback, thisArg) {
            var newArr = [];

            if (typeof callback != 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
     
            for (var i = 0; i < this.length; i++) {
              var key = this.indexToKey(i);
              newArr[i] = callback.call(thisArg || this, this[i], i, key, this._list);
            }
            return newArr;
        };
        Object.defineProperty(PropertyCollection.prototype, 'map', {
            enumerable: false
        });

        /**
         * 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다
         * @param {Function} callback 콜백함수 (currentValue, index, array) => any[]
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         * @returns  {Array}
         */
        PropertyCollection.prototype.filter = function (callback, thisArg) {
            let newArr = [];

            if (typeof callback != 'function') throw new ExtendError(/EL04117/, null, [typeof callback]);

            for (let i = 0; i < this.length; i++) {
              var key = this.indexToKey(i);
              if (callback.call(thisArg || this, this[i], i, key, this._list)) {
                    newArr.push(this[i]);
                }
            }
            return newArr;
        };
        Object.defineProperty(PropertyCollection.prototype, 'filter', {
            enumerable: false
        });

        /**
         * 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
         * @param {Function} callback 콜백함수 (accumulator, currentValue, index, array) => any
         * @param {any} initialValue 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용합니다.
         * @returns  {any}
         */
        PropertyCollection.prototype.reduce = function(callback, initialValue) {
            var acc = initialValue;

            if (typeof callback != 'function') throw new ExtendError(/EL04118/, null, [typeof callback]);

            for(let i=0; i < this.length; i++) {
              var key = this.indexToKey(i);
              acc = acc ? callback(acc, this[i], i, key, this._list) : this[i];
            }
            return acc;
        }
        Object.defineProperty(PropertyCollection.prototype, 'reduce', {
            enumerable: false
        });

        /**
         * 제공된 테스트 함수를 만족하는 첫 번째 요소를 반환합니다
         * @param {Function} callback 콜백함수 (currentValue, index, array) => any
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         * @returns  {any}
         */
        PropertyCollection.prototype.find = function(callback, thisArg) {
            if (typeof callback != 'function') throw new ExtendError(/EL04119/, null, [typeof callback]);
            
            for (var i = 0; i < this.length; i++) {
              var key = this.indexToKey(i);
              if ( callback.call(thisArg || this, this[i], i, key, this._list) ) {
                return this[i];
              }
            }
        };
        Object.defineProperty(PropertyCollection.prototype, 'find', {
            enumerable: false
        });

        /**
         * 각 요소에 대해 제공된 함수를 한 번씩 실행합니다.
         * @param {Function} callback 콜백함수 (currentValue, index, array) => void
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         */
        PropertyCollection.prototype.forEach = function(callback, thisArg) {
            if (typeof callback != 'function') throw new ExtendError(/EL041110/, null, [typeof callback]);
            
            for (var i = 0; i <this.length; i++) {
              var key = this.indexToKey(i);
              callback.call(thisArg || this, this[i], i, key, this._list);
            }
        };
        Object.defineProperty(PropertyCollection.prototype, 'forEach', {
            enumerable: false
        });

        /**
         * 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 
         * @param {Function} callback 콜백함수 (currentValue, index, array) => boolean
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         * @returns  {boolean}
         */
        PropertyCollection.prototype.some = function(callback, thisArg) {
            if (typeof callback != 'function') throw new ExtendError(/EL041111/, null, [typeof callback]);
            
            for(var i=0; i < this.length; i++){
              var key = this.indexToKey(i);
              if (callback.call(thisArg || this, this[i], i, key, this._list)) return true;
            }
            return false;
        };
        Object.defineProperty(PropertyCollection.prototype, 'some', {
            enumerable: false
        });

        /**
         * 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트합니다. 
         * @param {Function} callback 콜백함수 (currentValue, index, array) => boolean
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         * @returns  {boolean}
         */
        PropertyCollection.prototype.every = function(callback, thisArg) {
            if (typeof callback != 'function') throw new ExtendError(/EL041112/, null, [typeof callback]);
            
            for(var i=0; i < this.length; i++){
              var key = this.indexToKey(i);
              if (!callback.call(thisArg || this, this[i], i, key, this._list)) return false;
              }
              return true;
        };
        Object.defineProperty(PropertyCollection.prototype, 'every', {
            enumerable: false
        });

        /**
         * 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 
         * @param {Function} callback 콜백함수 (currentValue, index, array) => number
         * @param {any} thisArg 콜백함수에서 this 로 사용됩니다.
         * @returns  {any}
         */
        PropertyCollection.prototype.findIndex = function(callback, thisArg) {
            if (typeof callback != 'function') throw new ExtendError(/EL041113/, null, [typeof callback]);
            
            for (var i = 0; i < this.length; i++) {
              var key = this.indexToKey(i);
                if ( callback.call(thisArg || this, this[i], i, key, this._list) ) {
                return i;
              }
            }
            return -1;
        };
        Object.defineProperty(PropertyCollection.prototype, 'findIndex', {
            enumerable: false
        });        

        return PropertyCollection;

    }(BaseCollection));

    //==============================================================
    // 4. module export
    if (isNode) exports.PropertyCollection  = PropertyCollection;    // strip:
    
    // create namespace
    _global._L.Collection                   = _global._L.Collection || {};

    _global._L.PropertyCollection = PropertyCollection;
    _global._L.Collection.PropertyCollection = PropertyCollection;

}(typeof window !== 'undefined' ? window : global));