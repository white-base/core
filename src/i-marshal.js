/**
 * namespace _L.Interface.IMarshal
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    // var Util;
    // var IObject;
    // var IMarshal;
    
    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Interface     = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        // Util                = require('./util');
        // IObject             = require('./i-object').IObject;
    } else {
        // Util                = _global._L.Common.Util;
        // IObject             = _global._L.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    // if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    // if (typeof IObject === 'undefined') throw new Error('[IObject] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var IMarshal  = (function () {
        /**
         * 최상위 객체
         * @constructs _L.Interface.IMarshal
         * @interface
         */
        function IMarshal() {
            // _super.call(this);

            /**
             * 메타 이름
             * @member {string} _L.Interface.IMarshal#guid
             */
            this._guid = '';
            this._type = Function;
        }
        // Util.inherits(IMarshal, _super);

        /**
         * 객체 얻기
         * @returns {Object}
         */
        IMarshal.prototype.getObject  = function() {
            throw new Error('[ getObject() : object ] Abstract method definition, fail...');
        };

        /**
         * Guid 얻기
         * @abstract
         * @returns {Stirng}
         */
        IMarshal.prototype.setObject  = function() {
            throw new Error('[ setObject(mObj) ] Abstract method definition, fail...');
        };

        return IMarshal;
        
    }());

    //==============================================================
    // 5. module export
    // if (isNode) {
    //     module.exports = IMarshal;
    // }
    // if (useNamesapce) {
    //     _global._L.IMarshal = IMarshal;
    //     // namespace
    //     _global._L.Interface.IMarshal = IMarshal;
    // }
    if (isNode) {     
        exports.IMarshal = IMarshal;
    } else {
        _global._L.IMarshal = IMarshal;
        _global._L.Interface.IMarshal = IMarshal;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));