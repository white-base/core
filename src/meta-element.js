/**
 * namespace _L.Meta.MetaElement
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var MetaObject;
    var IElement;
    // var IMarshal;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
   
    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IElement                    = require('./i-element').IElement;
        MetaObject                  = require('./meta-object').MetaObject;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IElement                    = _global._L.IElement;
        MetaObject                  = _global._L.MetaObject;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IElement === 'undefined') Message.error('ES011', ['IElement', 'i-element']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);

    //==============================================================
    // 4. 모듈 구현
    // private variable
    
    var MetaElement  = (function (_super) {

        /**
         * 메타 요소, 독립적으로 사용가능한 단위
         * @constructs _L.Meta.MetaElement
         * @abstract
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IElement}
         * @param {*} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var _name;

            /**
             * 메타 이름
             * @member {string} _L.Meta.MetaElement#_name
             */
            Object.defineProperty(this, '_name',
            {
                get: function() { return _name; },
                set: function(nVal) { 
                    if (typeof nVal !== 'string') Message.error('ES021', ['_name', 'string']);
                    if (nVal.length === 0) Message.error('ES055', ['_name']);
                    _name = nVal;
                },
                configurable: false,
                enumerable: true
            });

            this._name = p_name || '';

            // inner variable access
            this.__SET$_name = function(val, call) {
                if (call instanceof MetaElement) _name = val;    // 상속접근 허용
            }
            
            Util.implements(this, IElement);
        }
        Util.inherits(MetaElement, _super);
    
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter
        
        /**
         * guid 객체 얻기
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}
         */
        MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            obj.name = this._name;
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;
            this.__SET$_name(p_oGuid.name, this);
        };
        
        /**
         * 객체 복제
         * @virtual
         * @returns {MetaElement}
         */
        MetaElement.prototype.clone  = function() {
            var clone = new MetaElement(this._name);
            return clone;
        };

        return MetaElement;

    }(MetaObject));


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaElement = MetaElement;
    } else {
        _global._L.MetaElement = MetaElement;
        _global._L.Meta.MetaElement = MetaElement;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));