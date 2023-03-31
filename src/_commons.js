// util, Observer
(function(global) {
    'use strict';
    
    //==============================================================
    // 1. 모듈 네임스페이스 선언
    require('./extends');   // 폴리필

    global._L               = global._L || {};
    global._L.Common        = global._L.Common || {};
    global._L.Common.Util   = global._L.Common.Util || {};
    global._L.Common.Extend = global._L.Common.Extend || {};

    var util;
    var util;
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        util                = require('./util');
        Observer            = require('./observer');
    } else {
        util                = global._L.common.Util;
        Observer            = global._L.common.Observer;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.util             = util;
        module.exports.Observer         = Observer;
    } else {
        global._L.Common.Util           = util;
        global._L.Common.Observer       = Observer;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));