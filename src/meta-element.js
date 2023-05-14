/**
 * namespace _L.Meta.MetaElement
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaObject;
    var IMarshal;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};    
   
    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                = require('./util');
        IMarshal            = require('./i-marshal');
        MetaObject          = require('./meta-object');
    } else {
        Util                = _global._L.Common.Util;
        MetaObject          = _global._L.Meta.MetaObject;
        IMarshal            = _global._L.Interface.IMarshal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IMarshal === 'undefined') throw new Error('[IMarshal] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');

    //==============================================================
    // 4. 모듈 구현
    // private variable
    
    var MetaElement  = (function (_super) {

        /**
         * IMarshal 인터페이스 구현 및 ..
         * @constructs _L.Meta.MetaElement
         * @abstract
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IMarshal}
         * @param {*} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var __guid;
            var _name;

            /** @member {Array} _L.Meta.MetaElement#name 속성들값 */
            Object.defineProperty(this, 'name', 
            {
                get: function() { return _name; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string')  throw new Error('Only [name] type "string" can be added');   // COVER: 2
                    _name = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /** @member {Array} _L.Meta.MetaElement#__guid 속성들값 */
            Object.defineProperty(this, '__guid', 
            {
                get: function() { return __guid; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string')  throw new Error('Only [__guid] type "string" can be added'); // COVER: 2
                    __guid = newValue;
                },
                configurable: false,
                enumerable: true
            });

                        
            this.name = p_name || '';
            
            /** @implements {_L.Interface.IMarshal} */
            Util.implements(this, IMarshal);
        }
        Util.inherits(MetaElement, _super);
    
        /**
         * Guid 생성한다.
         * @private
         * @returns {String}
         */
        function __newGuid() {
            return Util.createGuid();
        };

        /**
         * 객체를 얻는다
         * @virtual
         * @returns {Object}
         */
        MetaElement.prototype.getObject  = function(p_context) {
            var obj     = {};
            var arr = Util.getAllProperties(this);
            
            for (var i = 0; i < arr.length; i++) {
                var prop = arr[i];
                if (this[prop] instanceof MetaElement) {
                    obj[prop] = this[prop].getObject(p_context);
                } else if (typeof this[prop] !== 'function' && prop.substr(0, 1) !== '_') {
                    obj[prop] = this[prop];
                }
            }
            return obj;                        
        };

        /**
         * 조건 : Guid는 한번만 생성해야 함
         * Guid를 얻는다.
         * @returns {String}
         */
        MetaElement.prototype.getGuid  = function() {
            if (!this.__guid) {
                this.__guid = __newGuid();
            }
            return this.__guid;
        };

        return MetaElement;

    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = MetaElement;
    } else {
        _global._L.MetaElement = MetaElement;
        _global._L.Meta.MetaElement = MetaElement;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));