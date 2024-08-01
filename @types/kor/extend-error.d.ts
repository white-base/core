/**
 * 확장 에러 클래스입니다.
 * 이 클래스는 확장된 오류 정보를 제공합니다.
 */
declare class ExtendError {

    /**
     * ExtendError 클래스의 인스턴스를 생성합니다.
     * @param msg 오류 메시지 (string 타입)
     * @param prop 이전 ExtendError 객체 또는 속성 타입 오류 메시지 (옵션)
     */
    constructor(msg: string, prop?: Iprop | ExtendError);

    /**
     * 메시지 코드를 사용하여 ExtendError 클래스의 인스턴스를 생성합니다.
     * @param msgCode 오류 메시지 코드 (RegExp 타입)
     * @param prop 이전 ExtendError 객체 또는 속성 타입 오류 메시지 (옵션)
     * @param codeValue 메시지 코드 값의 $1, $2 변환 값 (옵션)
     */
    constructor(msgCode: RegExp, prop?: Iprop | ExtendError, codeValue?: string[]);

    /**
     * 속성 타입 오류 메시지입니다.
     * @type {Iprop}
     */
    prop: Iprop;

    /**
     * 이전에 발생한 메시지 큐입니다.
     * @type {string[]}
     */
    queue: string[];

    /**
     * 오류명입니다.
     * @type {string}
     */
    name: string;

    /**
     * 오류 메시지입니다.
     * @type {string}
     */
    message: string;

    /**
     * 오류 메시지를 출력합니다.
     * @returns {string} this.message를 반환합니다.
     */
    stack?: string | undefined;

    /**
     * this.message 를 출력합니다.
     */
    toString(): string;
}

// export { ExtendError, Iprop };
export = ExtendError;