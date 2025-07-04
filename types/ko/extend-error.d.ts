/**
 * `ExtendError` 클래스는 `Error`을 상속받았습니다.
 * `ExtendError` 클래스는 확장된 오류 정보를 제공하는 사용자 정의 오류 클래스입니다.
 */
declare class ExtendError extends Error {

    /**
     * 사용자 메시지를 사용하여 ExtendError 인스턴스를 생성합니다.  
     *
     * @param msg - 오류 메시지 문자열
     * @param causeOrProp - 기존 ExtendError, Error 객체 또는 속성별 오류 메시지
     *
     * @example
     * throw new ExtendError("Custom error message");
     * throw new ExtendError("Custom error message", error);
     * throw new ExtendError("Custom error message", { style: "required" });
     */
    constructor(msg: string, causeOrProp?: Error | ExtendError | Record<string, string>);

    /**
     * 메시지 코드와 치환값을 사용하여 `ExtendError` 인스턴스를 생성합니다.  
     *
     * @param msgPattern - 정규식 타입의 코드값
     * @param causeOrProp - 기존 ExtendError, Error 객체 또는 속성별 오류 메시지
     * @param placeholders - 메시지 코드 내 `$1`, `$2` 등의 치환값을 담은 문자열 배열
     *
     * @example
     * // 치환값이 없는 메세지의 경우
     * throw new ExtendError(/EL01504/);
     * throw new ExtendError(/EL01504/, error);
     * throw new ExtendError(/EL01504/, { style: "required" });
     * // 치환값이 있는 메세지의 경우
     * throw new ExtendError(/EL01504/, undefined, ['value1', 'value2']);
     * throw new ExtendError(/EL01504/, error, ['value1', 'value2']););
     * throw new ExtendError(/EL01504/, { style: "required" }, ['value1', 'value2']);
     */
    constructor(msgPattern: RegExp, causeOrProp?: Error | ExtendError | Record<string, string>, placeholders?: string[]);
        
    /**
     * 이전에 발생한 메시지를 저장합니다.  
     */
    queue: string[];

    /**
     * 속성 타입과 관련된 오류 메시지입니다.  
     */
    prop: Record<string, string>;    
    /**
     * 오류 메시지를 문자열로 변환합니다.  
     * 
     * @return 오류 메시지 문자열
     */
    toString(): string;
}

export default ExtendError;
export { ExtendError };
