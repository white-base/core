/**
 * namespace _L.Interface.IExportControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

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
    var IExportControl  = (function () {
        /**
         * @constructs _L.Interface.IExportControl
         * @interface
         */
        function IExportControl() {
        }
    
        IExportControl._NS = 'Interface';    // namespace

        /**
         * 출력 : 전체
         * @abstract
         */
        IExportControl.prototype.write  = function() {
            throw new Error('[ write(any) ] Abstract method definition, fail...');
        };
    
        return IExportControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IExportControl = IExportControl;
    } else {
        _global._L.IExportControl = IExportControl;
        _global._L.Interface.IExportControl = IExportControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));