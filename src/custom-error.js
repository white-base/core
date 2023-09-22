/**
 * namespace _L.Common.CustomError
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
    } else {    // COVER:
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
    }

    //==============================================================Á
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);

    //==============================================================
    // 4. module implementation   
    var CustomError = (function (_super) {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * TODO: 필요시 구현
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
            // if (Error.captureStackTrace) {
            //     Error.captureStackTrace(this, CustomError);
            // }

            /**
             * 에러 메세지
             * @member {Object} 
             */
            this.message = p_message;    

            /**
             * 에러 구분자
             * @member {Object} 
             */
            // this.target = { value: p_target || ''};

            /**
             * 에러명
             * @member {Object} 
             */
            this.name = p_name || 'CustomError';
            
            this._execute();
        }
        Util.inherits(CustomError, _super);

        CustomError._NS = 'Common';    // namespace
        
        /**
         * 내부처리
         */
         CustomError.prototype._execute = function() {
            // console.log('CustomError._execute()');
        };

        return CustomError;
        
    }(Error));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.CustomError = CustomError;
    } else {    // COVER:
        _global._L.CustomError = CustomError;
        _global._L.Common.CustomError = CustomError;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));