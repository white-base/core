/**
 * 객체 인터페이스 입니다.
 */
declare interface IObject {
    
    /**
     * 객체의 타입 목록을 반환합니다.  
     * 
     * @returns 객체의 타입 배열
     */
    getTypes(): Function[];

    /**
     * 객체가 특정 클래스 또는 인터페이스의 인스턴스인지 확인합니다.
     * 
     * @param target 생성자명 문자열 또는 생성자
     * @returns 인스턴스 여부, 인스턴스이면 `true`, 그렇지 않으면 `false`
     */
    instanceOf(target: Function | string): boolean;

    /**
     * 객체가 주어진 대상과 동일한지 비교합니다.
     * 
     * @param target - 비교할 대상
     * @returns 두 객체가 동일하면 `true`, 그렇지 않으면 `false`
     */
    equal(target: any): boolean;
}

export default IObject;
export { IObject };