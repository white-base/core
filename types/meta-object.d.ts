import IObject from "./i-object";
import IMarshal from "./i-marshal";

/**
 * MetaObject 클래스는 IObject 및 IMarshal 인터페이스를 구현하여 메타 데이터를 처리하는 최상위 객체입니다.
 */
declare class MetaObject implements IObject, IMarshal {
    
    /**
     * 객체의 고유 식별자 속성입니다.
     * 
     * @example
     * var obj = MetaObject();
     * console.log(obj._guid);      // Out: '5337877c-49d6-9add-f35a-7bd31d510d4f'
     */
    readonly _guid: string;

    /**
     * 객체의 생성 함수를 참조합니다.
     * 
     * @example
     * var obj = new MetaObject();
     * obj._type === MetaObject;        // true
     * console.log(typeof obj._type);   // [Class MetaObject]
     */
    readonly _type: Function;

    /**
     * 네임스페이스를 나타냅니다.  
     * `_type.NS`: `_NS`의 정적(static) 정의가 없으면 부모의 네임스페이스를 기본값으로 사용합니다.
     */
    readonly _ns: string;

    /**
     * MetaObject 클래스의 인스턴스를 생성합니다.
     */
    constructor();

    /**
     * 현재 객체와 지정된 객체가 동일한지 비교합니다.  
     *  `_guid` 속성을 제외하고 객체가 동일한지 비교합니다.  
     * 
     * @param target - 비교할 대상
     * @returns 비교 결과
     */
    equal(target: object): boolean;

    /**
     * 현재 객체의 생성자와 프로토타입 체인의 모든 생성자를 배열로 반환합니다.  
     * 
     * @returns 생성자 함수의 배열 (가장 먼저 정의된 생성자부터 순차적으로 포함)
     * 
     * @example
     * const obj = new MetaObject();
     * const types = obj.getTypes();
     * console.log(types); // Out: [MetaObject, Object]
     */
    getTypes(): Function[];

    /**
     * 객체가 특정 클래스의 인스턴스인지 확인합니다.  
     * 정의된 인터페이스 타입을 함께 검사할 수 있습니다. (_UNION 포함)  
     * 
     * @param target - 클래스 생성자 함수 또는 클래스 이름(문자열)
     * @returns 지정된 클래스의 인스턴스 여부
     * 
     * @example
     * var obj = new MetaObject();
     * obj.instanceOf('MetaObject');    // true
     * obj.instanceOf('Object');        // true
     * obj.instanceOf(MetaObject);      // true
     * obj.instanceOf(Object);          // true
     * obj.instanceOf(String);          // false
     * 
     * // Interface Definition
     * class IClassA {}
     * class IClassB {}
     * 
     * // class definition
     * class MyClass extends MetaObject {} 
     * 
     * // Specifying Interface Implementation
     * MyClass._UNION = [IClassA, IClassB]; 
     * 
     * var obj = new MyClass();
     * 
     * console.log(obj.instanceOf(MyClass)); // Out: true
     * console.log(obj.instanceOf(IClassA)); // Out: true
     * console.log(obj.instanceOf(IClassB)); // Out: true
     */
    instanceOf(target: Function | string): boolean;

    /**
     * 객체를 GUID 타입의 객체 리터럴로 반환합니다.
     * 
     * @param mode - 가져오기 모드  
     * mode=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * mode=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * mode=2 : 비침조 구조(_guid:No,  $ref:No)   
     * @param context - 현재 객체를 포함(소유)하는 상위 객체
     * @returns GUID 타입의 객체 리터럴
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * GUID 타입의 객체 리터럴을 인스턴스 객체로 변환하여 설정합니다.
     * 
     * @param guidObj - 설정할 GUID 타입의 객체 리터럴
     * @param guidRootObj - 변환 과정에서 참조되는 초기 GUID 리터럴 객체  
     */
    setObject(guidObj: object, guidRootObj?: object): void;
}

export default MetaObject;
export { MetaObject };