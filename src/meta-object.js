/**
 * namespace _L.Meta.MetaObject
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Meta          = global._L.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var IObject;
    var Util;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // require('./_object-implement'); // _implements() : 폴리필
        Util                = require('./util');
        IObject             = require('./i-object');
    } else {
        Util                = global._L.Common.Util
        IObject             = global._L.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IObject === 'undefined') throw new Error('[IObject] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaObject  = (function () {
        /**
         * 메타 최상위 클래스 (실체)
         * @constructs _L.Meta.MetaObject
         * @abstract
         * @implements {_L.Interface.IObject}
         */
        function MetaObject() {

            /** @implements {_L.Interface.IObject} */
            Util.implements(this, IObject);
        }
        
        /**
         * 객체 타입 이름 얻기
         * @returns {array<string>}
         */
        MetaObject.prototype.getTypeNames  = function() {
            var types = this.getTypes();
            var arr = [];
            
            for (var i = 0; i < types.length; i++) {
                arr.push(types[i].name);
            }
            return arr;
        };
        
        /**
         * 객체 타입 이름 얻기
         * @returns {array<function>}
         */
        MetaObject.prototype.getTypes  = function() {
            var arr = [];
            
            function parentFunction(obj) {
                var list = [];
                var proto = obj.__proto__ || Object.getPrototypeOf(obj);
                if (proto) {
                    list = list.concat(parentFunction(proto));
                    list.push(proto.constructor);
                }
                return list;
            }
            return parentFunction(this);
        };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부 검사
         * @param {string | function} p_func 함수명으로 넣으면 이름만 검색, 클래스를 넣은면 클래스 검색
         * @returns {boolean}
         */
        MetaObject.prototype.instanceOf  = function(p_func) {
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
                return false
            }
            function findFunctionName(funName) {
                var typeNames = _this.getTypeNames();
                for (var i = 0; i < typeNames.length; i++) {
                    if (funName === typeNames[i]) return true;
                }
                if (_this._interface) {
                    for (var i = 0; i < _this._interface.length; i++) {
                        if (funName === _this._interface[i].name) return true;
                    }
                }
                return false
            }

            if (typeof p_func === 'string') return findFunctionName(p_func);
            if (typeof p_func === 'function') return findFunction(p_func);
            return false;
        };

        return MetaObject;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = MetaObject;
    } else {
        global._L.MetaObject = MetaObject;
        // namespace
        global._L.Meta.MetaObject = MetaObject;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));