declare class Message {
 
    static lang: string | 'eng';
    static getObject(code: string): object;
    
}

export = Message;