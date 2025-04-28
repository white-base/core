import type IArrayCollection    from "./i-collection-array.d.ts";
import type BaseCollection      from "./base-collection.d.ts";

/**
 * `ArrayCollection` 클래스는 `BaseCollection`을 상속받으며 `IArrayCollection` 인터페이스를 구현합니다.  
 * 이 클래스는 배열 형태의 컬렉션을 관리하고, 배열 관련 작업을 위한 다양한 메서드를 제공합니다.
 */
declare class ArrayCollection<T=string> {
    
    /**
     * ArrayCollection 클래스의 인스턴스를 생성합니다.
     * 
     * @param owner - 이 컬렉션을 소유하는 객체
     */
    constructor(owner?: object);

    /**
     * 요소를 컬렉션에 추가합니다.
     * 
     * @param elem - 추가할 요소
     * @param desc - 요소에 대한 프로퍼티 기술자 객체
     * @returns 추가된 요소의 위치
     */
    add(elem: T, desc?: PropertyDescriptor): number;

    [key: number]: T

}

export default ArrayCollection;
export { ArrayCollection };
