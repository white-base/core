/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

// const { loadNamespace } = require('../src/load-namespace');
const { NamespaceManager }      = require('../src/namespace-manager');
const { replacer, reviver, stringify, parse }              = require('telejson');

//==============================================================
// test
describe("[target: namespace-manager.js]", () => {
    describe("NamespaceManager :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        describe("NamespaceManager._elemTypes <허용 타입>", () => {
            it("- this._elemTypes ", () => {
                const ns1 = new NamespaceManager();
                const ns2 = new NamespaceManager();
                const ns3 = new NamespaceManager();
                ns3._elemTypes = Function
                ns3._elemTypes = [String, Number]
                const fun1 = function() {return 'Fun1'};
                ns1.add('fun1', fun1);
                ns2.add('fun1', fun1);
                ns3.add('str', 'STR');
                ns3.add('num', 100);

                expect(ns1.count).toBe(1);
                expect(ns2.count).toBe(1);
                expect(ns3.count).toBe(2);
                expect(ns1.find('fun1')).toBe(fun1);
                expect(ns2.find('fun1')).toBe(fun1);
                expect(ns3.find('str')).toBe('STR');
                expect(ns3.find('num')).toBe(100);
            });
        });
        describe("NamespaceManager.isOverlap <중복 허용 여부>", () => {
            it("- this.isOverlap : 중복 허용 ", () => {
                const ns = new NamespaceManager();
                const fun1 = function() {return 'Fun1'};
                ns.isOverlap = true; // 중복허용
                ns.add('fun1', fun1);
                ns.add('a1.fun1', fun1);

                expect(ns.count).toBe(2);
                expect(ns.has('fun1')).toBe(true);
                expect(ns.has('a1.fun1')).toBe(true);
            });
            it("- this.isOverlap : 중복 허용 ", () => {
                const ns = new NamespaceManager();
                const fun1 = function() {return 'Fun1'};
                ns.add('fun1', fun1);

                expect(()=> ns.add('a1.fun1', fun1)).toThrow(/EL03333/);
                expect(()=> ns.add('a1.fun1', fun1)).toThrow(/EL03332/);
            });
            it("- this.isOverlap : 예외 ", () => {
                const ns = new NamespaceManager();
                expect(()=> ns.isOverlap = 1).toThrow(/EL03311/);
            });
        });
        describe("NamespaceManager.list <요소 목록>", () => {
            it("- list : 목록 얻기 ", () => {
                const ns = new NamespaceManager();
                ns.add('a1.b1.Fun', Function);
                ns.add('a1.b2.Str', String);
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
                ns.add('a1.b1', 'Fun', Function);
                ns.add('a1.b2', 'Str', String);
                const count = ns.count;

                expect(count).toBe(2);
            });
            it("- list : 빈 목록 얻기 ", () => {
                const ns = new NamespaceManager();
                const count = ns.count;

                expect(count).toBe(0);
            });
        });
        describe("NamespaceManager.init() <초기화>", () => {
            it("- init() : 초기화 ", () => {
                const ns = new NamespaceManager();
                ns.add('a1.b1', 'Fun', Function);
                ns.add('a1.b2', 'Str', String);
                ns.init();

                expect(ns.count).toBe(0);
            });
        });
        describe("NamespaceManager.addNamespace(ns) <네임스페이스 등록>", () => {
            it("- addNamespace() : 등록 ", () => {
                const ns = new NamespaceManager();
                ns.addNamespace('aa.bb');
                const s = ns.__storage;

                expect(s.aa.bb).toBeDefined();
            });
            it("- addNamespace() : 금지어 등록 ", () => {
                const ns = new NamespaceManager();
                ns.addNamespace('ns.aa');
                ns.addNamespace(['ns', 'bb']);
                const s = ns.__storage;
    
                expect(s.aa).toBeDefined();
                expect(s.bb).toBeDefined();
            });
            // it("- add() : namespace = {} 같이 등록 ", () => {
            //     const ns = new NamespaceManager();
            //     ns.add('ns.aa');
            //     ns.namespace.aa.bb = {};
    
            //     expect(ns.namespace.aa).toBeDefined();
            //     expect(ns.namespace.aa.bb).toBeDefined();
            // });
            it("- addNamespace() : [예외] 자른 다료형 ", () => {
                const ns = new NamespaceManager();
    
                expect(() => ns.addNamespace(['aa', 10])).toThrow('EL03314');
                expect(() => ns.addNamespace(10)).toThrow('EL03313');
                expect(() => ns.addNamespace({})).toThrow('EL03313');

                expect(() => ns.addNamespace(true)).toThrow('EL03313');
                expect(() => ns.addNamespace(true)).toThrow('EL03313');
            });
            it("- addNamespace() : [예외] ns/section 이름 규칙 ", () => {
                const ns = new NamespaceManager();
    
                expect(() => ns.addNamespace('.aa')).toThrow('EL03312');
                expect(() => ns.addNamespace('aa-bb')).toThrow('EL03312');
                expect(() => ns.addNamespace('aa.bb@')).toThrow('EL03312');

                expect(() => ns.addNamespace('aa.3bb')).toThrow('EL03315');
                expect(() => ns.addNamespace('aa.3bb')).toThrow('EL03321');
            });
        });
        describe("NamespaceManager.delNamespace(ns) <네임스페이스 해제>", () => {
            it("- delNamespace() : leaf 해제 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                // 등록
                ns.addNamespace('a1.b1');
                ns.addNamespace('a1.b2');
                ns.addNamespace('a1.b2.c1');
                ns.addNamespace('a1.b2.c2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2.c1).toBeDefined();
                expect(s.a1.b2.c2).toBeDefined();
                // 해제
                ns.delNamespace('a1.b2.c2');
                ns.delNamespace(['a1', 'b2', 'c1']);

                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2.c1).not.toBeDefined();
                expect(s.a1.b2.c2).not.toBeDefined();
            });
            it("- delNamespace() : node 해제 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;

                // 등록
                ns.addNamespace('a1.b1');
                ns.addNamespace('a1.b2');
                ns.addNamespace('a1.b2.c1');
                ns.addNamespace('a1.b2.c2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2.c1).toBeDefined();
                expect(s.a1.b2.c2).toBeDefined();
                // 해제
                ns.delNamespace('a1.b2');
                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b2).not.toBeDefined();
                expect(()=> ns.delNamespace(['a1', -1])).toThrow(/EL03314/)
            });
            it("- delNamespace() : 없는 경우 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.addNamespace('a1.b1');
                ns.delNamespace('a1.b2');

                expect(s.a1.b1).toBeDefined();
            });
        });
        describe("NamespaceManager.path(ns?) <네임스페이스 경로 얻기>", () => {
            it("- path() : 전체 경로 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.addNamespace('a1.b1');
                const p = ns.path();

                expect(s === s).toBe(true);
            });
            it("- path(ns) : 대상 경로 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.addNamespace('a1.b1');
                ns.addNamespace('a1.b2.c1');
                const p1 = ns.path('a1.b1');
                const p2 = ns.path(['a1', 'b1']);

                expect(p1 === s.a1.b1).toBe(true);
                expect(p2 === s.a1.b1).toBe(true);
            });
            it("- path(ns) : 잘못된 경로", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.addNamespace('a1.b1');
                const p = ns.path('a1.b2');

                expect(p).not.toBeDefined();
            });
            it("- 예외 : 타입 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                expect(()=> ns.path([-1])).toThrow(/EL03314/)
            });
        });
        describe("NamespaceManager.add(fullName, elem) <네임스페이스에 요소 설정>", () => {
            it("- add() : Function 등록 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('a1.b1.Fun', Function);

                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b1.Fun).toBeDefined();
                expect(typeof s.a1.b1.Fun).toBe('function');
            });
            it("- add() : 다중 등록 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                const fun1 = function(){ return 'fun1' };
                const fun2 = function(){ return 'fun2' };
                const fun3 = function(){ return 'fun3' };
                ns.add('a1.fun1', fun1);
                ns.add('a1.b1.fun2', fun2);

                expect(s.a1.b1).toBeDefined();
                expect(s.a1.b1.fun2).toBeDefined();
                expect(typeof s.a1.b1.fun2).toBe('function');
            });
            it("- add() : 최상위에 등록 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('Fun', Function);

                expect(s.Fun).toBeDefined();
                expect(typeof s.Fun).toBe('function');
            });
            it("- add() : [예외] key 이름 규칙 ", () => {
                const ns = new NamespaceManager();
    
                // expect(() => ns.set('a1.b1', '.Fun', Function)).toThrow(/p_key/);
                expect(() => ns.add('a1.b1.Fun%', Function)).toThrow('EL03331');
                expect(() => ns.add('a1.b1.Fun%', Function)).toThrow('EL03333');
            });
        });
        describe("NamespaceManager.find(fullname) <네임스페이스에 요소 얻기>", () => {
            it("- find(fullName) : Function 얻기 ", () => {
                const ns = new NamespaceManager();
                ns.add('a1.b1.Fun', Function);
                const fun = ns.find('a1.b1.Fun');

                expect(fun).toBe(Function);
                expect(ns.find('3Fun')).not.toBeDefined();
            });
        });

        describe("NamespaceManager.del(fullName): bool <네임스페이스에 요소 삭제>", () => {
            it("- del(fullName) : 요소 삭제", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('Fun', Function);
                ns.add('a1.b1.Str', String);
                ns.add('a1.b1.c1.Arr', Array);
                const r1 = ns.del('a1.b1.c1.Arr');
                const r2 = ns.del('a1.b1.Arr');

                expect(ns.has(Function)).toBe(true);
                expect(ns.has(String)).toBe(true);
                expect(ns.has(Array)).toBe(false);
                expect(r1).toBe(true);
                expect(r2).toBe(false);
                expect(()=>ns.del('a1.b1.3Arrd')).toThrow('EL03334')
                ;
            });
        });
        describe("NamespaceManager.getPath(elem) <네임스페이스 얻기>", () => {
            it("- getPathd(elem) : 네임스페이스 얻기", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                var fun = function(){return 'Fun'};
                var str = function(){return 'Str'};
                var arr = function(){return 'Arr'};
                ns.add('Fun', fun);
                ns.add('a1.b1.Str', str);
                ns.add('a1.b1.c1.Arr', arr);
                const str1 = ns.getPath(fun);
                const str2 = ns.getPath(str);
                const str3 = ns.getPath(arr);

                expect(str1).toBe('Fun');
                expect(str2).toBe('a1.b1.Str');
                expect(str3).toBe('a1.b1.c1.Arr');
            });
            it("- getPath(elem) : 내장함수 ", () => {
            });
            it("- getPath(elem) : 없는 경우 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('a1.b1', 'Fun', Function);
                const str = ns.getPath(Array);

                expect(str).not.toBeDefined();
            });
            it("- 예외 : 타입 ", () => {
                const ns = new NamespaceManager();
                expect(()=> ns.getPath()).toThrow(/EL03341/)
            });
        });
        describe("NamespaceManager.has(elem): bool <네임스페이스에 요소 유무>", () => {
            it("- has(elem) : 객체로 요소 검사 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('Fun', Function);
                ns.add('a1.b1.Str', String);
                ns.add('a1.b1.c1.Arr', Array);

                expect(ns.has(Function)).toBe(true);
                expect(ns.has(String)).toBe(true);
                expect(ns.has(Array)).toBe(true);
                expect(ns.has(RegExp)).toBe(false);
            });
            it("- has(elem) : 이름으로 요소 검사 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('Fun', Function);
                ns.add('a1.b1.Str', String);
                ns.add('a1.b1.c1.Arr', Array);

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
                ns.add('fun1', fun1);
                ns.add('a1.b1.fun2', fun2);
                ns.add('a1.b1.c1.fun3', fun3);
                ns.add('a1.NamespaceManager', NamespaceManager);
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
                var n = ns2.find('a1.NamespaceManager');
                // var nn = ns2.get2('a1.NamespaceManager');
                var nm = ns2.path('a1');
                var n2 = ns2.path();
                // var i = new n();
                // console.log(0);
            });
            it("- output() : 함수 출력 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                ns.add('str1', 'STR');
                ns.add('a1.num1', 10);
                const str = ns.output();
                const obj = JSON.parse(str, null);

                expect(obj.list[0]).toEqual({ns:'', key:'str1', full: 'str1', elem: 'STR'})
                expect(obj.list[1]).toEqual({ns:'a1', key:'num1', full: 'a1.num1', elem: 10})

                expect(()=> ns.output(Function)).toThrow('EL03342')
            });
        });
        describe("NamespaceManager.load(str, parse?) <네임스페이스 불러오기>", () => {
            it("- load(str) : 객체로 얻기 ", () => {
                const ns = new NamespaceManager();
                const s = ns.__storage;
                const fun1 = function(){ return 'fun1' };
                const fun2 = function(){ return 'fun2' };
                const fun3 = function(){ return 'fun3' };
                ns.add('fun1', fun1);
                ns.add('a1.b1.fun2', fun2);
                ns.add('a1.b1.c1.fun3', fun3);
                const str = ns.output(stringify, '\t');
                const ns2 = new NamespaceManager();
                ns2.load(str, parse);

                expect(ns.getPath(fun1)).toBe('fun1');
                expect(ns.getPath(fun2)).toBe('a1.b1.fun2');
                expect(ns.getPath(fun3)).toBe('a1.b1.c1.fun3');
            });
            it("- load(obj | str) : 객체로 얻기 ", () => {
                const ns1 = new NamespaceManager();
                const s = ns1.__storage;
                ns1.add('str1', 'STR');
                ns1.add('a1.num1', 10);
                const str = ns1.output();
                const obj = JSON.parse(str, null);
                // const ns2 = new NamespaceManager();
                // ns2.load(obj);
                const ns3 = new NamespaceManager();
                ns3.load(str);

                // expect(ns2.getPath('STR')).toBe('str1');
                // expect(ns2.getPath(10)).toBe('a1.num1');
                expect(ns3.getPath('STR')).toBe('str1');
                expect(ns3.getPath(10)).toBe('a1.num1');
            });
            it("- load(?) : 예외 ", () => {
                const ns1 = new NamespaceManager();
                const s = ns1.__storage;
                ns1.add('str1', 'STR');
                ns1.add('a1.num1', 10);
                const str = ns1.output();
                const obj = JSON.parse(str, null);
                const ns2 = new NamespaceManager();
            
                expect(()=> ns2.load('STR')).toThrow(/EL03344/)
                expect(()=> ns2.load({list: null})).toThrow(/EL03343/)
            });
        });
        describe("예외, 커버리지", () => {
            it("- _getPathObject() 커버 ", () => {
                const ns = new NamespaceManager();
                const fun1 = function(){ return 'fun1' };
                const fun2 = function(){ return 'fun2' };
                const fun3 = function(){ return 'fun3' };
                ns.add('fun1', fun1);
                ns.add('aa.fun2', fun2);

                expect(ns._getPathObject(fun1)).toEqual({ns: '', key:'fun1'})
                expect(ns._getPathObject(fun2)).toEqual({ns: 'aa', key:'fun2'})
                expect(ns._getPathObject(fun3)).toBe(undefined)
            });
            it("- 커버리지 : this.__SET$__storage ", () => {
                const ns = new NamespaceManager();
                ns.__SET$__storage(1)
                
            });
            
        });
    });
    
});
