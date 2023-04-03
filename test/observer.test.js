/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
const Observer          = require('../src/observer');
let EventGlobal;
let EventLocal;

//==============================================================
// test

describe("< 이벤트 >", () => {
    beforeAll(() => {
        jest.resetModules();
        // 이벤트 클래스 정의
        EventLocal = class EventClass{
            memo = '지역 이벤트 클래스'
            set onAdd(fn) { this.#event.subscribe(fn, 'add') }
            set onRemove(fn) { this.#event.subscribe(fn, 'remove') }
            set onAddGlobal(fn) { this.#event.subscribe(fn) }
            set onRemoveGlobal(fn) { this.#event.subscribe(fn) }
            _onAdd(p1, p2) { this.#event.publish('add', p1, p2) }
            _onRemove(p1) { this.#event.publish('remove', p1) }
            _onAdd(p1, p2) { this.#event.publish('add', p1, p2) }
            _onRemove(p1) { this.#event.publish('remove', p1) }
        };
        // Gobal >> single 이 아닌가?
        EventGlobal = class EventClass{
            memo ='전역 이벤트 클래스'
        };
    });

    it("-  : 이벤트 정의 등록 및 호출 : 지역", () => {
    });
    // it("-  : 이벤트 정의 등록 및 호출 : 전역", () => {
    // });
    it("-  : 싱글모드 ", () => {
    });
    it("-  : 이벤트 전파 ", () => {
    });
});
/**
 * 이벤트를 가져와 클래스를 만들고
 *  - set 방식
 *  - Object 방식
 * 
 */