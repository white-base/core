import { jest } from "@jest/globals";

describe("브라우저 환경 테스트", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ name: "Test", value: 42 }),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("브라우저 환경에서 JSON 로드", async () => {
        const { default: Message } = await import("../src/message2.js");
        const result = await Message.changeLanguage("ko");
        expect(result).toEqual({ name: "Test", value: 42 });
    });
});
