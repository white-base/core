/**
 * 메세지 클레스 입니다.
 * @static
 */
declare class Message {
 
    static lang: string | 'eng';
    static getObject(code: string): object;
    
}

export = Message;