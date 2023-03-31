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
    it('- Util.createGUID() : 난수 비교와 길이 검사', () => {
        const guid1 = Util.createGUID();
        const guid2 = Util.createGUID();

        expect(guid1.length).toBe(36);
        expect(guid2.length).toBe(36); // guid 길이
        expect(guid1).not.toBe(guid2);
    });

    // TODO: level >> Depth 으로 변경해야함
    it('- Util.getArrayLevel() : 난수 비교와 길이 검사', () => {
        const lvl3 = [[[]]];
        // const lvl3 = [[[]]];

        expect(Util.getArrayLevel(lvl3)).toBe(3);
    });
    // it('- Util.createGUID() : 난수 비교와 길이 검사', () => {
    // });
});
