/**
 * namespace _L.Interface.IMarshal
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    // var Util;
    // var IObject;
    // var IMarshal;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
    } else {    
        Message                     = _global._L.Message;
    }

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
             * GUID
             * @member {string} _L.Interface.IMarshal#_guid
             */

            this._guid = String;
            /**
             * 타입
             * @member {string} _L.Interface.IMarshal#_type
             */
            this._type = Function;
        }

        IMarshal._NS = 'Interface';    // namespace
        
        /**
         * 객체 얻기
         * @returns {Object}
         */
        IMarshal.prototype.getObject = function() {
            Message.error('ES013', ['getObject(p_vOpt): object']);
        };

        /**
         * 객체 설정
         * @abstract
         * @returns {Stirng}
         */
        IMarshal.prototype.setObject  = function() {
            Message.error('ES013', ['setObject(mObj)']);
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