/**
 * namespace _L.Collection.BaseCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var ICollection;
    var Observer;    
    var Util;
    
    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};  
    _global._L.Collection    = _global._L.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {
        Util                = require('./util');
        Observer            = require('./observer');
        ICollection         = require('./i-collection');
    } else {
        Util                = _global._L.Common.Util;
        Observer            = _global._L.Common.Observer;
        ICollection         = _global._L.Interface.ICollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현 
    
    var BaseCollection  = (function () {

        /**
        * 컬렉션 최상위 클래스 (추상클래스)
        * @constructs _L.Collection.BaseCollection
        * @implements {_L.Interface.ICollection}
        * @param {Object} p_owner 소유객체
        */
        function BaseCollection(p_owner) { 
            
            // private variable
            var _owner = p_owner || null;
            var _element = [];
            var _symbol = [];
            var _event = new Observer(this, this);
            var _elementType  = [];  

            /** 
             * 이벤트 객체
             * @private 
             * @member {Object} _L.Collection.BaseCollection#_event  
             */
            Object.defineProperty(this, '_event', {
                enumerable: false,
                configurable: false,
                get: function() { 
                    return _event;
                }
            });

             /** 
             * 소유객체
             * @protected 
             * @member {Object} _L.Collection.BaseCollection#_owner  
             */
              Object.defineProperty(this, '_owner', {   
                enumerable: true,
                configurable: false,
                get: function() {
                    return _owner;
                },
                set: function(val) {
                    _owner = val;
                }
            });

            /** 
             * 컬랙선 내부값 
             * @protected 
             * @member {Array} _L.Collection.BaseCollection#_element  
             */
            Object.defineProperty(this, '_element', {
                enumerable: true,
                configurable: false,
                get: function() {
                    return _element;
                },
                set: function(val) {
                    _element = val;
                }
            });

            /** 
             * 심볼 예약어 목록 
             * @protected
             * @member {Array}  _L.Collection.BaseCollection#_symbol  
             */
             Object.defineProperty(this, '_symbol', {
                enumerable: false,
                configurable: false,
                get: function() { 
                    return _symbol;
                },
                set: function(p_val) {
                    _symbol = p_val;
                }
            });

            /**
             * 컬렉션 목록 
             * @member {Array}  _L.Collection.BaseCollection#list  
             */
            Object.defineProperty(this, 'list', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return this._element;
                }
            });

            /**
             * 컬랙션 갯수 
             * @member {Number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', {
                enumerable: false,
                configurable: true,
                get: function() {
                    return this._element.length;
                }
            });

            /** 
             * 요소타입
             * @member {Observer}  _L.Collection.BaseCollection#elementType  
             */
            Object.defineProperty(this, 'elementType', {
                enumerable: true,
                configurable: false,
                get: function() {
                    return _elementType;
                },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elementType = arrType;
                }
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _L.Collection.BaseCollection#onAdd 
             */
            Object.defineProperty(this, 'onAdd', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'add');
                }
            });

            /** 
             * 제거 이벤트
             * @event _L.Collection.BaseCollection#onRemove
             */
            Object.defineProperty(this, 'onRemove', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'remove');
                }
            });

            /** 
             * 전체 제거 이벤트
             * @event _L.Collection.BaseCollection#onClear
             */
            Object.defineProperty(this, 'onClear', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'clear');
                }
            });

            /** 
             * 변경(등록/삭제) 전 이벤트  
             * @event _L.Collection.BaseCollection#onChanging 
             */
            Object.defineProperty(this, 'onChanging', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'changing');
                }
            });

            /** 
             * 변경(등록/삭제) 후 이벤트  
             * @event _L.Collection.BaseCollection#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                enumerable: false,
                configurable: true,
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'changed');
                }
            });

            // 예약어 등록
            this._symbol = this._symbol.concat(['_event', '_owner', '_element', '_symbol', 'elementType', 'list', 'count']);
            this._symbol = this._symbol.concat(['onAddr', 'onRemove', 'onClear', 'onChanging', 'onChanged']);
            this._symbol = this._symbol.concat(['_getPropDescriptor', '_onAdd', '_onRemove', '_onClear', '_onChanging', '_onChanged']);
            this._symbol = this._symbol.concat(['_remove', 'add', 'clear', 'remove', 'removeAt', 'indexOf', 'exist']);

            /** implements ICollection 인터페이스 구현 */
            //  this._implements(ICollection);
             Util.implements(this, ICollection);
        }
    
        /**
         * 프로퍼티 기술자 설정
         * @protected
         * @param {Number} p_idx 인덱스
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) {
                    var typeName;
                    if (this.elementType.length > 0) Util.validType(newValue, this.elementType);
                    // if (this.elementType !== null && !(newValue instanceof this.elementType)) {
                    //     // typeName = this.elementType.constructor.name; // REVIEW::
                    //     typeName = this.elementType.name || this.elementType.constructor.name;
                    //     throw new Error('Only [' + typeName + '] type instances can be added');
                    // }
                    this._element[p_idx] = newValue; 
                },
                enumerable: true,
                configurable: true
            };
        };

        /**
         * 추가 이벤트 수신자
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_value) {
            this._event.publish('add', p_idx, p_value, this); 
        };

        /**
         * 삭제 이벤트 수신자
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_value) {
            this._event.publish('remove', p_idx, p_value, this);
        };

        /** 
         *  전체삭제 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this._event.publish('clear', this); 
        };

        /** 
         *  변경(등록/삭제) 전 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function() {
            this._event.publish('changing', this); 
        };

        /** 
         *  변경(등록/삭제) 후 수신자 이벤트
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function() {
            this._event.publish('changed', this); 
        };

        /** 
         * 컬렉션을 삭제한다.
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new Error('[ _remove(idx) ] Abstract method definition, fail...');
        };

        /** 
         * 컬렉션을 추가한다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new Error('[ add(any) : boolean ] Abstract method definition, fail...');
        };
        
        /**
         * 전체삭제(초기화)한다.
         * @abstract 
         * @fires _L.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };

        /**
         * 컬렉션을 삭제한다.
         * @param {Object} p_elem 속성명
         * @returns {boolean} 처리결과
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this.indexOf(p_elem);
            
            return idx < 0 ? false : this.removeAt(idx);
        };
        
        /**
         * 배열속성 삭제한다.
         * @param {Number} p_idx 인덱스
         * @returns {boolean} 처리 결과
         */
        BaseCollection.prototype.removeAt = function(p_idx) {
            if (typeof p_idx !== 'number') throw new Error('Only [p_idx] type "number" can be added');
            var elem = this._element[p_idx];

            if (this.exist(p_idx)) {
                // before event
                this._onChanging();
                // process
                this._remove(p_idx);
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
            return this._element.indexOf(p_elem) > -1;
        };

        /**
         * 배열속성 인덱스 찾는다.
         * @param {Object} p_elem 속성 객체
         * @returns {Number}
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._element.indexOf(p_elem);
        };

        /**
         * 키 유무 조회
         * @param {number | string} p_key index, key
         * @returns
         */
        BaseCollection.prototype.exist = function(p_key) {
            if (typeof p_key === 'number' || typeof p_key === 'string') 
                return this.hasOwnProperty(p_key);
            throw new Error('Only [p_key] type "number, string" can be added');
        };

        return BaseCollection;
    }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = BaseCollection;
    } else {    
        _global._L.BaseCollection = BaseCollection;
        _global._L.Collection.BaseCollection = BaseCollection;      // namespace
    }

}(typeof window !== 'undefined' ? window : global));