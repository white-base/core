/**
 * 메시지와 코드를 관리하는 클래스입니다. 이 클래스는 정적 메서드를 통해 메시지 코드를 처리하고,
 * 다양한 방식으로 메시지를 반환하거나 오류를 발생시키는 기능을 제공합니다.
 * 
 * @static
 */
declare class Message {
    
    /**
     * 메시지 코드 저장소입니다.
     * 이 객체는 메시지 코드를 키로 사용하여 해당 메시지를 관리합니다.
     */
    static $storage: object;
    
    /**
     * 메시지 언어를 설정합니다.
     * 기본값은 `'eng'`입니다. 이 속성을 설정하면 메시지 코드에 대한 문자열 반환 시 사용될 언어가 변경됩니다.
     */
    static lang: string | 'eng';

    /**
     * 메시지 코드를 사용하여 해당 문자열을 반환합니다.
     * 주어진 메시지 코드를 사용하여 저장소에서 문자열 메시지를 조회하고,
     * 메시지 내의 플레이스홀더 (`$1`, `$2`, ...)를 제공된 값으로 대체하여 반환합니다.
     * 
     * @param code - 메시지 코드입니다.
     * @param value - 메시지 내의 플레이스홀더를 대체할 값들입니다.
     * @returns {string} 해당 메시지 코드에 대한 문자열입니다.
     * 
     * @example
     * const message = Message.get('error_not_found', ['File']);
     * console.log(message);  // "Error: File not found"
     */
    static get(code: string, value: string[]): string;
        
    /**
     * 메시지 코드를 사용하여 Error 객체를 생성하고 예외를 발생시킵니다.
     * 주어진 메시지 코드를 사용하여 저장소에서 문자열 메시지를 조회하고,
     * 메시지 내의 플레이스홀더 (`$1`, `$2`, ...)를 제공된 값으로 대체하여 `Error` 객체를 생성합니다.
     * 
     * @param code - 메시지 코드입니다.
     * @param value - 메시지 내의 플레이스홀더를 대체할 값들입니다.
     * @returns {Error} 생성된 `Error` 객체입니다.
     */
    static error(code: string, value: string[]): Error;

    /**
     * 메시지 코드를 사용하여 console.warn을 발생시킵니다.
     * 주어진 메시지 코드를 사용하여 저장소에서 문자열 메시지를 조회하고,
     * 메시지 내의 플레이스홀더 (`$1`, `$2`, ...)를 제공된 값으로 대체하여 `console.warn`으로 출력합니다.
     * 
     * @param code - 메시지 코드입니다.
     * @param value - 메시지 내의 플레이스홀더를 대체할 값들입니다.
     * 
     * @example
     * Message.warn('deprecated_method', ['saveData']);
     * // Logs: "Warning: The method 'saveData' is deprecated."
     */
    static warn(code: string, value: string[]);
}

export = Message;