/**
 * namespace _L.Collection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
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
        Util                        = require('./util');
        Observer                    = require('./observer').Observer;
        ICollection                 = require('./i-collection').ICollection;
        IList                       = require('./i-list').IList;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        MetaObject                  = require('./meta-object').MetaObject;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        ICollection                 = _global._L.ICollection;
        IList                       = _global._L.IList;
        MetaRegistry                = _global._L.MetaRegistry;
        MetaObject                  = _global._L.MetaObject;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof Observer === 'undefined') Message.error('ES011', ['Observer', 'observer']);
    if (typeof ICollection === 'undefined') throw Message.error('ES011', ['ICollection', 'i-collection']);
    if (typeof IList === 'undefined') Message.error('ES011', ['IList', 'i-list']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);

    //==============================================================
    // 4. module implementation
    var BaseCollection  = (function (_super) {

        /**
        * 컬렉션 최상위 클래스 (추상클래스)
        * @abstract
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
            var _KEYWORD = [];

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
             * 컬렉션 소유 객체
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
             * 컬랙선 요소 [참조값]
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
             * 컬렉션 기술자 [참조값] 
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
             * 요소 타입 (제약조건)
             * @protected 
             * @member {array<any>}  _L.Collection.BaseCollection#_elemTypes  
             */
            Object.defineProperty(this, '_elemTypes', 
            {
                get: function() { return _elemTypes; },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elemTypes = arrType;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 목록 [참조값]
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
             * 컬렉션 갯수 
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
             * 예약어
             * @protected
             * @member {array<string>}  _L.Collection.BaseCollection#_KEYWORD  
             */
            Object.defineProperty(this, '_KEYWORD', 
            {
                get: function() { return _KEYWORD; },
                set: function(p_val) { _KEYWORD = p_val; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 등록 전 이벤트  
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
             * 등록 후 이벤트  
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
             * 삭제 전 이벤트
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
             * 삭제 후 이벤트
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
             * 전체 제거 전 이벤트
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
             * 전체 제거 후 이벤트
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
             * 변경 전 이벤트  
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
             * 변경 후 이벤트  
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
            this._KEYWORD = this._KEYWORD.concat(['__event', '_owner', '_elements', '_descriptors', '_elemTypes', 'list', 'count', '_KEYWORD']);
            this._KEYWORD = this._KEYWORD.concat(['onAddr', 'onRemove', 'onClear', 'onChanging', 'onChanged']);
            this._KEYWORD = this._KEYWORD.concat(['_onAdd', '_onRemove', '_onClear', '_onChanging', '_onChanged']);
            this._KEYWORD = this._KEYWORD.concat(['_getPropDescriptor']);
            this._KEYWORD = this._KEYWORD.concat(['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'exist', 'add', 'clear']);

            Util.implements(this, ICollection, IList);
        }
        Util.inherits(BaseCollection, _super);

        BaseCollection._NS = 'Collection';
        BaseCollection._PARAMS = ['_owner'];
        BaseCollection._ABSCRACT = true;
        
        /**
         * 추가 전 이벤트 수신자
         * @listens _L.Collection.BaseCollection#_onAdd
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish('add', p_idx, p_value, this); 
        };

        /**
         * 추가 후 이벤트 수신자
         * @listens _L.Collection.BaseCollection#_onAdded
         */
        BaseCollection.prototype._onAdded = function(p_idx, p_value) {
            this.__event.publish('added', p_idx, p_value, this); 
        };

        /**
         * 삭제 전 이벤트 수신자
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_value) {
            this.__event.publish('remove', p_idx, p_value, this);
        };

        /**
         * 삭제 후 이벤트 수신자
         * @listens _L.Collection.BaseCollection#onRemoved
         */
        BaseCollection.prototype._onRemoved = function(p_idx, p_value) {
            this.__event.publish('removed', p_idx, p_value, this);
        };

        /** 
         *  초기화 전 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish('clear', this); 
        };

        /** 
         *  초기화 후 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onCleared
         */
        BaseCollection.prototype._onCleared = function() {
            this.__event.publish('cleared', this); 
        };


        /** 
         *  변경(등록/삭제) 전 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function(p_idx, p_value) {
            this.__event.publish('changing', p_idx, p_value, this); 
        };

        /** 
         *  변경(등록/삭제) 후 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function(p_idx, p_value) {
            this.__event.publish('changed', p_idx, p_value, this); 
        };

        /**
         * 기본 프로퍼티 기술자 
         * @protected
         * @param {number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this.__GET$_elements(this)[p_idx]; },
                set: function(nVal) {
                    if (this._elemTypes.length > 0) Util.validType(nVal, this._elemTypes);
                    this._onChanging(p_idx, nVal);  // before event
                    this.__GET$_elements(this)[p_idx] = nVal;
                    this._onChanged(p_idx, nVal);   // after event
                },
                configurable: true,
                enumerable: true,
            };
        };

        /** 
         * 요소 제거 (내부)
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            Message.error('ES013', ['_remove(idx): boolean ']);
        };

        /**
         * guid 객체 얻기
         * @override
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
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
         * guid 객체 설정
         * @override
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
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
                if (!owner) Message.error('ES015', [p_oGuid['name'], '_owner']);
                this._owner = owner;
            }
            if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
                this._elemTypes = p_oGuid['_elemTypes'];
            }
        };

        /**
         * 컬렉션 요소 삭제
         * @param {any} p_elem 속성명
         * @returns {number} 삭제한 인덱스
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this._elements.indexOf(p_elem);
            if (idx >= 0 && this.removeAt(idx)) return idx;
            return -1;
        };
        
        /**
         * 인덱스 위치의 요소 삭제 
         * @param {number} p_idx 인덱스
         * @returns {boolean} 처리 결과  
         */
        BaseCollection.prototype.removeAt = function(p_idx) {
            var elem;
            
            if (typeof p_idx !== 'number') Message.error('ES021', ['idx', 'number']);
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
         * 켈렉션 요소 여부
         * @param {object} p_elem 속성 객체
         * @returns {boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._elements.indexOf(p_elem) > -1;
        };

        /**
         * 요소의 위치 조회
         * @param {any} p_elem 속성 객체
         * @returns {number} 없을시 -1
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._elements.indexOf(p_elem);
        };

        /** 
         * 컬렉션에 요소를 추가
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            Message.error('ES013', ['add(any): number']);
        };
        
        /**
         * 컬렉션 초기화
         * @abstract 
         * @fires _L.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            Message.error('ES013', ['clear()']);
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
