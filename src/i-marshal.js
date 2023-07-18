/**
 * namespace _L.Interface.IMarshal
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var IObject;
    var IMarshal;
    
    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                = require('./util');
        IObject             = require('./i-object').IObject;
    } else {
        Util                = _global._L.Common.Util;
        IObject             = _global._L.Interface.IObject;
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
            throw new Error('[ getObject() : object ] Abstract method definition, fail...');
        };

        /**
         * Guid 얻기
         * @abstract
         * @returns {Stirng}
         */
        IMarshal.prototype.getGuid  = function() {
            throw new Error('[ getGuid() : string ] Abstract method definition, fail...');
        };

        return IMarshal;
        
    }(IObject));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    // if (isNode) {
    //     module.exports = IMarshal;
    // }
    // if (useNamesapce) {
    //     _global._L.IMarshal = IMarshal;
    //     // namespace
    //     _global._L.Interface.IMarshal = IMarshal;
    // }
    if (isNode) {     
        exports.IMarshal = IMarshal;
    } else {
        _global._L.IMarshal = IMarshal;
        _global._L.Interface.IMarshal = IMarshal;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));