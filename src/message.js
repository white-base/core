/**** message.js | Message ****/
//==============================================================
// import  defaultCode         from './locales/default.json' with { type: 'json' };
import  defaultCode         from './locales/default.js';



// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const defaultCode = require('./locales/default.json');

// import { fileURLToPath }    from 'url';
// import { dirname, resolve } from 'path';

const localesPath = './locales';    // 상대 경로

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
    const isNode = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null && globalThis.isDOM !== true;
    const isESM = isNode && (typeof require === 'undefined' || globalThis.isESM === true);   // REVIEW: test hack
    
    try {
        if (isESM) {    
            // return (await import(filePath, { with: { type: 'json' } })).default;

            const { readFile } = await import('fs/promises');
            const { fileURLToPath } = await import('url');
            const path = await import('path');
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            
            if (!path.isAbsolute(filePath)) filePath = path.join(__dirname, filePath);
            const jsonText = await readFile(filePath, 'utf8');
            return JSON.parse(jsonText);
        } else if (isNode) {
            return require(filePath);
        } else {
            const response = await fetch(filePath);
            return await response.json();
        }
    } catch (error) {
        // console.log(`Error loading JSON file: ${filePath}`, error);
        return undefined;
    }
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
        path: []
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
        this.currentLang = p_lang;
        if (p_lang === 'default') return;
        for (var i = 0; i < this.$storage.path.length; i++) {
            var localPath = this.$storage.path[i];
            var msg = await _loadJSON(`${localPath}/${p_lang}.json`);

            this.$storage.lang[p_lang] = this.$storage.lang[p_lang] || {};
            // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

            if (typeof msg === 'object') _deepMerge(this.$storage.lang[p_lang], msg);
            else console.warn(`Path '${localPath}/${p_lang}' does not have a file.`);
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
        // let locale;
        this.currentLang = this.defaultLang;
        // if (this.autoDetect) {
        //     locale = _getLocale();
        //     if (locale === 'en') locale = 'default';
        //     await Message.changeLanguage(locale);
        // }
    }

    /**
     * Set the current language by automatically detecting the language.  
     */
    static async autoDetect () {
        let locale = _getLocale();  // internal function
        // let locale = await osLocale(); // external function
        // locale = locale.split(/[_-]/)[0];

        if (locale === 'en') locale = 'default';
        await Message.changeLanguage(locale);
    }
}
// console.log('Before import');
// (async () => {
//     await Message.importMessage(defaultCode, localesPath);
// })();

// async function main() {
//     await (async () => {
//     await Message.importMessage(defaultCode, localesPath);
//     // await Messagde.importMessage(...);
//     })(); // ← IIFE가 반환하는 promise를 여기서 await
    
//     console.log('importMessage가 끝난 후 실행됨');
// }
//  main();


Message.importMessage(defaultCode, localesPath);
// console.log('After import');

// (async () => {
//     await Message.importMessage(defaultCode, localesPath);
// })();
// async function main() {
//     await Message.importMessage(defaultCode, localesPath);
//     console.log('importMessage 완료 후 실행');
// }
// main();

// await Message.importMessage(defaultCode, localesPath);

export default Message;
export { Message };