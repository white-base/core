/**
 * namespace _W.Interface.IPropertyCollection
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._W               = global._W || {};
    global._W.Interface     = global._W.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var utils;
    var ICollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        utils                = require('./utils');
        ICollection         = require('./i-collection');
    } else {
        utils                = global._W.Common.Util;
        ICollection         = global._W.Interface.ICollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof utils === 'undefined') throw new Error('[utils] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var IPropertyCollection  = (function (_super) {
        /**
         * @constructs _W.Interface.IPropertyCollection
         * @interface
         * @extends  _W.Interface.ICollection
         */
        function IPropertyCollection() {
            _super.call(this);
        }
        utils.inherits(IPropertyCollection, _super);

        /**
         * 조회 : 인덱스로 이름 조회
         */
        IPropertyCollection.prototype.propertyOf  = function() {
            throw new Error('[ propertyOf() ] Abstract method definition, fail...');
        };
    
        return IPropertyCollection;
        
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IPropertyCollection;
    } else {
        global._W.IPropertyCollection = IPropertyCollection;
        // namespace
        global._W.Interface.IPropertyCollection = IPropertyCollection;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));