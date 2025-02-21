import NamespaceManager from "./namespace-manager";

declare class MetaRegistry {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * 메타 객체 목록 (참조값)
     */
    static readonly _list: any[];

    /**
     * 메타 객체 전체 갯수
     */
    static readonly count: number;

    /**
     * 메타 객체의 네임스페이스
     */
    static readonly namespace: NamespaceManager;

    /**
     * 등록된 메타 객체 및 네임스페이스를 초기화합니다.
     */
    static init(): void;

    /**
     * 메타 객체를 등록하고, 생성자를 네임스페이스에 등록합니다.
     * @param p_meta 메타 객체
     */
    static register(p_meta: any): void;

    /**
     * 등록소에서 메타 객체를 해제합니다.
     * @param p_meta 메타 객체 또는 GUID
     * @returns 성공 여부
     */
    static release(p_meta: any | string): boolean;

    /**
     * 등록소에 메타 객체 여부를 확인합니다.
     * @param p_oGuid GUID 타입의 객체 또는 GUID
     * @returns 존재 여부
     */
    static has(p_oGuid: any | string): boolean;

    /**
     * 등록소에서 메타 객체를 찾습니다.
     * @param p_oGuid GUID 타입의 객체 또는 GUID
     * @returns 메타 객체 또는 undefined
     */
    static find(p_oGuid: any | string): any | undefined;

    /**
     * 매타 객체 여부를 확인합니다.
     * @param p_target 대상 객체
     * @returns 존재 여부
     */
    static isMetaObject(p_target: any): boolean;

    /**
     * 네임스페이스(ns)에 생성자 또는 객체를 등록합니다.
     * @param p_target 대상 객체
     * @param p_ns 네임스페이스
     * @param p_key 대상 이름
     */
    static registerClass(p_target: any, p_ns: string, p_key: string): void;

    /**
     * 네임스페이스(ns)에서 생성자 또는 객체를 해제합니다.
     * @param p_fullName 네임스페이스 전체 이름
     * @returns 삭제 성공 여부
     */
    static releaseClass(p_fullName: string): boolean;

    /**
     * 네임스페이스(ns)에서 생성자 또는 객체를 찾아 전체 경로를 돌려줍니다.
     * @param p_target 생성자 또는 객체
     * @returns 네임스페이스 전체 이름 또는 undefined
     */
    static findClass(p_target: any): string | undefined;

    /**
     * 네임스페이스(ns)에서 전체 이름에 대한 생성자 또는 객체를 얻습니다.
     * @param p_fullName 전체 경로
     * @returns 객체 또는 생성자
     */
    static getClass(p_fullName: string): any;
}

export default MetaRegistry;
export { MetaRegistry };
