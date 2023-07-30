/**
 * namespace _L.Common.CustomError
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                        = require('./util');
    } else {    // COVER:
        Util                        = _global._L.Common.Util;
    }

    //==============================================================Á
    // 3. 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    
    var CustomError = (function (_super) {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _L.Common.CustomError
         * @param {String} p_message 사용자 메세지 내용
         * @param {?String} p_target 대상(값)
         * @param {?String} p_name 에러명
         * 우선순위 : 메세지 > 타겟 > 에러명
         */
        function CustomError(p_message, p_target, p_name) { // COVER:
            _super.call(this, p_message);

            /**
             * 에러 스텍
             * @member {String} _L.Common.CustomError#stack
             */
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, CustomError);
            }

            /**
             * 에러 메세지
             * @member {Object} 
             */
            this.message = p_message;    

            /**
             * 에러 구분자
             * @member {Object} 
             */
            this.target = { value: p_target || ''};

            /**
             * 에러명
             * @member {Object} 
             */
            this.name = p_name || 'CustomError';
            
            // TODO:: 추후 [내부처리] 부분 구현
            this.innerExecute();
        }
        Util.inherits(CustomError, _super);

        /**
         * 내부처리
         */
         CustomError.prototype.innerExecute = function() {
            // console.log('CustomError.innerExecute()');
        };

        return CustomError;
        
    }(Error));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.CustomError = CustomError;
    } else {    // COVER:
        _global._LCustomError = CustomError;
        _global._L.Common.CustomError = CustomError;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));