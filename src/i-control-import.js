/**
 * namespace _L.Interface.IImportControl
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
    var IImportControl  = (function () {
        /**
         * @constructs _L.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
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
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = IImportControl;
    } else {
        _global._L.IImportControl = IImportControl;
        _global._L.Interface.IImportControl = IImportControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));