/**
 * namespace _L.Interface.ILookupControl
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Interface     = global._L.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 모듈 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
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
            throw new Error('[ contains() ] Abstract method definition, fail...');
        };

        return ILookupControl;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ILookupControl;
    } else {
        global._L.ILookupControl = ILookupControl;
        // namespace
        global._L.Interface.ILookupControl = ILookupControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));