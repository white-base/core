import type IList               from "./i-list.d.ts";
import type IListControl        from "./i-control-list.d.ts";
import type ISerialize          from "./i-serialize.d.ts";
import type { NsTypeObject, PathObject } from './T.d.ts';

/**
 * `NamespaceManager`는 네임스페이스를 관리하는 클래스입니다.
 */
declare class NamespaceManager implements IList<string>, IListControl, ISerialize {

    /**
     * 네임스페이스 관리자를 생성합니다.
     */
    constructor();
    
    /**
     * 네임스페이스 저장소입니다.
     */
    $storage: any[];

    /**
     * 네임스페이스 요소 타입 목록입니다.  
     * 비어 있으면 모든 타입을 허용합니다.  
     */
    protected _elemTypes: any[];

    /**
     * 네임스페이스 요소 목록입니다.
     */
    _list: string[];

    /**
     * 네임스페이스 요소의 총 개수입니다.
     */
    get count(): number;

    /**
     * 중복 요소 등록 허용 여부를 설정합니다.  
     * 기본값은 `false`이며, 중복을 허용하지 않습니다.  
     */
    allowOverlap: boolean;

    /**
     * 저장소 초기화 객체를 생성합니다.  
     * 
     * @returns 초기화된 네임스페이스 타입 객체 { _type: 'ns' }
     * @private
     */
    private $createNsRefer(): NsTypeObject;

    /**
     * 네임스페이스 경로 객체를 반환합니다. 
     * 
     * @param target - 경로를 얻을 요소
     * @returns 네임스페이스 경로 객체 { ns: '..', key: '...' }
     * @protected
     */
    protected _getPathObject(target: object | string): PathObject;

    /**
     * 네임스페이스를 초기화합니다.  
     */
    init(): void;

    /**
     * 네임스페이스에 경로를 추가합니다.
     * 
     * @param nsPath - 네임스페이스 이름, 점(`.`)으로 구분된 문자열 또는 배열 형태의 경로
     */
    addNamespace(nsPath: string | string[]): void;

    /**
     * 네임스페이스에 경로를 삭제합니다.
     * 
     * @param nsPath - 네임스페이스 이름, 점(`.`)으로 구분된 문자열 또는 배열 형태의 경로
     */
    delNamespace(nsPath: string | string[]): void;

    /**
     * 네임스페이스의 경로 객체를 반환합니다.    
     * 
     * @param nsPath - 네임스페이스 이름, 점(`.`)으로 구분된 문자열 또는 배열 형태의 경로
     * @returns 경로 객체
     */
    path(nsPath: string | string[]): object | undefined;

    /**
     * 지정된 네임스페이스 경로에 요소를 추가합니다.
     * 
     * @param nsPath - 네임스페이스 전체 경로
     * @param typeDef - 추가할 함수, 클래스 또는 객체
     */
    add(nsPath: string, typeDef: Function | object): void;

    /**
     * 지정된 네임스페이스 경로에서 요소를 삭제합니다.  
     * 
     * @param nsPath - 네임스페이스 전체 경로
     * @returns - 삭제 성공 여부 (`true` 또는 `false`)
     */
    del(nsPath: string): boolean;

    /**
     * 네임스페이스에 지정된 요소가 존재하는지 확인합니다.
     * 
     * @param target - 확인할 함수, 클래스 또는 객체
     * @returns - 존재 여부 (`true` 또는 `false`)
     */
    has(target: string | Function | object): boolean;

    /**
     * 지정된 네임스페이스 경로에서 요소를 검색합니다.
     * 
     * @param nsPath - 네임스페이스 전체 경로
     * @returns 찾은 요소
     */
    find(nsPath: string): Function | object;

    /**
     * 네임스페이스에서 지정된 요소의 경로를 반환합니다.  
     * (중복된 경우 첫 번째 요소의 경로)    
     * 
     * @param target - 찾을 요소 (함수 또는 객체)
     * @returns 요소의 경로, 찾지 못한 경우 `undefined`
     */
    getPath(target: Function | object): string | undefined;

    /**
     * 네임스페이스 저장소를 직렬화하여 문자열로 변환합니다.  
     * 함수를 JSON으로 변환하려면 별도의 `stringify` 함수를 지정해야 합니다.  
     * 
     * @param jsonStringify - JSON stringify 함수 (선택 사항)
     * @param space - 출력 시 적용할 공백 설정
     * @returns 직렬화된 문자열
     */
    output(jsonStringify?: (data: any, options?: any) => string, space?: string): string;

    /**
     * 직렬화된 문자열을 파싱하여 네임스페이스 저장소로 불러옵니다.
     * 
     * @param str - 직렬화된 문자열
     * @param jsonParse - JSON 파서 함수
     */
    load(str: string, jsonParse?: (text: string) => any): void;
}

export default NamespaceManager;
export { NamespaceManager };