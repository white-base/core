/**** message.d.ts ****/

/**
 * 메시지 코드 관리 클래스 (static)
 */
declare class Message {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * 메시지 코드 스토리지
     */
    static $storage: Record<string, any>;

    /**
     * 메시지 언어 설정
     */
    static lang: string;

    /**
     * 메시지 코드에 대한 문자열을 얻습니다.
     * @param p_code 메시지 코드
     * @param p_aValue 메시지에서 치환될 값 배열
     * @returns 메시지 문자열
     */
    static get(p_code: string, p_aValue?: string[]): string;

    /**
     * 메시지 코드에 대한 Error 객체를 생성하여 예외를 발생시킵니다.
     * @param p_code 메시지 코드
     * @param p_aValue 메시지에서 치환될 값 배열
     */
    static error(p_code: string, p_aValue?: string[]): never;

    /**
     * 메시지 코드에 대한 console.warn을 출력합니다.
     * @param p_code 메시지 코드
     * @param p_aValue 메시지에서 치환될 값 배열
     */
    static warn(p_code: string, p_aValue?: string[]): void;
}

export default Message;
export { Message };
