/**
 * namespace _L.Interface.ISchemaControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;

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
    var ISchemaControl  = (function () {
        /**
         *  스카마 컨트롤 인터페이스
         * @constructs _L.Interface.ISchemaControl
         * @interface
         */
        function ISchemaControl() {
        }

        ISchemaControl._NS = 'Interface';    // namespace
        ISchemaControl._KIND = 'interface';

        /**
         * 스키마 읽기
         * @abstract
         */
        ISchemaControl.prototype.readSchema  = function() {
            // Message.error('ES013', ['readSchema(JSON)']);
        };

        /**
         * 스키마 읽기
         * @abstract
         */
        ISchemaControl.prototype.writeSchema  = function() {
            // Message.error('ES013', ['writeSchema(): JSON']);
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