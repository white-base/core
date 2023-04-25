/**
 * ES6 + CJS + JEST
 */
//==============================================================
// gobal defined
'use strict';

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
        const c1 = new EntityTable('T1');
        const c2 = new EntityTable('T2');
        c1.items.add('i1');
        c1.items.add('i2');
        c1.items['i1'].value = 'R1';
        c1.items['i2'].value = 'R2';
        c2.items.add('i1');
        c2.items.add(c1.items['i2']); // 내부 복제됨

        // c1
        expect(c1.items['i1'].value).toBe('R1');
        expect(c1.items['i2'].value).toBe('R2');
        expect(c1.name).toBe('T1');
        expect(c1.items['i1'].entity.name).toBe('T1');
        expect(c1.items['i2'].entity.name).toBe('T1');
        // c2
        expect(c2.items['i1'].value).toBe(null);
        expect(c2.items['i2'].value).toBe('R2');
        expect(c2.name).toBe('T2');
        expect(c2.items['i1'].entity.name).toBe('T2');
        expect(c2.items['i2'].entity.name).toBe('T2');
    });
    
});