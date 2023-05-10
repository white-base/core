/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
const Observer          = require('../src/observer');
let EventClass;

//==============================================================
// test

describe("< 이벤트 >", () => {
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

    it("-  이벤트 등록 및 호출 : 단일 등록/호출", () => {
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
    it("-  이벤트 등록 및 호출 : 복수 등록/호출", () => {
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
        // const logSpy = jest.spyOn(global.console, 'log');
        const e = new EventClass();
        e._event.isLog = true;
        const result = [];
        const func1 = () => { result.push('ADD1') };
        const func2 = () => { result.push('ADD2') };
        e.onAdd = func1
        e.onAdd = func2
        e._onAdd();

        // expect(logSpy.mock.calls[0][0]).toMatch(/publish()/);
    });


});