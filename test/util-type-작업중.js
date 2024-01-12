/**
 * ES6 + CJS
 */
//==============================================================
// gobal defined
const {typeObject, typeOf}  = require('../src/util-type');
const {isAllowType, allowType }  = require('../src/util-type');
const { isMatchType, matchType }  = require('../src/util-type');
const T = true;

//==============================================================
// test
describe("[target: util-type.js.js]", () => {
    beforeAll(() => {
        jest.resetModules();
    });
    describe('typeOf(target): str  <타입 얻기> ', () => {
        describe('원시 타입 ', () => {
            it('- typeOf() : undefined ', () => {
                //
            });
            it('- typeOf() : null ', () => {
                //
            });
            it('- typeOf() : string [리터럴] ', () => {
                //
            });
            it('- typeOf() : number [리터럴] ', () => {
                //
            });
            it('- typeOf() : boolean [리터럴] ', () => {
                //
            });
            it('- typeOf() : bigint [리터럴] (ES6+) ', () => {
                //
            });
            it('- typeOf() : symbol (ES6+) ', () => {
                //
            });
        });
        describe('확장 타입 ', () => {
            it('- typeOf() : regexp [리터럴] ', () => {
                //
            });
            it('- typeOf() : null ', () => {
                //
            });
            it('- typeOf() : string ', () => {
                //
            });
            it('- typeOf() : number ', () => {
                //
            });
            it('- typeOf() : boolean ', () => {
                //
            });
            it('- typeOf() : bigint (ES6+) ', () => {
                //
            });
            it('- typeOf() : symbol (ES6+) ', () => {
                //
            });
        });
    });
});
