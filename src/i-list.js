/**** i-list.js | _L.Interface.IList ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IList  = (function () {
        /**
         * 목록 인터페이스 입니다.
         * @constructs _L.Interface.IList
         * @interface
         */
        function IList() {
            /**
             * 목록
             * @member {array} _L.Interface.IList#list
             */
            this.list = Array;
            
            /**
             * 목록 갯수
             * @member {number} _L.Interface.IList#count
             */
            this.count = Number;
        }

        IList._NS = 'Interface';    // namespace
        IList._KIND = 'interface';

        return IList;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IList = IList;
    } else {
        _global._L.IList = IList;
        _global._L.Interface.IList = IList;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));