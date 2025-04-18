/**** message.js | Message ****/
//==============================================================
import { loadJSON } from './load-json.js';

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

function _getLocale() {
    let locale = '';

    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        // 브라우저 환경
        const lang = navigator.languages?.[0] || navigator.language || Intl.DateTimeFormat().resolvedOptions().locale;
        locale = lang.split(/[_-]/)[0]; // "ko-KR" -> "ko"
    } else if (typeof process !== 'undefined') {
        // Node.js 환경
        const rawLocale = process.env.LANG || process.env.LC_ALL || process.env.LANGUAGE;
        if (rawLocale) {
            locale = rawLocale.split(/[:_.]/)[0].replace('_', '-'); // "ko_KR.UTF-8" -> "ko"
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

/**
 * 'Message' is a class that manages messages and codes.  
 */
class Message {

    /**
     * Namespace path. ('Common')
     */
    static _NS = 'Common';
    
    /**
     * Internal repository that stores message code.  
     */
    static $storage = {
        lang: { default: {} },
        path: [],
        _history: {}
    };
    
    /**
     * Sets whether automatic language detection is enabled. Default is true.  
     */
    // static autoDetect = true;
    
    /**
     * Set the default language. Default is 'default'.  
     */
    static defaultLang = 'default';
    
    /**
     * Sets the current language. Default is 'default'.  
     */
    static currentLang = this.defaultLang;
    
    /**
     * Returns a message that corresponds to the message code.  
     * 
     * @param {string} p_code Message code
     * @returns {string} Message String
     */
    static getMessageByCode (p_code) {
        var value = this.$storage.lang[this.currentLang]?.[p_code] || this.$storage.lang[this.defaultLang]?.[p_code];
        return typeof value === 'number' ? String(value) : value;
    };

    /**
     * Add the message code to the storage.  
     * 
     * @param {object} p_msg Message Object
     * @param {string} p_path Message file path
     */
    static importMessage (p_msg, p_path) {
        if (_isObject(p_msg)) {
            _deepMerge(this.$storage.lang.default, p_msg);
            if (_isString(p_path)) {
                // if (isNode && isESM) {  // REVIEW: esm module & node
                //     const { fileURLToPath } = await import('url');
                //     const { dirname, resolve } = await import('path');

                //     const __filename = fileURLToPath(import.meta.url);
                //     const __dirname = dirname(__filename);
                //     p_path = resolve(__dirname, p_path);
                // }
                if (this.$storage.path.indexOf(p_path) < 0) this.$storage.path.push(p_path);
            }
        }
        // locale = _getLocale();
        // if (locale === 'en') locale = 'default';
        // else await Message.changeLanguage(locale);
    };

    /**
     * Change the language.  
     * 
     * @param {string} p_lang language code
     */
    static async changeLanguage (p_lang) {
        var msg;
        this.currentLang = p_lang;
        if (p_lang === 'default') return;
        for (var i = 0; i < this.$storage.path.length; i++) {
            const localPath = this.$storage.path[i];
            // var msg = await loadJSON(`${localPath}/${p_lang}.json`);
            // initialize the language
            this.$storage.lang[p_lang] = this.$storage.lang[p_lang] || {};
            this.$storage._history[p_lang] = this.$storage._history[p_lang] || [];
            
            const _history = this.$storage._history[p_lang];
            if (_history.indexOf(localPath) >= 0) continue;
            msg = await loadJSON(`${localPath}/${p_lang}.json`);

            if (typeof msg === 'object') {
                _deepMerge(this.$storage.lang[p_lang], msg);
                _history.push(localPath);
            } else console.warn(`Path '${localPath}/${p_lang}.json' does not have a file.`);
        }
    }

    /**
     * Returns a string corresponding to the given message code.  
     * 
     * @param {string} p_code Message code
     * @param {object | string[]} p_values Value to replace in message
     * @returns {string} 메시지
     */
    static get (p_code, p_values) {
        var msg = Message.getMessageByCode(p_code);
        var result;

        if (typeof msg === 'undefined') {
            return `There is no message for code. '${p_code}'`;
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
     * Initialize the language.  
     */
    static resetLang () {
        this.currentLang = this.defaultLang;
    }

    /**
     * Set the current language by automatically detecting the language.  
     */
    static async autoDetect () {
        let locale = _getLocale();  // internal function

        if (locale === 'en') locale = 'default';
        await Message.changeLanguage(locale);
    }
}

export default Message;
export { Message };