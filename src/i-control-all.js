/**
 * namespace _L.Interface.IAllControl
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
    var IAllControl  = (function () {
        /**
         * @constructs _L.Interface.IAllControl
         * @interface
         */
        function IAllControl() {
        }
    
        IAllControl._NS = 'Interface';    // namespace

        /**
         * 복제 : 전체
         * @abstract
         */
        IAllControl.prototype.clone  = function() {
            throw new Error('[ clone() : obj ] Abstract method definition, fail...');
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IAllControl.prototype.load  = function() {
            throw new Error('[ load(any) ] Abstract method definition, fail...');
        };

        /**
         * 삭제 : 전체
         * @abstract
         */
        IAllControl.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };
    
        return IAllControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IAllControl = IAllControl;
    } else {
        _global._L.IAllControl = IAllControl;
        _global._L.Interface.IAllControl = IAllControl;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));