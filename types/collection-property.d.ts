import IPropertyCollection from "./i-collection-property";
import BaseCollection from "./base-collection";

/**
 * `PropertyCollection` 클래스는 `BaseCollection`을 상속하며 `IPropertyCollection` 인터페이스를 구현합니다.  
 * 이 클래스는 속성 기반 컬렉션을 관리하고, 각 요소에 대해 키와 값을 사용하여 접근할 수 있는 기능을 제공합니다.
 */
declare class PropertyCollection<T> extends BaseCollection<T> implements IPropertyCollection<T> {
 
    /**
     * 컬렉션 요소의 키 값들을 배열로 저장합니다.
     */
    get $keys(): string[];

    /**
     * `PropertyCollection` 클래스의 인스턴스를 생성합니다.
     * 
     * @param owner - 이 컬렉션을 소유하는 객체
     */
    constructor(owner?: object);

    /**
     * 요소를 컬렉션에서 제거합니다.
     * 
     * @param index - 제거할 요소의 인덱스
     * @returns 성공 여부
     */
    _remove(index: number): boolean;

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
    
    /**
     * 프로퍼티 컬렉션에 요소를 추가합니다.
     * 
     * @param key - 요소의 키
     * @param elem - 추가할 요소
     * @param desc - 요소에 대한 프로퍼티 기술자 객체
     * @returns 추가된 요소의 인덱스
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * 컬렉션을 초기화합니다.  
     * 이 메서드는 `$elements`, `$descriptors`, `$keys` 배열을 초기화합니다.
     */
    clear(): void;

    /**
     * 키를 기반으로 인덱스를 조회합니다.
     * 
     * @param key - 조회할 키
     * @returns 없을시 -1
     */
    keyToIndex(key: string): number;

    /**
     * 인덱스 값을 기반으로 키를 조회합니다.
     * 
     * @param index - 조회할 인덱스
     * @returns 해당 인덱스의 키
     */
    indexToKey(index: number): string;

    /**
     * 지정된 키가 존재하는지 확인합니다.
     * 
     * @param key - 키 값
     * @returns 존재 여부
     */
    exist(key: string): boolean;

    /**
     * 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.
     * 
     * @param callbackfn - 조회할 콜백 함수, (elem: T, index: number, key: string, list: T[]) => U
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 변환된 요소로 이루어진 새로운 배열
     */
    map<U>(callbackfn: (elem: T, index: number, key: string, list: T[]) => U, thisArg?: any): U[];

    /**
     * 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다
     * 
     * @param callbackfn - 필터링할 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체 
     * @returns 필터링된 요소의 배열
     */
    filter(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): T[];

    /**
     * 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
     * 
     * @param callbackfn - 콜백 함수, (acc: U, elem: T, index: number, key: string, list: T[]) => U
     * @param initialValue - 초기값
     * @returns 필터링된 요소의 배열
     */
    reduce<U>(callbackfn: (acc: U, elem: T, index: number, key: string, list: T[]) => U, initialValue: U): U;

    /**
     * 제공된 테스트 함수를 만족하는 첫 번째 요소를 반환합니다
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 조건을 만족하는 첫 번째 요소, 찾지 못한 경우 `undefined`
     */
    find(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): T | undefined;

    /**
     * 각 요소에 대해 제공된 함수를 한 번씩 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => void
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    forEach(callbackfn: (elem: T, index: number, key: string, list: T[]) => void, thisArg?: any): void;

    /**
     * 어떤 요소라도 주어진 판별 함수를 적어도 하나라도 통과하는지 테스트합니다. 
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 하나 이상의 요소가 조건을 만족하면 `true`, 그렇지 않으면 `false`
     */
    some(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트합니다. 
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 모든 요소가 조건을 만족하면 `true`, 그렇지 않으면 `false`
     */
    every(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns  조건을 만족하는 첫 번째 요소의 인덱스, 찾지 못한 경우 `-1`
     */
    findIndex(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): number;
}

export default PropertyCollection;
export { PropertyCollection };