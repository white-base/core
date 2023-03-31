/**
 * namespace _L.Interface.IPartControl
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
    var IPartControl  = (function () {
        /**
         * @constructs _L.Interface.IPartControl
         * @interface
         */
        function IPartControl() {
        }
    
        /**
         * 단일 등록
         * @abstract
         */
        IPartControl.prototype.add  = function() {
            throw new Error('[ add() ] Abstract method definition, fail...');
        };

        /**
         * 단일 삭제
         * @abstract
         */
        IPartControl.prototype.remove  = function() {
            throw new Error('[ remove() ] Abstract method definition, fail...');
        };
    
        return IPartControl;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IPartControl;
    } else {
        global._L.IPartControl = IPartControl;
        // namespace
        global._L.Interface.IPartControl = IPartControl;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));