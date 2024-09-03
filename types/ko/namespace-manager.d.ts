import IList            from './i-list';
import IListControl     from './i-control-list';
import ISerialize       from './i-serialize';

/**
 * 네임스페이스를 관리하는 클래스입니다.
 * 이 클래스는 네임스페이스를 추가하거나 삭제하고, 요소를 관리하는 기능을 제공합니다.
 * 또한 네임스페이스 저장소의 직렬화 및 역직렬화 기능도 제공합니다.
 */
declare class NamespaceManager implements IList, IListControl, ISerialize {

    /**
     * 네임스페이스 저장소입니다.
     * 
     * @private
     */
    $storage: any[];

    /**
     * 네임스페이스 요소 타입 목록입니다.
     * 요소 타입이 비어 있을 경우 전체 타입이 허용됩니다.
     * 
     * @protected
     */
    _elemTypes: any[];

    /**
     * 네임스페이스 요소 목록입니다.
     * 
     * @readonly
     */
    _list: string[];

    /**
     * 네임스페이스 요소의 총 갯수입니다.
     * 
     * @readonly
     */
    count: number;

    /**
     * 중복 요소 등록 허용 여부를 설정합니다.
     * 기본값은 `false`이며, 중복을 허용하지 않습니다.
     */
    isOverlap: boolean;

    /**
     * 네임스페이스 관리자를 생성합니다.
     */
    constructor();

    /**
     * 네임스페이스 저장소 초기화 객체를 생성합니다.
     * 
     * @returns {NsTypeObject} 초기화된 네임스페이스 타입 객체입니다. { _type: 'ns' }
     * @private
     */
    __createNsRefer(): NsTypeObject;

    /**
     * 네임스페이스 경로 객체를 얻습니다.
     * 
     * @param elem - 경로를 얻을 요소입니다.
     * @returns {PathObject} 네임스페이스 경로 객체입니다. { ns: '..', key: '...' }
     * @protected
     */
    _getPathObject(elem: object | string): PathObject;

    /**
     * 네임스페이스를 초기화합니다.
     * 이 메서드는 네임스페이스 저장소를 비우고 초기 상태로 되돌립니다.
     */
    init(): void;

    /**
     * 네임스페이스에 경로를 추가합니다.
     * 
     * @param ns - 추가할 네임스페이스 이름 또는 이름 배열입니다.
     */
    addNamespace(ns: string | string[]): void;

    /**
     * 네임스페이스에서 경로를 삭제합니다.
     * 
     * @param ns - 삭제할 네임스페이스 이름 또는 이름 배열입니다.
     */
    delNamespace(ns: string | string[]): void;

    /**
     * 네임스페이스에서 경로 객체를 얻습니다.
     * 
     * @param ns - 네임스페이스 이름 또는 이름 배열입니다.
     * @returns {object} 네임스페이스 경로 객체입니다.
     */
    path(ns: string | string[]): object;

    /**
     * 네임스페이스 경로에 요소를 추가합니다.
     * 
     * @param fullName - 네임스페이스 전체 경로명입니다.
     * @param elem - 추가할 요소입니다.
     */
    add(fullName: string, elem: any): void;

    /**
     * 네임스페이스 경로에서 요소를 삭제합니다.
     * 
     * @param fullName - 네임스페이스 전체 경로명입니다.
     * @returns {boolean} 삭제 성공 여부입니다.
     */
    del(fullName: string): boolean;

    /**
     * 네임스페이스에 특정 요소가 존재하는지 확인합니다.
     * 
     * @param elem - 확인할 경로 또는 요소입니다.
     * @returns {boolean} 요소의 존재 여부입니다.
     */
    has(elem: string | any): boolean;

    /**
     * 네임스페이스 경로에서 요소를 찾아서 반환합니다.
     * 
     * @param fullName - 네임스페이스 전체 경로명입니다.
     * @returns {object | Function | undefined} 찾은 요소 또는 `undefined`입니다.
     */
    find(fullName: string): object | Function | undefined;

    /**
     * 네임스페이스에 요소로부터 경로를 얻습니다.
     * 
     * 중복 시 첫 번째 요소의 경로를 반환합니다.
     * @param elem - 경로를 얻을 요소입니다.
     * @returns {string | undefined} 경로 또는 `undefined`입니다.
     */
    getPath(elem: any): string | undefined;

    /**
     * 네임스페이스 저장소를 문자열로 직렬화합니다.
     * JSON 직렬화 기능을 위해 별도의 stringify 함수를 지정할 수 있습니다.
     * 
     * @param stringify - JSON stringify 함수입니다. 기본값은 `JSON.stringify`입니다.
     * @param space - JSON 문자열에 적용할 공백 문자열입니다.
     * @returns {string} 직렬화된 문자열입니다.
     */
    output(stringify?: Function, space?: string): string;

    /**
     * 문자열을 파싱하여 네임스페이스 저장소로 로드합니다.
     * 
     * @param str - 직렬화된 문자열입니다.
     * @param parse - JSON 파서 함수입니다. 기본값은 `JSON.parse`입니다.
     */
    load(str: string, parse?: Function): void;
}

export = NamespaceManager;