/**
 * namespace _L.Collection.BaseCollection
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
        MetaObject                  = require('./meta-object').MetaObject;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        ICollection                 = _global._L.ICollection;
        IList                       = _global._L.IList;
        MetaObject                  = _global._L.MetaObject;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof Observer === 'undefined') Message.error('ES011', ['Observer', 'observer']);
    if (typeof ICollection === 'undefined') throw Message.error('ES011', ['ICollection', 'i-collection']);
    if (typeof IList === 'undefined') Message.error('ES011', ['IList', 'i-list']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);

    //==============================================================
    // 4. module implementation
    var BaseCollection  = (function (_super) {

        /**
        * 컬렉션 최상위 클래스 (추상클래스)
        * @constructs _L.Collection.BaseCollection
        * @implements {_L.Interface.ICollection}
        * @param {Object} p_owner 소유객체
        */
        function BaseCollection(p_owner) { 
            _super.call(this);
            
            // private variable
            var __event = new Observer(this, this);
            var _owner = p_owner || null;
            var _elements = [];
            var _descriptors = [];
            var _KEYWORD = [];
            var _elemTypes  = []; 

            /** 
             * 이벤트 객체
             * @private 
             * @member {Object} _L.Collection.BaseCollection#__event  
             */
            Object.defineProperty(this, '__event', {
                get: function() { 
                    return __event;
                },
                configurable: false,
                enumerable: false,
            });

             /** 
             * 소유객체
             * @protected 
             * @member {Object} _L.Collection.BaseCollection#_owner  
             */
              Object.defineProperty(this, '_owner', {   
                  get: function() {
                      return _owner;
                    },
                    set: function(val) {
                        _owner = val;
                    },
                    configurable: false,
                    enumerable: false,
            });

            /** 
             * 컬랙선 내부값 
             * @protected 
             * @member {Array} _L.Collection.BaseCollection#_elements  
             */
            Object.defineProperty(this, '_elements', {
                get: function() {
                    return _elements;
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬랙선 내부값 
             * @protected 
             * @member {Array} _L.Collection.BaseCollection#_descriptors  
             */
            Object.defineProperty(this, '_descriptors', {
                get: function() {
                    return _descriptors;
                },
                configurable: false,
                enumerable: false,
            });

            
            /** 
             * 심볼 예약어 목록 
             * @protected
             * @member {Array}  _L.Collection.BaseCollection#_KEYWORD  
             */
             Object.defineProperty(this, '_KEYWORD', {
                get: function() { 
                    return _KEYWORD;
                },
                set: function(p_val) {
                    _KEYWORD = p_val;
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 요소타입
             * @member {Observer}  _L.Collection.BaseCollection#_elemTypes  
             */
            Object.defineProperty(this, '_elemTypes', {
                get: function() {
                    return _elemTypes;
                },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elemTypes = arrType;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 목록 
             * @member {Array}  _L.Collection.BaseCollection#list  
             */
            Object.defineProperty(this, 'list', {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬랙션 갯수 
             * @member {Number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', {
                get: function() {
                    return this._elements.length;
                },
                enumerable: false,
                configurable: false
            });
            

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _L.Collection.BaseCollection#onAdd 
             */
            Object.defineProperty(this, 'onAdd', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'add');
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 제거 이벤트
             * @event _L.Collection.BaseCollection#onRemove
             */
            Object.defineProperty(this, 'onRemove', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'remove');
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 전체 제거 이벤트
             * @event _L.Collection.BaseCollection#onClear
             */
            Object.defineProperty(this, 'onClear', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'clear');
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 변경(등록/삭제) 전 이벤트  
             * @event _L.Collection.BaseCollection#onChanging 
             */
            Object.defineProperty(this, 'onChanging', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'changing');
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _L.Collection.BaseCollection#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'changed');
                },
                configurable: false,
                enumerable: false,
            });

            // inner variable access
            this.__SET$_elements = function(val, call) {
                if (call instanceof BaseCollection) _elements = val;    // 상속접근 허용
            }
            this.__SET$_descriptors = function(val, call) {
                if (call instanceof BaseCollection) _descriptors = val;    // 상속접근 허용
            }
            // 예약어 등록
            this._KEYWORD = this._KEYWORD.concat(['__event', '_owner', '_elements', '_KEYWORD', '_elemTypes', 'list', 'count']);
            this._KEYWORD = this._KEYWORD.concat(['onAddr', 'onRemove', 'onClear', 'onChanging', 'onChanged']);
            this._KEYWORD = this._KEYWORD.concat(['_getPropDescriptor', '_onAdd', '_onRemove', '_onClear', '_onChanging', '_onChanged']);
            this._KEYWORD = this._KEYWORD.concat(['_remove', 'add', 'clear', 'remove', 'removeAt', 'indexOf', 'exist']);

            Util.implements(this, ICollection, IList);
        }
        Util.inherits(BaseCollection, _super);

        BaseCollection._NS = 'Collection';     // namespace
        BaseCollection._PARAMS = ['_owner'];    // creator parameter
        BaseCollection._ABSCRACT = true;
        

        /**
         * 추가 이벤트 수신자
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this.__event.publish('add', p_idx, p_value, this); 
        };

        /**
         * 삭제 이벤트 수신자
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_value) {
            this.__event.publish('remove', p_idx, p_value, this);
        };

        /** 
         *  전체삭제 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.__event.publish('clear', this); 
        };

        /** 
         *  변경(등록/삭제) 전 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function() {
            this.__event.publish('changing', this); 
        };

        /** 
         *  변경(등록/삭제) 후 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function() {
            this.__event.publish('changed', this); 
        };

        /**
         * 프로퍼티 기술자 설정
         * @protected
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._elements[p_idx]; },
                set: function(newValue) {
                    var typeName;
                    if (this._elemTypes.length > 0) Util.validType(newValue, this._elemTypes);
                    this._elements[p_idx] = newValue; 
                },
                configurable: true,
                enumerable: true,
            };
        };

        /** 
         * 컬렉션을 삭제한다.
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            Message.error('ES013', ['_remove(idx)']);
        };

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // BaseCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;
            
        //     if (!this._compare(this.__event.__subscribers, p_target.__event.__subscribers)) return false;
        //     if (!this._compare(this._owner, p_target._owner)) return false;
        //     if (!this._compare(this._elements, p_target._elements)) return false;
        //     if (!this._compare(this._descriptors, p_target._descriptors)) return false;
        //     if (!this._compare(this._elemTypes, p_target._elemTypes)) return false;
        //     return true;
        //     // for (var i = 0; i < this._descriptors.length; i++) {
        //     //     if (!this._compare(this._descriptors[i], p_target._descriptors[i])) return false;
        //     // }

        //     // if (!Util.deepEqual(this.__event.__subscribers, obj)) return false;
        //     // obj = p_target._caller;
        //     // if (this._caller instanceof MetaObject) {
        //     //     if (!this._caller.equal(obj)) return false;
        //     // } else if (typeof this._caller === 'object' && this._caller !== null) {
        //     //     if (!Util.deepEqual(this._caller, obj)) return false;
        //     // } else {
        //     //     this._caller === obj;
        //     // }

        //     // // 분기하여 검사하는 부분 함수로...
        //     // function compare(ob1, obj2) {
        //     //     if (obj1 instanceof MetaObject) {
        //     //         if (!obj1.equal(obj2)) return false;
        //     //     } else if (typeof obj1 === 'object' && this._caller !== null) {
        //     //         if (!Util.deepEqual(obj1, obj2)) return false;
        //     //     } else {
        //     //         return this._caller === obj2;
        //     //     }
        //     // }
            

        //     /**
        //      * 비교대상
        //      * __event
        //      * _owner : MetaObject인경우, object, 기본자료형, 함수형
        //      * _descriptors : arr<obj>
        //      * _elements : arr<obj | 기본형 | meta>
        //      * _elemType : arr<fun....>
        //      */

        //     /**
        //      * 비교방식
        //      * - MetaObject : equal()
        //      * - typeof === 'object' : deepEqual()
        //      * - 기본자료형 : ===
        //      * - array : 순환 
        //      * - 함수 : ===
        //      */
        //     // return this._name === p_target._name ? true : false;

        //     // inner function 
        //     // function deepEqual(obj1, obj2){}
        // };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        BaseCollection.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            var _elems = [];
            var vOpt = p_vOpt || 0;

            if (!Util.deepEqual(this.__event.__subscribers, this.__event._getInitObject())) {
                obj.__subscribers = this.__event.__subscribers;
            }
            if (vOpt < 2 && vOpt > -1 && this._owner) {
                obj._owner = MetaRegistry.createReferObject(this._owner);
            }
            
            for (var i = 0; i < this._elemTypes.length; i++) {
                var elem = this._elemTypes[i];
                if (typeof elem === 'function') _elems.push(MetaRegistry.createNsReferObject(elem));
                else _elems.push(elem);
            }
            obj._elemTypes = _elems;

            // obj._elem = [];
            // for (var i = 0; i < this._elements.length; i++) {
            //     var elem = this._elements[i];
            //     if (elem instanceof MetaObject) obj._elem.push(elem.getObject(p_vOpt));
            //     else obj._elem.push(elem);
            // }
            return obj;                        
        };

        BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var owner;
            var origin = p_origin ? p_origin : p_oGuid;
            
            this.clear();
            if (p_oGuid.__subscribers) {
                this.__event.__SET$__subscribers(p_oGuid.__subscribers, this.__event);
            }
            if (p_oGuid._owner) {
                owner = MetaRegistry.findSetObject(origin, p_oGuid._owner.$ref);
                if (!owner) Message.error('ES015', [p_oGuid.name, '_owner']);
                this._owner = owner;
            }
            if (Array.isArray(p_oGuid._elemTypes) && p_oGuid._elemTypes.length > 0){
                this._elemTypes = p_oGuid._elemTypes;
            }
        };

        

        

        /**
         * 컬렉션을 삭제한다.
         * @param {Object} p_elem 속성명
         * @returns {boolean} 처리결과
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this._elements.indexOf(p_elem);
            // return idx < 0 ? false : this.removeAt(idx);
            if (idx >= 0 && this.removeAt(idx)) return idx;
            return -1;
        };
        
        /**
         * 배열속성 삭제한다.
         * @param {Number} p_idx 인덱스
         * @returns {boolean} 처리 결과  
         */
        BaseCollection.prototype.removeAt = function(p_idx) {
            var elem;
            
            if (typeof p_idx !== 'number') Message.error('ES021', ['idx', 'number']);
            elem = this._elements[p_idx];
            if (this.exist(p_idx)) {
                // before event
                this._onChanging();
                // process
                if (this._remove(p_idx) > 0) return false;
                this._onRemove(p_idx, elem);
                // after event
                this._onChanged();
                return true;
            }
            return false;
        };

        /**
         * 배열속성 여부를 리턴한다. 
         * @param {Object} p_elem 속성 객체
         * @returns {Boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._elements.indexOf(p_elem) > -1;
        };

        /**
         * 배열속성 인덱스 찾는다.
         * @param {Object} p_elem 속성 객체
         * @returns {Number}
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._elements.indexOf(p_elem);
        };

        /**
         * 키 유무 조회
         * @param {number | string} p_key index, key
         * @returns
         */
        BaseCollection.prototype.exist = function(p_key) {
            if (typeof p_key === 'number' || typeof p_key === 'string') {
                return this.hasOwnProperty(p_key);
            }
            Message.error('ES021', ['key', 'number, string']);
        };

        /** 
         * 컬렉션을 추가한다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            Message.error('ES013', ['add(any): number']);
        };
        
        /**
         * 전체삭제(초기화)한다.
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
