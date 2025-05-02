/**
 * 객체 통제 인터페이스 입니다.
 */
declare interface IMarshal {

    _guid: string;

    _type: Function;

    /**
     * 객체 리터럴을 반환합니다.
     * 
     * @returns 직렬화된 객체
     */
    getObject(...args: any[]): object;

    /**
     * 객체 리터럴을 인스턴스로 변환하여 설정합니다.
     * 
     * @param args 변환에 필요한 인수들
     */
    setObject(...args: any[]): void;
}

export default IMarshal;
export { IMarshal };