/**
 * namespace _L.Interface.ITransaction
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
    var ITransaction  = (function () {
        /**
         * @constructs _L.Interface.ITransaction
         * @interface
         */
        function ITransaction() {
        }
    
        ITransaction._NS = 'Interface';    // namespace
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
    // 5. module export
    if (isNode) {     
        exports.ITransaction = ITransaction;
    } else {
        _global._L.ITransaction = ITransaction;
        _global._L.Interface.ITransaction = ITransaction;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));