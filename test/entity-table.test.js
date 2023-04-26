/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';
const MetaObject            = require('../src/meta-object');
const MetaElement           = require('../src/meta-element');
const Entity                = require('../src/entity-base');
const IObject               = require('../src/i-object');
const IMarshal              = require('../src/i-marshal');
const { EntityTable }       = require('../src/entity-table');
const Util                  = require('../src/util');
const { Row }               = require('../src/entity-row');
const { Item }              = require('../src/entity-item');

//==============================================================
// test
describe("< EntityTable >", () => {
    beforeAll(() => {
        // jest.resetModules();
    });
    it("- 테이블 등록후 속성 검사 ", () => {
        const table1 = new EntityTable('T1');
        const table2 = new EntityTable('T2');
        table1.items.add('i1');
        table1.items.add('i2');
        table1.items['i1'].value = 'R1';
        table1.items['i2'].value = 'R2';
        table2.items.add('i1');
        table2.items.add(table1.items['i2']); // 내부 복제됨

        // table1
        expect(table1.items['i1'].value).toBe('R1');
        expect(table1.items['i2'].value).toBe('R2');
        expect(table1.name).toBe('T1');
        expect(table1.items['i1'].entity.name).toBe('T1');
        expect(table1.items['i2'].entity.name).toBe('T1');
        // table2
        expect(table2.items['i1'].value).toBe(null);
        expect(table2.items['i2'].value).toBe('R2');
        expect(table2.name).toBe('T2');
        expect(table2.items['i1'].entity.name).toBe('T2');
        expect(table2.items['i2'].entity.name).toBe('T2');
    });
    it("- newRow() : Row 생성 ", () => {
        var table1 = new EntityTable('T1');
        table1.items.add('i1');
        table1.items.add('i2');
        table1.items.add('i3');
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
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items.add('i3');
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            row['i3'] = 'R3';
            table1.setValue(row);
            
            expect(table1.items['i1'].value).toBe('R1');
            expect(table1.items['i2'].value).toBe('R2');
            expect(table1.items['i3'].value).toBe('R3');
        });
        it("- setValue(row) :row 설정(단일), 별칭 사용 ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items.add('i3');
            table1.items['i2'].alias = 'ii2';    // 별칭
            table1.items['i3'].alias = 'ii3';    // 별칭
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            row['ii3'] = 'RR3';
            table1.setValue(row);
    
            expect(table1.items['i1'].value).toBe('R1');
            expect(table1.items['i2'].value).toBe('');      // REVIEW: 별칭에서 중복검사 및 기존도 값이 사용되어야함?
            expect(table1.items['i3'].value).toBe('RR3');
        });
    });
    describe("< getValue() : row >", () => {
        it("- getValue() : row 얻기(단일) ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items.add('i3');
            table1.items['i1'].value = 'R1';
            table1.items['i2'].value = 'R2';
            table1.items['i3'].value = 'R3';
            var row = table1.getValue();
    
            expect(row['i1']).toBe('R1');
            expect(row['i2']).toBe('R2');
            expect(row['i3']).toBe('R3');
            expect(row[0]).toBe('R1');
            expect(row[1]).toBe('R2');
            expect(row[2]).toBe('R3');
        });
        it("- getValue() : row 얻기(단일), 별칭 사용 ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items.add('i3');
            table1.items['i2'].alias = 'ii2';    // 별칭
            table1.items['i3'].alias = 'ii3';    // 별칭
            table1.items['i1'].value = 'R1';
            table1.items['i2'].value = 'R2';
            table1.items['i3'].value = 'R3';
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
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items.add('i3');
            table1.items['i3'].order = 200;          // 참조값 체크
            table1.items.addValue('i4', 'R4');       // 등록시 값 삽입
            table1.items.addValue('i5', 'R5');       // 등록시 값 삽입
            var filter = {
                __except: ['i1'],                   // 제외
                i2: { __except: true },             // 제외
                i3: { caption: 'C3', value: 'R3' }  // 속성 오버라이딩(필터)
            };
            var table2 = table1.select(filter);
    
            // table1
            expect(table1.name).toBe('T1');
            expect(table1.items.count).toBe(5);
            expect(table1.items['i4'].value).toBe('R4');
            expect(table1.items['i5'].value).toBe('R5');
            expect(table1.items['i3'].order).toBe(200);
            // table2
            expect(table2.name).toBe('T1');
            expect(table2.items.count).toBe(3);
            expect(table2.items['i3'].caption).toBe('C3');
            expect(table2.items['i3'].value).toBe('R3');
            expect(table2.items['i4'].value).toBe('R4');
            expect(table2.items['i5'].value).toBe('R5');
        });
        it("- select(filter, start) : 엔티티 조회(참조값), 필터 + 레코드범위 ", () => {
            var table1 = new EntityTable('T1');
            var filter = {
                __except: ['i1'],                   // 제외
                i2: { caption: 'C3' }  // 속성 오버라이딩(필터)
            };
            table1.items.add('i1');
            table1.items.add('i2');
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
            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(3);
            expect(table1.rows[0][0]).toBe('R1');
            expect(table1.rows[0]['i1']).toBe('R1');
            // table2
            expect(table2.items.count).toBe(1);
            expect(table2.rows.count).toBe(2);
            expect(table2.rows[0][0]).toBe('R20');
            expect(table2.rows[1][0]).toBe('R200');
            expect(table2.rows[0]['i2']).toBe('R20');
            expect(table2.rows[1]['i2']).toBe('R200');
        });
        it("- select(null, start, end) : 엔티티 조회(참조값), 레코드 범위 ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
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
            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(4);
            // table2
            expect(table2.items.count).toBe(2);
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
        it("- slect(null, [list]) : 엔티티 조회(참조값), 레코드 지정 ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
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
            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(4);
            // table2
            expect(table2.items.count).toBe(2);
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
        var table1 = new EntityTable('T1');
        var filter = {
            __except: ['i1'],                   // 제외
            i2: { caption: 'C3' }  // 속성 오버라이딩(필터)
        };
        table1.items.add('i1');
        table1.items.add('i2');
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
        table1.items['i2'].caption = 'C30';  // 복사후 덮어쓰기 REVIEW:

        // table1
        expect(table1.items.count).toBe(2);
        expect(table1.rows.count).toBe(3);
        expect(table1.rows[0][0]).toBe('R1');
        expect(table1.rows[0][1]).toBe('R2');
        expect(table1.rows[0]['i1']).toBe('R1');
        expect(table1.rows[0]['i2']).toBe('R2');
        expect(table1.items['i2'].caption).toBe('C30');
        // 비교
        expect(table1.items['i2'] !== table2.items['i2']).toBe(true);
        // table2
        expect(table2.items.count).toBe(1);
        expect(table2.rows.count).toBe(2);
        expect(table2.rows[0][0]).toBe('R20');
        expect(table2.rows[1][0]).toBe('R200');
        expect(table2.rows[0]['i2']).toBe('R20');
        expect(table2.rows[1]['i2']).toBe('R200');
    });
    describe("< EntityTable.merge(entity, opt) >", () => {
        it("- merge(entity, opt = 1) : 엔티티 병합, 기존 item 유지 + 원본 row > 타겟 row  ", () => {    // REVIEW:
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var row = table1.newRow();
            row['i1'] = 'R10';
            row['i2'] = 'R20';
            table1.rows.add(row);
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            table1.merge(table2, 1);

            expect(table1.items.count).toBe(3);
            expect(table1.rows.count).toBe(2);
            expect(table1.items['i2'].caption).toBe('C1');  // 기존 유지
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
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.merge(table2, 2);

            expect(table1.items.count).toBe(3);
            expect(table1.rows.count).toBe(2);
            expect(table1.items['i2'].caption).toBe('C2');  // 덮어쓰기
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
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.merge(table2, 3);

            expect(table1.items.count).toBe(3);
            expect(table1.rows.count).toBe(1);
            expect(table1.items['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe('');
        });
    });
    describe("< EntityTable.load(entity | JSON, opt) >", () => {
        it("- load(entity, opt = 1) : 가져오기, row기준, 채워진 entity ", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 1);

            expect(table1.items.count).toBe(3);
            expect(table1.rows.count).toBe(3);
            expect(table1.items['i2'].caption).toBe('C1');
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
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 2);

            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(3);
            expect(table1.items['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe(undefined);
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R22');
            expect(table1.rows[2]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[2]['i2']).toBe('R20');
        });
        it("- load(entity, opt = 1) : 가져오기, row 기준 ", () => {
            var table1 = new EntityTable('T1');
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 1);

            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(2);
            expect(table1.items['i2'].caption).toBe('C2');
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[0]['i3']).toBe('R33');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');
        });
        it("- load(entity, opt = 2) : 가져오기, 존재하는 item 의 row만 가져오기", () => {
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var table2 = new EntityTable('T2');
            table2.items.add('i2');
            table2.items.add('i3');
            table2.items['i2'].caption = 'C2';
            var row = table1.newRow();
            row['i2'] = 'R22';
            row['i3'] = 'R33';
            table2.rows.add(row);
            var row = table1.newRow();
            row['i2'] = 'R20';
            row['i3'] = 'R30';
            table2.rows.add(row);
            table1.load(table2, 2);

            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(2);
            expect(table1.items['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R20');

        });
        it("- load(JSON, opt = 1) : 가져오기, row 기준, 채워진 entity", () => { // REVIEW: JSON 인지 object 인지?
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = {
                entity: {
                    items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 1);

            expect(table1.items.count).toBe(3);
            expect(table1.rows.count).toBe(3);
            expect(table1.items['i2'].caption).toBe('C1');
            expect(table1.items['i2'].size).toBe(10);
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
            var table1 = new EntityTable('T1');
            table1.items.add('i1');
            table1.items.add('i2');
            table1.items['i2'].caption = 'C1';
            var row = table1.newRow();
            row['i1'] = 'R1';
            row['i2'] = 'R2';
            table1.rows.add(row);
            var table2 = {
                entity: {
                    items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 2);

            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(3);
            expect(table1.items['i2'].caption).toBe('C1');
            expect(table1.rows[0]['i1']).toBe('R1');
            expect(table1.rows[0]['i2']).toBe('R2');
            expect(table1.rows[0]['i3']).toBe(undefined);
            expect(table1.rows[1]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[1]['i2']).toBe('R22');
            expect(table1.rows[2]['i1']).toBe(null);    // REVIEW: 기존에 '' 이 넘어옴
            expect(table1.rows[2]['i2']).toBe('R20');
        });
        it("- load(JSON, opt = 1) : 가져오기, row 기준", () => {
            var table1 = new EntityTable('T1');
            var table2 = {
                entity: {
                    items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 1);

            expect(table1.items.count).toBe(2);
            expect(table1.rows.count).toBe(2);
            expect(table1.items['i2'].size).toBe(10);
            expect(table1.items['i3'].size).toBe(20);
            expect(table1.rows[0]['i2']).toBe('R22');
            expect(table1.rows[0]['i3']).toBe('R33');
            expect(table1.rows[1]['i2']).toBe('R20');
            expect(table1.rows[1]['i3']).toBe('R30');

        });
        it("- load(JSON, opt = 2) : 가져오기, 존재하는 item 의 row 만 가져오기 ", () => {
            var table1 = new EntityTable('T1');
            var table2 = {
                entity: {
                    items: [ { i2: { size : 10 }, }, { i3: { size: 20 } }],
                    rows_total: 2,
                    rows: [ { i2: 'R22', i3: 'R33'}, { i2: 'R20', i3: 'R30'}]
                }            
            };
            table1.load(table2, 2);

            expect(table1.items.count).toBe(0);
            expect(table1.rows.count).toBe(0);
        });
    });
    it("- clear() : 지우기 ", () => {
        var table1 = new EntityTable('T1');
        table1.items.add('i1');
        table1.items.add('i2');
        var row = table1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        table1.clear();

        expect(table1.items.count).toBe(0);
        expect(table1.rows.count).toBe(0);
    });
    it("- clone() : 복제 ", () => {
        var table1 = new EntityTable('T1');
        table1.items.add('i1');
        table1.items.add('i2');
        table1.items['i2'].caption = 'C1';
        var row = table1.newRow();
        row['i1'] = 'R1';
        row['i2'] = 'R2';
        table1.rows.add(row);
        var table2 = table1.clone();

        // table1
        expect(table1.name).toBe('T1');
        expect(table1.items.count).toBe(2);
        expect(table1.rows.count).toBe(1);
        expect(table1.items['i2'].caption).toBe('C1');
        expect(table1.rows[0]['i1']).toBe('R1');
        expect(table1.rows[0]['i2']).toBe('R2');
        // table2
        expect(table2.name).toBe('T1');
        expect(table2.items.count).toBe(2);
        expect(table2.rows.count).toBe(1);
        expect(table2.items['i2'].caption).toBe('C1');
        expect(table2.rows[0]['i1']).toBe('R1');
        expect(table2.rows[0]['i2']).toBe('R2');
        // 비교
        expect(table1 === table2).toBe(false);
        expect(table1.items === table2.items).toBe(false);
        expect(table1.items['i1'] === table2.items['i1']).toBe(false);
        expect(table1.items['i2'] === table2.items['i2']).toBe(false);
        expect(table1.rows[0] === table2.rows[0]).toBe(false);
    });
    it("- getTypes() : array<function> ", () => {
        const c = new EntityTable();
        const types = c.getTypes();

        expect(types[0]).toBe(Object);
        expect(types[1]).toBe(MetaObject);
        expect(types[2]).toBe(MetaElement);
        expect(types[3]).toBe(Entity);
        expect(types[4]).toBe(EntityTable);
        expect(types.length).toBe(5);
    });
    it("- getTypeNames() : array<string> ", () => {
        const c = new EntityTable();
        const typeNames = c.getTypeNames();

        expect(typeNames[0]).toBe('Object');
        expect(typeNames[1]).toBe('MetaObject');
        expect(typeNames[2]).toBe('MetaElement');
        expect(typeNames[3]).toBe('Entity');
        expect(typeNames[4]).toBe('EntityTable');
        expect(typeNames.length).toBe(5);
    });
    it("- instanceOf(string) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new EntityTable();

        expect(c.instanceOf('IObject')).toBe(true);
        expect(c.instanceOf('IMarshal')).toBe(true);
        expect(c.instanceOf('Object')).toBe(true);
        expect(c.instanceOf('MetaObject')).toBe(true);
        expect(c.instanceOf('MetaElement')).toBe(true);
        expect(c.instanceOf('Entity')).toBe(true);
        expect(c.instanceOf('EntityTable')).toBe(true);
        // false
        expect(c.instanceOf('Array')).toBe(false);
        expect(c.instanceOf('String')).toBe(false);
    });
    it("- instanceOf(function) : 상위 함수(클래스, 인터페이스) 검사 ", () => {
        const c = new EntityTable();

        expect(c.instanceOf(IObject)).toBe(true);
        expect(c.instanceOf(IMarshal)).toBe(true);
        expect(c.instanceOf(Object)).toBe(true);
        expect(c.instanceOf(MetaObject)).toBe(true);
        expect(c.instanceOf(MetaElement)).toBe(true);
        expect(c.instanceOf(Entity)).toBe(true);
        expect(c.instanceOf(EntityTable)).toBe(true);
        // false
        expect(c.instanceOf(Array)).toBe(false);
        expect(c.instanceOf(String)).toBe(false);
    });
});