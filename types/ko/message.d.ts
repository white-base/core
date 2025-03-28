/**
 * `Message`는 메시지와 코드를 관리하는 클래스입니다.
 */
declare class Message {

    /**
     * 네임스페이스 경로입니다. 
     * 'Common'  
     */
    static _NS: string;

    /**
     * 메시지 코드를 저장하는 내부 저장소입니다. 
     */
    static $storage: Record<string, any>;

    /**
     * 메시지 언어를 설정합니다.  
     */
    // static autoDetect: boolean;

    /**
     * 기본 언어를 설정합니다. 기본값은 'default'입니다.
     */
    static defaultLang: string;

    /**
     * 현재 언어를 설정합니다. 기본값은 'default'입니다.
     */
    static currentLang: string;

    /**
     * 메시지 코드에 해당하는 메시지를 반환합니다.  
     * 
     * @param code 메시지 코드
     * @returns 메시지 문자열
     */
    static getMessageByCode(code: string): string;

    /**
     * 메시지 코드를 저장소에 추가합니다.  
     * 
     * @param messages 메세지 객체
     * @param locales 메세지 파일 경로
     */
    static importMessage(messages: Record<string, any>, locales: string): void;

    /**
     * 언어를 변경합니다.  
     * @param lang - 언어 코드
     */
    static changeLanguage(lang: string): Promise<void>;

    /**
     * 주어진 메시지 코드에 해당하는 문자열을 반환합니다.
     * 
     * @param code - 메시지 코드
     * @param placeholders - 메시지에서 치환할 값
     * @returns 메시지 문자열
     */
    static get(code: string, placeholders?: string[]): string;

    /**
     * 언어를 초기화합니다.  
     */
    static resetLang(): void;

    /**
     * 언어 자동 감지하여 현재 언어를 설정합니다.  
     */
    static init(): Promise<void>;
}

export default Message;
export { Message };
