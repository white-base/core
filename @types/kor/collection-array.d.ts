import IArrayCollection     = require("./i-collction-array");
import BaseCollection       = require("./base-collection");
// import T                    = require("./T");
    
/**
 * ArrayCollection 클래스는 BaseCollection을 상속하며, IArrayCollection 인터페이스를 구현합니다.
 * 이 클래스는 배열 형태의 컬렉션을 관리하는 기능을 제공합니다.
 */
declare class ArrayCollection extends BaseCollection implements IArrayCollection {

    /**
     * ArrayCollection 클래스의 인스턴스를 생성합니다.
     * @param owner 이 컬렉션을 소유하는 객체
     */
    constructor(owner);
    
    /**
     * 컬렉션의 지정된 위치에 있는 요소를 삭제합니다.
     * (템플릿 메소드 패턴을 사용합니다)
     * @param pos 삭제할 요소의 인덱스 위치
     * @returns {boolean} 요소 삭제 성공 여부
     */
    _remove(pos: number): boolean;

    /**
     * 배열 컬렉션 객체를 직렬화된 객체로 반환합니다.
     * 순환 참조는 $ref 값으로 대체됩니다.
     * @param [vOpt=0] 직렬화 옵션 (기본값: 0)
     * - 0: 참조 구조 (_guid: 예, $ref: 예)
     * - 1: 중복 구조 (_guid: 예, $ref: 예)
     * - 2: 비참조 구조 (_guid: 아니오, $ref: 아니오)
     * @param [owned={}] 소유하는 상위 객체들 (기본값: 빈 객체)
     * @returns {object} 직렬화된 객체
     * @example
     * const serializedObj = collection.getObject(2);
     * console.log(serializedObj);
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화된 객체를 사용하여 배열 컬렉션 객체를 초기화합니다.
     * 이 과정에서 객체는 초기화됩니다.
     * @param oGuid 직렬화된 객체
     * @param [origin=oGuid] 원본 객체 (기본값: oGuid)
     */
    setObject(oGuid: object, origin?: object);

    /**
     * 배열 컬렉션에 요소를 추가합니다.
     * @param elem 추가할 요소
     * @param [desc] 요소에 대한 프로퍼티 기술자 객체 (옵션)
     * @returns {number} 추가된 요소의 인덱스
     */
    add(elem: any, desc?: PropertyDescriptor): number;

    /**
     * 배열 컬렉션을 초기화합니다.
     * - 초기화 대상: $element = [], $descriptors = []
     */
    clear(): void;

    /**
     * 배열 컬렉션의 지정된 위치에 요소를 추가합니다.
     * @param pos 추가할 인덱스 위치
     * @param elem 추가할 요소
     * @param [desc] 요소에 대한 프로퍼티 기술자 객체 (옵션)
     * @returns {boolean} 요소 추가 성공 여부
     */
    insertAt(pos: number, elem: any, desc?: PropertyDescriptor): boolean;

}
// }

export = ArrayCollection