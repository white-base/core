/**** load-json.cjs loadJSON() CJS module ****/
//==============================================================
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
    } catch (error) {
        return undefined;
    }
}

async function getLocalePath(filename) {
    try {
        if (isNode) {
            const path = require('path');
            return path.resolve(__dirname, filename);
        }
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