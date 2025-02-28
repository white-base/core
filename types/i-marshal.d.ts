/**
 * 객체 통제 인터페이스 입니다.
 */
declare interface IMarshal {

    /**
     * 객체의 고유 식별자입니다.
     */
    _guid: string;

    /**
     * 객체의 타입입니다.(생성자)
     */
    _type: Function;

    /**
     * 대상의 객체 리터럴을 반환합니다.
     * 
     * @returns 직렬화된 객체
     */
    getObject(...args: any[]): object;

    /**
     * 객체 리터럴을 인스턴스 객체로 변환하여 설정합니다.
     */
    setObject(...args: any[]): void;
}

export default IMarshal;
export { IMarshal };