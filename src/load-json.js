/**** load-json.cjs loadJSON() ESM module ****/
//==============================================================
const isNode = typeof globalThis.isDOM === 'boolean' ? !globalThis.isDOM :  typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

async function loadJSON(filePath) {
    try {
        if (isNode) {    
            const { readFile } = await import('fs/promises');
            const absolutePath = await getLocalePath(filePath);
            const jsonText = await readFile(absolutePath, 'utf8');
            return JSON.parse(jsonText);
        } else {
            const absolutePath = await getLocalePath(filePath);
            const response = await fetch(absolutePath);
            return await response.json();
        }
    } catch (error) {
        return undefined;
    }
}

async function getLocalePath(filename) {
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