/**
 * 직렬화 인터페이스 입니다.
 * @interface 
 */
declare interface ISerialize {
    /**
     * 내보내기(출력)를 합니다.
     * 
     * @returns 직렬화된 문자열
     */
    output(...args: any[]): string;

    /**
     * 가져오기(로드) 합니다.
     */
    load(...args: any[]): void;
}

export default ISerialize;
export { ISerialize };