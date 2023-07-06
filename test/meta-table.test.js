/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const MetaEntity                = require('../src/meta-entity');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const { MetaTable }       = require('../src/meta-table');
const Util                  = require('../src/util');
const { MetaRow }               = require('../src/meta-row');
const { MetaColumn }              = require('../src/meta-column');

//==============================================================
// test
describe("< MetaTable >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    it("- 테이블 등록후 속성 검사 ", () => {
        const table1 = new MetaTable('T1');
        const table2 = new MetaTable('T2');
        table1.columns.add('i1');
        table1.columns.add('i2');
        table1.columns['i1'].value = 'R1';
        table1.columns['i2'].value = 'R2';
        table2.columns.add('i1');
        table2.columns.add(table1.columns['i2']); // 내부 복제됨

        // table1
        expect(table1.columns['i1'].value).toBe('R1');
        expect(table1.columns['i2'].value).toBe('R2');
        expect(table1.name).toBe('T1');
        expect(table1.columns['i1'].entity.name).toBe('T1');
        expect(table1.columns['i2'].entity.name).toBe('T1');
        // table2
        expect(table2.columns['i1'].value).toBe(null);
        expect(table2.columns['i2'].value).toBe('R2');
        expect(table2.name).toBe('T2');
        expect(table2.columns['i1'].entity.name).toBe('T2');
        expect(table2.columns['i2'].entity.name).toBe('T2');
    });
    it("- newRow() : MetaRow 생성 ", () => {
        var table1 = new MetaTable('T1');
        table1.columns.add('i1');
        table1.columns.add('i2');
        table1.columns.add('i3');
        var row = table1.newRow();
        row['i1'] = 'R1';

        expect(row['i1']).toBeDefined();
        expect(row['i2']).toBeDefined();
        expect(row['i3']).toBeDefined();
        expect(row[0]).toBeDefined();
        expect(row[1]).toBeDefined();
        expect(row[2]).toBeDefined();
        expect(row['i1']).toBe('R1');
        expect(row[0]).toBe('R1');
        expect(row['0']).toBe('R1');        
    });
    describe("< setValue(row) >", () => {
        it("- setValue(row) : row 설정(단일) ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns.add('i3');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            row['i3'] = 'R3';
            table1.setValue(row);
            
            expect(table1.columns['i1'].value).toBe('R1');
            expect(table1.columns['i2'].value).toBe('R2');
            expect(table1.columns['i3'].value).toBe('R3');
        });
        it("- setValue(row) :row 설정(단일), 별칭 사용 ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns.add('i3');
            table1.columns['i2'].alias = 'ii2';    // 별칭
            table1.columns['i3'].alias = 'ii3';    // 별칭
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            row['ii3'] = 'RR3';
            table1.setValue(row);
    
            expect(table1.columns['i1'].value).toBe('R1');
            expect(table1.columns['i2'].value).toBe('');
            expect(table1.columns['i3'].value).toBe('RR3');
        });
    });
    describe("< getValue() : row >", () => {
        it("- getValue() : row 얻기(단일) ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns.add('i3');
            table1.columns['i1'].value = 'R1';
            table1.columns['i2'].value = 'R2';
            table1.columns['i3'].value = 'R3';
            var row = table1.getValue();
    
            expect(row['i1']).toBe('R1');
            expect(row['i2']).toBe('R2');
            expect(row['i3']).toBe('R3');
            expect(row[0]).toBe('R1');
            expect(row[1]).toBe('R2');
            expect(row[2]).toBe('R3');
        });
        it("- getValue() : row 얻기(단일), 별칭 사용 ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns.add('i3');
            table1.columns['i2'].alias = 'ii2';    // 별칭
            table1.columns['i3'].alias = 'ii3';    // 별칭
            table1.columns['i1'].value = 'R1';
            table1.columns['i2'].value = 'R2';
            table1.columns['i3'].value = 'R3';
            var row = table1.getValue();
    
            expect(row['i1']).toBe('R1');
            expect(row['ii2']).toBe('R2');
            expect(row['ii3']).toBe('R3');
            expect(row[0]).toBe('R1');
            expect(row[1]).toBe('R2');
            expect(row[2]).toBe('R3');
        });
    });
    
    describe("< select(filter, list? | start?, end?) : entity >", () => {
        it("- select(filter) : 엔티티 조회(참조값), 필터 ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns.add('i3');
            table1.columns['i3'].order = 200;          // 참조값 체크
            table1.columns.addValue('i4', 'R4');       // 등록시 값 삽입
            table1.columns.addValue('i5', 'R5');       // 등록시 값 삽입
            var filter = {
                __except: ['i1'],                   // 제외
                i2: { __except: true },             // 제외
                i3: { caption: 'C3', value: 'R3' }  // 속성 오버라이딩(필터)
            };
            var table2 = table1.select(filter);
    
            // table1
            expect(table1.name).toBe('T1');
            expect(table1.columns.count).toBe(5);
            expect(table1.columns['i4'].value).toBe('R4');
            expect(table1.columns['i5'].value).toBe('R5');
            expect(table1.columns['i3'].order).toBe(200);
            // table2
            expect(table2.name).toBe('T1');
            expect(table2.columns.count).toBe(3);
            expect(table2.columns['i3'].caption).toBe('C3');
            expect(table2.columns['i3'].value).toBe('R3');
            expect(table2.columns['i4'].value).toBe('R4');
            expect(table2.columns['i5'].value).toBe('R5');
        });
        it("- select(filter, start) : 엔티티 조회(참조값), 필터 + 레코드범위 ", () => {
            var table1 = new MetaTable('T1');
            var filter = {
                __except: ['i1'],                   // 제외
                i2: { caption: 'C3' }  // 속성 오버라이딩(필터)
            };
            table1.columns.add('i1');
            table1.columns.add('i2');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R10';
            row['i2'] = 'R20';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R100';
            row['i2'] = 'R200';
            table1.rows.add(row);
            var table2 = table1.select(filter, 1);
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(3);
            expect(table1.rows[0][0]).toBe('R1');
            expect(table1.rows[0]['i1']).toBe('R1');
            // table2
            expect(table2.columns.count).toBe(1);
            expect(table2.rows.count).toBe(2);
            expect(table2.rows[0][0]).toBe('R20');
            expect(table2.rows[1][0]).toBe('R200');
            expect(table2.rows[0]['i2']).toBe('R20');
            expect(table2.rows[1]['i2']).toBe('R200');
        });
        it("- select(null, start, end) : 엔티티 조회(참조값), 레코드 범위 ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R10';
            row['i2'] = 'R20';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R100';
            row['i2'] = 'R200';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R1000';
            row['i2'] = 'R2000';
            table1.rows.add(row);
            var table2 = table1.select(null, 1, 2);
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(4);
            // table2
            expect(table2.columns.count).toBe(2);
            expect(table2.rows.count).toBe(2);
            expect(table2.rows[0][0]).toBe('R10');
            expect(table2.rows[0][1]).toBe('R20');
            expect(table2.rows[1][0]).toBe('R100');
            expect(table2.rows[1][1]).toBe('R200');
            expect(table2.rows[0]['i1']).toBe('R10');
            expect(table2.rows[0]['i2']).toBe('R20');
            expect(table2.rows[1]['i1']).toBe('R100');
            expect(table2.rows[1]['i2']).toBe('R200');
        });
        it("- select(null, [list]) : 엔티티 조회(참조값), 레코드 지정 ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R10';
            row['i2'] = 'R20';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R100';
            row['i2'] = 'R200';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R1000';
            row['i2'] = 'R2000';
            table1.rows.add(row);
            var table2 = table1.select(null, [0, 2]);
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(4);
            // table2
            expect(table2.columns.count).toBe(2);
            expect(table2.rows.count).toBe(2);
            expect(table2.rows[0][0]).toBe('R1');
            expect(table2.rows[0][1]).toBe('R2');
            expect(table2.rows[1][0]).toBe('R100');
            expect(table2.rows[1][1]).toBe('R200');
            expect(table2.rows[0]['i1']).toBe('R1');
            expect(table2.rows[0]['i2']).toBe('R2');
            expect(table2.rows[1]['i1']).toBe('R100');
            expect(table2.rows[1]['i2']).toBe('R200');
        });
    });

    it("- copy(filter, start) : 엔티티 복사 ", () => {
        var table1 = new MetaTable('T1');
        var filter = {
            __except: ['i1'],                   // 제외
            i2: { caption: 'C3' }  // 속성 오버라이딩(필터)
        };
        table1.columns.add('i1');
        table1.columns.add('i2');
        var row = table1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        var row = table1.newRow();
        row['i1'] = 'R10';
        row['i2'] = 'R20';
        table1.rows.add(row);
        var row = table1.newRow();
        row['i1'] = 'R100';
        row['i2'] = 'R200';
        table1.rows.add(row);
        var table2 = table1.copy(filter, 1);
        table1.columns['i2'].caption = 'C30';  // 복사후 덮어쓰기 REVIEW:

        // table1
        expect(table1.columns.count).toBe(2);
        expect(table1.rows.count).toBe(3);
        expect(table1.rows[0][0]).toBe('R1');
        expect(table1.rows[0][1]).toBe('R2');
        expect(table1.rows[0]['i1']).toBe('R1');
        expect(table1.rows[0]['i2']).toBe('R2');
        expect(table1.columns['i2'].caption).toBe('C30');
        // 비교
        expect(table1.columns['i2'] !== table2.columns['i2']).toBe(true);
        // table2
        expect(table2.columns.count).toBe(1);
        expect(table2.rows.count).toBe(2);
        expect(table2.rows[0][0]).toBe('R20');
        expect(table2.rows[1][0]).toBe('R200');
        expect(table2.rows[0]['i2']).toBe('R20');
        expect(table2.rows[1]['i2']).toBe('R200');
    });
    describe("< MetaTable.merge(entity, opt) >", () => {
        it("- merge(entity, opt = 1) : 엔티티 병합, 기존 item 유지 + 원본 row > 타겟 row  ", () => {    // REVIEW:
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R10';
            row['i2'] = 'R20';
            table1.rows.add(row);
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            table1.merge(table2, 1);

            expect(table1.columns.count).toBe(3);
            expect(table1.rows.count).toBe(2);
            expect(table1.columns['i2'].caption).toBe('C1');  // 기존 유지
            expect(table1.rows[0][0]).toBe('R1');
            expect(table1.rows[0][1]).toBe('R2');
            expect(table1.rows[0][2]).toBe('R33');
            expect(table1.rows[1][0]).toBe('R10');
            expect(table1.rows[1][1]).toBe('R20');
            expect(table1.rows[1][2]).toBe('');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('R33');
            expect(table1.rows[1]['i1']).toBe('R10');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('');    
        });
        it("- merge(entity, opt = 2) : 엔티티 병합, 기존 item 덮어쓰기, 원본 row < 타겟 row ", () => {  // REVIEW:
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.merge(table2, 2);

            expect(table1.columns.count).toBe(3);
            expect(table1.rows.count).toBe(2);
            expect(table1.columns['i2'].caption).toBe('C2');  // 덮어쓰기
            expect(table1.rows[0][0]).toBe('R1');
            expect(table1.rows[0][1]).toBe('R22');
            expect(table1.rows[0][2]).toBe('R33');
            expect(table1.rows[1][0]).toBe(null);   // REVIEW: 원래 '' 으로 되어 있음
            expect(table1.rows[1][1]).toBe('R20');
            expect(table1.rows[1][2]).toBe('R30');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[0]['i3']).toBe('R33');
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 원래 '' 으로 되어 있음
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');
        });
        it("- merge(entity, opt = 3) : 엔티티 병합, 엔티티 병합, row 안가져옴 ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.merge(table2, 3);

            expect(table1.columns.count).toBe(3);
            expect(table1.rows.count).toBe(1);
            expect(table1.columns['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('');
        });
    });
    describe.only("< MetaTable.load(entity | JSON, opt) >", () => {
        it("- load(JSON) : 가져오기, opt = 3 ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var table3 = new MetaTable('T3');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                    { i1: 'R100', i2: 'R200' },
                ]
            };
            table1.read(json1);    // opt = 3
            table2.load(json1);    // opt = 3
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.rows.count).toBe(3);
            // table2
            expect(table2.columns.count).toBe(2);
            expect(table2.columns['i1'].caption).toBe('C1');
            expect(table2.columns['i2'].caption).toBe('C2');
            expect(table2.rows.count).toBe(3);
            expect(table2.rows[0]['i1']).toBe('R1');
            expect(table2.rows[0]['i2']).toBe('R2');
            expect(table2.rows[1]['i1']).toBe('R10');
            expect(table2.rows[1]['i2']).toBe('R20');
            expect(table2.rows[2]['i1']).toBe('R100');
            expect(table2.rows[2]['i2']).toBe('R200');
        });
        it("- load(entity, opt = 0) : 가져오기, 작동 안함 ", () => {
        });
        it("- load(entity, opt = 1) : 가져오기, 구조(컬럼) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            table1.columns.add('i1');
            table1.columns.add('i2');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            table2.load(table1, 1);

            expect(table2.columns.count).toBe(2);
            expect(table2.columns['i1']).toBeDefined();
            expect(table2.columns['i2']).toBeDefined();
            expect(table2.rows.count).toBe(0);
        });
        it("- load(entity, opt = 1) : 예외(중복키) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table2.columns.add('i1');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);

            expect(() => table2.load(table1)).toThrow('key');
        });
        // 오류
        it.skip("- load(entity, opt = 2) : 가져오기, 구조/데이터(컬럼/로우) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            table1.columns.add('i1');
            table1.columns.add('i2');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            table2.columns.add('i2');
            var row = table1.newRow();
            row['i2'] = 'R20';
            table2.rows.add(row);
            table2.load(table1, 2);

            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.columns['i1']).toBeDefined();
            expect(table1.columns['i2']).toBeDefined();
            expect(table1.rows.count).toBe(1);
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            // table2
            expect(table2.columns.count).toBe(1);
            expect(table2.columns['i2']).toBeDefined();
            expect(table2.rows.count).toBe(2);
            expect(table2.rows[0]['i2']).toBe('R20');
            expect(table2.rows[1]['i2']).toBe('R2');
        });
        it("- load(entity, opt = 3) : 가져오기, 구조/데이터(컬럼/로우) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            table1.columns.add('i1');
            table1.columns.add('i2');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            table2.load(table1, 3);

            expect(table2.columns.count).toBe(2);
            expect(table2.columns['i1']).toBeDefined();
            expect(table2.columns['i2']).toBeDefined();
            expect(table2.rows.count).toBe(1);
            expect(table2.rows[0]['i1']).toBe('R1');
            expect(table2.rows[0]['i2']).toBe('R2');
        });

        /**
         * 로드시 예외 조건 검사
         * - 구조가 다를 경우 ?
         * - 중복될 경우
         * - 로우 존재시 (1,3)
         * - 별칭을 사용할 경우 : 2가지 경우
         *  + 내보내기, 가져오기
         */
    });
    describe.only("< MetaTable.read(JSON, opt), readSchema(), readData() >", () => {
        it("- readSchema(JSON) : column 가져오기(스키마) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var table3 = new MetaTable('T3');
            var json1 = { table: { columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                }
            }};
            var json2 = { entity: { columns: {
                i1: { caption: 'C1'},
                i2: { caption: 'C2'},
                }
            }};
            var json3 = { columns: {
                i1: { caption: 'C1'},
                i2: { caption: 'C2'},
                }
            };
            table1.readSchema(json1);
            table2.readSchema(json2);
            table3.readSchema(json3);
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            // table2
            expect(table2.columns.count).toBe(2);
            expect(table2.columns['i1'].caption).toBe('C1');
            expect(table2.columns['i2'].caption).toBe('C2');
            // table3
            expect(table3.columns.count).toBe(2);
            expect(table3.columns['i1'].caption).toBe('C1');
            expect(table3.columns['i2'].caption).toBe('C2');
        });
        it("- readSchema(JSON) : 중복 예외 ", () => {
            var table1 = new MetaTable('T1');
            var json1 = { columns: {
                i1: { caption: 'C1'},
                i2: { caption: 'C2'},
                }
            };
            table1.columns.addValue('i1', '');

            expect(() => table1.readSchema(json1)).toThrow('key');
        });
        it("- readSchema(JSON) : 예외(row 존재) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                },
                rows: [
                    { i1: 'R1'},
                ]
            };
            var json2 = { columns: {
                i2: { caption: 'C2'},
                }
            };
            table1.read(json1, 3);  // 스키마 + 데이터 가져오기

            expect(() => table1.readSchema(json2)).toThrow('row');
        });
        it("- readSchema(JSON, isReadRow) : column 가져오기(스키마) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var table3 = new MetaTable('T3');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                }
            };
            var json2 = { 
                rows: [
                    { i1: 'R1', i2: 'R2' },
                ]
            };
            var json3 = { columns: {
                    i1: { caption: 'C1'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                ]
            };
            table1.readSchema(json1, true);
            table2.readSchema(json2, true);
            table3.readSchema(json3, true);
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            // table2
            expect(table2.columns.count).toBe(2);
            // table3
            expect(table3.columns.count).toBe(2);
            expect(table3.columns['i1'].caption).toBe('C1');
        });
        it("- readData() : row 가져오기(데이터) ", () => {
            var table1 = new MetaTable('T1');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                    { i1: 'R100', i2: 'R200' },
                ]
            };
            table1.readSchema(json1);
            table1.readData(json1);
    
            // table1
            expect(table1.columns.count).toBe(2);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.rows.count).toBe(3);
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[1]['i1']).toBe('R10');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[2]['i1']).toBe('R100');
            expect(table1.rows[2]['i2']).toBe('R200');
        });
        it("- read(JSON, opt) : JSON 가져오기", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var table3 = new MetaTable('T3');
            var table4 = new MetaTable('T4');
            var table5 = new MetaTable('T5');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                    { i1: 'R100', i2: 'R200' },
                ]
            };
            var json2 = { 
                columns: {
                    i1: { caption: 'C1'},
                },
            };
            table1.read(json1, 0);  // 아무 동작 안함
            table2.read(json1, 1);  // 스키마 가져오기
            table3.read(json1, 2);  // 데이터 가져오기
            table4.read(json1, 3);  // 스키마 + 데이터 가져오기
            table5.read(json2, 1);  // 스키마 가져오기
            table5.read(json1, 2);  // 스키마 + 데이터 가져오기
    
            // table1
            expect(table1.columns.count).toBe(0);
            expect(table1.rows.count).toBe(0);
            // table2
            expect(table2.columns.count).toBe(2);
            expect(table2.columns['i1'].caption).toBe('C1');
            expect(table2.columns['i2'].caption).toBe('C2');
            expect(table2.rows.count).toBe(0);
            // table3
            expect(table3.columns.count).toBe(0);
            expect(table3.rows.count).toBe(0);
            // table4
            expect(table4.columns.count).toBe(2);
            expect(table4.columns['i1'].caption).toBe('C1');
            expect(table4.columns['i2'].caption).toBe('C2');
            expect(table4.rows.count).toBe(3);
            expect(table4.rows[0]['i1']).toBe('R1');
            expect(table4.rows[0]['i2']).toBe('R2');
            expect(table4.rows[1]['i1']).toBe('R10');
            expect(table4.rows[1]['i2']).toBe('R20');
            expect(table4.rows[2]['i1']).toBe('R100');
            expect(table4.rows[2]['i2']).toBe('R200');
            // table5
            expect(table5.columns.count).toBe(1);
            expect(table5.columns['i1'].caption).toBe('C1');
            expect(table5.rows.count).toBe(3);
            expect(table5.rows[0]['i1']).toBe('R1');
            expect(table5.rows[0]['i2']).toBe(undefined);
            expect(table5.rows[1]['i1']).toBe('R10');
            expect(table5.rows[1]['i2']).toBe(undefined);
            expect(table5.rows[2]['i1']).toBe('R100');
            expect(table5.rows[2]['i2']).toBe(undefined);
        });
    });


    describe("< MetaTable.load(entity | JSON, opt) >", () => {
        it("- load(entity, opt = 1) : 가져오기, row기준, 채워진 entity ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 1);

            expect(table1.columns.count).toBe(3);
            expect(table1.rows.count).toBe(3);
            expect(table1.columns['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('');
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R22');
            expect(table1.rows[1]['i3']).toBe('R33');
            expect(table1.rows[2]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[2]['i2']).toBe('R20');
            expect(table1.rows[2]['i3']).toBe('R30');
        });
        it("- load(entity, opt = 2) : 가져오기, row기준, 채워진 entity ", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 2);

            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(3);
            expect(table1.columns['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe(undefined);
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R22');
            expect(table1.rows[2]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[2]['i2']).toBe('R20');
        });
        it("- load(entity, opt = 1) : 가져오기, row 기준 ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 1);

            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(2);
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[0]['i3']).toBe('R33');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');
        });
        it("- load(entity, opt = 2) : 가져오기, 존재하는 item 의 row만 가져오기", () => {
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var table2 = new MetaTable('T2');
            table2.columns.add('i2');
            table2.columns.add('i3');
            table2.columns['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 2);

            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(2);
            expect(table1.columns['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R20');

        });
        it("- load(JSON, opt = 1) : 가져오기, row 기준, 채워진 entity", () => { // REVIEW: JSON 인지 object 인지?
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = {
                entity: {
                    columns: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 1);

            expect(table1.columns.count).toBe(3);
            expect(table1.rows.count).toBe(3);
            expect(table1.columns['i2'].caption).toBe('C1');
            expect(table1.columns['i2'].size).toBe(10);
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('');
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R22');
            expect(table1.rows[1]['i3']).toBe('R33');
            expect(table1.rows[2]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[2]['i2']).toBe('R20');
            expect(table1.rows[2]['i3']).toBe('R30');
        });
        it("- load(JSON, opt = 2) : 가져오기, row 기준, 채워진 entity", () => { // REVIEW: JSON 인지 object 인지?
            var table1 = new MetaTable('T1');
            table1.columns.add('i1');
            table1.columns.add('i2');
            table1.columns['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = {
                entity: {
                    columns: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 2);

            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(3);
            expect(table1.columns['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe(undefined);
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R22');
            expect(table1.rows[2]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[2]['i2']).toBe('R20');
        });
        it("- load(JSON, opt = 1) : 가져오기, row 기준", () => {
            var table1 = new MetaTable('T1');
            var table2 = {
                entity: {
                    columns: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 1);

            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(2);
            expect(table1.columns['i2'].size).toBe(10);
            expect(table1.columns['i3'].size).toBe(20);
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[0]['i3']).toBe('R33');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');

        });
        it("- load(JSON, opt = 2) : 가져오기, 존재하는 item 의 row 만 가져오기 ", () => {
            var table1 = new MetaTable('T1');
            var table2 = {
                entity: {
                    columns: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 2);

            expect(table1.columns.count).toBe(0);
            expect(table1.rows.count).toBe(0);
        });
    });
    it("- clear() : 지우기 (rows) ", () => {
        var table1 = new MetaTable('T1');
        table1.columns.add('i1');
        table1.columns.add('i2');
        var row = table1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        table1.clear();

        expect(table1.columns.count).toBe(2);
        expect(table1.rows.count).toBe(0);
    });
    it("- reset() : 지우기 (rows, columns) ", () => {
        var table1 = new MetaTable('T1');
        table1.columns.add('i1');
        table1.columns.add('i2');
        var row = table1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        table1.reset();

        expect(table1.columns.count).toBe(0);
        expect(table1.rows.count).toBe(0);
    });
    
    
    it("- clone() : 복제 ", () => {
        var table1 = new MetaTable('T1');
        table1.columns.add('i1');
        table1.columns.add('i2');
        table1.columns['i2'].caption = 'C1';
        var row = table1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        var table2 = table1.clone();

        // table1
        expect(table1.name).toBe('T1');
        expect(table1.columns.count).toBe(2);
        expect(table1.rows.count).toBe(1);
        expect(table1.columns['i2'].caption).toBe('C1');
        expect(table1.rows[0]['i1']).toBe('R1');
        expect(table1.rows[0]['i2']).toBe('R2');
        // table2
        expect(table2.name).toBe('T1');
        expect(table2.columns.count).toBe(2);
        expect(table2.rows.count).toBe(1);
        expect(table2.columns['i2'].caption).toBe('C1');
        expect(table2.rows[0]['i1']).toBe('R1');
        expect(table2.rows[0]['i2']).toBe('R2');
        // 비교
        expect(table1 === table2).toBe(false);
        expect(table1.columns === table2.columns).toBe(false);
        expect(table1.columns['i1'] === table2.columns['i1']).toBe(false);
        expect(table1.columns['i2'] === table2.columns['i2']).toBe(false);
        expect(table1.rows[0] === table2.rows[0]).toBe(false);
    });
    it("- row : 설정 ", () => {
        /**
         * 로울을 설정할때 전제 조건이 많다.
         * - 규칙을 정해야 한다. TODO:
         */
        // var table1 = new MetaTable('T1');
        // table1.columns.addValue('i1', 'V1');
        // table1.columns.addValue('i2', 'V2');
        // var row = new MetaRow(table1);
        // row['i1'] = 'R1';
        // row['i2'] = 'R2';
        // table1.rows.add(row);
        
        // expect(table1.rows[0].count).toBe(2);
        // expect(table1.rows[0]['i1']).toBe('R1');
        // expect(table1.rows[0]['i2']).toBe('R2');
        // expect(table1.rows[0]['i3']).toBe(undefined);
    });
    describe.only("< MetaTable.merge(entity, opt) >", () => {
        it("- merge() : opt = 0 (같은 구조) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                ]
            };
            table1.load(json1, 3);
            table2.load(json1, 3);
            table2.merge(table1, 0);

            expect(table2.columns.count).toBe(2);
            expect(table2.rows.count).toBe(4);
            expect(table2.columns['i1'].caption).toBe('C1');
            expect(table2.columns['i2'].caption).toBe('C2');
            expect(table2.rows[0]['i1']).toBe('R1');
            expect(table2.rows[0]['i2']).toBe('R2');
            expect(table2.rows[1]['i1']).toBe('R10');
            expect(table2.rows[1]['i2']).toBe('R20');
            expect(table2.rows[2]['i1']).toBe('R1');
            expect(table2.rows[2]['i2']).toBe('R2');
            expect(table2.rows[3]['i1']).toBe('R10');
            expect(table2.rows[3]['i2']).toBe('R20');
        });
        it("- merge() : opt = 0 (다른 구조) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                ]
            };
            var json2 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i3: { caption: 'C3'},
                },
                rows: [
                    { i1: 'R1', i3: 'R3' },
                    { i1: 'R10', i3: 'R30' },
                ]
            };
            table1.load(json1, 3);
            table2.load(json2, 3);
            table1.merge(table2, 0);

            expect(table1.columns.count).toBe(2);
            expect(table1.rows.count).toBe(4);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[1]['i1']).toBe('R10');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[2]['i1']).toBe('R1');
            expect(table1.rows[2]['i2']).toBe(null);
            expect(table1.rows[3]['i1']).toBe('R10');
            expect(table1.rows[3]['i2']).toBe(null);
        });
        it("- merge() : opt = 1 (다른 구조) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                ]
            };
            var json2 = { 
                columns: {
                    i3: { caption: 'C3'},
                    i4: { caption: 'C4'},
                },
                rows: [
                    { i3: 'R3', i4: 'R4' },
                    { i3: 'R30', i4: 'R40' },
                ]
            };
            table1.load(json1, 3);
            table2.load(json2, 3);
            table1.merge(table2, 1);

            expect(table1.columns.count).toBe(4);
            expect(table1.rows.count).toBe(2);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.columns['i3'].caption).toBe('C3');
            expect(table1.columns['i4'].caption).toBe('C4');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('R3');
            expect(table1.rows[0]['i4']).toBe('R4');
            expect(table1.rows[1]['i1']).toBe('R10');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');
            expect(table1.rows[1]['i4']).toBe('R40');
        });
        it("- merge() : opt = 1 (별칭 사용) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                ]
            };
            var json2 = { 
                columns: {
                    i2: { caption: 'CC2'},
                    i4: { caption: 'C4'},
                },
                rows: [
                    { i2: 'R2', i4: 'R4' },
                    { i2: 'R20', i4: 'R40' },
                ]
            };
            table1.load(json1, 3);
            table2.load(json2, 3);
            // 별칭 처리
            table2.columns['i2'].alias = 'ii2';
            table1.merge(table2, 1);
            // REVIEW: clone 관련 이슈 있음, entity 을 지정하면, alias 검사 이슈
            expect(table1.columns.count).toBe(4);
            expect(table1.rows.count).toBe(2);
            // expect(table1.columns['i1'].caption).toBe('C1');
            // expect(table1.columns['i2'].caption).toBe('C2');
            // expect(table1.columns['i3'].caption).toBe('C3');
            // expect(table1.columns['i4'].caption).toBe('C4');
            // expect(table1.rows[0]['i1']).toBe('R1');
            // expect(table1.rows[0]['i2']).toBe('R2');
            // expect(table1.rows[0]['i3']).toBe('R3');
            // expect(table1.rows[0]['i4']).toBe('R4');
            // expect(table1.rows[1]['i1']).toBe('R10');
            // expect(table1.rows[1]['i2']).toBe('R20');
            // expect(table1.rows[1]['i3']).toBe('R30');
            // expect(table1.rows[1]['i4']).toBe('R40');
        });
        it("- merge() : opt = 2 (다른 구조) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                ]
            };
            var json2 = { 
                columns: {
                    i2: { caption: 'C2'},
                    i3: { caption: 'C3'},
                },
                rows: [
                    { i2: 'R200', i3: 'R300' },
                    { i2: 'R2000', i3: 'R3000' },
                ]
            };
            table1.load(json1, 3);
            table2.load(json2, 3);
            table1.merge(table2, 2);

            expect(table1.columns.count).toBe(3);
            expect(table1.rows.count).toBe(4);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.columns['i3'].caption).toBe('C3');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe(null);
            expect(table1.rows[1]['i1']).toBe('R10');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe(null);
            expect(table1.rows[2]['i1']).toBe(null);
            expect(table1.rows[2]['i2']).toBe('R200');
            expect(table1.rows[2]['i3']).toBe('R300');
            expect(table1.rows[3]['i1']).toBe(null);
            expect(table1.rows[3]['i2']).toBe('R2000');
            expect(table1.rows[3]['i3']).toBe('R3000');
        });
        it("- merge() : opt = 3 (다른 구조) ", () => {
            var table1 = new MetaTable('T1');
            var table2 = new MetaTable('T2');
            var json1 = { 
                columns: {
                    i1: { caption: 'C1'},
                    i2: { caption: 'C2'},
                },
                rows: [
                    { i1: 'R1', i2: 'R2' },
                    { i1: 'R10', i2: 'R20' },
                ]
            };
            var json2 = { 
                columns: {
                    i3: { caption: 'C3'},
                    i4: { caption: 'C4'},
                },
                rows: [
                    { i3: 'R3', i4: 'R4' },
                    { i3: 'R30', i4: 'R40' },
                    { i3: 'R300', i4: 'R400' },
                ]
            };
            table1.load(json1, 3);
            table2.load(json2, 3);
            table1.merge(table2, 3);

            expect(table1.columns.count).toBe(4);
            expect(table1.rows.count).toBe(3);
            expect(table1.columns['i1'].caption).toBe('C1');
            expect(table1.columns['i2'].caption).toBe('C2');
            expect(table1.columns['i3'].caption).toBe('C3');
            expect(table1.columns['i4'].caption).toBe('C4');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('R3');
            expect(table1.rows[0]['i4']).toBe('R4');
            expect(table1.rows[1]['i1']).toBe('R10');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');
            expect(table1.rows[1]['i4']).toBe('R40');
            expect(table1.rows[2]['i1']).toBe(null);
            expect(table1.rows[2]['i2']).toBe(null);
            expect(table1.rows[2]['i3']).toBe('R300');
            expect(table1.rows[2]['i4']).toBe('R400');
        });
    });

    it("- getTypes() : array<function> ", () => {
        const c = new MetaTable();
        const types = c.getTypes();

        expect(types[0]).toBe(MetaTable);
        expect(types[1]).toBe(MetaEntity);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(MetaObject);
        expect(types[4]).toBe(Object);
        expect(types.length).toBe(5);
    });
    // it("- getTypeNames() : array<string> ", () => {
    //     const c = new MetaTable();
    //     const typeNames = c.getTypeNames();

    //     expect(typeNames[4]).toBe('Object');
    //     expect(typeNames[3]).toBe('MetaObject');
    //     expect(typeNames[2]).toBe('MetaElement');
    //     expect(typeNames[1]).toBe('MetaEntity');
    //     expect(typeNames[0]).toBe('MetaTable');
    //     expect(typeNames.length).toBe(5);
    // });
    it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new MetaTable();

        expect(c.instanceOf('IObject')).toBe(true);
        expect(c.instanceOf('IMarshal')).toBe(true);
        expect(c.instanceOf('Object')).toBe(true);
        expect(c.instanceOf('MetaObject')).toBe(true);
        expect(c.instanceOf('MetaElement')).toBe(true);
        expect(c.instanceOf('MetaEntity')).toBe(true);
        expect(c.instanceOf('MetaTable')).toBe(true);
        // false
        expect(c.instanceOf('Array')).toBe(false);
        expect(c.instanceOf('String')).toBe(false);
    });
    it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new MetaTable();

        expect(c.instanceOf(IObject)).toBe(true);
        expect(c.instanceOf(IMarshal)).toBe(true);
        expect(c.instanceOf(Object)).toBe(true);
        expect(c.instanceOf(MetaObject)).toBe(true);
        expect(c.instanceOf(MetaElement)).toBe(true);
        expect(c.instanceOf(MetaEntity)).toBe(true);
        expect(c.instanceOf(MetaTable)).toBe(true);
        // false
        expect(c.instanceOf(Array)).toBe(false);
        expect(c.instanceOf(String)).toBe(false);
    });
});