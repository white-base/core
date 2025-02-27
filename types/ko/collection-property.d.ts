import IPropertyCollection from "./i-collection-property";
import BaseCollection from "./base-collection";

/**
 * `PropertyCollection` 클래스는 `BaseCollection`을 상속하며 `IPropertyCollection` 인터페이스를 구현합니다.
 */
declare class PropertyCollection<T> extends BaseCollection<T> implements IPropertyCollection<T> {
 
    /**
     * 컬렉션 요소의 키 값들을 배열로 저장합니다.
     */
    get $keys(): string[];

    /**
     * `PropertyCollection` 클래스의 인스턴스를 생성합니다.
     * 
     * @param owner - 이 컬렉션을 소유하는 객체입니다.
     */
    constructor(owner?: any);

    /**
     * 요소를 컬렉션에서 제거합니다.
     * 
     * @param index - 제거할 요소의 인덱스
     * @returns 성공 여부
     */
    _remove(index: number): boolean;

    /**
     * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 가져옵니다.
     * 
     * @param mode - 가져오기 옵션  
     * opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * opt=2 : 비침조 구조(_guid:No,  $ref:No)  
     * @param context - 현재 객체를 소유하는 상위 객체들
     * @returns 직렬화된 객체
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * 
     * @param serializedObj - 직렬화 객체
     * @param originalObj - 원본 객체
     */
    setObject(serializedObj: object, originalObj?: object): void;

    /**
     * 프로퍼티 컬렉션에 요소를 추가합니다.
     * 
     * @param key - key 요소의 키입니다.
     * @param elem - 추가할 요소입니다.
     * @param desc - 요소에 대한 프로퍼티 기술자 객체입니다. 선택값입니다.
     * @returns 추가된 요소의 인덱스입니다.
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * 컬렉션을 초기화합니다.
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
     * 컬렉션의 키 존재 여부를 확인합니다.
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
     * @returns 리턴
     */
    map<U>(callbackfn: (elem: T, index: number, key: string, list: T[]) => U, thisArg?: any): U[];

    /**
     * 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링 합니다
     * 
     * @param callbackfn - 필터링할 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체 
     * @returns 리턴
     */
    filter(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): T[];

    /**
     * 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.
     * 
     * @param callbackfn - 콜백 함수, (acc: U, elem: T, index: number, key: string, list: T[]) => U
     * @param initialValue - 초기값
     * @returns 반환값
     */
    reduce<U>(callbackfn: (acc: U, elem: T, index: number, key: string, list: T[]) => U, initialValue: U): U;

    /**
     * 제공된 테스트 함수를 만족하는 첫 번째 요소를 반환합니다
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
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
     */
    some(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트합니다. 
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 통과 여부
     */
    every(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 
     * 
     * @param callbackfn - 콜백 함수, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    findIndex(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): number;
}

export default PropertyCollection;
export { PropertyCollection };