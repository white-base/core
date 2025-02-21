import Message from "./message";

declare class ExtendError extends Error {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * 이전에 발생한 message 큐
     */
    queue: string[];

    /**
     * 속성타입 오류 메시지
     */
    prop: Record<string, string>;

    /**
     * 확장 오류를 생성합니다.
     * @param p_msg 메시지 코드 또는 사용자 메시지 내용
     * @param p_prop 이전 ExtendError 객체 또는 속성타입 오류 메시지
     * @param p_codeVal 메시지 코드의 $1, $2 치환값 배열
     */
    constructor(p_msg: string | RegExp, p_prop?: ExtendError | Record<string, string>, p_codeVal?: string[]);

    toString(): string;
}

export default ExtendError;
export { ExtendError };
