
// 부울
expect(n).toBeNull();               // null
expect(n).toBeDefined();            // undefined
expect(n).not.toBeUndefined();      // toBeDefined의 반대이다
expect(n).not.toBeTruthy();         // 참으로 취급하는 모든 항목과 일치합니다.
expect(n).toBeFalsy();              // 거짓으로 취급하는 모든 것과 일치합니다

// 숫자
expect(value).toBe(4);         
expect(value).toEqual(4);

// 문자열
expect('Christoph').toMatch(/stop/);

// 배열
expect(shoppingList).toContain('milk'); // 배열항목중 milk

// 예외
expect(() => 예외문()).toThrow(/reg/);



// 블럭
describe("< setValue(row) >", () => {
    it("- setValue(row) : row 설정(단일) ", () => {select
        
    });
});

// 전처리

beforeAll(() => console.log('1 - beforeAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterAll(() => console.log('1 - afterAll'));
afterEach(() => console.log('1 - afterEach'));
