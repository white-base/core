/**** message.js | Message ****/
import  messageCode  from './message-code.js';

/**
 * autoDetect = true
 * defaultLang = 'en'
 * currentLang = 'ko'
 * _detectLanguage() : 언어자동 감지 후 로딩, 언어 변경에서 호출, 언어 감시는 외부 모듈을 사용하고
 * _importMessage(lang) : 언어 가져와서 $storage[lang]에 설정하기
 * _replacePlaceholders() : 프레이스 홀더 문자열 교체
 * _getMessageByCode(code, lang) : 코드에 대한 메세지 문자열 가져오기, 지정 언어가 없으면 기본 문자열 가져오기
 * init() : 초기화, 기본 언어 가져오기, 생성자에서 호출
 * changeLanguage('fr') : 언어 변경를 변경하면, 브라우저, 노드
 * get() : 메세지 가져오기
 */


/**
 * - rollup 을 사용하기 때문에 es 모듈 방식으로 작성
 * - 언어감지는 "os-locale" 을 사용
 * - fetch() 을 사용해서 가져오게
 */

//==============================================================
// 2. module dependency check
//==============================================================
// 3. module implementation       
/**
 * @class Message
 * @description 메시지 코드 관리 클래스 (static)
 */
var Message = (function () {
    /**
     * @constructor
     */
    function Message() { 
    }
    Message._NS = 'Common';     // namespace

    // inner function
    function isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
    }
    function _isString(obj) {    // 공백아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }
    
    // var define
    var $storage = {};
    var autoDetect = true;
    var defaultLang = 'en';
    var currentLang = defaultLang;
    
    /**
     * 메시지 코드 스토리지
     * @member {string} Message#$storage
     */
    Object.defineProperty(Message, '$storage', {
        get: function() { 
            return $storage;
        },
        configurable: false,
        enumerable: true,
    });

    /**
     * 언어 자동 감지 여부
     * @member {string} Message#autoDetect
     */
    Object.defineProperty(Message, 'autoDetect', {
        get: function() { 
            return autoDetect;
        },
        configurable: false,
        enumerable: true,
    });

    /**
     * 기본 언어 
     * @member {string} Message#defaultLang
     */
    Object.defineProperty(Message, 'defaultLang', {
        get: function() { return defaultLang; },
        set: function(val) { defaultLang = val; },
        configurable: false,
        enumerable: true,
    });

    /**
     * 현재 언어 
     * @member {string} Message#currentLang
     */
    Object.defineProperty(Message, 'currentLang', {
        get: function() { return currentLang; },
        set: function(val) { currentLang = val; },
        configurable: false,
        enumerable: true,
    });

    Message._detectLanguage = function(p_lang) {
        /**
         * - 언어 감지
         * - 
         */
    };

    Message._importMessage = function(p_lang) {
    };

    Message._defaultMessage = function(p_lang) {
    };

    Message._replacePlaceholders = function(p_lang) {
    };
    
    Message._getMessageByCode = function(p_lang) {
    };

    Message.init = function() {
        
        /**
         * 기본 언어 가져오기
         */
    };

    Message.changeLanguage = function(p_lang) {
    };

    Message.get = function(p_lang) {
    };

    return Message;
}());

// 초기화
Message.init();

//==============================================================
// 4. module export
export default Message;
export { Message };


