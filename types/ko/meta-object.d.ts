import IObject from "./i-object";
import IMarshal from "./i-marshal";

/**
 * 메타 최상위 객체를 생성합니다.
 */
declare class MetaObject implements IObject, IMarshal {
    /**
     * 고유 식별자
     * 
     * @example
     * var obj = MetaObject();
     * console.log(obj._guid);      // '5337877c-49d6-9add-f35a-7bd31d510d4f' unique key code
     */
    readonly _guid: string;

    /**
     * 현재 객체의 생성자
     * 
     * @example
     * var obj = new MetaObject();
     * obj._type === MetaObject;        // true
     * console.log(typeof obj._type);   // 'function'
     */
    readonly _type: Function;

    /**
     * 네임스페이스
     */
    readonly _ns: string;

    /**
     * MetaObject 클래스의 인스턴스를 생성합니다.
     */
    constructor();

    /**
     * 객체와 비교합니다.
     * 
     * @param target - 비교할 대상
     * @returns 비교 결과
     */
    equal(target: object): boolean;

    /**
     * 객체 타입을 가져옵니다.
     * 
     * @returns 타입 배열
     */
    getTypes(): Function[];

    /**
     * 특정 타입의 인스턴스인지 확인합니다. (_UNION 포함)
     * 
     * @param target - 함수 또는 타입명
     * @returns 인스턴스 여부
     * 
     * @example
     * var obj = new MetaObject();
     * obj.instanceOf('MetaObject');    // true
     * obj.instanceOf('Object');        // true
     * obj.instanceOf(MetaObject);      // true
     * obj.instanceOf(Object);          // true
     * obj.instanceOf(String);          // false
     * 
     * var elem = new MetaElement('e1');// Inherited MetaObject 
     * obj.instanceOf('MetaElement');   // true
     * obj.instanceOf('MetaObject');    // true
     * obj.instanceOf('Object');        // true
     * obj.instanceOf(MetaElement);     // true
     * obj.instanceOf(MetaObject);      // true
     * obj.instanceOf(Object);          // true
     * obj.instanceOf(String);          // false
     */
    instanceOf(target: Function | string): boolean;

    /**
     * 직렬화된 객체를 가져옵니다.
     * 
     * @param mode - 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
     * @returns 직렬화된 객체
    */
   getObject(mode?: number): object;
   
    /**
     * 직렬화된 객체를 설정합니다.
     * 
     * @param serializedObj - 직렬화 할 guid 타입의 객체
     * @param originalObj - 현재 객체를 설정하는 원본 객체
     */
    setObject(serializedObj: object, originalObj?: object): void;
}

export default MetaObject;
export { MetaObject };