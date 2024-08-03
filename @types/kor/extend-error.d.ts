/**
 * `ExtendError` 클래스는 확장된 오류 정보를 제공하는 사용자 정의 오류 클래스입니다.
 * 이 클래스는 기본 JavaScript `Error` 클래스를 확장하여 추가적인 속성 및 기능을 제공합니다.
 */
declare class ExtendError {

    /**
     * `ExtendError` 클래스의 인스턴스를 생성합니다.
     * 
     * @param {string} msg - 오류 메시지입니다.
     * @param {Iprop | ExtendError} [prop] - (선택적) 이전 `ExtendError` 객체 또는 속성 타입 오류 메시지입니다.
     * 
     * @example
     * const error = new ExtendError('An error occurred', { key: 'value' });
     */
    constructor(msg: string, prop?: Iprop | ExtendError);

    /**
     * 메시지 코드를 사용하여 `ExtendError` 클래스의 인스턴스를 생성합니다.
     * 
     * @param {RegExp} msgCode - 오류 메시지 코드입니다.
     * @param {Iprop | ExtendError} [prop] - (선택적) 이전 `ExtendError` 객체 또는 속성 타입 오류 메시지입니다.
     * @param {string[]} [codeValue] - (선택적) 메시지 코드 값($1, $2..)의 변환 값들입니다.
     * 
     * @example
     * const error = new ExtendError(/ES010/, { key: 'value' }, ['404']);
     */
    constructor(msgCode: RegExp, prop?: Iprop | ExtendError, codeValue?: string[]);

    /**
     * 속성 타입 오류 메시지입니다.
     */
    prop: Iprop;

    /**
     * 이전에 발생한 메시지 큐입니다.
     */
    queue: string[];

    /**
     * 오류명입니다.
     */
    name: string;

    /**
     * 오류 메시지입니다.
     */
    message: string;

    /**
     * 오류 메시지를 출력합니다.
     * @returns {string} this.message를 반환합니다.
     */
    stack?: string | undefined;

    /**
     * 오류 메시지를 출력합니다.
     * 
     * @returns {string} `this.message`를 반환합니다.
     * 
     * @example
     * const error = new ExtendError('An error occurred');
     * console.log(error.toString());  // "An error occurred"
     */
    toString(): string;
}

export = ExtendError;