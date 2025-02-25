/**
 * 직렬화 인터페이스 입니다.
 * @interface 
 */
declare interface ISerialize {
    /**
     * 내보내기(출력)를 합니다.
     * @param {...args} args - 직렬화에 필요한 인수들
     * @returns {string} 직렬화된 문자열
     */
    output(...args: any[]): string;

    /**
     * 가져오기(로드) 합니다.
     * @param {...any} args - 로드에 필요한 인수들
     */
    load(...args: any[]): void;
}

export default ISerialize;
export { ISerialize };