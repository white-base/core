import IArrayCollection     = require("./i-collction-array");
import BaseCollection       = require("./base-collection");
import T                    = require("./T");
    
/**
 * 배열 컬렉션 클래스 입니다.
 */
declare class ArrayCollection extends BaseCollection implements IArrayCollection {

    /**
     * 배열 컬렉션을 생성합니다.
     * @param owner 소유 객체
     */
    constructor(owner);
    
    /**
     * 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
     * @param pos 인덱스 위치
     */
    _remove(pos: number): boolean;

    /**
     * 배열 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
     * (순환참조는 $ref 값으로 대체된다.) 
     * @param vOpt [p_vOpt=0] 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No) 
     * @param owned [p_owned={}] 현재 객체를 소유하는 상위 객체들
     * @example
     * a.getObject(2) == b.getObject(2
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화(guid 타입) 객체를 배열 컬렉션 객체에 설정합니다.  
     * (객체는 초기화 된다.)
     * @param oGuid 직렬화 할 guid 타입의 객체
     * @param origin [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    setObject(oGuid: object, origin?: object);


    /**
     * 배열 컬렉션에 요소를 추가합니다.
     * @param elem 요소
     * @param desc 프로퍼티 기술자 객체
     */
    add(elem: any, desc?: T.PropertyDescriptor): number;

    /**
     * 배열 컬렉션을 초기화 합니다.
     * - 대상 : _element = [], _descriptors = []
     */
    clear(): void;

    /**
     * 배열 컬렉션의 지정위치에 요소를 추가합니다.
     * @param pos 인덱스 위치
     * @param elem 요소
     * @param desc 프로퍼티 기술자 객체
     */
    insertAt(pos: number, elem: any, desc?: PropertyDescriptor): boolean;

}
// }

export = ArrayCollection