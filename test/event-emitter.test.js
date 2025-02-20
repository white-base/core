//==============================================================
// gobal defined
import EventEmitter from '../src/event-emitter';
import {jest} from '@jest/globals';

let EventClass;

//==============================================================
// test
describe("[target: event-emitter.js]", () => {
    describe("EventEmitter :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
        });
        describe("EventEmitter.$storage : 저장소", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                e.on('e1', ()=>{})
                e.on('e1', ()=>{})
                e.on('e2', ()=>{})
                e.once('e3', ()=>{})

                expect(e.$storage.e1.length).toBe(2);
                expect(e.$storage.e2.length).toBe(1);
                expect(e.$storage.e3.length).toBe(1);
            });
            it("- 예외 ", () => {
                const e = new EventEmitter();
                expect(()=>e.$storage = 1).toThrow('EL01501')
            });
        });
        describe("EventEmitter.list : 이벤트명 얻기", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                e.on('e1', ()=>{})
                e.on('e2', ()=>{})
                e.once('e3', ()=>{})

                expect(e._list).toEqual(['e1', 'e2', 'e3']);
            });
        });
        describe("EventEmitter.isLog : 이벤트 로그", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                e.isLog = true;
                var result = [];
                console.log = jest.fn((msg) => {
                    result.push(msg);
                });
                e.on('e1', ()=>{})
                e.on('e2', ()=>{})
                e.emit('e1')

                expect(result[0]).toMatch(/e1/);
            });
            it("- 예외 ", () => {
                const e = new EventEmitter();
                expect(()=>e.isLog = 1).toThrow('EL01502')
            });
        });
        describe("EventEmitter.addListener() / on() : 이벤트 리스너 등록", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                e.on('e1', ()=>{})
                e.addListener('e2', ()=>{})

                expect(e._list).toEqual(['e1', 'e2']);
            });
            it("- 확인 : 중복 등록", () => {
                const e = new EventEmitter();
                const fun1 = (a,b)=> {}
                e.on('e1', fun1)
                e.on('e1', fun1)

                expect(e._list).toEqual(['e1']);
                expect(e.$storage.e1.length).toBe(1);
            });
            it("- 발신 확인 ", () => {
                const e = new EventEmitter();
                var result = [];
                e.on('e1', ()=>{result.push('E1');})
                e.addListener('e2', ()=>{result.push('E2');})
                
                expect(e.emit('e1')).toBe(true);
                expect(result).toEqual(['E1']);
            });
            it("- 예외 ", () => {
                const e = new EventEmitter();
                
                expect(()=>e.on(10)).toThrow('EL01503')
                expect(()=>e.on('evt', 10)).toThrow('EL01504')
            });
        });
        describe("EventEmitter.once() : 일회성 이벤트 리스너 등록", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                e.once('e1', ()=>{})
                e.once('e2', ()=>{})

                expect(e._list).toEqual(['e1', 'e2']);
                expect(e.emit('e1')).toBe(true)
                expect(e.emit('e1')).toBe(false)
            });
            it("- 발신 확인 ", () => {
                const e = new EventEmitter();
                var result = [];
                e.once('e1', ()=>{result.push('E1');})
                e.emit('e1')
                
                expect(result).toEqual(['E1']);
                result = [];
                expect(e.emit('e1')).toEqual(false);
                expect(result).toEqual([]);
            });
            it("- 예외 ", () => {
                const e = new EventEmitter();
                
                expect(()=>e.once(10)).toThrow('EL01505')
                expect(()=>e.once('evt', 10)).toThrow('EL01506')
            });
        });
        describe("EventEmitter.removeListener() / off() : 이벤트 리스너 제거", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                var fun1 = ()=>{};
                var fun2 = ()=>{};
                e.on('e1', fun1)
                e.on('e1', fun2)

                expect(e._list).toEqual(['e1']);
                expect(e.$storage.e1.length).toBe(2);
                e.off('e1', fun2)
                expect(e._list).toEqual(['e1']);
                expect(e.$storage.e1.length).toBe(1);
            });
            it("- 없는 이벤트 제거 ", () => {
                const e = new EventEmitter();
                var fun1 = ()=>{ result.push('E1') };
                e.on('e1', fun1)
                e.off('e2', fun1)
                expect(e._list).toEqual(['e1']);
            });
            it("- 발신 확인 ", () => {
                const e = new EventEmitter();
                var result = [];
                var fun1 = ()=>{ result.push('E1') };
                e.once('e1', fun1)
                e.emit('e1')
                
                expect(result).toEqual(['E1']);
                result = [];
                e.off('e1', fun1)
                expect(e.emit('e1')).toEqual(false);
                expect(result).toEqual([]);
            });
            it("- 예외 ", () => {
                const e = new EventEmitter();
                
                expect(()=>e.off(10)).toThrow('EL01507')
                expect(()=>e.off('evt', 10)).toThrow('EL01508')
            });
        });
        describe("EventEmitter.removeAllListeners() : 이벤트 제거", () => {
            it("- 이벤트 제거 ", () => {
                const e = new EventEmitter();
                var fun1 = ()=>{};
                var fun2 = ()=>{};
                e.on('e1', fun1)
                e.on('e1', fun2)
                e.once('e2', fun1)
                e.once('e2', fun2)

                expect(e._list).toEqual(['e1', 'e2']);
                expect(e.$storage.e1.length).toBe(2);
                e.removeAllListeners('e1')
                expect(e._list).toEqual(['e2']);
                expect(e.$storage.e2.length).toBe(2);
            });
            it("- 전체 제거 ", () => {
                const e = new EventEmitter();
                var fun1 = ()=>{};
                var fun2 = ()=>{};
                e.on('e1', fun1)
                e.on('e1', fun2)
                e.once('e2', fun1)
                e.once('e2', fun2)

                expect(e._list).toEqual(['e1', 'e2']);
                expect(e.$storage.e1.length).toBe(2);
                e.removeAllListeners()
                expect(e._list).toEqual([]);
            });
        });
        describe("EventEmitter.emit() : 이벤트 발생", () => {
            it("- 확인 ", () => {
                const e = new EventEmitter();
                var result = [];
                var fun1 = ()=>{ result.push('E1') };
                var fun2 = ()=>{ result.push('E2') };
                e.on('e1', fun1)
                e.once('e1', fun2)

                expect(e._list).toEqual(['e1']);
                expect(e.$storage.e1.length).toBe(2);
                expect(e.emit('e1')).toEqual(true);
                expect(result).toEqual(['E1', 'E2']);
                result = []
                expect(e.emit('e1')).toEqual(true);
                expect(result).toEqual(['E1']);
            });
            it("- 콜백함수 false 리턴, 중단 처리 ", () => {
                const e = new EventEmitter();
                var result = [];
                var fun1 = ()=>{ result.push('E1'); return false };
                var fun2 = ()=>{ result.push('E2') };
                e.on('e1', fun1)
                e.once('e1', fun2)

                expect(e._list).toEqual(['e1']);
                expect(e.$storage.e1.length).toBe(2);
                expect(e.emit('e1')).toEqual(undefined);
                expect(result).toEqual(['E1']);
            });
            it("- 예외 ", () => {
                const e = new EventEmitter();
                
                expect(()=>e.emit(10)).toThrow('EL01509')
            });
        });
    });
});
