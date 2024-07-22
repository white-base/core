import IPropertyCollection  = require("./i-collection-property");
import BaseCollection       = require("./base-collection");
// import T                    = require("./T");

/**
 * 프로퍼티 컬렉션 클래스 입니다.
 */
declare class PropertyCollection extends BaseCollection implements IPropertyCollection {
    
    
    /**
     *  프로퍼티 컬렉션을 생성합니다.
     * @param owner 소유 객체
     */
    constructor(owner: object);
    
    /**
     * 컬렉션 요소의 키값들
     */
    $keys: string[];

    /**
     * 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
     * @param pos 인덱스 위치
     */
    _remove(pos: number): boolean;

    /**
     * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
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
     * 직렬화(guid 타입) 객체를 프로퍼티 컬렉션 객체에 설정합니다.  
     * (객체는 초기화 된다.)
     * @param oGuid 직렬화 할 guid 타입의 객체
     * @param origin [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    setObject(oGuid: object, origin?: object);

    /**
     * 프로퍼티 컬렉션의 인덱스 값을 조회합니다.
     * @param target 키 또는 요소
     * @param isKey [p_isKey=false] 키로 조회 여부
     */
    indexOf(target: any | string, isKey?: boolean): number;

    /**
     * 프로퍼티 컬렉션에 요소를 추가합니다.
     * @param key 키
     * @param elem 요소
     * @param desc 기술자
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * 프로러티 컬렉션을 초기화 합니다.
     * - 대상 : _element = [], _descriptors = [], _keys = []  
     * - 이벤트는 초기화 되지 않습니다.
     */
    clear(): void;

    /**
     * 프로퍼티 컬렉션의 인덱스에 대한 키값을 조회합니다.
     * @param idx 인덱스 값
     */
    keyOf(idx: number): string;

    /**
     * 프로퍼티 컬렉션의 키 존재하는지 확인합니다.
     * @param key 키
     */
    exist(key: string): boolean;

}

// export { PropertyCollection, PropertyDescriptor};
export = PropertyCollection;