/**** extend-error.js | ExtendError ****/

//==============================================================
// 1. import module
import Message from './message.js';

//==============================================================Á
// 2. module dependency check
//==============================================================
// 3. module implementation   
var OLD_ENV = globalThis.OLD_ENV ? globalThis.OLD_ENV : false;    // 커버리지 테스트 역활

const ExtendError = (function () {

    /**
     * 확장오류를 생성합니다...
     * (ES5 하위 호환성 지원을 위해서 자체 상속방식으로 처리함)
     * @constructs ExtendError
     * @param {string | RegExp} p_msg  메세지코드 또는 메세지
     * @param {ExtendError | object | null} p_prop  이전 ExtendError 객체 또는 속성타입 오류메세지
     * @param {Array<string>} p_codeVal  메세지코드값의 $1, $2 변환 값
     * @kor 메세지코드 또는 메세지를 입력하여 확장 오류를 생성합니다.
     * @example
     * new ExtendError({code:'', ctx: []})
     * new ExtendError(/E0011/, [''])
     */
    function ExtendError(p_msg, p_prop, p_codeVal) {
        var _build = '';
        var _prop;
        var _queue = [];    
        var _msg;

        if (p_prop instanceof ExtendError) {
            _queue = p_prop.queue;
            _prop = p_prop.prop;
        } else if (p_prop instanceof Error) {
            _queue.push(p_prop.message);
        } else if (typeof p_prop  === 'object' && p_prop !== null) {
            _prop = p_prop;
        }
        
        if (typeof p_msg === 'string') {
            _msg = p_msg;
        } else if (p_msg instanceof RegExp) {
            _msg = Message.get(p_msg.source, p_codeVal);
        } else _msg = '';
        
        _build = _msg + '\n';
        
        if (_prop) _build += $buildMessageProp(_prop);
        if (_queue.length > 0) _build += $buildMsgQueue(_queue);

        // var _instance = _super.call(this, _build);
        var _instance = new Error(_build);
        
        /**
         * 이전에 발생한 message 큐
         * @member {string[]} ExtendError#queue
         */
        // if (_queue) _instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
        // else _instance.queue = [];
        _instance.queue = _queue;
        _instance.queue.push(_msg);

        /**
         * 속성 타입 오류 메시지입니다.
         * @member {object} ExtendError#prop
         */
        if (_prop) _instance.prop = _prop;
        else _instance.prop = {};

        if (Error.captureStackTrace && !OLD_ENV) {
            Error.captureStackTrace(_instance, ExtendError);
        }

        Object.setPrototypeOf(_instance, Object.getPrototypeOf(this));
    
        return _instance;

        // inner function 
        function $buildMessageProp(obj) {
            var msg = '';
            for (var prop in obj) {
                if (typeof obj[prop] === 'string') msg += prop + ' : '+ obj[prop] + '\n';
                else continue;
            }
            return msg;
        }
        function $buildMsgQueue(queue) {
            var msg = '';
            var queue_cnt = queue.length;
            for (var i = queue_cnt; i > 0; i--) {
                var mark = '';
                for (var j = i; j <= queue_cnt; j++) { mark += '#'; }
                msg += '' + mark + ' '+ queue[i - 1] + '\n';
            }
            return msg;
        }
    }

    ExtendError._NS = 'Common';    // namespace
    
    ExtendError.prototype = Object.create(Error.prototype, {
        constructor: {
            value: Error,
            enumerable: false,
            writable: true,
            configurable: true,
        },
    });
    
    ExtendError.prototype.toString = function() {
        return 'ExtendError : ' + this.message;
    };
        
    // REVIEW: 이부분이 제거 해도 문제 없는게 맞느지 검토해야함
    // if (Object.setPrototypeOf) {
    //     Object.setPrototypeOf(ExtendError, Error);
    // } else {
    //     ExtendError.__proto__ = Error;
    // }
    // Util.inherits(ExtendError, _super);

    
    return ExtendError;

}());

//==============================================================
// 4. module export
export default ExtendError;
export { ExtendError };