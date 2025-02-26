declare namespace Util {
    /**
     * 배열의 깊이를 가져옵니다.
     * @param p_elem - 배열 요소
     * @param p_depts - 현재 깊이 (기본값: 0)
     * @returns 배열의 깊이
     */
    function getArrayDepth(p_elem: any[], p_depts?: number): number;

    /**
     * GUID를 생성합니다. (36자)
     * @returns 생성된 GUID 문자열
     */
    function createGuid(): string;

    /**
     * 객체를 깊은 복사합니다. (prototype 제외)
     * @param p_target - 복사할 대상 객체
     * @returns 복사된 객체
     */
    function deepCopy<T>(p_target: T): T;

    /**
     * 생성자에서 부모 생성자를 상속합니다.
     * @param ctor - 생성자 함수 또는 객체
     * @param superCtor - 부모 생성자 함수 또는 객체
     */
    function inherits(ctor: Function, superCtor: Function): void;

    /**
     * 인터페이스 구현 여부를 검사합니다.
     * @param p_ctor - 검사할 생성자
     * @param p_obj - 검사 대상 객체
     * @param args - 인터페이스 목록
     */
    function implements(p_ctor: Function, p_obj: object, ...args: Function[]): void;
}

export default Util;
export { Util };