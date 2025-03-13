// function restoreArrowFunction(transformedCode) {
//     // 1. 화살표 함수의 매개변수와 본문 전체를 추출
//     const regex = /\((.*?)\)\s*=>\s*\{([\s\S]*)\}/;
//     const match = transformedCode.match(regex);
  
//     if (!match) {
//       throw new Error("Invalid arrow function format.");
//     }
  
//     // 2. 매개변수와 함수 본문 부분 분리
//     let params = match[1].trim();  
//     let body = match[2].trim();    
  
//     // 3. 구조 분해 할당 패턴 (객체/배열 모두 대응) - 여러 줄(줄바꿈)도 허용
//     //    예: let { aa: String } = _ref5;  또는 let [[{ bb: Number }]] = _ref6;
//     const paramAssignments = body.match(/let\s+(\{[\s\S]*?\}|\[[\s\S]*?\])\s*=\s*(\w+);/g) || [];
  
//     // 4. 찾아낸 구조 분해 할당들을 순회하며 매개변수( _ref5, _ref6 등 )를 원래 형태로 치환
//     paramAssignments.forEach(assign => {
//       // - parts[1]: { aa: String } 또는 [String] 등 (줄바꿈 포함 가능)
//       // - parts[2]: _ref5, _ref6 등
//       const parts = assign.match(/let\s+(\{[\s\S]*?\}|\[[\s\S]*?\])\s*=\s*(\w+);/);
//       if (parts) {
//         const extractedParam = parts[1].trim(); // 원래 구조
//         const originalParam = parts[2].trim();  // 변환된 변수명 (_ref5 등)
  
//         // 매개변수 목록에 있던 _ref5 등을 { aa: String } 등으로 치환
//         params = params.replace(new RegExp(`\\b${originalParam}\\b`, 'g'), extractedParam);
//       }
//     });
  
//     // 5. return 문이 있다면 반환 타입을 추출, 없으면 기본으로 "{}" 사용
//     const returnStatementMatch = body.match(/return\s+(.*?);/);
//     let returnType = returnStatementMatch ? returnStatementMatch[1].trim() : "{}";
  
//     // 6. 기본 복구 결과 생성
//     let restored = `(${params}) => ${returnType};`;
  
//     // 7. **객체 내부 공백/줄바꿈 제거** (필요하다면 중첩 구조도 정규식으로 간단히 처리 가능)
//     restored = removeWhitespaceInsideCurly(restored);
    
//     return restored;
// }
  
// /**
//  * 객체 { } 안의 줄바꿈, 과도한 공백을 제거하는 함수
//  */
// function removeWhitespaceInsideCurly(code) {
//     //  - /{([\s\S]*?)}/g : 중괄호 { } 내부를 찾음 (줄바꿈 포함)
//     //  - p1이 실제 중괄호 내부 내용
//     //  - 내부 연속 공백/개행(\s+)을 한 칸(' ')으로 바꾸고, 앞뒤 공백은 trim()
//     return code.replace(/\{\s*([\s\S]*?)\s*\}/g, (match, p1) => {
//         const content = p1.replace(/\s+/g, ' ').trim();  
//         return `{${content}}`;
//     });
// }

function restoreArrowFunction(transformedCode) {
    // 1. 화살표 함수의 매개변수와 본문 전체를 추출
    const regex = /\((.*?)\)\s*=>\s*\{([\s\S]*)\}/;
    const match = transformedCode.match(regex);
  
    // 특별히 `_ref => { ... }` 형태도 대응할 수 있도록 추가 처리
    //  -> _ref => { let [String] = _ref; return Number; }
    //  -> 실제로는 ( _ref ) => { ... } 형태로 통일
    if (!match) {
      // 혹시 _ref => { ... } 형태라면, 강제로 괄호를 넣어 재시도
      const altRegex = /^(.*?)\s*=>\s*\{([\s\S]*)\}/;
      const altMatch = transformedCode.match(altRegex);
      if (!altMatch) {
        throw new Error("Invalid arrow function format.");
      }
      // altMatch[1] = "_ref"
      // altMatch[2] = "let [String] = _ref; return Number;"
      let altParams = altMatch[1].trim();
      let altBody = altMatch[2].trim();
  
      // 화살표 함수 형태 통일:  ( _ref ) => { ... }
      return restoreArrowFunction(`(${altParams}) => {${altBody}}`);
    }
  
    // 2. 매개변수와 함수 본문 부분 분리
    let params = match[1].trim();  // 함수의 매개변수 부분
    let body = match[2].trim();    // 함수 본문
  
    // 3. 구조 분해 할당 패턴 (객체/배열 모두 대응) - 여러 줄(줄바꿈)도 허용
    //    예: let { aa: String } = _ref5;  또는 let [[{ bb: Number }]] = _ref6;
    const paramAssignments = body.match(/let\s+(\{[\s\S]*?\}|\[[\s\S]*?\])\s*=\s*(\w+);/g) || [];
  
    // 4. 찾아낸 구조 분해 할당들을 순회하며 매개변수( _ref5, _ref6 등 )를 원래 형태로 치환
    paramAssignments.forEach(assign => {
      // - parts[1]: { aa: String } 또는 [String] 등 (줄바꿈 포함 가능)
      // - parts[2]: _ref5, _ref6 등
      const parts = assign.match(/let\s+(\{[\s\S]*?\}|\[[\s\S]*?\])\s*=\s*(\w+);/);
      if (parts) {
        const extractedParam = parts[1].trim(); // 원래 구조
        const originalParam = parts[2].trim();  // 변환된 변수명 (_ref5 등)
  
        // 매개변수 목록에 있던 _ref5 등을 { aa: String } 등으로 치환
        const re = new RegExp(`\\b${originalParam}\\b`, 'g');
        params = params.replace(re, extractedParam);
      }
    });
  
    // 5. return 문이 있다면 반환값을 추출
    //    예: return Number; -> "Number"
    const returnStatementMatch = body.match(/return\s+(.*?);/);
    let returnType = returnStatementMatch ? returnStatementMatch[1].trim() : "";
  
    // 6. 최종 복원 – return 문이 있다면 { return ... } 형태로, 없으면 { } 로
    if (returnType) {
      // 불필요한 공백 없애기 위해 파라메터 부분도 스페이스 정리
      params = params.replace(/\s+/g, '');
      return `(${params})=>{return ${returnType}}`;
    } else {
      params = params.replace(/\s+/g, '');
      return `(${params})=>{}`;
    }
  }
  

// ✅ 사용 예제
const transformedCode = `
(_ref10, _ref11) => {
    let [String] = _ref10;
    let [[RegExp]] = _ref11;
    return String;
}
`;
const code1 = `
(_ref2) => {
    let [String] = _ref2;
    return undefined;
}
`;

const code2 = `
(Number, _ref2) => {
    let [String] = _ref2;
    return undefined;
}
`;
const code3 = `(_ref3, _ref4) => {
    let [String] = _ref3;
    let [[Number]] = _ref4;
}`;
    
const code4 = `(_ref5, _ref6) => {
    let {
        aa: String
    } = _ref5;
    let [[{
        bb: Number
    }]] = _ref6;
    }
`;

const code5 = `_ref => {
          let [String] = _ref;
          return Number;
        }`

// var type07 = ([String])=>{return Number}

console.log(restoreArrowFunction(transformedCode));
// 결과: ([String], [[RegExp]]) => String
console.log(restoreArrowFunction(code1));
// 결과: (([String])) => undefined;
console.log(restoreArrowFunction(code2));
// 결과: ((Number, [String])) => undefined;
console.log(restoreArrowFunction(code3));
// 결과: ([String], [[Number]])=>{}
console.log(restoreArrowFunction(code4));
// 결과: ({aa: String}, [[{bb: Number}]])=>{}
console.log(restoreArrowFunction(code5));
// 결과: ([String])=>{return Number}

