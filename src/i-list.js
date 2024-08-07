/**** i-list.js | _L.Interface.IList ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
    var IList  = (function () {
        /**
         * 목록 인터페이스 입니다.
         * @constructs _L.Interface.IList
         * @interface
         */
        function IList() {

            /**
             * 목록
             * @member {array} _L.Interface.IList#_list
             */
            this._list = Array;
            
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
    // 4. module export
    if (isNode) exports.IList   = IList;      // strip:
    
    // create namespace
    _global._L.Interface        = _global._L.Interface || {};

    _global._L.IList = IList;
    _global._L.Interface.IList = IList;
    
}(typeof window !== 'undefined' ? window : global));