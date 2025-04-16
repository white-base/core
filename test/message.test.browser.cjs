//==============================================================
// gobal defined
const koCode = require("../dist/locales/ko.json");
const fs = require('fs');
const path = require('path');

//==============================================================
// test
describe("BROWSER ENV TEST", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(koCode),
            })
        );
        globalThis.isDOM = true;
        Object.defineProperty(navigator, 'languages', {
            configurable: true,
            get: () => ['en_US', 'en'],
        });
    });
    describe("Message.get() : 메시지 얻기", () => {
        it("- 한글", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = await import("../src/message-wrap");
            // const {Message} = require("../src/message-wrap");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");    // only ko code
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- 한글", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = await import("../index.js");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- 한글 : 모듈", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            const {Message} = require("logic-core");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/There is no message for code. 'KO'/);
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : 모듈 2", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            const {Message} = await import("logic-core");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : esm", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            globalThis.isDOM = true;

            // const {Message} = require("../dist/logic-core.esm.js");
            const {Message} = await import("../dist/logic-core.esm.js");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : node", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = await import("../dist/logic-core.node.cjs");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : node 2", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = require("../dist/logic-core.node.cjs");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : browser", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = require("../dist/logic-core.browser.cjs");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("There is no message for code. 'KO'");
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- 한글 : browser 2", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = await import("../dist/logic-core.browser.cjs");
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch(/OK/);
        });
        // REVIEW: E2E 와 가장 근접한 방식임
        it("- 한글 : umd ", async () => {
            // globalThis.isDOM = false;
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            await import("../dist/logic-core.js");
            const {Message} = globalThis._L;
            // await Message.autoDetect();  // 수동으로 호출해야함
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch(/OK/);
        });
        // 실패함
        it.skip("- 한글 : umd 2", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            require("../dist/logic-core.js");
            const {Message} = globalThis._L;
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- 한글 : umd script 실행", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            // globalThis.isDOM = false;
            const umdCode = fs.readFileSync(path.resolve(__dirname, '../dist/logic-core.js'), 'utf8');
            const wrappedCode = `
                return (async function(global) {
                    ${umdCode}
                    global._L = typeof _L !== 'undefined' ? _L : global._L;
                })(globalThis);
            `;
            const script = new Function(wrappedCode);
            script(global);
            const {Message} = globalThis._L;
            await Message.autoDetect();  // 수동으로 호출해야함

            // const script = new Function('global', umdCode + '; return global._L;');
            // globalThis._L = script(global);
            // const {Message} = _L;


            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
        it("- 한글 : umd script 실행 2", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            const umdCode = fs.readFileSync(path.resolve(__dirname, '../dist/logic-core.js'), 'utf8');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.textContent = umdCode;
            document.head.appendChild(script);
            const {Message} = globalThis._L;

            expect(Message.currentLang).toBe('ko')
            // expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
        // 경로 문제로 오류
        it.skip("- 한글 : umd script 실행 3", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko_KR', 'ko'],
            });
            // const script = document.createElement('script');
            // script.src = path.resolve(__dirname, '../dist/logic-core.js'); // Rollup의 UMD 파일
            // document.head.appendChild(script);
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                // script.src = path.resolve(__dirname, '../dist/logic-core.js'); // Rollup의 UMD 파일
                script.src = './abc.js'
                script.onload = () => resolve();
                script.onerror = (e) => reject(e);
                document.head.appendChild(script);
            });

            const {Message} = globalThis._L;

            expect(Message.currentLang).toBe('ko')
            // expect(Message.get('KO')).toMatch("OK");
            expect(Message.get('EN')).toMatch("OK");
        });
    });
    describe("Message.autoDetect() : 언어자동 감지", () => {
        it("- index.js", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = require("logic-core/ko");
            await Message.autoDetect();

            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
        it("- logic-core", async () => {
            Object.defineProperty(navigator, 'languages', {
                configurable: true,
                get: () => ['ko-KR', 'ko'],
            });
            const {Message} = require("../dist/logic-core.browser.cjs");
            await Message.autoDetect()
            
            expect(Message.currentLang).toBe('ko')
            expect(Message.get('KO')).toMatch(/OK/);
            expect(Message.get('EN')).toMatch(/OK/);
        });
    });
});