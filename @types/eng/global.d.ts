
import Util = require("./util");
import Type = require("./type");
import Observer = require("./observer");

declare namespace _L {
}



// interface common {

// }

declare namespace _L.Common {

    // export ;
    // const aa: string;

    // type Observer = Observer;
    // export = Observer;
    // export {Observer, aa}
    // export namespace Observer;
    // namespace Observer;
    // namespace Observer = O
    export { Observer, Util, Type };
    // var aaa: Observer;


}
declare namespace _L.Interface {
    const aa: string;
}

declare namespace _L.Collection {
    
}

declare namespace _L.Meta {
    
}

// TODO: Entithy 로 분리 대상
declare namespace _L.Meta.Entity {
    
}


declare namespace _L.Etc {
    
    //~ 'myLib.timeout = 50;' 라고 사용할 수 있습니다.
    let timeout: number;

    //~ 'myLib.version'에 접근할 수 있지만, 수정할 순 없습니다.
    const version: string;

    //~ 'let c = new myLib.Cat(42)' 또는 참조 (예. 'function f(c: myLib.Cat) { ... }) 를 통해
    //~ 클래스를 만들 수 있습니다
    class Cat {
        constructor(n: number);

        //~ 'Cat' 인스턴스에서 'c.age'를 읽을 수 있습니다
        readonly age: number;

        //~ 'Cat' 인스턴스에서 'c.purr()'를 호출할 수 있습니다.
        purr(): void;
    }

    //~ 다음과 같이 변수를 선언할 수 있습니다.
    //~   'var s: myLib.CatSettings = { weight: 5, name: "Maru" };'
    interface CatSettings {
        weight: number;
        name: string;
        tailLength?: number;
    }

    //~ 'const v: myLib.VetID = 42;'라고 작성할 수 있습니다.
    //~  또는 'const v: myLib.VetID = "bob";'
    type VetID = string | number;

    //~ 'myLib.checkCat(c)' 나 'myLib.checkCat(c, v);'을 호출할 수 있습니다.

    /**
     * asfdsafasf
     * @param c 
     * @param s 
     */
    function checkCat(c: Cat, s?: VetID);
}


declare class Observer2 {
    /**
     * 관찰자
     * @param p_caller 
     */
    constructor(p_caller: object);
    init(): void;
    subscribe(p_fn: Function, p_code: string): void;
    // 구독 취고
    unsubscribe(p_fn: Function, p_code: string): void;
    /**
     * 출판
     * @param p_code 
     */
    publish(p_code: string): void
}

// declare namespace _L {
//     // function checkCat(c: Cat, s?: VetID);
//     // const Observer = Observer2;
// }
