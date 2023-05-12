/**
 * namespace _L.Interface.ILookupControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Interface     = _global._L.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | window)

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
            throw new Error('[ contains(any) : boolean ] Abstract method definition, fail...');
        };

        return ILookupControl;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = ILookupControl;
    } else {
        _global._L.ILookupControl = ILookupControl;
        _global._L.Interface.ILookupControl = ILookupControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));