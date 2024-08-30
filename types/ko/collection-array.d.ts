import IArrayCollection     = require("./i-collction-array");
import BaseCollection       = require("./base-collection");
    
/**
 * `ArrayCollection` 클래스는 `BaseCollection`을 상속받으며 `IArrayCollection` 인터페이스를 구현합니다.
 * 이 클래스는 배열 형태의 컬렉션을 관리하고, 배열 관련 작업을 위한 다양한 메서드를 제공합니다.
 * 
 * @extends BaseCollection
 * @implements IArrayCollection
 * 
 * @example
 * const myCollection = new ArrayCollection(someOwner);
 * myCollection.add(someElement);
 * console.log(myCollection.count); // 컬렉션의 요소 수
 */
declare class ArrayCollection extends BaseCollection implements IArrayCollection {

    /**
     * ArrayCollection 클래스의 인스턴스를 생성합니다.
     * 
     * @param owner 이 컬렉션을 소유하는 객체입니다.
     */
    constructor(owner);
    
    /**
     * 컬렉션의 지정된 위치에 있는 요소를 삭제합니다.
     * 이 메서드는 추상 메서드 `_remove`를 구현하여 요소를 삭제합니다.
     * (템플릿 메소드 패턴을 사용합니다)
     * 
     * @param pos - 삭제할 요소의 인덱스입니다.
     * @returns 삭제 성공 여부를 나타내는 불리언 값입니다.
     * 
     * @example
     * const success = myCollection._remove(0);
     * console.log(`요소 삭제 성공: ${success}`);
     */
    _remove(pos: number): boolean;

    /**
     * 배열 컬렉션 객체를 직렬화하여 반환합니다. 순환 참조는 `$ref` 값으로 대체됩니다.
     * 
     * @param {number} [vOpt=0] - 직렬화 옵션입니다. (기본값: 0)
     * - 0: 참조 구조 (_guid: 예, $ref: 예)
     * - 1: 중복 구조 (_guid: 예, $ref: 예)
     * - 2: 비참조 구조 (_guid: 아니오, $ref: 아니오)
     * @param {object | Array<object>} [owned={}] - 소유하는 상위 객체들입니다. 기본값은 빈 객체입니다.
     * @returns 직렬화된 컬렉션 객체입니다.
     * 
     * @example
     * const serializedObj = collection.getObject(2);
     * console.log(serializedObj);
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화된 객체를 사용하여 배열 컬렉션 객체를 초기화합니다. 이 과정에서 컬렉션이 초기화됩니다.
     * 
     * @param oGuid - 직렬화된 객체입니다.
     * @param {object} [origin=oGuid] - 원본 객체입니다. 기본값은 `oGuid`입니다.
     */
    setObject(oGuid: object, origin?: object): void;

    /**
     * 배열 컬렉션에 요소를 추가합니다.
     * 
     * @param elem - 추가할 요소입니다.
     * @param {PropertyDescriptor} [desc] - 요소에 대한 프로퍼티 기술자 객체입니다. 옵션입니다.
     * @returns {number} 추가된 요소의 인덱스입니다.
     * 
     * @example
     * const index = myCollection.add(newElement, { configurable: true });
     * console.log(`추가된 요소의 인덱스: ${index}`);
     */
    add(elem: any, desc?: PropertyDescriptor): number;

    /**
     * 배열 컬렉션을 초기화합니다. 초기화 대상은 `$elements`와 `$descriptors` 배열입니다.
     * 
     * @example
     * myCollection.clear();
     * console.log(myCollection.count); // 0
     */
    clear(): void;

    /**
     * 배열 컬렉션의 지정된 위치에 요소를 추가합니다.
     * 
     * @param pos - 추가할 인덱스 위치입니다.
     * @param elem - 추가할 요소입니다.
     * @param {PropertyDescriptor} [desc] - 요소에 대한 프로퍼티 기술자 객체입니다. 옵션입니다.
     * @returns 요소 추가 성공 여부를 나타내는 불리언 값입니다.
     * 
     * @example
     * const success = myCollection.insertAt(1, newElement, { configurable: true });
     * console.log(`요소 추가 성공: ${success}`);
     */
    insertAt(pos: number, elem: any, desc?: PropertyDescriptor): boolean;

}
// }

export = ArrayCollection