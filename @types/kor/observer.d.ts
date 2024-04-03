/**
 * 관찰자 클래스 입니다.
 */
declare class Observer {
    
    /**
     * 관찰자 객체를 생성합니다.
     * @param caller 소유자
     */
    constructor(caller: object);
    
    /**
     * 전역 구독자 
     */
    $subscribers: object;

    /**
     * 호출함수의 this 
     */
    _caller: object;

    /**
     * 목록
     */
    list: object[];

    /**
     * 콘솔로드 출력 여부
     */
    isLog: boolean;

    /**
     * 싱글모드는 callback 같이 작동함
     * 구독자 멀티모드, 단일시(false) 마지막 등록 구독자만 활성화 (기본값:true) 
     */
    isSingleMode: boolean;

    /**
     * 초기화 객체 얻기
     */
    _getInitObject(): object; // TODO: 타입 노출

    /**
     * 관찰자 객체를 초기화합니다.
     */
    init();
    
    /**
     * 관찰자에 함수를 구독합니다.
     * @param fn 
     * @param code 
     */
    subscribe(fn: Function, code?: string): void;
   
    /**
     * 관찰자에 함수를 구독해제합니다.
     * @param code 
     * @param fn 
     */
    unsubscribe(code?: string, fn?: Function): void;
  
    /**
     * 발행합니다. 구독 함수를 호출 합니다.
     * @param code 
     */
    publish(code?: string): void;
}

export = Observer;