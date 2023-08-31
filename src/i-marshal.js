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

    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var IMarshal  = (function () {
        /**
         * 최상위 객체
         * @constructs _L.Interface.IMarshal
         * @interface
         */
        function IMarshal() {
            /**
             * 메타 이름
             * @member {string} _L.Interface.IMarshal#guid
             */
            this._guid = '';
            this._type = Function;
        }

        IMarshal._NS = 'Interface';    // namespace
        
        /**
         * 객체 얻기
         * @returns {Object}
         */
        IMarshal.prototype.getObject = function(p_vOpt) {
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
    if (isNode) {     
        exports.IMarshal = IMarshal;
    } else {
        _global._L.IMarshal = IMarshal;
        _global._L.Interface.IMarshal = IMarshal;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));