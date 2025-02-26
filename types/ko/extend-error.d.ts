import Message from "./message";

/**
 * `ExtendError` 클래스는 확장된 오류 정보를 제공하는 사용자 정의 오류 클래스입니다.
 * 이 클래스는 기본 `Error` 클래스를 확장하여 추가적인 속성 및 기능을 제공합니다.
 */
declare class ExtendError extends Error {
    /**
     * 이전에 발생한 message 큐
     */
    queue: string[];

    /**
     * 속성타입 오류 메시지
     */
    prop: Record<string, string>;

    /**
     * `ExtendError` 클래스의 인스턴스를 생성합니다.
     * @param msg 메시지 코드 또는 사용자 메시지 내용
     * @param prop 이전 ExtendError 객체 또는 속성타입 오류 메시지
     * @param codeVal 메시지 코드의 $1, $2 치환값 배열
     */
    constructor(msg: string | RegExp, prop?: ExtendError | Record<string, string>, codeVal?: string[]);

    /**
     * 오류 메시지를 출력합니다.
     */
    toString(): string;
}

export default ExtendError;
export { ExtendError };
