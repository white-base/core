import IPropertyCollection  = require("./i-collection-property");
import BaseCollection       = require("./base-collection");
// import T                    = require("./T");

/**
 * `PropertyCollection` 클래스는 `BaseCollection`을 상속하며 `IPropertyCollection` 인터페이스를 구현합니다.
 * 이 클래스는 속성 기반 컬렉션을 관리하고, 각 요소에 대해 키와 값을 사용하여 접근할 수 있는 기능을 제공합니다.
 * 
 * @extends BaseCollection
 * @implements IPropertyCollection
 * 
 * @example
 * const myCollection = new PropertyCollection(someOwner);
 * myCollection.add("key1", someElement);
 * console.log(myCollection.indexToKey(0)); // "key1"
 */
declare class PropertyCollection extends BaseCollection implements IPropertyCollection {
    
    /**
     * `PropertyCollection` 클래스의 인스턴스를 생성합니다.
     * 
     * @param owner 이 컬렉션을 소유하는 객체입니다.
     */
    constructor(owner: object);
    
    /**
     * 컬렉션 요소의 키 값들을 배열로 저장합니다.
     */
    $keys: string[];

    /**
     * 컬렉션의 지정된 위치에 있는 요소를 삭제합니다.
     * 템플릿 메소드 패턴을 사용하여 삭제를 수행합니다.
     * 
     * @param pos - 삭제할 요소의 인덱스입니다.
     * @returns 요소 삭제 성공 여부를 나타내는 불리언 값입니다.
     * 
     * @example
     * const success = myCollection._remove(1);
     * console.log(`요소 삭제 성공: ${success}`);
     */
    _remove(pos: number): boolean;

    /**
     * 프로퍼티 컬렉션 객체를 직렬화된 객체로 반환합니다.
     * 순환 참조는 $ref 값으로 대체됩니다.
     * 
     * @param {number} [vOpt=0] - 직렬화 옵션입니다. 
     * - 0: 참조 구조 (_guid: 예, $ref: 예)
     * - 1: 중복 구조 (_guid: 예, $ref: 예)
     * - 2: 비참조 구조 (_guid: 아니오, $ref: 아니오)
     * @param {object | object[]} [owned={}] - 소유하는 상위 객체들입니다. 기본값은 빈 객체입니다.
     * @returns {object} 직렬화된 객체입니다.
     * 
     * @example
     * const serializedObj = collection.getObject(2);
     * console.log(serializedObj);
     */
    getObject(vOpt?: number, owned?: object | object[]): object;

    /**
     * 직렬화된 객체를 사용하여 프로퍼티 컬렉션 객체를 초기화합니다.
     * 이 과정에서 객체는 초기화됩니다.
     * 
     * @param oGuid - 직렬화된 객체입니다.
     * @param {object} [origin=oGuid] - 원본 객체입니다. 기본값은 `oGuid`입니다.
     */
    setObject(oGuid: object, origin?: object): void;

    // /**
    //  * 프로퍼티 컬렉션에서 지정된 키 또는 요소의 인덱스를 반환합니다.
    //  * 
    //  * @param target - target 조회할 키 또는 요소입니다. 키로 조회할 경우 문자열을 전달할 수 있습니다.
    //  * @param {boolean} [isKey=false] - 키로 조회할지 여부를 결정하는 불리언 값입니다. 기본값은 `false`입니다.
    //  * @returns {number} 요소의 인덱스입니다. 요소가 존재하지 않을 경우 `-1`을 반환합니다.
    //  * 
    //  * @example
    //  * const index = myCollection.indexOf("key1", true);
    //  * console.log(`키의 인덱스: ${index}`);
    //  */
    // indexOf(target: any | string, isKey?: boolean): number;

    /**
     * 프로퍼티 컬렉션에 요소를 추가합니다.
     * 
     * @param key - key 요소의 키입니다.
     * @param elem - 추가할 요소입니다.
     * @param {PropertyDescriptor} [desc] - 요소에 대한 프로퍼티 기술자 객체입니다. 선택값입니다.
     * @returns {number} 추가된 요소의 인덱스입니다.
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * 프로퍼티 컬렉션을 초기화합니다.
     * 이 메서드는 `$elements`, `$descriptors`, `$keys` 배열을 초기화합니다.
     * 이벤트는 초기화되지 않습니다.
     * 
     * @example
     * myCollection.clear();
     * console.log(myCollection.count); // 0
     */
    clear(): void;

    /**
     * 프로퍼티 컬렉션에서 지정된 키 또는 요소의 인덱스를 반환합니다.
     * 
     * @param key - key 조회할 키입니다.
     * @returns {number} 요소의 인덱스입니다. 요소가 존재하지 않을 경우 `-1`을 반환합니다.
     * 
     * @example
     * const index = myCollection.keyToIndex("key1");
     * console.log(`키의 인덱스: ${index}`);
     */
    keyToIndex(key: string): number;
    
    /**
     * 프로퍼티 컬렉션의 인덱스에 해당하는 키를 반환합니다.
     * 
     * @param idx - 조회할 인덱스 값입니다.
     * @returns {string} 인덱스에 해당하는 키입니다. 인덱스가 범위를 벗어나면 `undefined`를 반환할 수 있습니다.
     * 
     * @example
     * const key = myCollection.indexToKey(0);
     * console.log(`인덱스 0의 키: ${key}`);
     */
    indexToKey(idx: number): string;

    /**
     * 프로퍼티 컬렉션에 지정된 키가 존재하는지 확인합니다.
     * 
     * @param key - 확인할 키입니다.
     * @returns 키의 존재 여부를 나타내는 불리언 값입니다.
     */
    exist(key: string): boolean;

}

export = PropertyCollection;