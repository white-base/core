import IList from "./i-list";
import IListControl from "./i-control-list";
import ISerialize from "./i-serialize";
import {NsTypeObject, PathObject} from './T';

/**
 * 네임스페이스를 관리하는 클래스입니다.
 */
declare class NamespaceManager implements IList<string>, IListControl, ISerialize {


    /**
     * 네임스페이스 저장소입니다.
     */
    $storage: any[];

    /**
     * 네임스페이스 요소 타입 목록입니다.
     * 요소 타입이 비어 있을 경우 전체 타입이 허용됩니다.
     */
    _elemTypes: any[];

    /**
     * 네임스페이스 요소 목록
     */
    _list: string[];

    /**
     * 네임스페이스 요소 개수
     */
    get count(): number;

    /**
     * 중복 요소 등록 허용 여부 (기본값: false)
     */
    isOverlap: boolean;

    /**
     * 네임스페이스를 초기화합니다.
     */
    constructor();

    /**
     * 네임스페이스 저장소 초기화 객체를 생성합니다.
     * 
     * @returns 초기화된 네임스페이스 타입 객체입니다. { _type: 'ns' }
     * @private
     */
    $createNsRefer(): NsTypeObject;

    /**
     * 네임스페이스 경로 객체를 얻습니다.
     * 
     * @param elem - 경로를 얻을 요소입니다.
     * @returns 네임스페이스 경로 객체입니다. { ns: '..', key: '...' }
     * @protected
     */
    _getPathObject(elem: object | string): PathObject;

    /**
     * 네임스페이스를 초기화합니다.
     */
    init(): void;

    /**
     * 네임스페이스에 경로를 추가합니다.
     * @param ns 네임스페이스 이름
     */
    addNamespace(ns: string | string[]): void;

    /**
     * 네임스페이스에 경로를 삭제합니다.
     * @param ns 네임스페이스 이름
     */
    delNamespace(ns: string | string[]): void;

    /**
     * 네임스페이스의 경로 객체를 얻습니다.
     * @param ns 네임스페이스 이름
     * @returns 경로 객체
     */
    path(ns: string | string[]): object | undefined;

    /**
     * 네임스페이스의 경로에 요소를 추가합니다.
     * @param fullName 네임스페이스 전체 경로명
     * @param elem 요소
     */
    add(fullName: string, elem: any): void;

    /**
     * 네임스페이스의 경로에 요소를 삭제합니다.
     * @param fullName 네임스페이스 전체 경로명
     * @returns 성공 여부
     */
    del(fullName: string): boolean;

    /**
     * 네임스페이스에 요소가 있는지 확인합니다.
     * @param elem 경로 또는 객체
     * @returns 존재 여부
     */
    has(elem: string | any): boolean;

    /**
     * 네임스페이스의 경로에 요소를 찾습니다.
     * @param fullName 네임스페이스 전체 경로명
     * @returns 찾은 요소
     */
    find(fullName: string): any;

    /**
     * 네임스페이스에서 요소의 경로를 얻습니다.
     * @param elem 찾을 요소
     * @returns 요소의 경로
     */
    getPath(elem: any): string | undefined;

    /**
     * 네임스페이스 저장소를 문자열로 내보냅니다.
     * @param stringify JSON stringify 함수 (선택 사항)
     * @param space 공백 설정 (선택 사항)
     * @returns 직렬화된 문자열
     */
    output(stringify?: (data: any, options?: any) => string, space?: string): string;

    /**
     * 문자열을 파싱하여 네임스페이스 저장소로 가져옵니다.
     * @param str 직렬화된 문자열
     * @param parse JSON 파서 함수 (선택 사항)
     */
    load(str: string, parse?: (text: string) => any): void;
}

export default NamespaceManager;
export { NamespaceManager };