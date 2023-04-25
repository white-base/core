/**
 * namespace _L.Meta.MetaElement
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Meta          = global._L.Meta || {};

   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var MetaObject;
    var IMarshal;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        MetaObject          = require('./meta-object');
        IMarshal            = require('./i-marshal');
    } else {
        Util                = global._L.Common.Util;
        MetaObject          = global._L.Meta.MetaObject;
        IMarshal            = global._L.Interface.IMarshal;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof IMarshal === 'undefined') throw new Error('[IMarshal] module load fail...');

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
            
            var _guid;
            var _name;

            /** @member {Array} _L.Meta.MetaElement#name 속성들값 */
            Object.defineProperty(this, 'name', 
            {
                get: function() { return _name; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string')  throw new Error('Only [p_name] type "string" can be added');
                    _name = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /** @member {Array} _L.Meta.MetaElement#_guid 속성들값 */
            Object.defineProperty(this, '_guid', 
            {
                get: function() { return _guid; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string')  throw new Error('Only [p_name] type "string" can be added');
                    _guid = newValue;
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
         * 조건 : Guid는 한번만 생성해야 함
         * Guid를 얻는다.
         * @returns {String}
         */
        MetaObject.prototype.getGuid  = function() {
            if (!this._guid) {
                this._guid = __newGuid();
            }
            return this._guid;
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

        return MetaElement;

    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = MetaElement;
    } else {
        global._L.MetaElement = MetaElement;
        // namespace
        global._L.Meta.MetaElement = MetaElement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));