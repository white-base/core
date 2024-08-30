/**
 * 객체 인터페이스 입니다. (최상위)
 * @interface
 */
declare interface IObject {

    /**
     * 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다.
     * @returns {Array<Function>} 생성자와 상위 생성자의 목록
     */
    getTypes(): Array<Function>;

    /**
     * 객체의 인스턴스 여부를 확인합니다.
     * @param {any} target - 확인할 대상
     * @returns {boolean} 인스턴스 여부
     */
    instanceOf(target: any): boolean;

    /**
     * 객체와 비교합니다.
     * @param {any} target - 비교할 대상
     * @returns {boolean} 객체가 같은지 여부
     */
    equal(target: any): boolean;
}

export = IObject;