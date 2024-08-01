import IList = require("./i-list");
import IListControl = require("./i-control-list");
import ISerialize = require("./i-serialize");

/**
 * 네임스페이스 관리자 클래스입니다.
 * 네임스페이스를 관리하고, 요소를 추가/삭제하는 기능을 제공합니다.
 */
declare class NamespaceManager implements IList, IListControl, ISerialize {

    /**
     * 네임스페이스 저장소
     * @type {any[]}
     * @private
     */
    $storage: any[];

    /**
     * 네임스페이스 요소 타입, elemTypes.length == 0 일 때 전체 허용
     * @type {any[]}
     * @protected
     */
    _elemTypes: any[];

    /**
     * 네임스페이스 요소 목록
     * @type {string[]}
     * @readonly
     */
    _list: string[];

    /**
     * 네임스페이스 요소 갯수
     * @type {number}
     * @readonly
     */
    count: number;

    /**
     * 중복 요소 등록 허용 여부, 기본값 = false (중복 금지)
     * @type {boolean}
     */
    isOverlap: boolean;

    /**
     * 네임스페이스 관리자를 생성합니다.
     */
    constructor();

    /**
     * 네임스페이스 저장소 초기화 객체를 생성합니다.
     * @returns {NsTypeObject} ex> { _type: 'ns' }
     * @private
     */
    __createNsRefer(): NsTypeObject;

    /**
     * 네임스페이스 경로 객체를 얻습니다.
     * @param elem 얻을 요소
     * @returns {PathObject} ex> { ns: '..', key: '...' }
     * @protected
     */
    _getPathObject(elem: object | string): PathObject;

    /**
     * 네임스페이스를 초기화합니다.
     */
    init(): void;

    /**
     * 네임스페이스에 경로를 추가합니다.
     * @param ns 네임스페이스 이름 또는 배열
     */
    addNamespace(ns: string | string[]): void;

    /**
     * 네임스페이스에서 경로를 삭제합니다.
     * @param ns 네임스페이스 이름 또는 배열
     */
    delNamespace(ns: string | string[]): void;

    /**
     * 네임스페이스에서 경로 객체를 얻습니다.
     * @param ns 네임스페이스 이름 또는 배열
     * @returns {object} 경로 객체
     */
    path(ns: string | string[]): object;

    /**
     * 네임스페이스 경로에 요소를 추가합니다.
     * @param fullName 네임스페이스 전체 경로명
     * @param elem 추가할 요소
     */
    add(fullName: string, elem: any): void;

    /**
     * 네임스페이스 경로에서 요소를 삭제합니다.
     * @param fullName 네임스페이스 전체 경로명
     * @returns {boolean} 성공 여부
     */
    del(fullName: string): boolean;

    /**
     * 네임스페이스에 요소가 있는지 확인합니다.
     * @param elem 경로 또는 객체
     * @returns {boolean} 존재 여부
     */
    has(elem: string | any): boolean;

    /**
     * 네임스페이스 경로에서 요소를 찾아서 반환합니다.
     * @param fullName 네임스페이스 전체 경로명
     * @returns {object | Function | undefined} 요소 또는 undefined
     */
    find(fullName: string): object | Function | undefined;

    /**
     * 네임스페이스에 요소로 경로를 얻습니다.
     * 중복시 첫 번째 요소를 반환합니다.
     * @param elem 얻을 객체
     * @returns {string | undefined} 경로 또는 undefined
     */
    getPath(elem: any): string | undefined;

    /**
     * 네임스페이스 저장소를 문자열로 내보냅니다.
     * 함수를 JSON으로 출력하기 위해 별도의 stringify를 지정해야 합니다.
     * @param stringify JSON stringify 함수
     * @param space 공백
     * @returns {string} 직렬화된 문자열
     */
    output(stringify?: Function, space?: string): string;

    /**
     * 문자열을 파싱하여 네임스페이스 저장소로 가져옵니다.
     * @param str 직렬화된 문자열
     * @param parse JSON 파서 함수
     */
    load(str: string, parse?: Function): void;
}

export = NamespaceManager;