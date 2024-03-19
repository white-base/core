/**** base-collection.js | _L.Collection.BaseCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _Observer                   = require('./observer').Observer;
        var _ICollection                = require('./i-collection').ICollection;
        var _IList                      = require('./i-list').IList;
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;
        var _MetaObject                 = require('./meta-object').MetaObject;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Type                       = _global._L.Type;
        var $Util                       = _global._L.Util;
        var $Observer                   = _global._L.Observer;
        var $ICollection                = _global._L.ICollection;
        var $IList                      = _global._L.IList;
        var $MetaRegistry               = _global._L.MetaRegistry;
        var $MetaObject                 = _global._L.MetaObject;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Observer                = _Observer             || $Observer;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var ICollection             = _ICollection          || $ICollection;
    var IList                   = _IList                || $IList;
    var MetaObject              = _MetaObject           || $MetaObject;
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
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
        * 기본 컬렉션을 생성합니다.(최상위)
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
             * 컬렉션 소유자
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
             * 컬렉션 요소들
             * @readonly
             * @member {array<any>} _L.Collection.BaseCollection#_elements  
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
             * 컬렉션 요소의 기술들 (getter, setter)
             * @readonly
             * @member {array<any>} _L.Collection.BaseCollection#_descriptors  
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
             * 컬렉션 요소의 타입 (제약조건)
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
             * 컬렉션 요소의 목록
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
             * 컬렉션 요소의 갯수
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
             * 컬렉션 예약어
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
             * 컬렉션 요소를 추가 전에 발생하는 이벤트 입니다. 
             * @event _L.Collection.BaseCollection#onAdd
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdd', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'add'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 추가 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onAdded
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdded', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'added'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 삭제 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onRemove
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemove', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'remove'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 삭제 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onRemoved
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemoved', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'removed'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션을 초기화 전에 발생하는 이벤트 입니다.
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
             * 컬렉션을 초기화 후에 발생하는 이벤트 입니다.
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
             * 컬렉션 요소를 변경 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onChanging 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanging', 
            {
                set: function(fun) { this.__event.subscribe(fun, 'changing'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 변경 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onChanged 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
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
         * onAdd 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onAdd
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_elem) {
            this.__event.publish('add', p_idx, p_elem, this); 
        };

        /**
         * onAdded 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onAdded
         */
        BaseCollection.prototype._onAdded = function(p_idx, p_elem) {
            this.__event.publish('added', p_idx, p_elem, this); 
        };

        /**
         * onRemove 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_elem) {
            this.__event.publish('remove', p_idx, p_elem, this);
        };

        /**
         * onRemoved 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onRemoved
         */
        BaseCollection.prototype._onRemoved = function(p_idx, p_elem) {
            this.__event.publish('removed', p_idx, p_elem, this);
        };

        /** 
         * onClear 이벤트를 발생합니다.
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish('clear', this); 
        };

        /** 
         * onCheared 이벤트를 발생합니다.
         * @listens _L.Collection.BaseCollection#onCleared
         */
        BaseCollection.prototype._onCleared = function() {
            this.__event.publish('cleared', this); 
        };


        /** 
         * onChanging 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function(p_idx, p_elem) {
            this.__event.publish('changing', p_idx, p_elem, this); 
        };

        /** 
         * onChanged 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function(p_idx, p_elem) {
            this.__event.publish('changed', p_idx, p_elem, this); 
        };

        /**
         * 컬렉션에 요소를 추가 할 때 설정되는 기본 기술자입니다.
         * @protected
         * @param {number} p_idx 인덱스 번호
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this.__GET$_elements(this)[p_idx]; },
                set: function(nVal) {
                    // var types = ['_req_'];
                    // types = [types.concat(this._elemTypes)];
                    // if (this._elemTypes.length > 0) Util.matchType(types, nVal);
                    if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], nVal);
                    this._onChanging(p_idx, nVal);  // before event
                    this.__GET$_elements(this)[p_idx] = nVal;
                    this._onChanged(p_idx, nVal);   // after event
                },
                configurable: true,
                enumerable: true,
            };
        };

        /** 
         * 컬렉션의 요소를 삭제합니다. (내부)
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new ExtendError(/EL04111/, null, []);
        };

        /**
         * 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
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
            
            if (!Type.deepEqual(this.__event['__subscribers'], this.__event._getInitObject())) {
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
            if (p_oGuid['__subscribers']) {
                this.__event.__SET$__subscribers(p_oGuid['__subscribers'], this.__event);
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

        /**
         * 컬렉션에 요소를 삭제합니다.
         * @param {any} p_elem 요소
         * @returns {number} 삭제한 인덱스 번호
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this._elements.indexOf(p_elem);
            if (idx >= 0 && this.removeAt(idx)) return idx;
            return -1;
        };
        
        /**
         * 컬렉션의 지정위치에 요소를 삭제합니다. 
         * @param {number} p_pos 인덱스 번호
         * @returns {boolean} 처리 결과  
         */
        BaseCollection.prototype.removeAt = function(p_pos) {
            var elem;
            
            if (typeof p_pos !== 'number') throw new ExtendError(/EL04113/, null, [typeof p_pos]);
            elem = this._elements[p_pos];
            if (elem) {
                this._onRemove(p_pos, elem);
                if (!this._remove(p_pos)) return false;
                this._onRemoved(p_pos, elem);
                return true;
            }
            return false;
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @param {any} p_elem 요소
         * @returns {boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._elements.indexOf(p_elem) > -1;
        };

        /**
         * 컬렉션에 요소를 조회합니다.
         * @param {any} p_elem 요소
         * @returns {number} 0 보다 작으면 존재하지 않음
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._elements.indexOf(p_elem);
        };

        /** 
         * 컬렉션에 요소를 추가합니다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new ExtendError(/EL04114/, null, ['add(any): number']);
        };
        
        /**
         * 컬렉션을 초기화 합니다.
         * @abstract 
         * @fires _L.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new ExtendError(/EL04115/, null, ['clear()']);
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
