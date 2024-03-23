
interface Iprop {
    [key: string]: string
}

declare class ExtendError {

    /**
     * 확장오류를 생성합니다.  
     * @param msg 메세지코드(RegExp) 또는 메세지(string)
     * @param prop 이전 ExtendError 객체 또는 속성타입 오류메세지
     * @param codeValue 메세지코드값의 $1, $2 변환 값
     */
    constructor(msg: string | RegExp, prop?: Iprop | ExtendError, codeValue?: string[]);

    /**
     * 속성타입 오류 메세지
     */
    prop: Iprop;

    /**
     * 이전에 발생한 message 큐
     */
    queue: string[];
}

export { ExtendError, Iprop };