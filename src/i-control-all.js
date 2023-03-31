/**
 * namespace _L.Interface.IAllControl
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IAllControl;
    } else {
        global._L.IAllControl = IAllControl;
        // namespace
        global._L.Interface.IAllControl = IAllControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));