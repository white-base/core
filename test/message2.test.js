//==============================================================
// gobal defined
import Message from '../src/message2.js';
import {jest} from '@jest/globals';

//==============================================================
// test
describe("[target: message.js]", () => {
    describe("Message :: 클래스", () => {
        beforeEach(() => {
            jest.resetModules();
        });
        describe("Message.defaultLang: str <언어 설정>", () => {
            it("- this.lang : 기본 언어 얻기", async () => {
                
                // Message.$storage
                await Message.changeLanguage('ko');
                
                expect(Message.defaultLang).toBe('default')
                expect(Message.currentLang).toBe('ko')
                
                expect(Message.get('EN')).toBe('END')
                expect(Message.get('KO')).toBe('END')
                expect(Message.get('ETC')).toBe("There is no message for code 'ETC'.")
            });
        });
    });
});
