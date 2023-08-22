/**
 * namespace _L.Interface.ILookupControl
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
    var ILookupControl  = (function () {
        /**
         * @constructs _L.Interface.ILookupControl
         * @interface
         */
        function ILookupControl() {
        }
    
        /**
         * 존재 유무 검사
         * @abstract
         */
        ILookupControl.prototype.contains  = function() {
            throw new Error('[ contains(any) : boolean ] Abstract method definition, fail...');
        };

        return ILookupControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ILookupControl = ILookupControl;
    } else {
        _global._L.ILookupControl = ILookupControl;
        _global._L.Interface.ILookupControl = ILookupControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));