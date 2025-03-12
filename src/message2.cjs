/**** message.js | Message ****/
// import  defaultCode  from './locales/default.json' with { type: "json" };
// import  {osLocale}  from 'os-locale';

const defaultCode = require('./locales/default.json');
// import  {osLocale}  from 'os-locale';

// const osLocale = require('os-locale');

// var localesPath = __dirname + '/locales';

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));
// const localesPath = __dirname + './locales';
const localesPath = './locales';    // 상대 경로

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
 * 문자열 내의 `${변수명}` 및 `$1, $2` 형식의 플레이스홀더를 치환하는 함수
 * @param {string} template 치환할 문자열
 * @param {Object} namedValues 객체 형태의 치환 값 (`${변수명}`)
 * @param {Array} indexedValues 배열 형태의 치환 값 (`$1, $2`)
 * @returns {string} 변환된 문자열
 */
function replacePlaceholders(template, values) {
    let namedValues = {}, indexedValues = [];

    if (Array.isArray(values)) indexedValues = values;
    else if (typeof values === 'object') namedValues = values;

    // `${변수명}` 치환
    template = template.replace(/\$\{(\w+)\}/g, function(match, key) {
        return namedValues.hasOwnProperty(key) ? namedValues[key] : match;
    });

    // `$1, $2` 치환
    template = template.replace(/\$(\d+)/g, function(match, index) {
        var i = parseInt(index, 10) - 1;
        return indexedValues[i] !== undefined ? indexedValues[i] : match;
    });

    return template;
}

// 테스트
// console.log(replacePlaceholders(
//     "Hello ${name}, you have $1 new messages.", 
//     // { name: "Alice" }, 
//     [5]
// ));
// // 출력: "Hello Alice, you have 5 new messages."

// console.log(replacePlaceholders(
//     "Error: ${error} occurred at $1", 
//     { error: "404 Not Found" }, 
//     ["index.html"]
// ));
// // 출력: "Error: 404 Not Found occurred at index.html"

// console.log(replacePlaceholders(
//     "Total cost: ${price} USD, Discount: $1%", 
//     { price: 100 }, 
//     [10]
// ));
// 출력: "Total cost: 100 USD, Discount: 10%"


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
    function _isObject(obj) {
        return obj && typeof obj === 'object' && !Array.isArray(obj);
    }
    function deepMerge(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                var targetValue = target[key];
                var sourceValue = source[key];
                if (_isObject(sourceValue)) {
                    if (!_isObject(targetValue)) {
                        target[key] = {};
                    }
                    target[key] = deepMerge(target[key], sourceValue);
                } else {
                    target[key] = sourceValue;
                }
            }
        }
        return target;
    }

    async function loadJSON(filePath) {
        const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof navigator === 'undefined';
        // let isESM = false;
        
        // try {
        //     isESM = typeof import.meta !== 'undefined';
        // } catch (error) {
        //     isESM = false;
        // }

        if (isNode) {
            // if (isESM) {
            //     // ESM (import assertions 사용)
            //     return (await import(filePath, { with: { type: 'json' } })).default;
            // } else {
                // CJS (require 사용)
                // const fs = require('fs');
                // return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                const fs = require(filePath);
                return fs;
            // }
        } else {
            // 브라우저 환경 (fetch 사용)
            const response = await fetch(filePath);
            return await response.json();
        }
    }

    async function _detectLanguage() {
        var lang = defaultLang;
        // var locale = await osLocale();
        var locale = 'ko_KR';

        if (autoDetect) {
            lang = locale.split('-')[0];
            Message.changeLanguage(lang);
        }
        return lang;
    };

    // var define
    var $storage = { 
        lang: { default: {} },
        path: []
    };
    var autoDetect = true;
    var defaultLang = 'default';
    var currentLang = defaultLang;
    // var currentLang = _detectLanguage();

    // (async () => {
    //     currentLang = _detectLanguage();
    //     console.log("Detected Language:", currentLang);
    // })();

    // $storage.lang.en = $storage.lang.default;
    
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

    
    // Message._defaultMessage = function(p_lang) {
    // };
    
    Message._replacePlaceholders = function(p_template, p_values) {
        let namedValues = {}, indexedValues = [];
        
        if (Array.isArray(p_values)) indexedValues = p_values;
        else if (typeof p_values === 'object') namedValues = p_values;

        // `${변수명}` 치환
        p_template = p_template.replace(/\$\{(\w+)\}/g, function(match, key) {
            return namedValues.hasOwnProperty(key) ? namedValues[key] : match;
        });
        // `$1, $2` 치환
        p_template = p_template.replace(/\$(\d+)/g, function(match, index) {
            var i = parseInt(index, 10) - 1;
            return indexedValues[i] !== undefined ? indexedValues[i] : match;
        });

        return p_template;
    };
    
    Message._getMessageByCode = function(p_code) {
        var value = $storage.lang[currentLang]?.[p_code] || $storage.lang[defaultLang]?.[p_code];
        return typeof value === 'number' ? String(value) : value;
    };
    
    Message.importMessage = function(p_msg, p_path) {
        if (_isObject(p_msg)) {
            deepMerge($storage.lang.default, p_msg);
            $storage.path.push(p_path);
        }
    };

    Message.changeLanguage = async function(p_lang) {
        for (var i = 0; i < $storage.path.length; i++) {
            var localPath = $storage.path[i];
            var msg = await loadJSON(`${localPath}/${p_lang}.json`);

            $storage.lang[p_lang] = $storage.lang[p_lang] || {};
            // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

            if (typeof msg === 'object') deepMerge($storage.lang[p_lang], msg);
            else console.warn(`Path '${localPath}/${p_lang}' does not have a file.`);
        }
        currentLang = p_lang;
    };

    Message.get = function(p_code, p_values) {
        var msg = Message._getMessageByCode(p_code);
        var result;

        if (typeof msg === 'undefined') {
            return `There is no message for code '${p_code}'.`
        }
        result = Message._replacePlaceholders(msg, p_values);
        return result;
    };

    Message.currentLang = _detectLanguage();
    
    return Message;
}());



Message.importMessage(defaultCode, localesPath);


// 테스트
// console.log(Message._replacePlaceholders(
//     "Hello ${name}, you have $1 new messages.", 
//     // { name: "Alice" }, 
//     [5]
// ));
// // 출력: "Hello Alice, you have 5 new messages."

// console.log(Message._replacePlaceholders(
//     "Error: ${error} occurred at $1", 
//     { error: "404 Not Found" }, 
//     ["index.html"]
// ));
// // 출력: "Error: 404 Not Found occurred at index.html"

// console.log(Message._replacePlaceholders(
//     "Total cost: ${price} USD, Discount: $1%", 
//     { price: 100 }, 
//     [10]
// ));
// 출력: "Total cost: 100 USD, Discount: 10%"

// Message.changeLanguage('ko');

// console.log(Message.get('EL03231'));
// console.log(Message.get('EL03232'));


// console.log(Message.$storage);
// console.log('ww');
//==============================================================
// 4. module export
exports.Message = Message;
exports = Message;
