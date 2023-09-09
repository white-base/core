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
    _global._L                  = _global._L || {};
    _global._L.Interface        = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                 = require('./message').Message;
        Util                    = require('./util');
        IImportControl          = require('./i-control-import').IImportControl;
        IExportControl          = require('./i-control-export').IExportControl;
    } else {
        Message                 = _global._L.Message;
        Util                    = _global._L.Util;
        IImportControl          = _global._L.IImportControl;
        IExportControl          = _global._L.IExportControl;
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
            throw new Error('[ read(JSON) ] Abstract method definition, fail...');
        };

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.write  = function() {
            throw new Error('[ write() : JSON ] Abstract method definition, fail...');
        };

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.readSchema  = function() {
            throw new Error('[ readSchema(JSON) ] Abstract method definition, fail...');
        };

        /**
         * 스키마 읽기
         */
        ISchemaControl.prototype.writeSchema  = function() {
            throw new Error('[ writeSchema() : JSON ] Abstract method definition, fail...');
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