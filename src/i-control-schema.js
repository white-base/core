/**
 * namespace _L.Interface.ISchemaControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var IImportControl;
    var IExportControl;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IImportControl              = require('./i-control-import').IImportControl;
        IExportControl              = require('./i-control-export').IExportControl;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IImportControl              = _global._L.IImportControl;
        IExportControl              = _global._L.IExportControl;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IImportControl === 'undefined') Message.error('ES011', ['IImportControl', 'i-control-import']);
    if (typeof IExportControl === 'undefined') Message.error('ES011', ['IExportControl', 'i-control-export']);

    //==============================================================
    // 4. module implementation   
    var ISchemaControl  = (function () {
        
        /**
         * 스키마 컨트롤
         * @classdesc 스카마 컨트롤 인터페이스
         * @constructs _L.Interface.ISchemaControl
         * @interface
         * @implements {_L.Interface.IImportControl}
         * @implements {_L.Interface.IExportControl}
         */
        /**
         * @constructs _L.Interface.ISchemaControl
         * @interface
         */
        function ISchemaControl() {
            Util.implements(this, IImportControl, IExportControl);
        }

        ISchemaControl._NS = 'Interface';    // namespace

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.read  = function() {
            Message.error('ES013', ['read(JSON)']);
        };

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.write  = function() {
            Message.error('ES013', ['write(): JSON']);
        };

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.readSchema  = function() {
            Message.error('ES013', ['readSchema(JSON)']);
        };

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.writeSchema  = function() {
            Message.error('ES013', ['writeSchema(): JSON']);
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