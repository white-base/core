declare interface IObject {
    
    /**
     * 객체 타입들을 얻습니다.
     * @returns 타입 배열
     */
    getTypes(): Function[];

    /**
     * 객체의 인스턴스 여부를 확인합니다.
     * @param {any} target - 확인할 대상
     * @returns 인스턴스 여부
     */
    instanceOf(target: Function | string): boolean;

    /**
     * 객체와 비교합니다.
     * @param {any} target - 비교할 대상
     * @returns 비교 결과
     */
    equal(target: any): boolean;
}

export default IObject;
export { IObject };