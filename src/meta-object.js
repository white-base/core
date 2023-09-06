/**
 * namespace _L.Meta.MetaObject
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var IObject;
    var IMarshal;
    var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                    = require('./util');
        IObject                 = require('./i-object').IObject;
        IMarshal                = require('./i-marshal').IMarshal;
        MetaRegistry            = require('./meta-registry').MetaRegistry;
    } else {
        Util                    = _global._L.Util
        IObject                 = _global._L.IObject;
        IMarshal                = _global._L.IMarshal;
        MetaRegistry            = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IObject === 'undefined') throw new Error('[IObject] module load fail...');
    if (typeof IMarshal === 'undefined') throw new Error('[IMarshal] module load fail...');
    if (typeof MetaRegistry === 'undefined') throw new Error('[MetaRegistry] module load fail...');

    //==============================================================
    // 4. module implementation   
    var MetaObject  = (function () {
        /**
         * 메타 최상위 클래스 (실체)
         * @constructs _L.Meta.MetaObject
         * @abstract
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;

            /**
             * _guid
             * @member {array} _L.Meta.MetaObject#_guid 
             */
            Object.defineProperty(this, '_guid', 
            {
                get: function() { 
                    if (!_guid) _guid = Util.createGuid();
                    return _guid;
                },
                configurable: false,
                enumerable: true
            });    
            /**
             * _type
             * @member {function} _L.Meta.MetaObject#_type 
             */
            Object.defineProperty(this, '_type', 
            {
                get: function() { 
                    var proto = this.__proto__ || Object.getPrototypeOf(this);            // COVER: 2
                    return proto.constructor;
                },
                configurable: false,
                enumerable: true
            });
            
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            // inner variable access
            this.__SET$_guid = function(val, call) {
                if (call instanceof MetaObject) _guid = val;    // 상속접근 허용
            }

            Util.implements(this, IObject, IMarshal);
        }
        
        MetaObject._NS = 'Meta';          // namespace
        MetaObject._PARAMS = [];         // creator parameter

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @returns {object}
         */
        MetaObject.prototype.getObject = function(p_vOpt) {
            var obj = {};

            obj._guid = this._guid;
            obj._type = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @param {object} p_mObj 레벨 옵션
         */
        MetaObject.prototype.setObject  = function(p_mObj) {
            if (typeof p_mObj !== 'object') throw new Error('Only [p_mObj] type "object" can be added');
            this.__SET$_guid(p_mObj._guid, this);
        };
        // MetaObject.prototype.setObject  = function(p_mObj) {
        //     var meta;

        //     if (typeof p_mObj !== 'object') throw new Error('Only [p_mObj] type "object" can be added');
        //     meta = MetaRegistry.find(p_mObj);
        //     if (!meta) {
        //         this.__SET$_guid(p_mObj._guid, this);
        //     } else return meta;
        // };

        
        /**
         * 객체 타입 이름 얻기 (상속포함)
         * @returns {array<function>}
         */
        MetaObject.prototype.getTypes = function() {
            var arr = [];
            
            return parentFunction(this);

            // inner function
            function parentFunction(obj) {
                var list = [];
                var proto = obj.__proto__ || Object.getPrototypeOf(obj);
                if (proto) {
                    list.push(proto.constructor);
                    list = list.concat(parentFunction(proto));
                }
                return list;
            }
        };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부 검사
         * @param {string | function} p_func 함수명으로 넣으면 이름만 검색, 클래스를 넣은면 클래스 검색
         * @returns {boolean}
         */
        MetaObject.prototype.instanceOf = function(p_func) {
            var _this = this;
            
            if (typeof p_func === 'string') return findFunctionName(p_func);
            if (typeof p_func === 'function') return findFunction(p_func);
            return false;

            // inner function
            function findFunction(fun) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (fun === types[i]) return true;
                }
                if (_this._interface) {
                    for (var i = 0; i < _this._interface.length; i++) {
                        if (fun === _this._interface[i]) return true;
                    }
                }
                return false;
            }
            function findFunctionName(funName) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (funName === types[i].name) return true;
                }
                if (_this._interface) {
                    for (var i = 0; i < _this._interface.length; i++) {
                        if (funName === _this._interface[i].name) return true;
                    }
                }
                return false;
            }
        };

        return MetaObject;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaObject = MetaObject;
    } else {    // COVER:
        _global._L.MetaObject = MetaObject;
        _global._L.Meta.MetaObject = MetaObject;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));