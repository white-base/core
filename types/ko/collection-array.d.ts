import type IArrayCollection    from "./i-collection-array.d.ts";
import type BaseCollection      from "./base-collection.d.ts";

/**
 * `ArrayCollection` 클래스는 `BaseCollection`을 상속받으며 `IArrayCollection` 인터페이스를 구현합니다.  
 * 이 클래스는 배열 형태의 컬렉션을 관리하고, 배열 관련 작업을 위한 다양한 메서드를 제공합니다.
 */
type ArrayCollection<T> = {
    
    /**
     * 컬렉션에서 지정된 요소를 제거하는 내부 메서드입니다.
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
     * 요소를 컬렉션에 추가합니다.
     * 
     * @param elem - 추가할 요소
     * @param desc - 요소에 대한 프로퍼티 기술자 객체
     * @returns 추가된 요소의 위치
     */
    add(elem: T, desc?: PropertyDescriptor): number;

    /**
     * 컬렉션을 초기화합니다.  
     * 초기화 시 $elements와 $descriptors 배열을 비웁니다.  
     * 
     * @returns 추가 성공 여부
     */
    clear(): boolean;

    /**
     * 지정한 위치에 요소를 추가합니다.
     * 
     * @param index - 추가할 위치
     * @param elem - 추가할 요소
     * @param desc - 요소에 대한 프로퍼티 기술자 객체
     * @returns 추가 성공 여부
     */
    insertAt(index: number, elem: T, desc?: PropertyDescriptor): boolean;

    /**
     * 모든 요소에 제공된 함수를 실행한 결과를 새로운 배열로 반환합니다.
     * 
     * @param callbackfn - 변환할 콜백 함수, (elem: T, index: number, list: T[]) => U
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns  변환된 요소의 배열
     */
    map<U>(callbackfn: (elem: T, index: number, list: T[]) => U, thisArg?: any): U[];

    /**
     * 제공된 함수의 조건을 만족하는 요소만 포함하는 새로운 배열을 반환합니다.
     * 
     * @param callbackfn - 필터링할 콜백 함수, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체 
     * @returns 필터링된 요소의 배열
     */
    filter(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): T[];

    /**
     * 모든 요소에 제공된 리듀서(reducer) 함수를 실행하여 누적된 결과를 반환합니다.
     * 
     * @param callbackfn - 리듀스할 콜백 함수, (acc: U, elem: T, index: number, list: T[]) => U
     * @param initialValue - 초기값
     * @returns 누적된 최종 결과값
     */
    reduce<U>(callbackfn: (acc: U, elem: T, index: number, list: T[]) => U, initialValue: U): U;

    /**
     * 제공된 함수의 조건과 일치하는 첫 번째 요소를 반환합니다.
     * 
     * @param callbackfn - 검색할 콜백 함수, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 조건을 만족하는 첫 번째 요소, 찾지 못한 경우 `undefined`
     */
    find(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): T | undefined;

    /**
     * 모든 요소에 대해 제공된 함수를 실행합니다.
     * 
     * @param callbackfn - 실행할 콜백 함수, (elem: T, index: number, list: T[]) => void
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     */
    forEach(callbackfn: (elem: T, index: number, list: T[]) => void, thisArg?: any): void;

    /**
     * 최소한 하나의 요소가 제공된 함수의 조건과 일치하는지 확인합니다.
     * 
     * @param callbackfn - 검사할 콜백 함수, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 하나 이상의 요소가 조건을 만족하면 `true`, 그렇지 않으면 `false`
     */
    some(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * 모든 요소가 제공된 함수의 조건을 만족하는지 확인합니다.
     * 
     * @param callbackfn - 검사할 콜백 함수, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns 모든 요소가 조건을 만족하면 `true`, 그렇지 않으면 `false`
     */
    every(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * 제공된 함수의 조건과 일치하는 첫 번째 요소의 인덱스를 반환합니다.
     * 
     * @param callbackfn - 검사할 콜백 함수, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg - 콜백 함수 내부에서 this로 사용할 객체
     * @returns  조건을 만족하는 첫 번째 요소의 인덱스, 찾지 못한 경우 `-1`
     */
    findIndex(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): number;

} & BaseCollection<T> & IArrayCollection<T>;

export interface ArrayCollectionConstructor {
    /**
     * ArrayCollection 클래스의 인스턴스를 생성합니다.
     * 
     * @param owner - 이 컬렉션을 소유하는 객체
     */
    new <T>(owner?: object): ArrayCollection<T>;
}
  
declare const ArrayCollection: ArrayCollectionConstructor;

export default ArrayCollection;
export { ArrayCollection };
