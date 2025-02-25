import IArrayCollection from "./i-collection-array";
import BaseCollection from "./base-collection";

/**
 * `ArrayCollection` 클래스는 `BaseCollection`을 상속받으며 `IArrayCollection` 인터페이스를 구현합니다.
 */
declare class ArrayCollection<T> extends BaseCollection<T> implements IArrayCollection<T> {
    
    /**
     * ArrayCollection 클래스의 인스턴스를 생성합니다.
     * @param p_owner 이 컬렉션을 소유하는 객체입니다.
     */
    constructor(p_owner?: any);

    /**
     * 요소를 컬렉션에서 제거합니다.
     * @param p_pos 제거할 요소의 인덱스
     * @returns 성공 여부
     */
    _remove(p_pos: number): boolean;

    /**
     * 요소를 직렬화된 객체로 가져옵니다.
     * @param p_vOpt 옵션 값
     * @param p_origin 원본 객체
     * @returns 직렬화된 객체
     */
    getObject(p_vOpt?: number, p_origin?: object | object[]): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * @param p_oGuid 직렬화 객체
     * @param p_origin 원본 객체
     */
    setObject(p_oGuid: object, p_origin?: object): void;

    /**
     * 요소를 컬렉션에 추가합니다.
     * @param p_elem 추가할 요소
     * @param p_desc 요소에 대한 프로퍼티 기술자 객체
     * @returns 추가된 인덱스
     */
    add(p_elem: T, p_desc?: PropertyDescriptor): number;

    /**
     * 컬렉션을 초기화합니다.
     */
    clear(): void;

    /**
     * 지정한 위치에 요소를 추가합니다.
     * @param p_pos 추가할 위치
     * @param p_elem 추가할 요소
     * @param p_desc 요소에 대한 프로퍼티 기술자 객체
     * @returns 성공 여부
     */
    insertAt(p_pos: number, p_elem: T, p_desc?: PropertyDescriptor): boolean;

    /**
     * 컬렉션의 요소를 키를 기반으로 조회합니다.
     * @param callbackfn 조회할 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    map(callbackfn: (value: T, idx: number, list: T[]) => any, thisArg?: any): T[];

    /**
     * 컬렉션의 요소를 필터링합니다.
     * @param callbackfn 필터링할 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체 
     */
    filter(callbackfn: (value: T, idx: number, list: T[]) => any, thisArg?: any): T[];

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param initialValue 초기값
     */
    reduce(callbackfn: (prev: any, curr: T, idx: number, list: T[]) => any, initialValue: any): any;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    find(callbackfn: (value: T, idx: number, list: T[]) => any, thisArg?: any): T;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    forEach(callbackfn: (value: T, idx: number, list: T[]) => void, thisArg?: any): void;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    some(callbackfn: (value: T, idx: number, list: T[]) => any, thisArg?: any): boolean;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    every(callbackfn: (value: T, idx: number, list: T[]) => any, thisArg?: any): boolean;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    findIndex(callbackfn: (value: T, idx: number, list: T[]) => any, thisArg?: any): number;
}

export default ArrayCollection;
export { ArrayCollection };
