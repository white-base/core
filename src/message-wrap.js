/**** message.js | _L.Common.Message ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                           // strip:
        var _Message             = require('./message').Message;                         // strip:
        var _messageCode         = require('./message-code').messageCode;            // strip:
    }    
    var $Message                = _global._L.Message;                   // modify:
    var $messageCode            = _global._L.messageCode;                   // modify:

    var Message                 = _Message              || $Message;    // strip:
    var messageCode             = _messageCode          || $messageCode;    // strip:

    //==============================================================
    // 2. module dependency check

    //==============================================================
    // 3. module implementation       
    // var Message = (function () {


    //     return Message;
    // }());

    // TODO:
    Message.storage = {kor: {aa:"mrg"}}

    // Message.storage

    //==============================================================
    // 4. module export
    if (isNode) exports.Message = Message;      // strip:

    // POINT:
    // _global._L                      = _global._L || {};
    // _global._L.Common               = _global._L.Common || {};

    // _global._L.Message = Message;
    // _global._L.Common.Message = Message;

}(typeof window !== 'undefined' ? window : global));