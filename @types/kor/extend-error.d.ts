
import T                    = require("./T");

/**
 * 확장 에러 클래스 입니다.
 */
declare class ExtendError {

    /**
     * 확장오류를 생성합니다.  
     * @param msg 메세지(string)
     * @param prop 이전 ExtendError 객체 또는 속성타입 오류메세지
     */
    constructor(msg: string, prop?: T.Iprop | ExtendError);

    /**
     * 메세지 코드를 사용하여 확장오류를 생성합니다.  
     * @param msgCode 메세지코드(RegExp)
     * @param prop 이전 ExtendError 객체 또는 속성타입 오류메세지
     * @param codeValue 메세지코드값의 $1, $2 변환 값
     */
    constructor(msgCode: RegExp, prop?: T.Iprop | ExtendError, codeValue?: string[]);

    /**
     * 속성타입 오류 메세지
     */
    prop: T.Iprop;

    /**
     * 이전에 발생한 message 큐
     */
    queue: string[];

    /**
     * 오류명
     */
    name: string;

    /**
     * 오류 메세지
     */
    message: string;

    /**
     * 오류 스택
     */
    stack?: string | undefined;

    /**
     * this.message 를 출력합니다.
     */
    toString(): string;
}

// export { ExtendError, Iprop };
export = ExtendError;