/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const { NamespaceManager }      = require('../src/namespace-manager');

//==============================================================
// test
describe("[target: namespace-manager.js]", () => {
    describe("NamespaceManager :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        describe("this.register(ns) <네임스페이스 등록>", () => {
            it("- register() : 등록 ", () => {
                const app = new NamespaceManager();
                let ns = app.namespace;
                app.register('aa.bb');

                expect(ns.aa.bb).toBeDefined();
            });
            it("- register() : 금지어 등록 ", () => {
                const app = new NamespaceManager();
                app.register('ns.aa');
    
                expect(app.namespace.aa).toBeDefined();
            });
            it("- register() : namespace = {} 같이 등록 ", () => {
                const app = new NamespaceManager();
                app.register('ns.aa');
                app.namespace.aa.bb = {};
    
                expect(app.namespace.aa).toBeDefined();
                expect(app.namespace.aa.bb).toBeDefined();
            });
            it("- register() : [예외] 자른 다료형 ", () => {
                const app = new NamespaceManager();
    
                expect(() => app.register(10)).toThrow(/Only/);
                expect(() => app.register({})).toThrow(/Only/);
                expect(() => app.register(true)).toThrow(/Only/);
            });
            it("- register() : [예외] ns/section 이름 규칙 ", () => {
                const app = new NamespaceManager();
    
                expect(() => app.register('.aa')).toThrow(/p_ns/);
                expect(() => app.register('aa-bb')).toThrow(/p_ns/);
                expect(() => app.register('aa.bb@')).toThrow(/p_ns/);
                expect(() => app.register('aa.3bb')).toThrow(/section/);
            });
        });
        describe("this.release(ns) <네임스페이스 해제>", () => {
            it("- release() : leaf 해제 ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;

                // 등록
                app.register('a1.b1');
                app.register('a1.b2');
                app.register('a1.b2.c1');
                app.register('a1.b2.c2');
                expect(ns.a1.b1).toBeDefined();
                expect(ns.a1.b2.c1).toBeDefined();
                expect(ns.a1.b2.c2).toBeDefined();
                // 해제
                app.release('a1.b2.c2');
                expect(ns.a1.b1).toBeDefined();
                expect(ns.a1.b2.c1).toBeDefined();
                expect(ns.a1.b2.c2).not.toBeDefined();
            });
            it("- release() : node 해제 ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;

                // 등록
                app.register('a1.b1');
                app.register('a1.b2');
                app.register('a1.b2.c1');
                app.register('a1.b2.c2');
                expect(ns.a1.b1).toBeDefined();
                expect(ns.a1.b2.c1).toBeDefined();
                expect(ns.a1.b2.c2).toBeDefined();
                // 해제
                app.release('a1.b2');
                expect(ns.a1.b1).toBeDefined();
                expect(ns.a1.b2).not.toBeDefined();
            });
        });
        describe("this.set(ns, key, elem) <네임스페이스에 요소 설정>", () => {
            it("- set() : Function 등록 ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('a1.b1', 'Fun', Function);

                expect(ns.a1.b1).toBeDefined();
                expect(ns.a1.b1.Fun).toBeDefined();
                expect(typeof ns.a1.b1.Fun).toBe('function');
            });
            it("- set() : 최상위에 등록 ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('', 'Fun', Function);

                expect(ns.Fun).toBeDefined();
                expect(typeof ns.Fun).toBe('function');
            });
            it("- set() : [예외] key 이름 규칙 ", () => {
                const app = new NamespaceManager();
    
                expect(() => app.set('a1.b1', '.Fun', Function)).toThrow(/p_key/);
                expect(() => app.set('a1.b1', 'Fun%', Function)).toThrow(/p_key/);
            });
        });
        describe("this.get(fullname) <네임스페이스에 요소 얻기>", () => {
            it("- get(fullName) : Function 얻기 ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('a1.b1', 'Fun', Function);
                const fun = app.get('a1.b1.Fun');

                expect(fun).toBe(Function);
            });
        });
        describe("this.find(elem) <네임스페이스 얻기>", () => {
            it("- find(elem) : 네임스페이스 얻기", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('', 'Fun', Function);
                app.set('a1.b1', 'Str', String);
                app.set('a1.b1.c1', 'Arr', Array);
                const str1 = app.find(Function);
                const str2 = app.find(Array);
                const str3 = app.find(String);

                expect(str1).toBe('');
                expect(str2).toBe('a1.b1.c1');
                expect(str3).toBe('a1.b1');
            });
            it("- find(elem, true) : 네임스페이스(전체) 얻기", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('', 'Fun', Function);
                app.set('a1.b1', 'Str', String);
                app.set('a1.b1.c1', 'Arr', Array);
                const str1 = app.find(Function, true);
                const str2 = app.find(Array, true);
                const str3 = app.find(String, true);

                expect(str1).toBe('Fun');
                expect(str2).toBe('a1.b1.c1.Arr');
                expect(str3).toBe('a1.b1.Str');
            });
            it("- find(elem) : 없는 경우 ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('a1.b1', 'Fun', Function);
                const str = app.find(Array);

                expect(str).not.toBeDefined();
            });
        });
        describe("this.has(elem): bool <네임스페이스에 요소 유무>", () => {
            it("- has(elem) : 요소 얻기 <최하위> ", () => {
                const app = new NamespaceManager();
                const ns = app.namespace;
                app.set('', 'Fun', Function);
                app.set('a1.b1', 'Str', String);
                app.set('a1.b1.c1', 'Arr', Array);

                expect(app.has(Function)).toBe(true);
                expect(app.has(String)).toBe(true);
                expect(app.has(Array)).toBe(true);
                expect(app.has(RegExp)).toBe(false);
            });
        });
    });
    
});
