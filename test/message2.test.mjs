//==============================================================
// gobal defined
import Message from '../src/message.js';
import {jest} from '@jest/globals';

// jest.mock('require', () => null);
//==============================================================
// test
describe("[target: message.js]", () => {
    describe("Message :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
            jest.restoreAllMocks();
        // jest.mock('require', () => null);
        });
        describe("Message.defaultLang: str <언어 설정>", () => {
            it("- this.lang : 기본 언어 얻기", async () => {
                // jest.doMock('require', () => null);
                
                globalThis.isESM = true;

                // Message.$storage
                await Message.changeLanguage('ko');
                
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('ko')
                
                expect(Message.get('EN')).toMatch(/END/)
                expect(Message.get('KO')).toMatch(/END/)
                expect(Message.get('ETC')).toBe("There is no message for code. 'ETC'")
            });
        });
    });
});
