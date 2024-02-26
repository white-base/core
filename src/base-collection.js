/**
 * namespace _L.Collection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Observer;    
    var Util;
    var ICollection;
    var IList;
    var MetaObject;
    var MetaRegistry;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
        Observer                    = require('./observer').Observer;
        ICollection                 = require('./i-collection').ICollection;
        IList                       = require('./i-list').IList;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        MetaObject                  = require('./meta-object').MetaObject;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        ICollection                 = _global._L.ICollection;
        IList                       = _global._L.IList;
        MetaRegistry                = _global._L.MetaRegistry;
        MetaObject                  = _global._L.MetaObject;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011' ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof Observer === 'undefined') throw new Error(Message.get('ES011', ['Observer', 'observer']));
    if (typeof ICollection === 'undefined') throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));
    if (typeof IList === 'undefined') throw new Error(Message.get('ES011', ['IList', 'i-list']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 4. module implementation
    var BaseCollection  = (function (_super) {

        /**
        * 컬렉션 최상위 클래스 (추상클래스)
        * @abstract
        * @extends _L.Meta.MetaObject
        * @constructs _L.Collection.BaseCollection
        * @implements {_L.Interface.ICollection}
        * @implements {_L.Interface.IList}
        * @param {object} p_owner 소유객체
        */
        function BaseCollection(p_owner) { 
            _super.call(this);
            
            // private variable
            var __event = new Observer(this, this);
            var _owner = p_owner || null;
            var _elements = [];
            var _descriptors = [];
            var _elemTypes  = []; 
            var __KEYWORD = [];

            /** 
             * 이벤트 객체
             * @private 
             * @member {Observer} _L.Collection.BaseCollection#__event  
             */
            Object.defineProperty(this, '__event', 
            {
                get: function() { return __event; },
                configurable: false,
                enumerable: false,
            });

             /** 
             * 컬렉션 소유 객체를 가져오거나, 설정합니다.
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
             * 컬렉션에 있는 요소를 목록으로 가져옵니다. (참조값)
             * @readonly
             * @member {array} _L.Collection.BaseCollection#_elements  
             */
            Object.defineProperty(this, '_elements', 
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션의 요소별 descriptor 기술자를 목록으로 가져옵니다. (참조값)
             * @readonly
             * @member {array} _L.Collection.BaseCollection#_descriptors  
             */
            Object.defineProperty(this, '_descriptors', 
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _descriptors.length; i++) arr.push(_descriptors[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소에 타입을 가져오거나, 지정합니다. (제약조건)
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
             * 컬렉션의 항목을 목록으로 가져옵니다. (참조값)
             * @readonly
             * @member {array}  _L.Collection.BaseCollection#list  
             */
            Object.defineProperty(this, 'list', 
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션에 있는 요소의 총수를 가져옵니다. (참조값)
             * @readonly
             * @member {number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() { return this._elements.length; },
                enumerable: false,
                configurable: false
            });
            
            /** 
             * 예약어, 이름 금지 키워드
             * @private
             * @member {array<string>}  _L.Collection.BaseCollection#__KEYWORD  
             */
            Object.defineProperty(this, '__KEYWORD', 
            {
                get: function() { return __KEYWORD; },
                set: function(p_val) { __KEYWORD = p_val; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션의 요소를 등록할 때 발생합니다.
             * @event _L.Collection.BaseCollection#onAdd
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_value 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdd', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'add'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션의 요소를 등록할 후 발생합니다.
             * @event _L.Collection.BaseCollection#onAdded
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_value 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdded', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'added'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션의 요소를 삭제할 때 발생합니다.
             * @event _L.Collection.BaseCollection#onRemove
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_value 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemove', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'remove'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션의 요소를 삭제 후 발생합니다.
             * @event _L.Collection.BaseCollection#onRemoved
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_value 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemoved', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'removed'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션이 초기화될 때 발생합니다.
             * @event _L.Collection.BaseCollection#onClear
             * @param {function}    p_callback
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onClear', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'clear'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션이 초기화된 후 발생합니다.
             * @event _L.Collection.BaseCollection#onCleared
             * @param {function}    p_callback
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onCleared', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'cleared'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션의 값이 변경될 때 발생합니다.
             * @event _L.Collection.BaseCollection#onChanging 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_value 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanging', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'changing'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 현재 컬렉션의 값이 변경된 후 발생합니다.
             * @event _L.Collection.BaseCollection#onChanged 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_value 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanged', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'changed'); },
                configurable: false,
                enumerable: false,
            });

            // inner variable access
            this.__GET$_elements = function(call) {
                if (call instanceof BaseCollection) return _elements;
            }
            this.__GET$_descriptors = function(call) {
                if (call instanceof BaseCollection) return _descriptors;
            }
            this.__SET$_elements = function(val, call) {
                if (call instanceof BaseCollection) _elements = val;
            }
            this.__SET$_descriptors = function(val, call) {
                if (call instanceof BaseCollection) _descriptors = val;
            }

            // 예약어 등록
            this.__KEYWORD = this.__KEYWORD.concat(['__event', '_owner', '_elements', '_descriptors', '_elemTypes', 'list', 'count', '__KEYWORD']);
            this.__KEYWORD = this.__KEYWORD.concat(['onAdd', 'onAdded', 'onRemove', 'onRemoved', 'onClear', 'onCleared', 'onChanging', 'onChanged']);
            this.__KEYWORD = this.__KEYWORD.concat(['_onAdd', '_onAdded', '_onRemove', '_onRemoved', '_onClear', '_onCleared', '_onChanging', '_onChanged']);
            this.__KEYWORD = this.__KEYWORD.concat(['_getPropDescriptor', 'getObject', 'setObject', '_guid', '_type']);
            this.__KEYWORD = this.__KEYWORD.concat(['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'add', 'clear']);

            Util.implements(BaseCollection, this);
        }
        Util.inherits(BaseCollection, _super);
        
        BaseCollection._UNION = [ICollection, IList];
        BaseCollection._NS = 'Collection';
        BaseCollection._PARAMS = ['_owner'];
        BaseCollection._KIND = 'abstract';
        
        /**
         * onRemove 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onAdd
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish('add', p_idx, p_value, this); 
        };

        /**
         * onRemove 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onAdded
         */
        BaseCollection.prototype._onAdded = function(p_idx, p_value) {
            this.__event.publish('added', p_idx, p_value, this); 
        };

        /**
         * onRemove 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_value) {
            this.__event.publish('remove', p_idx, p_value, this);
        };

        /**
         * onRemoved 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onRemoved
         */
        BaseCollection.prototype._onRemoved = function(p_idx, p_value) {
            this.__event.publish('removed', p_idx, p_value, this);
        };

        /** 
         * onClear 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish('clear', this); 
        };

        /** 
         * onCleared 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onCleared
         */
        BaseCollection.prototype._onCleared = function() {
            this.__event.publish('cleared', this); 
        };


        /** 
         * onChanging 이벤트 수신자 입니다.
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function(p_idx, p_value) {
            this.__event.publish('changing', p_idx, p_value, this); 
        };

        /** 
         *  현재 컬렉션의 값이 변경된 후 발생합니다.
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function(p_idx, p_value) {
            this.__event.publish('changed', p_idx, p_value, this); 
        };

        /**
         * 컬렉션 추가시 기본 기술자를 가져옵니다.
         * @protected
         * @param {number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this.__GET$_elements(this)[p_idx]; },
                set: function(nVal) {
                    // var types = ['_req_'];
                    // types = [types.concat(this._elemTypes)];
                    // if (this._elemTypes.length > 0) Util.matchType(types, nVal);
                    if (this._elemTypes.length > 0) Util.matchType([this._elemTypes], nVal);
                    this._onChanging(p_idx, nVal);  // before event
                    this.__GET$_elements(this)[p_idx] = nVal;
                    this._onChanged(p_idx, nVal);   // after event
                },
                configurable: true,
                enumerable: true,
            };
        };

        /** 
         * 컬렉션에서 지정된 요소를 제거합니다. (내부)
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new ExtendError(/ES013/, null, ['_remove(idx): boolean ']);
        };

        /**
         * 현재 객체의 guid 타입의 객체를 가져옵니다.  
         * - 순환참조는 $ref 값으로 대체된다.
         * @param {number} p_vOpt 가져오기 옵션
         * - opt = 0 : 참조 구조의 객체 (_guid: Yes, $ref: Yes)  
         * - opt = 1 : 소유 구조의 객체 (_guid: Yes, $ref: Yes)  
         * - opt = 2 : 소유 구조의 객체 (_guid: No,  $ref: No)   
         * 객체 비교 : equal(a, b)  
         * a.getObject(2) == b.getObject(2)   
         * @param {(object | array<object>)?} p_owned 현재 객체를 소유하는 상위 객체들
         * @returns {object}  
         */
        BaseCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            var _elems = [];
            
            if (!Util.deepEqual(this.__event['__subscribers'], this.__event._getInitObject())) {
                obj['__subscribers'] = this.__event.__subscribers;
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

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
         */
        BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var owner;
            var origin = p_origin ? p_origin : p_oGuid;
            
            this.clear();
            if (p_oGuid['__subscribers']) {
                this.__event.__SET$__subscribers(p_oGuid['__subscribers'], this.__event);
            }
            if (p_oGuid['_owner']) {
                owner = MetaRegistry.findSetObject(p_oGuid['_owner']['$ref'], origin);
                if (!owner) throw new ExtendError(/ES015/, null, [p_oGuid['name'], '_owner']);
                this._owner = owner;
            }
            if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
                this._elemTypes = p_oGuid['_elemTypes'];
            }
        };

        /**
         * 컬렉션에서 지정된 객체를 제거합니다.
         * @param {any} p_elem 속성명
         * @returns {number} 삭제한 인덱스
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this._elements.indexOf(p_elem);
            if (idx >= 0 && this.removeAt(idx)) return idx;
            return -1;
        };
        
        /**
         * 컬렉션에서 지정된 인덱스의 열을 제거합니다.
         * @param {number} p_idx 인덱스
         * @returns {boolean} 처리 결과  
         */
        BaseCollection.prototype.removeAt = function(p_idx) {
            var elem;
            
            if (typeof p_idx !== 'number') throw new ExtendError(/ES021/, null, ['idx', 'number']);
            elem = this._elements[p_idx];
            if (elem) {
                this._onRemove(p_idx, elem);
                if (!this._remove(p_idx)) return false;
                this._onRemoved(p_idx, elem);
                return true;
            }
            return false;
        };

        /**
         * 컬렉션에 이름이 지정된 열이 있는지 여부를 확인합니다.  
         * @param {object} p_elem 속성 객체
         * @returns {boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._elements.indexOf(p_elem) > -1;
        };

        /**
         * 지정된 요소의 인덱스를 가져옵니다.
         * @param {any} p_elem 속성 객체
         * @returns {number} 없을시 -1
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._elements.indexOf(p_elem);
        };

        /** 
         * 컬렉션에 지정된 요소를 추가합니다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new ExtendError(/ES013/, null, ['add(any): number']);
        };
        
        /**
         * 컬렉션을 초기화 합니다.  
         * @abstract 
         * @fires _L.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new ExtendError(/ES013/, null, ['clear()']);
        };

        return BaseCollection;
        
    }(MetaObject));
    
    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.BaseCollection = BaseCollection;
    } else {    
        _global._L.BaseCollection = BaseCollection;
        _global._L.Collection.BaseCollection = BaseCollection;      // namespace
    }

}(typeof window !== 'undefined' ? window : global));
