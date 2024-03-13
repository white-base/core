/**** i-control-schema.js | _L.Interface.ISchemaControl ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var ISchemaControl  = (function () {
        /**
         * 스키마 제어 인터페이스 입니다.
         * @constructs _L.Interface.ISchemaControl
         * @interface
         */
        function ISchemaControl() {
        }

        ISchemaControl._NS = 'Interface';    // namespace
        ISchemaControl._KIND = 'interface';

        /**
         * 스키마를 가져옵니다.
         * @abstract
         */
        ISchemaControl.prototype.readSchema  = function() {
            throw new ExtendError(/EL02341/, null, ['ISchemaControl']);
        };

        /**
         * 스키마를 내보냅니다. 
         * @returns {any}
         * @abstract
         */
        ISchemaControl.prototype.writeSchema  = function() {
            throw new ExtendError(/EL02342/, null, ['ISchemaControl']);
        };
    
        return ISchemaControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ISchemaControl = ISchemaControl;
    } else {
        _global._L.ISchemaControl = ISchemaControl;
        _global._L.Interface.ISchemaControl = ISchemaControl; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));