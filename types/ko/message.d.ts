/**
 * 메시지 코드 관리 클래스 (static)
 */
declare class Message {

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
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환될 값 배열
     * @returns 메시지 문자열
     */
    static get(code: string, placeholders?: string[]): string;

    /**
     * 메시지 코드에 대한 Error 객체를 생성하여 예외를 발생시킵니다.
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환될 값 배열
     */
    static error(code: string, placeholders?: string[]): never;

    /**
     * 메시지 코드에 대한 console.warn을 출력합니다.
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환될 값 배열
     */
    static warn(code: string, placeholders?: string[]): void;
}

export default Message;
export { Message };
