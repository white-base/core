// CJS module
// const isNode = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null && globalThis.isDOM !== true;
const isNode = typeof globalThis.isDOM === 'boolean' ? !globalThis.isDOM :  typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

async function loadJSON(filePath) {
    try {
        if (isNode) {
            const path = require('path');
            const fs = require('fs');
            var absolutePath = path.resolve(__dirname, filePath);
            const data = fs.readFileSync(absolutePath, 'utf8');
            const parsed = JSON.parse(data);
            return parsed;
        } else {
            var absolutePath = await getLocalePath(filePath);
            const response = await fetch(absolutePath);
            return await response.json();
        }
        
        // if (typeof window !== 'undefined') {
            // filePath = await getLocalePath(filePath);
            // const response = await fetch(filePath);
            // return await response.json();
        // }
        // throw new Error('Unsupported environment');

    } catch (error) {
        return undefined;
    }
}

async function getLocalePath(filename) {
    try {
        // Node.js 환경
        if (isNode) {
            const path = require('path');
            return path.resolve(__dirname, filename);
        }
        // 브라우저 (ESM or 일반 스크립트)
        if (typeof window !== 'undefined') {
            let baseURL = '';
            if (typeof document !== 'undefined' && document.currentScript) {
                baseURL = document.currentScript.src;
            } else {
                baseURL = new URL('./', window.location.href).href;
            }
            return new URL(filename, baseURL).href;
        } 
        throw new Error('Unsupported environment');

    } catch (error) {
        throw new Error('Unsupported environment');
    }
}

// exports.loadJSON = loadJSON;
// exports.__esModule = true;

module.exports = {
    loadJSON,
    default: { loadJSON } // ESM default import 대응
};