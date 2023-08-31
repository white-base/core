/**
 * namespace _L.Interface.IImportControl
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
    var IImportControl  = (function () {
        /**
         * @constructs _L.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
        IImportControl._NS = 'Interface';    // namespace

        /**
         * 입력 : 전체
         * @abstract
         */
        IImportControl.prototype.read  = function() {
            throw new Error('[ read(any) ] Abstract method definition, fail...');
        };
    
        return IImportControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IImportControl = IImportControl;
    } else {
        _global._L.IImportControl = IImportControl;
        _global._L.Interface.IImportControl = IImportControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));