import calculate from "calculate-string"
import { useState } from "react"

function App() {
  const [calc, setCalc] = useState("")
  const [result, setResult] = useState("")

  const operators = ["/", "*", "+", "-", "CE", "x²", "√x", "←"]
  const digits = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "="]

  const calcAll = () => {
    setCalc(calculate(calc.toString()))
    setResult("")
  }

  const deleteLast = () => calc !== "" && setCalc(prev => prev.slice(0, -1))

  const clearAll = () => {
    setCalc("")
    setResult("")
  }

  const square = () =>
    setCalc(prev => Math.pow(calculate(prev.toString()), 2).toString())

  const root = () => setCalc(prev => Math.sqrt(calculate(prev)).toString())

  const updateCalc = value => {
    const allOperators = [...operators, "."]
    if (value === "=") return calcAll()
    else if (value === "←") return deleteLast()
    else if (value === "CE") return clearAll()
    else if (value === "x²") {
      if (allOperators.includes(calc.slice(-1))) return
      return square()
    } else if (value === "√x") {
      if (allOperators.includes(calc.slice(-1))) return
      return root()
    } else if (value === "-") {
      if (allOperators.includes(calc.slice(-1))) return
      setCalc(calc + value)
    } else if (
      (allOperators.includes(value) && calc === "") ||
      (allOperators.includes(value) && allOperators.includes(calc.slice(-1)))
    ) {
      return
    }
    setCalc(calc + value)
    if (!allOperators.includes(value)) {
      setResult(calculate((calc + value).toString()))
    }
  }
  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""}
          &nbsp;
          {calc || 0}
        </div>
        <div className="operators">
          {operators.map(operator => (
            <button key={operator} onClick={() => updateCalc(operator)}>
              {operator}
            </button>
          ))}
        </div>

        <div className="digits">
          {digits.map(digit => (
            <button key={digit} onClick={() => updateCalc(digit)}>
              {digit}
            </button>
          ))}
        </div>
      </div>
      <p className="credit">
        <a href="https://savcodes.dev">Sav Costabile</a>&nbsp;© 2022
      </p>
    </div>
  )
}

export default App
