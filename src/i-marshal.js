/**
 * namespace _L.Interface.IMarshal
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Interface     = global._L.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var IObject;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        IObject             = require('./i-object');
    } else {
        Util                = global._L.Common.Util;
        IObject             = global._L.Interface.IObject;
    }

    //==============================================================
    // 3. 모듈의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IObject === 'undefined') throw new Error('[IObject] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var IMarshal  = (function (_super) {
        /**
         * 최상위 객체
         * @constructs _L.Interface.IMarshal
         * @interface
         * @extends Interface.IObject
         */
        function IMarshal() {
            _super.call(this);
        }
        Util.inherits(IMarshal, _super);

        /**
         * 객체 얻기
         * @returns {Object}
         */
        IMarshal.prototype.getObject  = function() {
            throw new Error('[ getObject() ] Abstract method definition, fail...');
        };

        /**
         * Guid 얻기
         * @abstract
         * @returns {Stirng}
         */
        IMarshal.prototype.getGuid  = function() {
            throw new Error('[ getGuid() ] Abstract method definition, fail...');
        };

        return IMarshal;
        
    }(IObject));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IMarshal;
    } else {
        global._L.IMarshal = IMarshal;
        // namespace
        global._L.Interface.IMarshal = IMarshal;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));