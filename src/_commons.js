// util, Observer
(function(global) {
    'use strict';
    
    //==============================================================
    // 1. namespace declaration
    require('./extends');   // 폴리필

    global._L               = global._L || {};
    global._L.Common        = global._L.Common || {};
    global._L.Common.Util   = global._L.Common.Util || {};
    global._L.Common.Extend = global._L.Common.Extend || {};

    var util;
    var util;
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        util                = require('./util');
        Observer            = require('./observer');
    } else {
        util                = global._L.common.Util;
        Observer            = global._L.common.Observer;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof util === 'undefined') throw new Error('[util] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');


    //==============================================================
    // 5. module export
    if (isNode) {     
        module.exports.util             = util;
        module.exports.Observer         = Observer;
    } else {
        global._L.Common.Util           = util;
        global._L.Common.Observer       = Observer;
    }

}(typeof window !== 'undefined' ? window : global));