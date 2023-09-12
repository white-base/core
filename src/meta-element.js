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
         * IMarshal 인터페이스 구현 및 ..
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
                set: function(newValue) { 
                    if (typeof newValue !== 'string') Message.error('ES021', ['_name', 'string']);
                    _name = newValue;
                },
                configurable: false,
                enumerable: true
            });

            this._name = p_name || '';

            // inner variable access
            this.__SET$_name = function(val, call) {
                if (call instanceof MetaElement) _name = val;    // 상속접근 허용
            }
            
            // 추상 클래스로 정의
            // this.__SET$_isAbstract(true, this); 

            Util.implements(this, IElement);
        }
        Util.inherits(MetaElement, _super);
    
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter
        MetaElement._ABSCRACT = true;
        
        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        MetaElement.prototype.equal = function(p_target) {
            if (!_super.prototype.equal.call(this, p_target)) return false;
            return this._name === p_target._name ? true : false;
        };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaElement.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            obj.name = this._name;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        // MetaElement.prototype.setObject  = function(mObj, oObj) {
        //     _super.prototype.setObject.call(this, mObj, oObj);
        //     this._name = mObj.name;
        // };
        // MetaElement.prototype.setObject  = function(mObj) {
        //     var parent = _super.prototype.setObject.call(this, mObj);
        //     if(!parent) {
        //         this._name = mObj.name;
        //     } else return parent;
        // };

        MetaElement.prototype.clone  = function() {
            Message.error('ES013', ['clone()']);
            // var clone = new MetaElement(this._name);
            // return clone;
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