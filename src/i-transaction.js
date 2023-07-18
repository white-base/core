/**
 * namespace _L.Interface.ITransaction
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
    var ITransaction  = (function () {
        /**
         * @constructs _L.Interface.ITransaction
         * @interface
         */
        function ITransaction() {
        }
    
        /**
         * 병합 : 그룹
         * @abstract
         */
        ITransaction.prototype.acceptChanges  = function() {
            throw new Error('[ acceptChanges() ] Abstract method definition, fail...');
        };

        /**
         * 복사 : 그룹
         * @abstract
         */
        ITransaction.prototype.rejectChanges  = function() {
            throw new Error('[ rejectChanges() ] Abstract method definition, fail...');
        };

        return ITransaction;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        exports.ITransaction = ITransaction;
    } else {
        _global._L.ITransaction = ITransaction;
        _global._L.Interface.ITransaction = ITransaction;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));