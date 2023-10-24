

//## 타입 허용 관계
var all = []
var all = [[]]
{
    //__ 필수 __
    var any = ['_any_']
    {
        var choice = [String]
        {
            var seq = ['_seq_', String] // 재귀적 하위
        }
    }
    //__ 선택 __
    var opt = ['_opt_', String] // 재귀적 하위
    {
        var choice = [String]
        {
            var seq = ['_seq_', String] // 재귀적 하위
        }        
    }
}

var str = String;

/**
 * all      : 모두 허용
 *  - 모든 대상이 허용됨    => [], [[]]
 * 
 * any      : 자신과 val, seq 허용
 *  - 필수타입만 허용       => any, [String], ['seq', String]
 * 
 * opt      : 자신과 val, seq 허용
 *  - 매칭타입만 허용       => ['opt', String, Number] = [String], ['seq', Number]
 * 
 * val   : 자신과 seq 허용
 *  - 필수&매칭 허용        => [String, Number] = [String], ['seq', Number]
 * 
 * seq      : 자산만 허용
 *  - 자신과 같은 seq 허용  => ['seq', Number] = ['seq', Number, String], ['seq', Number]
 * 
 * non      : 자산만 허용
 */