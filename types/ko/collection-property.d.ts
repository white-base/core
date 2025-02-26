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
     * @param owner 이 컬렉션을 소유하는 객체입니다.
     */
    constructor(owner?: any);

    /**
     * 요소를 컬렉션에서 제거합니다.
     * @param pos 제거할 요소의 인덱스
     * @returns 성공 여부
     */
    _remove(pos: number): boolean;

    /**
     * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 가져옵니다.
     * @param vOpt 옵션 값
     * @param owned 소유 객체
     * @returns 직렬화된 객체
     */
    getObject(vOpt?: number, owned?: object | object[]): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * @param oGuid 직렬화 객체
     * @param origin 원본 객체
     */
    setObject(oGuid: object, origin?: object): void;

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
     * @param key 조회할 키
     */
    keyToIndex(key: string): number;

    /**
     * 인덱스 값을 기반으로 키를 조회합니다.
     * @param index 조회할 인덱스
     * @returns 해당 인덱스의 키
     */
    indexToKey(index: number): string;

    /**
     * 컬렉션의 키 존재 여부를 확인합니다.
     * @param key 키 값
     * @returns 존재 여부
     */
    exist(key: string): boolean;

    /**
     * 컬렉션의 요소를 키를 기반으로 조회합니다.
     * @param callbackfn 조회할 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    map(callbackfn: (value: T, idx: number, key: string, list: T[]) => any, thisArg?: any): T[];

    /**
     * 컬렉션의 요소를 필터링합니다.
     * @param callbackfn 필터링할 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체 
     */
    filter(callbackfn: (value: T, idx: number, key: string, list: T[]) => any, thisArg?: any): T[];

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param initialValue 초기값
     */
    reduce(callbackfn: (prev: any, curr: T, idx: number, key: string, list: T[]) => any, initialValue: any): any;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    find(callbackfn: (value: T, idx: number, key: string, list: T[]) => any, thisArg?: any): T;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    forEach(callbackfn: (value: T, idx: number, key: string, list: T[]) => void, thisArg?: any): void;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    some(callbackfn: (value: T, idx: number, key: string, list: T[]) => any, thisArg?: any): boolean;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    every(callbackfn: (value: T, idx: number, key: string, list: T[]) => any, thisArg?: any): boolean;

    /**
     * 컬렉션의 요소를 순회하며 콜백 함수를 실행합니다.
     * @param callbackfn 콜백 함수
     * @param thisArg 콜백 함수 내부에서 this로 사용할 객체
     */
    findIndex(callbackfn: (value: T, idx: number, key: string, list: T[]) => any, thisArg?: any): number;
}

export default PropertyCollection;
export { PropertyCollection };