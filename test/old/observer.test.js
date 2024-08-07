/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
const {Observer}          = require('../src/observer');
let EventClass;

//==============================================================
// test
describe.skip("[target: observer.js]", () => {
    describe("< 이벤트 단독 사용 >", () => {
        beforeAll(() => {
            jest.resetModules();
        });
    
        it("- 생성자에 전달 없을 경우", () => {
            expect(()=> new Observer()).toThrow(/EL01511/);
        });
    });
    describe("< 이벤트 직접 호출 >", () => {
        beforeAll(() => {
            jest.resetModules();
            // 이벤트 클래스 정의
            EventClass = class EventClass {
                _event = new Observer(this);
            }
        });
    
        it("- 이벤트 구독 : any ", () => {
            const result = [];
            const func1 = function(){ result.push('fun1') };
            const func2 = function(){ result.push('fun2') };
            const e = new EventClass();
            e._event.subscribe(func1);
            e._event.subscribe(func2);
            e._event.publish();
            
            expect(result).toEqual(['fun1', 'fun2']);
            expect(result.length).toBe(2);
        });
        it("- 이벤트 구독 : 지정 ", () => {
            const result = [];
            const func1 = function(){ result.push('fun1') };
            const func2 = function(){ result.push('fun2') };
            const e = new EventClass();
            e._event.subscribe(func1, 'e1');
            e._event.subscribe(func2, 'e2');
            e._event.publish('e1');
            
            expect(result).toEqual(['fun1']);
            expect(result.length).toBe(1);
        });
        it("- 이벤트 구독 : 예외 ", () => {
            const e = new EventClass();
            
            // subscribe()
            expect(()=> e._event.subscribe()).toThrow('EL01516');
            expect(()=> e._event.subscribe('str')).toThrow('EL01516');
            // $subscribers
            // expect(()=> e._event.$subscribers = 1).toThrow('ES064');
            // expect(()=> e._event.$subscribers = 'str').toThrow('ES064');
            // expect(()=> e._event.$subscribers = {}).toThrow('ES064');
            // innner
            expect(()=> e._event.$subscribers = 1).toThrow('EL01514');
            expect(()=> e._event.$subscribers = 'str').toThrow('EL01514');
            expect(()=> e._event.$subscribers = {} ).toThrow('EL01515');
        });
        it("- $subscribers 강제삽입 : 강제 예외 (any 함수 아닌 값을 삽입) ", () => {
            const result = [];
            const e = new EventClass();
            const subs ={
                any: ['str', func1 = function(){ result.push('fun1') }]
            };
            // e._event.$subscribers = subs;
            e._event.$subscribers = subs
            e._event.publish();
    
            expect(result).toEqual(['fun1']);
        });
    });
    describe("< 이벤트 onEvent 속성 사용 >", () => {
        beforeAll(() => {
            jest.resetModules();
            // 이벤트 클래스 정의
            EventClass = class EventClass {
                _event = new Observer(this);
                set onAdd(fn) { this._event.subscribe(fn, 'add') }
                set onInit(fn) { this._event.subscribe(fn, 'init') }
                set onAny(fn) { this._event.subscribe(fn) }
                _onAdd(p1, p2) { this._event.publish('add', p1, p2) }
                _onInit(p1) { this._event.publish('init', p1) }
                _onAny(p1) { this._event.publish('', p1) }
            }
        });
        it("- _list ", () => {
            // 이벤트 생성 및 등록
            const e = new EventClass();
            const result = [];
            function add(p1, p2) { 
                if (p1) result.push(p1)
                if (p2) result.push(p2)
                result.push('ADD1') 
            }
            e.onAdd = add;
            // e.onAdd = add;
    
            e._onAdd('P1', 'P2');    // 이벤트 강제 호출
            expect(e._event._list).toEqual([ {'add': {0: add} } ]);  // REVIEW: _list 구조 변경 확인 필요
        });
        it("- 이벤트 등록 및 호출 : 단일 등록/호출", () => {
            // 이벤트 생성 및 등록
            const e = new EventClass();
            const result = [];
            e.onAdd = (p1, p2) => { 
                if (p1) result.push(p1)
                if (p2) result.push(p2)
                result.push('ADD1') 
            }
    
            e._onAdd('P1', 'P2');    // 이벤트 강제 호출
            expect(result).toEqual(['P1', 'P2', 'ADD1']);
        });
        it("- 이벤트 등록 및 호출 : isLog 콘솔로드", () => {
            const e = new EventClass();
            const result = [];
            e.onAdd = (p1) => { 
                if (p1) result.push(p1)
                result.push('ADD1') 
            }
            let count = 0;
            global.console.log = jest.fn((val) => {
                expect(val).toMatch(/publish/);
                count++;
            });
            e._event.isLog = true; // 콘솔 로그 출력
            e._onAdd('P1');
            expect(count).toBe(1)
            expect(result).toEqual(['P1', 'ADD1']);
        });
        it("- 이벤트 등록 및 호출 : 복수 등록/호출", () => {
            // 이벤트 생성 및 등록
            const e = new EventClass();
            const result = [];
            e.onAdd = () => { 
                result.push('ADD1') 
            }
            e.onAdd = () => { 
                result.push('ADD2') 
            }
            
            e._onAdd('P1', 'P2');    // 이벤트 강제 호출
            expect(result).toContain('ADD1');
            expect(result).toContain('ADD2');
        });
        it("- 싱글모드 : 복수 등록 검사 ", () => {
            const e = new EventClass();
            const result = [];
            e._event.isSingleMode = true;
            e.onAdd = () => { 
                result.push('ADD1') 
            }
            e.onAdd = () => { 
                result.push('ADD2') 
            }
            e._onAdd('P1', 'P2');    // 이벤트 강제 호출
    
            expect(result).toEqual(['ADD2']);
            expect(()=> e._event.isSingleMode = 1).toThrow(/EL01513/);
        });
        it("- 이벤트 onAdd 모두 해지 ", () => {
            const e = new EventClass();
            const result = [];
            const func1 = () => { result.push('ADD1') };
            const func2 = () => { result.push('ADD2') };
            const func3 = () => { result.push('INIT1') };
            const func4 = () => { result.push('INIT2') };
            e.onAdd = func1
            e.onAdd = func2
            e.onInit = func3
            e.onInit = func4
            e._event.unsubscribe('add');
            e._onAdd();
            e._onInit();
    
            expect(result.length).toBe(2);
            expect(result).not.toContain('ADD1');
            expect(result).not.toContain('ADD2');
            expect(result).toContain('INIT1');
            expect(result).toContain('INIT2');
        });
        it("- 이벤트 onAdd 일부 해지 ", () => {
            const e = new EventClass();
            const result = [];
            const func1 = () => { result.push('ADD1') };
            const func2 = () => { result.push('ADD2') };
            e.onAdd = func1
            e.onAdd = func2
            e.onInit = func1
            e.onInit = func2
            e._event.unsubscribe('add', func2);
            e._onAdd();
    
            expect(result).toEqual(['ADD1']);
        });
    
        it("- 이벤트 전체 해지 ", () => {
            const e = new EventClass();
            const result = [];
            const func1 = () => { result.push('ADD1') };
            const func2 = () => { result.push('ADD2') };
            e.onAdd = func1
            e.onAdd = func2
            e.onInit = func1
            e.onInit = func2
            e._event.unsubscribe();
            e._onAdd();
            e._onInit();
    
            expect(result.length).toBe(0);
        });
    
        it("- 이벤트 전체 해지 : 존재하지 않는 이벤트 ", () => {
            const e = new EventClass();
            const result = [];
            const func1 = () => { result.push('ADD1') };
            const func2 = () => { result.push('ADD2') };
            e.onAdd = func1
            e.onAdd = func2
            e._event.unsubscribe('add');
            e._event.unsubscribe('remove');
            e._onAdd();
    
            expect(result.length).toBe(0);
        });
    
        it("- isLog ", () => {
            global.console.log = jest.fn((val) => {
                expect(val).toMatch(/publish().*이벤트 발생/);
            });
            const e = new EventClass();
            e._event.isLog = true;
            const result = [];
            const func1 = () => { result.push('ADD1') };
            const func2 = () => { result.push('ADD2') };
            e.onAdd = func1
            e.onAdd = func2
            e._onAdd();
            
            expect(()=> e._event.isLog = 1).toThrow('EL01512')
        });
        it("- this._caller ", () => {
            global.console.log = jest.fn((val) => {
                expect(val).toMatch(/publish().*이벤트 발생/);
            });
            const e = new EventClass();
    
            expect(e._event._caller).toEqual(e);
        });
        it("- 커버리지 ", () => {
            const e = new EventClass();
            var sub = e._event.$subscribers;
            // e._event.__SET$$subscribers 10, {});

            expect(e._event.$subscribers).toEqual(sub);
        });
    
    });

});
