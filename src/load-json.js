// ESM module
// const isNode = typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null && globalThis.isDOM !== true;
const isNode = typeof globalThis.isDOM === 'boolean' ? !globalThis.isDOM :  typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

async function loadJSON(filePath) {
    try {
        if (isNode) {    
            const { readFile } = await import('fs/promises');
            filePath = await getLocalePath(filePath);
            const jsonText = await readFile(filePath, 'utf8');
            return JSON.parse(jsonText);
        } else {
            filePath = await getLocalePath(filePath);
            const response = await fetch(filePath);
            return await response.json();
        }
    } catch (error) {
        return undefined;
    }
}

async function getLocalePath(filename) {
    // 1. 브라우저 (ESM or 일반 스크립트)
    // if (typeof import.meta !== 'undefined' && import.meta.url && typeof process !== 'undefined') {
    if (isNode) {
        const { fileURLToPath } = await import('url');
        const path = await import('path');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        return path.resolve(__dirname, filename);
    }

    if (typeof window !== 'undefined') {
        let baseURL = '';

        if (typeof document !== 'undefined' && document.currentScript) {
            baseURL = document.currentScript.src;
        } else if (typeof import.meta !== 'undefined' && import.meta.url) {
            baseURL = import.meta.url;
        } else {
            throw new Error('Unable to determine base URL in browser.');
        }
        return new URL(filename, baseURL).href;
    }
    throw new Error('Unsupported environment');
}

export { loadJSON };