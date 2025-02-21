import IList from "./i-list";
import IListControl from "./i-control-list";
import ISerialize from "./i-serialize";

declare class NamespaceManager implements IList<string>, IListControl, ISerialize {
    /**
     * 네임스페이스 요소 목록
     */
    _list: string[];

    /**
     * 네임스페이스 요소 개수
     */
    count: number;

    /**
     * 중복 요소 등록 허용 여부 (기본값: false)
     */
    isOverlap: boolean;

    constructor();

    /**
     * 네임스페이스를 초기화합니다.
     */
    init(): void;

    /**
     * 네임스페이스에 경로를 추가합니다.
     * @param p_ns 네임스페이스 이름
     */
    addNamespace(p_ns: string | string[]): void;

    /**
     * 네임스페이스에 경로를 삭제합니다.
     * @param p_ns 네임스페이스 이름
     */
    delNamespace(p_ns: string | string[]): void;

    /**
     * 네임스페이스의 경로 객체를 얻습니다.
     * @param p_ns 네임스페이스 이름
     * @returns 경로 객체
     */
    path(p_ns: string | string[]): object | undefined;

    /**
     * 네임스페이스의 경로에 요소를 추가합니다.
     * @param p_fullName 네임스페이스 전체 경로명
     * @param p_elem 요소
     */
    add(p_fullName: string, p_elem: any): void;

    /**
     * 네임스페이스의 경로에 요소를 삭제합니다.
     * @param p_fullName 네임스페이스 전체 경로명
     * @returns 성공 여부
     */
    del(p_fullName: string): boolean;

    /**
     * 네임스페이스에 요소가 있는지 확인합니다.
     * @param p_elem 경로 또는 객체
     * @returns 존재 여부
     */
    has(p_elem: string | any): boolean;

    /**
     * 네임스페이스의 경로에 요소를 찾습니다.
     * @param p_fullName 네임스페이스 전체 경로명
     * @returns 찾은 요소
     */
    find(p_fullName: string): any;

    /**
     * 네임스페이스에서 요소의 경로를 얻습니다.
     * @param p_elem 찾을 요소
     * @returns 요소의 경로
     */
    getPath(p_elem: any): string | undefined;

    /**
     * 네임스페이스 저장소를 문자열로 내보냅니다.
     * @param p_stringify JSON stringify 함수 (선택 사항)
     * @param p_space 공백 설정 (선택 사항)
     * @returns 직렬화된 문자열
     */
    output(p_stringify?: (data: any, options?: any) => string, p_space?: string): string;

    /**
     * 문자열을 파싱하여 네임스페이스 저장소로 가져옵니다.
     * @param p_str 직렬화된 문자열
     * @param p_parse JSON 파서 함수 (선택 사항)
     */
    load(p_str: string, p_parse?: (text: string) => any): void;
}

export default NamespaceManager;
export { NamespaceManager };