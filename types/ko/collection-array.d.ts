import IArrayCollection from "./i-collection-array";
import BaseCollection from "./base-collection";

/**
 * `ArrayCollection` 클래스는 `BaseCollection`을 상속받으며 `IArrayCollection` 인터페이스를 구현합니다.
 */
declare class ArrayCollection<T> extends BaseCollection<T> implements IArrayCollection<T> {
    
    /**
     * ArrayCollection 클래스의 인스턴스를 생성합니다.
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
     * 요소를 직렬화된 객체로 가져옵니다.
     * 
     * @param mode - 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
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
     * 요소를 컬렉션에 추가합니다.
     * 
     * @param elem - 추가할 요소
     * @param desc - 요소에 대한 프로퍼티 기술자 객체
     * @returns 추가된 인덱스
     */
    add(elem: T, desc?: PropertyDescriptor): number;

    /**
     * 컬렉션을 초기화합니다.
     */
    clear(): void;

    /**
     * 지정한 위치에 요소를 추가합니다.
     * 
     * @param pos - 추가할 위치
     * @param elem - 추가할 요소
     * @param desc - 요소에 대한 프로퍼티 기술자 객체
     * @returns 성공 여부
     */
    insertAt(pos: number, elem: T, desc?: PropertyDescriptor): boolean;

    /**
     * 컬렉션의 요소를 키를 기반으로 조회합니다.
     * 
     * @param callbackfn - 조회할 콜백 함수, (elem, index, list) => any
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    map(callbackfn: (elem: T, index: number, list: T[]) => any, thisArg?: any): T[];

    /**
     * 컬렉션의 요소를 필터링합니다.
     * 
     * @param callbackfn - 필터링할 콜백 함수, (elem, index, list) => any
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체 
     */
    filter(callbackfn: (elem: T, index: number, list: T[]) => any, thisArg?: any): T[];

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem, index, list) => any
     * @param initialValue - 초기값
     */
    reduce<U>(callbackfn: (acc: U, elem: T, index: number, list: T[]) => U, initialValue: U): U;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem, index, list) => any
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    find(callbackfn: (elem: T, index: number, list: T[]) => any, thisArg?: any): T;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem, index, list) => void
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    forEach(callbackfn: (elem: T, index: number, list: T[]) => void, thisArg?: any): void;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem, index, list) => any
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    some(callbackfn: (elem: T, index: number, list: T[]) => any, thisArg?: any): boolean;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem, index, list) => any
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    every(callbackfn: (elem: T, index: number, list: T[]) => any, thisArg?: any): boolean;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * 
     * @param callbackfn - 콜백 함수, (elem, index, list) => any
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    findIndex(callbackfn: (elem: T, index: number, list: T[]) => any, thisArg?: any): number;
}

export default ArrayCollection;
export { ArrayCollection };
