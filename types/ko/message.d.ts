/**
 * `Message`는 메시지와 코드를 관리하는 클래스입니다.
 */
declare class Message {

    /**
     * 메시지 코드를 저장하는 내부 저장소입니다. 
     */
    static $storage: Record<string, any>;

    /**
     * 메시지 언어를 설정합니다.  
     */
    static lang: string;

    /**
     * 주어진 메시지 코드에 해당하는 문자열을 반환합니다.
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환될 값 배열
     * @returns 메시지 문자열
     */
    static get(code: string, placeholders?: string[]): string;

    /**
     * 메시지 코드에 해당하는 Error 객체를 생성하고 예외를 발생시켜 오류를 처리합니다.
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환될 값 배열
     * @throws 지정된 메시지 코드에 해당하는 오류
     */
    static error(code: string, placeholders?: string[]): never;

    /**
     * 메시지 코드에 해당하는 경고 메시지를 console.warn으로 출력합니다.
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환될 값 배열
     */
    static warn(code: string, placeholders?: string[]): void;
}

export default Message;
export { Message };
