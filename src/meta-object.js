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
        // require('./_object-implement'); // _implements() : 폴리필
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
             * @member {Array} _L.Meta.MetaElement#_guid 
             */
            Object.defineProperty(this, '_guid', 
            {
                get: function() { 
                    if (!_guid) _guid = Util.createGuid();
                    return _guid;
                },
                // set: function(val) {
                //     if (typeof val !== 'string') throw new Error('Only [_guid] type "string" can be added');
                //     _guid = val;
                // },
                configurable: false,
                enumerable: true
            });    
            /**
             * _guid
             * @member {Array} _L.Meta.MetaElement#_guid 
             */
            Object.defineProperty(this, '_type', 
            {
                get: function() { 
                    var proto = this.__proto__ || Object.getPrototypeOf(this);            // COVER: 2
                    return proto.constructor;
                },
                // set: function(val) {
                //     if (typeof val !== 'string') throw new Error('Only [_guid] type "string" can be added');
                //     _guid = val;
                // },
                configurable: false,
                enumerable: true
            });

            
            MetaRegistry.register(this);

            // inner variable access
            this.__SET_guid = function(val, call) {
                if (call instanceof MetaObject) _guid = val;
            }

            Util.implements(this, IObject, IMarshal);
        }
        
        /**
         * 객체 타입 이름 얻기
         * @returns {array<string>}
         */
        // MetaObject.prototype.getTypeNames  = function() {
        //     var types = this.getTypes();
        //     var arr = [];
            
        //     for (var i = 0; i < types.length; i++) {
        //         arr.push(types[i].name);
        //     }
        //     return arr;
        // };
        
        /**
         * 객체 타입 이름 얻기
         * @returns {array<function>}
         */
        MetaObject.prototype.getTypes = function() {
            var arr = [];
            
            function parentFunction(obj) {
                var list = [];
                var proto = obj.__proto__ || Object.getPrototypeOf(obj);
                if (proto) {
                    list.push(proto.constructor);
                    list = list.concat(parentFunction(proto));
                }
                return list;
            }
            return parentFunction(this);
        };
        /**
         * 객체 타입 이름 얻기   
         * 검토: 중복은 피하지만, 성능의 이슈
         * @returns {array<function>}
         */
        // MetaObject.prototype.getType = function() {
        //     var proto = this.__proto__ || Object.getPrototypeOf(this);            // COVER: 2

        //     return proto.constructor;
        // };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부 검사
         * @param {string | function} p_func 함수명으로 넣으면 이름만 검색, 클래스를 넣은면 클래스 검색
         * @returns {boolean}
         */
        MetaObject.prototype.instanceOf = function(p_func) {
            var _this = this;
            
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
                
                // var typeNames = _this.getTypeNames();
                // for (var i = 0; i < typeNames.length; i++) {
                //     if (funName === typeNames[i]) return true;
                // }
                if (_this._interface) {
                    for (var i = 0; i < _this._interface.length; i++) {
                        if (funName === _this._interface[i].name) return true;
                    }
                }
                return false;
            }

            if (typeof p_func === 'string') return findFunctionName(p_func);
            if (typeof p_func === 'function') return findFunction(p_func);
            return false;
        };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaObject.prototype.getObject = function(p_vOpt) {
            var obj = {};
            
            obj._guid = this._guid;
            obj._type = this._type.name;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        MetaObject.prototype.setObject  = function(mObj) {
            if (typeof mObj !== 'object') throw new Error('Only [mObj] type "object" can be added');
            this.__SET_guid(mObj._guid, this);
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