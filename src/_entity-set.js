/**
 * namespace _L.Meta.Entity.EntitySet
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    // var util;
    
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        // util = require('util');
    } else {
        // global._L = global._L || {};
        // util = global._L.util || {};
    }

    //==============================================================
    // 3. 의존성 검사
    // if (typeof util === 'undefined') throw new Error('[XXX] module  load fail...');


    //==============================================================
    // 4. 모듈 구현    
    // util.inherits = (function () {
    // }());
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    // if (typeof module === 'object' && typeof module.exports === 'object') {     
    //     module.exports = namespace;
    // } else {
    //     global._L.namespace = namespace;
    // }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));