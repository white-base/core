/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const Util      = require('../src/util');

//==============================================================
// test
describe('Util.*', () => {
    beforeAll(() => {
    });
    it('- Util.createGuid() : 난수 비교와 길이 검사', () => {
        const guid1 = Util.createGuid();
        const guid2 = Util.createGuid();

        expect(guid1.length).toBe(36);
        expect(guid2.length).toBe(36); // guid 길이
        expect(guid1).not.toBe(guid2);
    });

    it('- Util.getArrayDepth() : 난수 비교와 길이 검사', () => {
        const lvl3 = [[[]]];
        // const lvl3 = [[[]]];

        expect(Util.getArrayDepth(lvl3)).toBe(3);
    });
    // it('- Util.createGuid() : 난수 비교와 길이 검사', () => {
    // });
});
