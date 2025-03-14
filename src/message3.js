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
    let isESM = false;
    
    if (typeof require === 'undefined') {
        isESM = true; // require가 없으면 ESM으로 판단
    }
    
    // try {
    //     isESM = typeof import.meta !== 'undefined';
    // } catch (error) {
    //     isESM = false;
    // }

    if (isNode) {
        if (isESM) {
            // ESM (import assertions 사용)
            return (await import(filePath, { with: { type: 'json' } })).default;
        } else {
            // CJS (require 사용)
            // const fs = require('fs');
            // return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return require(filePath);
        }
    } else {
        // 브라우저 환경 (fetch 사용)
        const response = await fetch(filePath);
        return await response.json();
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


class Message {
    static _NS = 'Common';
    static $storage = { 
        lang: { default: {} },
        path: []
    };
    static autoDetect = true;
    static defaultLang = 'default';
    static autoDetect = defaultLang;

    static _replacePlaceholders (p_template, p_values) {
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

    static _getMessageByCode (p_msg, p_path) {
        if (_isObject(p_msg)) {
            deepMerge($storage.lang.default, p_msg);
            $storage.path.push(p_path);
        }
    };

    static async changeLanguage (p_lang) {
        for (var i = 0; i < $storage.path.length; i++) {
            var localPath = $storage.path[i];
            var msg = await loadJSON(`${localPath}/${p_lang}.json`);

            $storage.lang[p_lang] = $storage.lang[p_lang] || {};
            // if (typeof $storage.lang[p_lang] === 'undefined') $storage.lang[p_lang] = {};

            if (typeof msg === 'object') deepMerge($storage.lang[p_lang], msg);
            else console.warn(`Path '${localPath}/${p_lang}' does not have a file.`);
        }
        currentLang = p_lang;
    }

    static get (p_code, p_values) {
        var msg = Message._getMessageByCode(p_code);
        var result;

        if (typeof msg === 'undefined') {
            return `There is no message for code '${p_code}'.`
        }
        result = Message._replacePlaceholders(msg, p_values);
        return result;
    };

    static async init () {
        var locale;
        if (autoDetect) {
            locale = _getLocale();
            // lang = locale.split('-')[0];
            await Message.changeLanguage(locale);
            // Message.currentLang = locale;
        }
    }
}

Message.importMessage(defaultCode, localesPath);

//==============================================================
// 4. module export
export default Message;
export { Message };