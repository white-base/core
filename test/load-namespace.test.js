//==============================================================
// gobal defined
import loadNamespace from '../src/utils/load-namespace';
import MetaRegistry from '../src/meta-registry';
import {jest} from '@jest/globals';

//==============================================================
// test
describe("[target: load-namespace.js]", () => {
    describe("loadNamespace :: 함수", () => {
        beforeEach(() => {
            jest.resetModules();
            // Message.init();
        });
        describe("loadNamespace() <전체 네임스페이스 불러오기>", () => {
            it("- loadNamespace() ", () => {
                loadNamespace()

                expect(MetaRegistry.namespace.find('Meta.MetaObject')).toBeDefined()
                
            });
        });
    });
});
