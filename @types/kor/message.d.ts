
/**
 * 메시지와 코드를 관리하는 클래스입니다. (static)
 * @static
 */
declare class Message {
 
    
    /**
     * 메시지 코드 저장소입니다.
     * @type {object}
     */
    static $storage: object;
    
    /**
     * 메시지 언어를 설정합니다.
     * 기본값은 'eng'입니다.
     * @type {string}
     */
    static lang: string | 'eng';

    /**
     * 메시지 코드를 사용하여 해당 문자열을 반환합니다.
     * @param code 메시지 코드
     * @param value 메시지 내의 $1, $2...에 해당하는 값들
     * @returns {string} 해당 메시지 코드에 대한 문자열
     */
    static get(code: string, value: string[]): string;
        
    /**
     * 메시지 코드를 사용하여 Error 객체를 생성하고 예외를 발생시킵니다.
     * @param code 메시지 코드
     * @param value 메시지 내의 $1, $2...에 해당하는 값들
     * @returns {Error} 생성된 Error 객체
     */
    static error(code: string, value: string[]): Error;

    /**
     * 메시지 코드를 사용하여 console.warn을 발생시킵니다.
     * @param code 메시지 코드
     * @param value 메시지 내의 $1, $2...에 해당하는 값들
     */
    static warn(code: string, value: string[]);
}

export = Message;