/**
 * namespace _L.Interface.ISchemaControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var IImportControl;
    var IExportControl;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                = require('./util');
        IImportControl      = require('./i-control-import').IImportControl;
        IExportControl      = require('./i-control-export').IExportControl;
    } else {
        Util                = _global._L.Common.Util;
        IImportControl      = _global._L.Interface.IImportControl;
        IExportControl      = _global._L.Interface.IExportControl;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IImportControl === 'undefined') throw new Error('[IImportControl] module load fail...');
    if (typeof IExportControl === 'undefined') throw new Error('[IExportControl] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
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
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        exports.ISchemaControl = ISchemaControl;
    } else {
        _global._L.ISchemaControl = ISchemaControl;
        _global._L.Interface.ISchemaControl = ISchemaControl; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));