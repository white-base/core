/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const { NamespaceManager }      = require('../src/namespace-manager');
const { replacer, reviver, stringify, parse }              = require('telejson');

//==============================================================
// test
describe("[target: namespace-manager.js]", () => {
    describe("NamespaceManager :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        describe("NamespaceManager.list <요소 목록>", () => {
            it("- list : 목록 얻기 ", () => {
                const ns = new NamespaceManager();
                ns.set('a1.b1.Fun', Function);
                ns.set('a1.b2.Str', String);
                const list = ns.list;

                expect(list.length).toBe(2);
                expect(list[0]).toBe('a1.b1.Fun');
                expect(list[1]).toBe('a1.b2.Str');
            });
            it("- list : 빈 목록 얻기 ", () => {
                const ns = new NamespaceManager();
                const list = ns.list;

                expect(list.length).toBe(0);
            });
        });
        describe("NamespaceManager.count <요소 갯수>", () => {
            it("- count : 갯수 ", () => {
                const ns = new NamespaceManager();
                ns.set('a1.b1', 'Fun', Function);
                ns.set('a1.b2', 'Str', String);
                const count = ns.count;

                expect(count).toBe(2);
            });
            it("- list : 빈 목록 얻기 ", () => {
                const ns = new NamespaceManager();
                const count = ns.count;

                expect(count).toBe(0);
            });
        });
        describe("NamespaceManager.register(ns) <네임스페이스 등록>", () => {
            it("- register() : 등록 ", () => {
                const ns = new NamespaceManager();
                ns.register('aa.bb');
                const s = ns.__storage;

                expect(s.aa.bb).toBeDefined();
            });
            it("- register() : 금지어 등록 ", () => {
                const ns = new NamespaceManager();
                ns.register('ns.aa');
                const s = ns.__storage;
    
                expect(s.aa).toBeDefined();
            });
            // it("- register() : namespace = {} 같이 등록 ", () => {
            //     const ns = new NamespaceManager();
            //     ns.register('ns.aa');
            //     ns.namespace.aa.bb = {};
    
            //     expect(ns.namespace.aa).toBeDefined();
            //     expect(ns.namespace.aa.bb).toBeDefined();
            // });
            it("- register() : [예외] 자른 다료형 ", () => {
                const ns = new NamespaceManager();
    
                expect(() => ns.register(10)).toThrow(/Only/);
                expect(() => ns.register({})).toThrow(/Only/);
                expect(() => ns.register(true)).toThrow(/Only/);
            });
            it("- register() : [예외] ns/section 이름 규칙 ", () => {
                const ns = new NamespaceManager();
    
                expect(() => ns.register('.aa')).toThrow(/p_ns/);
                expect(() => ns.register('aa-bb')).toThrow(/p_ns/);
                expect(() => ns.register('aa.bb@')).toThrow(/p_ns/);
                expect(() => ns.register('aa.3bb')).toThrow(/section/);
            });
        });
        describe("NamespaceManager.release(ns) <네임스페이스 해제>", () => {
            it("- release() : leaf 해제 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                // 등록
                ns.register('a1.b1');
                ns.register('a1.b2');
                ns.register('a1.b2.c1');
                ns.register('a1.b2.c2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2.c1).toBeDefined();
                expect(s.a1.b2.c2).toBeDefined();
                // 해제
                ns.release('a1.b2.c2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2.c1).toBeDefined();
                expect(s.a1.b2.c2).not.toBeDefined();
            });
            it("- release() : node 해제 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;

                // 등록
                ns.register('a1.b1');
                ns.register('a1.b2');
                ns.register('a1.b2.c1');
                ns.register('a1.b2.c2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2.c1).toBeDefined();
                expect(s.a1.b2.c2).toBeDefined();
                // 해제
                ns.release('a1.b2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2).not.toBeDefined();
            });
            it("- release() : 없는 경우 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.register('a1.b1');
                ns.release('a1.b2');
                expect(s.a1.b1).toBeDefined();
            });
        });
        describe("NamespaceManager.path(ns?) <네임스페이스 경로 얻기>", () => {
            it("- path() : 전체 경로 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.register('a1.b1');
                const p = ns.path();

                expect(s === s).toBe(true);
            });
            it("- path(ns) : 대상 경로 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.register('a1.b1');
                ns.register('a1.b2.c1');
                const p1 = ns.path('a1.b1');
                const p2 = ns.path(['a1', 'b1']);

                expect(p1 === s.a1.b1).toBe(true);
                expect(p2 === s.a1.b1).toBe(true);
            });
            it("- path(ns) : 잘못된 경로", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.register('a1.b1');
                const p = ns.path('a1.b2');

                expect(p).not.toBeDefined();
            });
        });
        describe("NamespaceManager.set(fullName, elem) <네임스페이스에 요소 설정>", () => {
            it("- set() : Function 등록 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.set('a1.b1.Fun', Function);

                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b1.Fun).toBeDefined();
                expect(typeof s.a1.b1.Fun).toBe('function');
            });
            it("- set() : 최상위에 등록 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.set('Fun', Function);

                expect(s.Fun).toBeDefined();
                expect(typeof s.Fun).toBe('function');
            });
            it("- set() : [예외] key 이름 규칙 ", () => {
                const ns = new NamespaceManager();
    
                // expect(() => ns.set('a1.b1', '.Fun', Function)).toThrow(/p_key/);
                expect(() => ns.set('a1.b1.Fun%', Function)).toThrow(/key/);
            });
        });
        describe("NamespaceManager.get(fullname) <네임스페이스에 요소 얻기>", () => {
            it("- get(fullName) : Function 얻기 ", () => {
                const ns = new NamespaceManager();
                ns.set('a1.b1.Fun', Function);
                const fun = ns.get('a1.b1.Fun');

                expect(fun).toBe(Function);
            });
        });

        describe("NamespaceManager.del(fullName): bool <네임스페이스에 요소 삭제>", () => {
            it("- del(fullName) : 요소 삭제", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.set('Fun', Function);
                ns.set('a1.b1.Str', String);
                ns.set('a1.b1.c1.Arr', Array);
                const r1 = ns.del('a1.b1.c1.Arr');
                const r2 = ns.del('a1.b1.Arr');

                expect(ns.has(Function)).toBe(true);
                expect(ns.has(String)).toBe(true);
                expect(ns.has(Array)).toBe(false);
                expect(r1).toBe(true);
                expect(r2).toBe(false);
            });
        });
        describe("NamespaceManager.find(elem) <네임스페이스 얻기>", () => {
            it("- find(elem) : 네임스페이스 얻기", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                var fun = function(){return 'Fun'};
                var str = function(){return 'Str'};
                var arr = function(){return 'Arr'};
                ns.set('Fun', fun);
                ns.set('a1.b1.Str', str);
                ns.set('a1.b1.c1.Arr', arr);
                const str1 = ns.find(fun);
                const str2 = ns.find(str);
                const str3 = ns.find(arr);

                expect(str1).toBe('Fun');
                expect(str2).toBe('a1.b1.Str');
                expect(str3).toBe('a1.b1.c1.Arr');
            });
            it("- find(elem) : 내장함수 ", () => {
            });
            it("- find(elem) : 없는 경우 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.set('a1.b1', 'Fun', Function);
                const str = ns.find(Array);

                expect(str).not.toBeDefined();
            });
        });
        describe("NamespaceManager.has(elem): bool <네임스페이스에 요소 유무>", () => {
            it("- has(elem) : 객체로 요소 검사 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.set('Fun', Function);
                ns.set('a1.b1.Str', String);
                ns.set('a1.b1.c1.Arr', Array);

                expect(ns.has(Function)).toBe(true);
                expect(ns.has(String)).toBe(true);
                expect(ns.has(Array)).toBe(true);
                expect(ns.has(RegExp)).toBe(false);
            });
            it("- has(elem) : 이름으로 요소 검사 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.set('Fun', Function);
                ns.set('a1.b1.Str', String);
                ns.set('a1.b1.c1.Arr', Array);

                expect(ns.has('Fun')).toBe(true);
                expect(ns.has('a1.b1.Str')).toBe(true);
                expect(ns.has('a1.b1.c1.Arr')).toBe(true);
                expect(ns.has('RegExp')).toBe(false);
            });

        });
        // describe("this.getPath(elem | str): str<ns> <네임스페이스 얻기>", () => {
        //     it("- getPath(elem) : 객체로 얻기 ", () => {
        //         const ns = new NamespaceManager();
        //         const s = ns.__storage;
        //         const fun1 = function(){ return 'fun1' };
        //         const fun2 = function(){ return 'fun2' };
        //         const fun3 = function(){ return 'fun3' };
        //         ns.set('fun1', fun1);
        //         ns.set('a1.b1.fun2', fun2);
        //         ns.set('a1.b1.c1.fun3', fun3);

        //         expect(ns._getPath(fun1).full).toBe('fun1');
        //         expect(ns._getPath(fun2).full).toBe('a1.b1.fun2');
        //         expect(ns._getPath(fun3).full).toBe('a1.b1.c1.fun3');
        //     });
        // });
        describe("NamespaceManager.output(stringify?, space?, vOpt?): str <네임스페이스에 출력>", () => {
            it("- output(stringify) : 함수 출력 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                const fun1 = function(){ return 'fun1' };
                const fun2 = function(){ return 'fun2' };
                const fun3 = function(){ return 'fun3' };
                ns.set('fun1', fun1);
                ns.set('a1.b1.fun2', fun2);
                ns.set('a1.b1.c1.fun3', fun3);
                ns.set('a1.NamespaceManager', NamespaceManager);
                const str = ns.output(stringify, '\t');
                
                // 검사
                expect(ns.has(fun1)).toBe(true);
                expect(ns.has(fun2)).toBe(true);
                expect(ns.has(fun3)).toBe(true);
                // expect(ns.count).toBe(3);
                // 초기화
                
                // ns.init();
                const ns2 = new NamespaceManager();
                const s2 = ns2.__storage;

                expect(ns2.count).toBe(0);
                // 로드

                ns2.load(str, parse);
                // REVIEW: 타입이 달라지는 부분 확인 필요
                expect(ns2.has('fun1')).toBe(true);
                expect(ns2.has('a1.b1.fun2')).toBe(true);
                expect(ns2.has('a1.b1.c1.fun3')).toBe(true);
                // expect(ns.count).toBe(3);
                var n = ns2.get('a1.NamespaceManager');
                // var nn = ns2.get2('a1.NamespaceManager');
                var nm = ns2.path('a1');
                var n2 = ns2.path();
                // var i = new n();
                // console.log(0);
            });
        });
        describe("NamespaceManager.load(str, parse?) <네임스페이스 불러오기>", () => {
            it("- getPath(elem) : 객체로 얻기 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                const fun1 = function(){ return 'fun1' };
                const fun2 = function(){ return 'fun2' };
                const fun3 = function(){ return 'fun3' };
                ns.set('fun1', fun1);
                ns.set('a1.b1.fun2', fun2);
                ns.set('a1.b1.c1.fun3', fun3);
                const str = ns.output(stringify, '\t');
                const ns2 = new NamespaceManager();
                ns2.load(str, parse);

                expect(ns.find(fun1)).toBe('fun1');
                expect(ns.find(fun2)).toBe('a1.b1.fun2');
                expect(ns.find(fun3)).toBe('a1.b1.c1.fun3');
            });
        });
    });
    
});
