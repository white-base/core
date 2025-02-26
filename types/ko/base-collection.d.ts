import EventEmitter from "./event-emitter";
import ICollection from "./i-collection";
import IList from "./i-list";
import MetaObject from "./meta-object";

/**
 * 컬렉션의 최상위 기본 클래스입니다.
 */
declare abstract class BaseCollection<T> extends MetaObject implements ICollection<T>, IList<T> {

    /**
     * 이벤트를 처리하는 객체입니다. 컬렉션의 다양한 이벤트를 등록하고 발생시킬 때 사용됩니다.
     */
    $event: EventEmitter;
    
    /**
     * 컬렉션의 요소들을 저장하는 배열입니다.
     */
    $elements: any[];

    /**
     * 각 컬렉션 요소에 대한 getter 및 setter 메서드를 정의하는 기술자 배열입니다.
     */
    $descriptors: object[];

    /**
     * 컬렉션의 예약어 목록입니다.
     */
    $KEYWORD: string[];

    /**
     * 컬렉션의 소유 객체입니다.
     */
    _owner: object;
    
    /**
     * 컬렉션 요소의 타입 제약조건을 정의합니다.
     */
    _elemTypes: any[];

    /**
     * 컬렉션의 요소 목록을 저장하는 배열입니다. 이 배열은 컬렉션의 실제 데이터를 포함합니다.
     */
    _list: T[];

    /**
     * 컬렉션 요소 개수
     */
    get count(): number;

    /**
     * 컬렉션 요소 개수 (길이)
     */
    get length(): number;

    /**
     * 요소를 추가하기 전에 호출되는 이벤트 핸들러
     * 
     * @param elem 추가될 요소
     * @param index 추가될 인덱스
     * @param collection 현재 객체의 참조
     * @returns false일 경우 추가가 중단됨, true 또는 undefined(void)일 경우 계속 진행
     */
    onAdd: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * 요소가 추가된 후 호출되는 이벤트 핸들러
     * 
     * @param elem 추가된 요소
     * @param index 추가된 인덱스
     * @param collection 현재 객체의 참조
     */
    onAdded: (elem: T, index: number, collection: object) => void;

    /**
     * 요소를 제거하기 전에 호출되는 이벤트 핸들러
     * 
     * @param elem 제거될 요소
     * @param index 제거될 인덱스
     * @param collection 현재 객체의 참조
     * @returns false일 경우 제거가 중단됨, true 또는 undefined(void)일 경우 계속 진행
     */
    onRemove: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * 요소가 제거된 후 호출되는 이벤트 핸들러
     * 
     * @param elem 제거된 요소
     * @param index 제거된 인덱스
     * @param collection 현재 객체의 참조
     */
    onRemoved: (elem: T, index: number, collection: object) => void;

    /**
     * 모든 요소를 삭제하기 전에 호출되는 이벤트 핸들러
     * 
     * @param collection 현재 객체의 참조
     * @returns false일 경우 삭제가 중단됨, true 또는 undefined(void)일 경우 계속 진행
     */
    onClear: (collection: object) => boolean | void;

    /**
     * 모든 요소가 삭제된 후 호출되는 이벤트 핸들러
     * 
     * @param collection 현재 객체의 참조
     */
    onCleard: (collection: object) => void;

    /**
     * 요소가 변경되기 전에 호출되는 이벤트 핸들러
     * 
     * @param nextValue 변경될 새로운 값
     * @param prevValue 기존 값
     * @param index 변경될 요소의 인덱스
     * @param collection 현재 객체의 참조
     * @returns false일 경우 변경이 중단됨, true 또는 undefined(void)일 경우 계속 진행
     */
    onChanging: (nextValue: T, prevValue: T, index: number, collection: object) => boolean | void;

    /**
     * 요소가 변경된 후 호출되는 이벤트 핸들러
     * 
     * @param nextValue 변경된 새로운 값
     * @param prevValue 기존 값
     * @param index 변경된 요소의 인덱스
     * @param collection 현재 객체의 참조
     */
    onChanged: (nextValue: T, prevValue: T, index: number, collection: object) => void;

    /**
     * 컬렉션을 생성합니다.
     * 
     * @param owner - 이 컬렉션을 소유하는 객체
     */
    constructor(owner?: any);

    /**
     * 요소를 추가하기 전에 호출되는 내부 이벤트 핸들러
     * 
     * @param elem 추가될 요소
     * @param index 추가될 인덱스
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onAdd(elem: T, index: number): boolean | void;

    /**
     * 요소가 추가된 후 호출되는 내부 이벤트 핸들러
     * 
     * @param elem 추가된 요소
     * @param index 추가된 인덱스
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onAdded(elem: T, index: number): boolean | void;

    /**
     * 요소를 제거하기 전에 호출되는 내부 이벤트 핸들러
     * 
     * @param elem 제거될 요소
     * @param index 제거될 인덱스
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onRemove(elem: T, index: number): boolean | void;

    /**
     * 요소가 제거된 후 호출되는 내부 이벤트 핸들러
     * 
     * @param elem 제거된 요소
     * @param index 제거된 인덱스
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onRemoved(elem: T, index: number): boolean | void;

    /**
     * 모든 요소를 삭제하기 전에 호출되는 내부 이벤트 핸들러
     * 
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onClear(): boolean | void;

    /**
     * 모든 요소가 삭제된 후 호출되는 내부 이벤트 핸들러
     * 
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onCleard(): boolean | void;

    /**
     * 요소가 변경되기 전에 호출되는 내부 이벤트 핸들러
     * 
     * @param nextValue 변경될 새로운 값
     * @param prevValue 기존 값
     * @param index 변경될 요소의 인덱스
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onChanging(nextValue: T, prevValue: T, index: number): boolean | void;

    /**
     * 요소가 변경된 후 호출되는 내부 이벤트 핸들러
     * 
     * @param nextValue 변경된 새로운 값
     * @param prevValue 기존 값
     * @param index 변경된 요소의 인덱스
     * @returns true: 이벤트가 존재하고 실행됨, false: 이벤트가 없거나 실행되지 않음, undefined: 이벤트 처리 실패
     */
    _onChanged(nextValue: T, prevValue: T, index: number): boolean | void;

    /**
     * 특정 인덱스에 해당하는 속성의 디스크립터(설명자)를 설정하는 내부 메서드
     * 
     * @param index 속성을 지정할 인덱스
     * @param isEnumerable 속성이 열거 가능(enumerable)한지 여부
     * @returns 반환값 없음 (void)
     */
    _getPropDescriptor(index: number, isEnumerable: boolean): void;

    /**
     * 요소를 컬렉션에서 제거합니다.
     */
    abstract _remove(...args: any[]): boolean;

    /**
     * 컬렉션 객체를 직렬화(guid 타입) 객체로 반환합니다.  
     * 
     * @param mode - 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
     * @param context - 현재 객체를 포함하는 상위 객체 목록 (선택 사항)
     * @returns 직렬화된 객체
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
     * 
     * @param serializedObj - 직렬화 객체
     * @param originalObj - 원본 객체
     */
    setObject(serializedObj: object, originalObj?: object): void;

    /**
     * 요소를 컬렉션에서 제거합니다.
     * @param elem - 제거할 요소
     */
    remove(elem: T): boolean;

    /**
     * 지정된 위치의 요소를 제거합니다.
     * @param index - 제거할 위치
     * @returns 처리 결과
     */
    removeAt(index: number): boolean;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param elem - 확인할 요소
     * @returns 존재 여부
     */
    contains(elem: T): boolean;

    /**
     * 요소의 인덱스를 가져옵니다.
     * @param elem - 요소
     * @returns 요소의 인덱스 (없으면 -1)
     */
    indexOf(elem: T): number;

    /**
     * 요소를 컬렉션에 추가합니다.
     */
    abstract add(...args: any[]): void;

    /**
     * 컬렉션을 초기화합니다.
     */
    abstract clear(): void;
}

export default BaseCollection;
export { BaseCollection };