// https://github.com/devrafalko/string-math

type EQ = string
export function stringMath(eq: EQ) {
  const mulDiv = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([*/])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/
  const plusMin = /([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*([+-])\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)/
  const parentheses = /(\d)?\s*\(([^()]*)\)\s*/
  while (eq.search(/^\s*([+-]?\d*\.?\d+(?:e[+-]\d+)?)\s*$/) === -1) {
    eq = fParentheses(eq)
  }
  return +eq

  function fParentheses(eq: EQ) {
    while (eq.search(parentheses) !== -1) {
      eq = eq.replace(parentheses, (_a, b, c) => {
        c = fMulDiv(c)
        c = fPlusMin(c)
        return typeof b === 'string' ? b + '*' + c : c
      })
    }
    eq = fMulDiv(eq)
    eq = fPlusMin(eq)
    return eq
  }

  function fMulDiv(eq: EQ) {
    while (eq.search(mulDiv) !== -1) {
      eq = eq.replace(mulDiv, (a) => {
        const sides = mulDiv.exec(a)
        const result =
          // @ts-ignore
          sides[2] === '*' ? sides[1] * sides[3] : sides[1] / sides[3]
        return '' + (result >= 0 ? '+' + result : result)
      })
    }
    return eq
  }

  function fPlusMin(eq: EQ) {
    eq = eq.replace(/([+-])([+-])(\d|\.)/g, (_a, b, c, d) => {
      return (b === c ? '+' : '-') + d
    })
    while (eq.search(plusMin) !== -1) {
      eq = eq.replace(plusMin, (a) => {
        const sides = plusMin.exec(a)
        return (
          '' +
          // @ts-ignore
          (sides[2] === '+' ? +sides[1] + +sides[3] : +sides[1] - +sides[3])
        )
      })
    }
    return eq
  }
}
