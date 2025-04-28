import type IArrayCollection    from "./i-collection-array.d.ts";
import type BaseCollection      from "./base-collection.d.ts";

/**
 * `ArrayCollection` 클래스는 `BaseCollection`을 상속받으며 `IArrayCollection` 인터페이스를 구현합니다.  
 * 이 클래스는 배열 형태의 컬렉션을 관리하고, 배열 관련 작업을 위한 다양한 메서드를 제공합니다.
 */
export interface ArrayCollection<T = string> {
    /**
     * 현재 저장된 요소의 수를 나타냅니다.
     */
    length: number;
  
    /**
     * 요소를 추가합니다.
     * @param index 추가할 숫자 인덱스
     * @param elem 추가할 값
     * @param desc 프로퍼티 디스크립터 (선택)
     * @returns 요소 수 (number)
     */
    add(index: number, elem: T, desc?: PropertyDescriptor): number;
  
    /**
     * 숫자 인덱스를 통한 요소 접근을 허용합니다.
     */
    [index: number]: T;
  }
  
  export interface ArrayCollectionConstructor {
    new <T = any>(): ArrayCollection<string>;  // new 키워드만 허용
  }
  
  declare const ArrayCollection: ArrayCollectionConstructor;
  
  export default ArrayCollection;
  export { ArrayCollection };
