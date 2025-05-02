import type EventEmitter    from "./event-emitter.d.ts";
import type ICollection     from "./i-collection.d.ts";
import type IList           from "./i-list.d.ts";
import type { MetaObjectType } from "./T.d.ts";

/**
 * `BaseCollection` 클래스는 `MetaObject`을 상속하며 `ICollection`, `IList` 인터페이스를 구현합니다.  
 * 이 클래스는 모든 컬렉션의 최상위 클래스 역할을 합니다.  
 */
type BaseCollection<T> = { 
    
    /**
     * 컬렉션에서 예약어로 사용되는 문자열 목록입니다.
     */
    readonly $KEYWORD: string[];

    /**
     * 이벤트를 처리하는 객체입니다. 컬렉션의 다양한 이벤트를 등록하고 발생시킬 때 사용됩니다.
     */
    $event: EventEmitter;
    
    /**
     * 컬렉션의 요소들을 저장하는 배열입니다.
     */
    $elements: any[];

    /**
     * 각 컬렉션 요소의 getter 및 setter 메서드를 정의하는 디스크립터 배열입니다. 
     */
    $descriptors: object[];

    /**
     * 컬렉션의 소유 객체입니다.
     */
    _owner: object;
    
    /**
     * 컬렉션 요소의 타입 제약조건을 정의합니다.
     */
    _elemTypes: any[];

    /**
     * 컬렉션의 요소 목록을 저장하는 배열입니다.  
     */
    _list: T[];

    /**
     * 컬렉션의 요소 개수를 반환합니다.
     */
    get count(): number;

    /**
     * 컬렉션의 요소 개수를 반환합니다.
     */
    get length(): number;

    /**
     * 컬렉션에 요소를 추가하기 전에 호출되는 이벤트 핸들러입니다.
     * 
     * @param elem 추가할 요소
     * @param index 추가할 요소의 인덱스
     * @param collection 현재 컬렉션 객체
     * @returns `false`를 반환하면 변경이 중단되고, 반환값이 없거나 `true`이면 변경이 계속 진행됩니다.
     */
    onAdd: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * 요소가 추가된 후 호출되는 이벤트 핸들러입니다.
     * 
     * @param elem 추가된 요소
     * @param index 추가된 요소의 인덱스
     * @param collection 현재 컬렉션 객체
     */
    onAdded: (elem: T, index: number, collection: object) => void;

    /**
     * 요소를 제거하기 전에 호출되는 이벤트 핸들러입니다.
     * 
     * @param elem 제거될 요소
     * @param index 제거될 요소의 인덱스
     * @param collection 현재 컬렉션 객체
     * @returns `false`를 반환하면 변경이 중단되고, 반환값이 없거나 `true`이면 변경이 계속 진행됩니다.
     */
    onRemove: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * 요소가 제거된 후 호출되는 이벤트 핸들러입니다.
     * 
     * @param elem 제거된 요소
     * @param index 제거된 요소의 인덱스
     * @param collection 현재 컬렉션 객체
     */
    onRemoved: (elem: T, index: number, collection: object) => void;

    /**
     * 모든 요소를 삭제하기 전에 호출되는 이벤트 핸들러입니다.
     * 
     * @param collection 현재 컬렉션 객체
     * @returns `false`를 반환하면 변경이 중단되고, 반환값이 없거나 `true`이면 변경이 계속 진행됩니다.
     */
    onClear: (collection: object) => boolean | void;

    /**
     * 모든 요소가 삭제된 후 호출되는 이벤트 핸들러입니다.
     * 
     * @param collection 현재 컬렉션 객체
     */
    onCleared: (collection: object) => void;

    /**
     * 요소가 변경되기 전에 호출되는 이벤트 핸들러입니다.
     * 
     * @param nextValue 변경될 새로운 값
     * @param prevValue 기존 값
     * @param index 변경될 요소의 인덱스
     * @param collection 현재 컬렉션 객체
     * @returns `false`를 반환하면 변경이 중단되고, 반환값이 없거나 `true`이면 변경이 계속 진행됩니다.
     */
    onChanging: (nextValue: T, prevValue: T, index: number, collection: object) => boolean | void;

    /**
     * 요소가 변경된 후 호출되는 이벤트 핸들러입니다.
     * 
     * @param nextValue 변경된 새로운 값
     * @param prevValue 기존 값
     * @param index 변경된 요소의 인덱스
     * @param collection 현재 컬렉션 객체
     */
    onChanged: (nextValue: T, prevValue: T, index: number, collection: object) => void;

    /**
     * 요소를 추가하기 전에 실행되는 내부 메서드입니다.
     * 
     * @param elem 추가될 요소
     * @param index 요소가 추가될 위치
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onAdd(elem: T, index: number): boolean | undefined;

    /**
     * 요소가 추가된 후 실행되는 내부 메서드입니다.
     * 
     * @param elem 추가된 요소
     * @param index 요소가 추가된 위치
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onAdded(elem: T, index: number): boolean | undefined;

    /**
     * 요소를 제거하기 전에 실행되는 내부 메서드입니다.
     * 
     * @param elem 제거될 요소
     * @param index 요소가 제거될 위치
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onRemove(elem: T, index: number): boolean | undefined;

    /**
     * 요소가 제거된 후 실행되는 내부 메서드입니다.
     * 
     * @param elem 제거된 요소
     * @param index 요소가 제거된 위치
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onRemoved(elem: T, index: number): boolean | undefined;

    /**
     * 모든 요소를 삭제하기 전에 실행되는 내부 메서드입니다.
     * 
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onClear(): boolean | undefined;

    /**
     * 모든 요소가 삭제된 후 실행되는 내부 메서드입니다.
     * 
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onCleared(): boolean | undefined;

    /**
     * 요소가 변경되기 전에 실행되는 내부 메서드입니다.
     * 
     * @param nextValue 변경될 새로운 값
     * @param prevValue 기존 값
     * @param index 변경될 요소의 위치
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onChanging(nextValue: T, prevValue: T, index: number): boolean | undefined;

    /**
     * 요소가 변경된 후 실행되는 내부 메서드입니다.
     * 
     * @param nextValue 변경된 새로운 값
     * @param prevValue 기존 값
     * @param index 변경된 요소의 위치
     * @returns true: 리스너 실행 완료, false: 리스너 처리 실패, undefined: 리스너 없음
     */
    _onChanged(nextValue: T, prevValue: T, index: number): boolean | undefined;

    /**
     * 특정 인덱스의 속성 디스크립터를 설정하는 내부 메서드입니다.
     * 
     * @param index 속성을 지정할 위치
     * @param isEnumerable 속성이 열거 가능한지 여부
     */
    _getPropDescriptor(index: number, isEnumerable: boolean): void;

    /**
     * 요소를 컬렉션에서 제거하는 내부 메서드입니다.
     * 
     * @returns 삭제 성공 여부
     */
    _remove(...args: any[]): boolean;

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
     * 요소를 컬렉션에서 제거합니다.
     * 
     * @param elem - 제거할 요소
     * @returns 제거한 요소의 인덱스. 요소가 존재하지 않으면 -1 반환
     */
    remove(elem: T): number;

    /**
     * 지정된 위치의 요소를 제거합니다.
     * 
     * @param index - 제거할 위치
     * @returns 요소 제거 성공 여부
     */
    removeAt(index: number): boolean;

    /**
     * 특정 요소가 컬렉션에 존재하는지 확인합니다.
     * 
     * @param elem - 확인할 요소
     * @returns 요소 존재 여부
     */
    contains(elem: T): boolean;

    /**
     * 요소의 인덱스를 반환합니다.
     * 
     * @param elem - 검색할 요소
     * @returns 요소의 인덱스, 요소가 없으면 -1 반환
     */
    indexOf(elem: T): number;

    /**
     * 요소를 컬렉션에 추가합니다.
     * 
     * @returns 추가한 요소의 인덱스
     * @overload
     */
    add(...args: any[]): number;

    /**
     * 컬렉션을 초기화합니다.
     */
    clear(): void;

} & {
    [key: number]: T;
} & MetaObjectType & ICollection<T> & IList<T>;

export interface BaseCollectionConstructor {
    /**
     * 컬렉션을 생성하는 생성자입니다.  
     * 이 클래스는 추상 클래스로, 상속을 통해 인스턴스를 생성해야 합니다.  
     * 
     * @param owner - 이 컬렉션을 소유하는 객체
     */
    new <T>(owner?: object): BaseCollection<T>;
}

declare const BaseCollection: BaseCollectionConstructor;

export default BaseCollection;
export { BaseCollection };

