/**
 * namespace _L.Interface.IList
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    // var Util;
    // var IObject;
    // var IList;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
    } else {    
        Message                     = _global._L.Message;
    }

    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var IList  = (function () {
        /**
         * 목록 인터페이스
         * @constructs _L.Interface.IList
         * @interface
         */
        function IList() {
            /**
             * 목록 (참조타입)
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