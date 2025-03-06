function getUserLanguage() {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
        // 브라우저 환경
        return navigator.language || navigator.userLanguage || "en";
    } else if (typeof process !== "undefined" && process.env) {
        // Node.js 환경
        return process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES || "en";
    }
    return "en"; // 기본값 (영어)
}

// 사용 예시
console.log(getUserLanguage()); // ex) "ko-KR" (브라우저), "en_US.UTF-8" (Node.js)


// const osLocale = require("os-locale");

import {osLocale} from 'os-locale'

osLocale().then(locale => {
    console.log(locale); // 예: "ko-KR"
});