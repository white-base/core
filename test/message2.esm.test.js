import { jest } from "@jest/globals";
import { Message } from "../src/message22.cjs";

describe("ESM 환경 테스트", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetModules();
    });

    test("ESM 방식으로 JSON 로드", async () => {
        // const { default: Message } = await import("../src/message2.js");
        // await Message.changeLanguage("ko");

        expect(Message.currentLang).toBe('ko');
        expect(Message.get('KO')).toBe('END');
        expect(Message.get('EN')).toBe('END');
    });
});