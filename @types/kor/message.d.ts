
// import T                    = require("./T");
/**
 * 메세지와 코드를 관리합니다. (static)
 * @static
 */
declare class Message {
 
    /**
     * 메세지 언어 
     */
    static lang: string | 'eng';
    

    /**
     * 긴 메세지 여부
     */
    static isLong: boolean | false;

    /**
     * 메세지 코드에 대한 문자열를 얻습니다.
     * @param code 메세지 코드
     * @param value msg $1, $2... 매창값
     */
    static get(code: string, value: string[]): string;
    
    /**
     * 메세지 코드에 대한 객체를 얻습니다.
     * @param code 메세지 코드
     */
    static getObject(code: string): PropertyDescriptor;
    
    /**
     * 메세지 코드에 대한 Error 객체를 생성해서 예외룰 발생합니다.
     * @param code 메세지 코드
     * @param value msg $1, $2... 매창값
     */
    static error(code: string, value: string[]): Error;

    /**
     *  메세지 코드에 대한 console.warn 을 발생합니다.
     * @param code 메세지 코드
     * @param value msg $1, $2... 매창값
     */
    static warn(code: string, value: string[]);
}

export = Message;