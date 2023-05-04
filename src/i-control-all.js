/**
 * namespace _L.Interface.IAllControl
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
    var IAllControl  = (function () {
        /**
         * @constructs _L.Interface.IAllControl
         * @interface
         */
        function IAllControl() {
        }
    
        /**
         * 복제 : 전체
         * @abstract
         */
        IAllControl.prototype.clone  = function() {
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IAllControl.prototype.load  = function() {
            throw new Error('[ load() ] Abstract method definition, fail...');
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
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = IAllControl;
    } else {
        _global._L.IAllControl = IAllControl;
        _global._L.Interface.IAllControl = IAllControl;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));