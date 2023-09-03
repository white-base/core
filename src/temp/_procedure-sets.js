/**
 * namespace _L.Meta.Procedure
  */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    //var util;
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        // util = require('util');
    } else {
        // global._L = global._L || {};
        // util = global._L.util || {};
    }

    //==============================================================
    // 3. module dependency check
    // if (typeof util === 'undefined') throw new Error('[XXX] module  load fail...');


    //==============================================================
    // 4. module implementation   
    // util.inherits = (function () {
    // }());
    

    //==============================================================
    // 5. module export
    // if (isNode) {     
    //     module.exports = namespace;
    // } else {
    //     global._L.namespace = namespace;
    // }

}(typeof window !== 'undefined' ? window : global));