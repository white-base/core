/**** message.js | Message ****/
import  defaultCode  from './locales/default.json'
const localesPath = './locales';    // 상대 경로

//==============================================================
// 2. module dependency check
//==============================================================
// 3. module implementation       
/**
 * @class Message
 * @description 메시지 코드 관리 클래스 (static)
 */
// inner function
function _isObject(obj) {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
}
function _isString(obj) {    // 공백아닌 문자 여부
    if (typeof obj === 'string' && obj.length > 0) return true;
    return false;
}
function _deepMerge(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var targetValue = target[key];
            var sourceValue = source[key];
            if (_isObject(sourceValue)) {
                if (!_isObject(targetValue)) {
                    target[key] = {};
                }
                target[key] = _deepMerge(target[key], sourceValue);
            } else {
                target[key] = sourceValue;
            }
        }
    }
    return target;
}

async function _loadJSON(filePath) {
    const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null && typeof navigator === 'undefined';
    const isESM = isNode && (typeof require === 'undefined' || globalThis.isESM === true);   // REVIEW: test hack
    
    try {
        if (isNode) {
            if (isESM) {
                return (await import(filePath, { with: { type: 'json' } })).default;
            } else {
                return require(filePath);
            }
        } else {
            const response = await fetch(filePath);
            return await response.json();
        }
    } catch (error) {
        return;
    }
}

function _getLocale() {
    let locale = "";

    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        // 브라우저 환경
        const lang = navigator.languages?.[0] || navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
        locale = lang.split(/[_-]/)[0]; // "ko-KR" -> "ko"
    } else if (typeof process !== "undefined") {
        // Node.js 환경
        const rawLocale = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;
        if (rawLocale) {
            locale = rawLocale.split(/[:_.]/)[0].replace("_", "-"); // "ko_KR.UTF-8" -> "ko"
        }
    }
    return locale || 'en';
}

function _replacePlaceholders (p_template, p_values) {
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

class Message {

    static _NS = 'Common';
    
    /**
     * 메시지 코드를 저장하는 내부 저장소입니다. 
     */
    static $storage = {
        lang: { default: {} },
        path: []
    };
    
    /**
     * 언어 자동 감지 여부를 설정합니다. 기본값은 true입니다.
     */
    static autoDetect = true;
    
    /**
     * 기본 언어를 설정합니다. 기본값은 'default'입니다.
     */
    static defaultLang = 'default';
    
    /**
     * 현재 언어를 설정합니다. 기본값은 'default'입니다.
     */
    static currentLang = this.defaultLang;

    
    /**
     * 메시지 코드에 해당하는 메시지를 반환합니다.
     * @param {string} p_code 메시지 코드
     * @returns {string} 메시지 문자열
     */
    static getMessageByCode (p_code) {
        var value = this.$storage.lang[this.currentLang]?.[p_code] || this.$storage.lang[this.defaultLang]?.[p_code];
        return typeof value === 'number' ? String(value) : value;
    };

    /**
     * 메시지 코드를 저장소에 추가합니다.
     * @param {object} p_msg 메세지 객체
     * @param {string} p_path 메세지 파일 경로
     */
    static importMessage (p_msg, p_path) {
        if (_isObject(p_msg)) {
            _deepMerge(this.$storage.lang.default, p_msg);
            if (_isString(p_path)) this.$storage.path.push(p_path);
        }
    };

    /**
     * 언어를 변경합니다.
     * @param {string} p_lang 언어 코드
     */
    static async changeLanguage (p_lang) {
        for (var i = 0; i < this.$storage.path.length; i++) {
            var localPath = this.$storage.path[i];
            var msg = await _loadJSON(`${localPath}/${p_lang}.json`);

            this.$storage.lang[p_lang] = this.$storage.lang[p_lang] || {};
            // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

            if (typeof msg === 'object') _deepMerge(this.$storage.lang[p_lang], msg);
            else console.warn(`Path '${localPath}/${p_lang}' does not have a file.`);
        }
        this.currentLang = p_lang;
    }

    /**
     * 메시지 코드에 메세지를 반환합니다.
     * @param {string} p_code 메시지 코드
     * @param {object | string[]} p_values 메시지에서 치환할 값
     * @returns {string} 메시지
     */
    static get (p_code, p_values) {
        var msg = Message.getMessageByCode(p_code);
        var result;

        if (typeof msg === 'undefined') {
            return `There is no message for code. '${p_code}'`
        }
        result = _replacePlaceholders(msg, p_values);
        return $intro(p_code) + result;

        // inner funciton
        function $intro(code) {
            var intro = '';
            var firstChar = code.substring(0, 1);
            
            if (firstChar === 'E') intro = 'Error';
            else if (firstChar === 'W') intro = 'Warn';
            return intro + ' ['+ code +'] ';
        }
    };

    /**
     * currentLang 를 defaultLang 로 초기화합니다.  
     * 언어 자동 감지가 설정되어 있으면 자동으로 언어를 변경합니다.  
     * 
     * @returns {Promise<void>}
     */
    static async init () {
        var locale;

        this.currentLang = this.defaultLang;
        if (this.autoDetect) {
            locale = _getLocale();
            if (locale === 'en') locale = 'default';
            await Message.changeLanguage(locale);
        }
    }
}

Message.importMessage(defaultCode, localesPath);

//==============================================================
// 4. module export
export default Message;
export { Message };