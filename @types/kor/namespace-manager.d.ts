import IList                = require("./i-list");
import IListControl         = require("./i-control-list");
import ISerialize           = require("./i-serialize");
import T                    = require("./T");

/**
 * 네임스페이스 관리자 클래스 입니다.
 */
declare class NamespaceManager implements IList, IListControl, ISerialize {

    /**
     * 네임스페이스 저장소
     */
    _storage: any[];

    /**
     * 네임스페이스 요소 타입, elemTypes.length == 0 전체허용
     * @protected
     */
    _elemTypes: any[];

    /**
     * 네임스페이스 요소 목록
     * @readonly
     */
    list: string[];

    /**
     * 네임스페이스 요소 갯수
     * @readonly
     */
    count: number;

    /**
     * 중복 요소 등록 허용 여부, 기본값 = false (중복금지)
     */
    isOverlap: boolean;

    /**
     * 네임스페이스 관리자를 생성합니다.
    */
    constructor();

    /**
     * 네임스페이스 저장소 초기화 객체를 생성합니다.
     * @returns ex>  { _type: 'ns' }
     * @private
     */
    __createNsRefer(): T.NsTypeObject;

    /**
     * 네임스페이스 경로객체를 얻습니다.
     * @param elem 얻을 요소
     * @returns ex>  { ns: '..', key: '...' }
     * @protected
     */
    _getPathObject(elem: object | string): T.PathObject;

    /**
     * 네임스페이스를 초기화 합니다.
     */
    init();

    /**
     * 네임스페이스에 경로를 추가합니다.
     * @param ns 네임스페이스 이름
     */
    addNamespace(ns: string | string[]);

    /**
     * 네임스페이스에 경로를 삭제합니다.
     * @param ns 네임스페이스 이름
     */
    delNamespace(ns: string | string[]);

    /**
     * 네임스페이스에 경로 객체를 얻습니다.
     * @param ns 네임스페이스 이름
     */
    path(ns: string | string[]): object;

    /**
     * 네임스페이스의 경로에 요소를 추가합니다.
     * @param fullName 네임스페이스 전체 경로명
     * @param elem 요소
     */
    add(fullName: string, elem: any);

    /**
     * 네임스페이스의 경로에 요소를 삭제합니다.
     * @param fullName 네임스페이스 전체 경로명
     */
    del(fullName: string): boolean;

    /**
     * 네임스페이스에 요소가 있는지 확인합니다.
     * @param elem 경로 | 객체
     */
    has(elem: string | any): boolean;

    /**
     * 네임스페이스의 경로에 요소를 찾아서 돌려줍니다.
     * @param fullName 네임스페이스 전체 경로명
     */
    find(fullName: string): object | Function | undefined;

    /**
     * 네임스페이스에 요소로 경로를 얻습니다.  
     * (중복시 첫번째 요소 return)
     * @param elem 얻을 객체
     */
    getPath(elem: any): string | undefined;

    /**
     * 네임스페이스 저장소를 문자열로 내보냅니다.  
     * 함수를 JSON 으로 출력하기 위해서 별도의 stringify 지정해야합니다.!
     * @param stringify JSON stringify
     * @param space 공백
     */
    output(stringify?: Function, space?: string): string;

    /**
     * 문자열을 파싱해서 네임스페이스 저장소로 가져옵니다.  
     * @param str 직렬화한 문자열
     * @param parse JSON 파서
     */
    load(str: string, parse?: Function);

}

export = NamespaceManager;