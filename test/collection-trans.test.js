/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

const {TransactionCollection}          = require('../src/collection-trans');
let Student, School, Corp, Member, House, Space;

//==============================================================
// test
describe("[target: collection-trans.js]", () => {
    describe("TransactionCollection :: 클래스", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                rows = new TransactionCollection(this);
            }
        });

        describe("BaseCollection.remove(elem): bool <컬렉션 삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- remove(elem) : string ", () => {
                let s = new Student();
                s.rows.add('A1');
                const result = s.rows.remove('A1');
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows['0']).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- remove(elem) : number ", () => {
                let s = new Student();
                s.rows.add(100);
                s.rows.remove(100);
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows['0']).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
            });
            it("- remove(elem) : object ", () => {
                let s = new Student();
                const a1 = { name: 'O1' };
                s.rows.add(a1);
                s.rows.remove(a1);
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows['0']).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
            });
            it("- remove(elem) : string (없을 경우)", () => {
                let s = new Student();
                s.rows.add('A1');
                const result = s.rows.remove('A2');
    
                expect(s.rows[0]).not.toBeUndefined();
                expect(s.rows.count).toBe(1);
                expect(s.rows.list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
        });

        describe("this.commit() <커밋>", () => {
            it("- isChanges : 변경 유무", () => {
                let s = new Student();
                
                // 초기
                expect(s.rows.isChanges).toBe(false);
                // 변경후
                s.rows.add('A1');
                expect(s.rows.isChanges).toBe(true);
                // 커밋 후
                s.rows.commit();
                expect(s.rows.isChanges).toBe(false);
            });
        });

        describe("this.rollback() <롤백>", () => {
            it("- add() : 추가 후 롤백", () => {
                let s = new Student();
                s.rows.add('A1');

                // 초기                
                expect(s.rows.count).toBe(1);
                // 롤백 후
                s.rows.rollback();
                expect(s.rows.count).toBe(0);
            });
            it("- remove() : 추가 커밋 -> 삭제 -> 롤백", () => {
                let s = new Student();
                
                // 추가 커밋 
                s.rows.add('A1');
                s.rows.commit();
                expect(s.rows.count).toBe(1);
                // 삭제
                s.rows.remove('A1');
                expect(s.rows.count).toBe(0);
                // 롤백
                s.rows.rollback();
                expect(s.rows.count).toBe(1);
            });
            it("- add(), remove() : 추가 커밋 -> 삭제 -> 커밋 -> 추가 -> 롤백 ", () => {
                let s = new Student();
                
                // 추가 커밋 
                s.rows.add('A1');
                s.rows.commit();
                expect(s.rows.count).toBe(1);
                // 삭제 
                s.rows.remove('A1');
                expect(s.rows.count).toBe(0);
                // 커밋
                s.rows.commit();
                expect(s.rows.count).toBe(0);
                // 추가
                s.rows.add('A2');
                s.rows.add('A3');
                expect(s.rows.count).toBe(2);
                expect(s.rows[0]).toBe('A2');
                expect(s.rows[1]).toBe('A3');
                // 롤백
                s.rows.rollback();
                expect(s.rows.count).toBe(0);
            });
            it("- add(), insertAt() remove() : 중복 추가 삭제시 ", () => {
                let s = new Student();
                
                // 추가 커밋 
                s.rows.add('A1');
                s.rows.commit();
                expect(s.rows.count).toBe(1);
                // 삭제 및 추가 삭제
                s.rows.remove('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                s.rows.insertAt(0, 'A1');
                expect(s.rows.count).toBe(3);
                expect(s.rows[0]).toBe('A1');
                expect(s.rows[1]).toBe('A2');
                expect(s.rows[2]).toBe('A3');
                // 롤백
                s.rows.rollback();
                expect(s.rows.count).toBe(1);
                expect(s.rows[0]).toBe('A1');
            });
        });

        /**
         * REVIEW: 동일한 요소가 있을 경우 중복삭제의 이슈
         * 현재는 첫번째 요소를 삭제 후 두번째 삭제시 두번째 요소를 검색함
         *  방안>
         *  - 첫번재 것만 삭제
         *  - 모두 삭제
         *  - 경고 메세지
         *  - remove 메소드 삭제
         */
        describe("BaseCollection.removeAt(num): bool <컬렉션 idx로 삭제>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- removeAt(idx) ", () => {
                let s = new Student();
                s.rows.add('A1');
                const idx = s.rows.indexOf('A1');
                const result = s.rows.removeAt(idx);
    
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 없을 경우", () => {
                let s = new Student();
                s.rows.add('A1');
                const idx = s.rows.indexOf('A1');
                const result = s.rows.removeAt(idx + 1);
    
                expect(s.rows[0]).toBeTruthy();
                expect(s.rows.count).toBe(1);
                expect(s.rows.list.length).toBe(1);
                expect(result).not.toBeTruthy();
            });
            it("- removeAt(idx) : 첫째 요소 삭제", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                const result = s.rows.removeAt(0);
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).not.toBeDefined();
                expect(s.rows.indexOf('A2')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(2);
                expect(s.rows.list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 중간 요소 삭제", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                const result = s.rows.removeAt(1);
    
                expect(s.rows['0']).toBeDefined();
                expect(s.rows['1']).toBeDefined();
                expect(s.rows['2']).not.toBeDefined();
                expect(s.rows.indexOf('A1')).toBe(0);  
                expect(s.rows.indexOf('A3')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(2);
                expect(s.rows.list.length).toBe(2);
                expect(result).toBeTruthy();
            });
            it("- removeAt(idx) : 마지막 요소 삭제 후 추가", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                const result = s.rows.removeAt(2);
                s.rows.add('A4');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows[3]).not.toBeDefined();
                expect(s.rows.indexOf('A1')).toBe(0);  
                expect(s.rows.indexOf('A2')).toBe(1);
                expect(s.rows.indexOf('A4')).toBe(2);
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- removeAt(str) : 예외 ", () => {
                let s = new Student();
    
                expect(()=> s.rows.removeAt('1')).toThrow(/idx.*number/);
            });
        });

        describe("this.insertAt(num): bool <idx 위치에 추가>", () => {
            // beforeAll(() => {
            //     let s = new Student();
            // });
            it("- insertAt(idx, value) : 첫째 요소 추가", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                const result = s.rows.insertAt(0, 'A0');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows.indexOf('A0')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A1')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A2')).toBe(2);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- insertAt(idx, value) : 중간 요소 추가", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A2');
                const result = s.rows.insertAt(1, 'A1');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows.indexOf('A0')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A1')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A2')).toBe(2);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(3);
                expect(s.rows.list.length).toBe(3);
                expect(result).toBeTruthy();
            });
            it("- insertAt(idx, value) : 마지막 요소 추가 후 add()", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');
                const result = s.rows.insertAt(2, 'A2');
                s.rows.add('A3');
    
                expect(s.rows[0]).toBeDefined();
                expect(s.rows[1]).toBeDefined();
                expect(s.rows[2]).toBeDefined();
                expect(s.rows[3]).toBeDefined();
                expect(s.rows.indexOf('A0')).toBe(0);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A1')).toBe(1);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A2')).toBe(2);  // 바뀐 idx 확인
                expect(s.rows.indexOf('A3')).toBe(3);  // 바뀐 idx 확인
                expect(s.rows.count).toBe(4);
                expect(s.rows.list.length).toBe(4);
                expect(result).toBeTruthy();
            });
            it("- insertAt(pos) : 예외 : 사이즈 초과", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');

                expect(()=> s.rows.insertAt(3, 'A2')).toThrow(/pos.*size/);
            });
            it("- insertAt(pos) : 예외 : 0 보다 작을 경우", () => {
                let s = new Student();
                s.rows.add('A0');
                s.rows.add('A1');

                expect(()=> s.rows.insertAt(-1, 'A2')).toThrow(/pos.*0/);
            });
        });

        describe("BaseCollection.contains(elem): bool <존재유무 검사>", () => {
            it("- contains(str | obj | num): bool = {특정요소를 찾을경우 : name}", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.rows.add('A1');
                s.rows.add(a2);
                s.rows.add(10);
                
                expect(s.rows.contains('A1')).toBeTruthy();
                expect(s.rows.contains(a2)).toBeTruthy();
                expect(s.rows.contains(10)).toBeTruthy();
                expect(s.rows.count).toBe(3);
            });
        });
        describe("BaseCollection.indexOf(elem): num <인덱스 조회>", () => {
            it("- indexOf() = {동일객체 있을경우 첫번째 값을 리턴} ", () => {
                let s = new Student();
                const a2 = { style: 1};
                s.rows.add('A1');
                s.rows.add(a2);
                s.rows.add(10);
                s.rows.add(10);
                
                expect(s.rows.indexOf('A1')).toBe(0);
                expect(s.rows.indexOf(a2)).toBe(1);
                expect(s.rows.indexOf(10)).toBe(2);    // 원시타입 사용시 값으로 조회해서 a4는 조회 못함
                expect(s.rows.count).toBe(4);
            });
        });
        describe("this.add(value?, desc?): bool <컬렉션 추가>", () => {
            beforeAll(() => {
            });
            it("- add() : undefined", () => {
                let s = new Student();
                const result = s.rows.add();
        
                expect(s.rows[0]).toBeUndefined();
                expect(s.rows.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(value) ", () => {
                let s = new Student();
                const result = s.rows.add('A1');
        
                expect(s.rows[0]).toBe('A1');
                expect(s.rows.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(value, desc) : 읽기 전용", () => {
                let s = new Student();
                const desc = {
                    value: 'A1',
                    writable: false
                };
                const result = s.rows.add(null, desc);
    
                expect(() => s.rows[0] = 1).toThrow(/0/);
                expect(s.rows[0]).toBe('A1');
                expect(s.rows['0']).toBe('A1');
                expect(s.rows.count).toBe(1);
                expect(result).toBeTruthy();
            });
            it("- add(name, value, desc) : set/get (제약조건 추가) ", () => {
                let s = new Student();
                let bValue;
                const desc = {
                    get() {
                      return bValue;
                    },
                    set(newValue) {
                        if (typeof newValue !== 'string') throw new Error('string 타입만')
                        bValue = newValue;
                    },
                    enumerable: true,
                    configurable: true,
                }
                const result = s.rows.add(null, desc);
                s.rows[0] = 'A1';
    
                expect(() => s.rows[0] = 1).toThrow(/string/);
                expect(s.rows[0]).toBe('A1');
                expect(s.rows['0']).toBe('A1');
                expect(s.rows.count).toBe(1);
                expect(result).toBeTruthy();
            });
        });
        describe("this.clear() <초기화>", () => {
            it("- clear() ", () => {
                let s = new Student();
                s.rows.add('A1');
                s.rows.add('A2');
                s.rows.add('A3');
                s.rows.clear();
        
                expect(s.rows._transQueue.queue.length).toBe(0);
                expect(s.rows.count).toBe(0);
                expect(s.rows.list.length).toBe(0);
            });
        });
    });
    describe("this.elementType <전체 타입을 설정할 경우 : 클래스타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            Student = class {
                level = 0;
                constructor(level) { this.level = level }
            }
            Member = class {
                type = 10;
                constructor(type) { this.type = type }
            }
            School = class {
                rows = new TransactionCollection(this);
                constructor() { this.rows.elementType = Student }
            }
            Corp = class {
                rows = new TransactionCollection(this);
                constructor() { this.rows.elementType = [Member, Student] }
            }
            House = class {
                rows = new TransactionCollection(this);
                constructor() { this.rows.elementType = null }
            }
            Space = class {
                rows = new TransactionCollection(this);
            }
    
        });
        it("- 단일 타입 : rows.add(name, obj) ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const result = elem.rows.add(c1);
            
            expect(() => elem.rows.add(null)).toThrow(/instance/);
            expect(() => elem.rows.add('str')).toThrow(/instance/);
            expect(result).toBeTruthy();
        });
        it("- 단일 타입 : rows.요소명 = obj ", () => {
            const elem = new School();
            const c1 = new Student(1);
            const c2 = new Student(2);
            const result = elem.rows.add(c1);
            elem.rows[0] = c2;
    
            expect(() => elem.rows[0] = 10 ).toThrow(/instance/);
            expect(elem.rows[0].level).toBe(2);                   // 교체된 객체
            expect(elem.rows[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result).toBeTruthy();
        });
        it("- null 타입 : rows.add(name, obj) ", () => {
            const elem = new House();
            const c1 = new Student(1);
            const result1 = elem.rows.add( c1);
            const result2 = elem.rows.add('str');
            
            expect(() => elem.rows.add()).toThrow(/없습니다./);
            expect(elem.rows[0].level).toBe(1);
            elem.rows[0] = 'OVER';
            expect(elem.rows[0]).toBe('OVER');
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- undefined 타입 : rows.add(name, obj) ", () => {
            const elem = new Space();
            const c1 = new Student(1);
            const result1 = elem.rows.add(c1);
            const result2 = elem.rows.add('str');
            const result3 = elem.rows.add();
    
            expect(elem.rows[0].level).toBe(1);
            expect(elem.rows[1]).toBe('str');
            expect(elem.rows[2]).toBeUndefined();
            elem.rows[2] = 'OVER';    // 수정
            expect(elem.rows[2]).toBe('OVER');
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(result3).toBeTruthy();
        });
        it("- 복합 타입 : rows.add(name, obj) ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const m1 = new Member(1);
            const result1 = elem.rows.add(c1);
            const result2 = elem.rows.add(m1);
            
            expect(() => elem.rows.add(null)).toThrow(/instance/);
            expect(() => elem.rows.add('str')).toThrow(/instance/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : rows.요소명 = obj ", () => {
            const elem = new Corp();
            const c1 = new Student(1);
            const c2 = new Student(2);
            const m1 = new Member(1);
            const result1 = elem.rows.add(c1);
            const result2 = elem.rows.add(m1);
            elem.rows[0] = c2;
            elem.rows[1] = c2;
    
            expect(() => elem.rows[0] = 'str' ).toThrow(/instance/);
            expect(elem.rows[0].level).toBe(2);                   // 교체된 객체
            expect(elem.rows[0] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(elem.rows[1].level).toBe(2);                   // 교체된 객체
            expect(elem.rows[1] instanceof Student).toBeTruthy(); // 인스턴스 검사
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
    });
    describe("this.elementType <전체 타입을 설정할 경우 : 원시타입>", () => {
        beforeAll(() => {
            jest.resetModules();
            // 클래스 정의
            School = class {
                rows = new TransactionCollection(this);
                constructor() { this.rows.elementType = String }
            }
            Corp = class {
                rows = new TransactionCollection(this);
                constructor() { this.rows.elementType = [String, Boolean] }
            }
        });
        it("- 단일 타입 : rows.add(name, obj) ", () => {
            const i = new School();
            const result1 = i.rows.add('A1');
            const result2 = i.rows.add('');
            i.rows[0] = 'AA1';
            i.rows[1] = 'AA2';
    
            expect(() => i.rows.add(null)).toThrow(/string/);     // 공백 예외
            expect(() => i.rows.add(10)).toThrow(/string/); // 타입 예외
            expect(() => i.rows[0] = 10).toThrow(/string/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 복합 타입 : rows.add(name, obj)  [String, Boolean] ", () => {
            const i = new Corp();
            const result1 = i.rows.add('A1');
            const result2 = i.rows.add(true);
            
            expect(() => i.rows.add(undefined)).toThrow(/(boolean)|(string)/);  // 값이 없음
            expect(() => i.rows.add(null)).toThrow(/(boolean)|(string)/);    // 공백 예외
            expect(() => i.rows.add(10)).toThrow(/(boolean)|(string)/);// 타입 예외
            expect(() => i.rows.add({})).toThrow(/(boolean)|(string)/);
            expect(() => i.rows[0] = 10).toThrow(/(boolean)|(string)/);
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
        });
        it("- 유무 검사 : exist(key) ", () => {
            const i = new Corp();
            const result1 = i.rows.add('A1');
            const result2 = i.rows.add(true);
            
            expect(result1).toBeTruthy();
            expect(result2).toBeTruthy();
            expect(i.rows.exist(0)).toBe(true);
            expect(i.rows.exist(1)).toBe(true);
            expect(i.rows.exist(2)).toBe(false);
            expect(i.rows.exist('0')).toBe(true);
            expect(i.rows.exist('1')).toBe(true);
            expect(i.rows.exist('2')).toBe(false);
            expect(()=> i.rows.exist(true)).toThrow(/key.*number.*string/);
        });
    });
});

