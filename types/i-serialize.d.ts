/**
 * 직렬화(Serialization) 및 역직렬화(Deserialization)를 위한 인터페이스입니다.
 */
declare interface ISerialize {
    
    /**
     * 객체를 직렬화하여 문자열(JSON 등)로 변환하고 내보냅니다.
     * 
     * @returns 직렬화된 문자열
     */
    output(...args: any[]): string;

    /**
     * 직렬화된 데이터를 로드하여 객체를 복원합니다. 
     */
    load(...args: any[]): void;
}

export default ISerialize;
export { ISerialize };