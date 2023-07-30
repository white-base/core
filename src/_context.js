// Context
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
    // 3. 의존성 검사
    // if (typeof util === 'undefined') throw new Error('[XXX] module  load fail...');


    //==============================================================
    // 4. 모듈 구현    
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