/**
 * namespace _L.Interface.IGroupControl
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
    var IGroupControl  = (function () {
        /**
         * @constructs _L.Interface.IGroupControl
         * @interface
         */
        function IGroupControl() {
        }
    
        /**
         * 병합 : 그룹
         * @abstract
         */
        IGroupControl.prototype.merge  = function() {
            throw new Error('[ merge() ] Abstract method definition, fail...');
        };

        /**
         * 복사 : 그룹
         * @abstract
         */
        IGroupControl.prototype.copy  = function() {
            throw new Error('[ copyTo() ] Abstract method definition, fail...');
        };

        return IGroupControl;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IGroupControl;
    } else {
        global._L.IGroupControl = IGroupControl;
        // namespace
        global._L.Interface.IGroupControl = IGroupControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));