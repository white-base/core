/**
 * namespace _L.Interface.IMarshal
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
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
        ExtendError                 = require('./extend-error').ExtendError;
    } else {    
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IMarshal  = (function () {
        /**
         * 내부 제어 인터페이스
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
            this._type = [['_req_', Function, {$type: 'class'} ]];
        }

        IMarshal._NS = 'Interface';    // namespace
        IMarshal._KIND = 'interface';
        
        /**
         * 객체 얻기
         * @abstract
         */
        IMarshal.prototype.getObject = function() {
            throw new ExtendError(/ES013/, null, ['getObject(p_vOpt, p_origin?): object']);
        };

        /**
         * 객체 설정
         * @abstract
         */
        IMarshal.prototype.setObject  = function() {
            throw new ExtendError(/ES013/, null, ['setObject(mObj)']);
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