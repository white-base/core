interface ISerialize {
    /**
     * 내보내기(출력)를 합니다.
     * @returns 직렬화된 데이터
     */
    output(): any;

    /**
     * 가져오기(로드) 합니다.
     * @param data 직렬화된 데이터
     */
    load(data: any): void;
}

export default ISerialize;
export { ISerialize };