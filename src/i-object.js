/**
 * namespace _L.Interface.IObject
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
    var IObject  = (function () {
        /**
         * 최상위 객체 인터페이스
         * @constructs _L.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        /**
         * 객체타입 얻기
         */
        IObject.prototype.getType  = function() {
            throw new Error('[ getType() ] Abstract method definition, fail...');
        };
        
        /**
         * 인스턴스 여부 검사
         * @returns {Boolean}
         */
        IObject.prototype.instanceOf  = function() {
            throw new Error('[ instanceOf() ] Abstract method definition, fail...');
        };
    
        return IObject;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = IObject;
    } else {
        _global._L.IObject = IObject;
        _global._L.Interface.IObject = IObject;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));