import { useState } from 'react'
import './App.css'

function App() {
  const [result, setResult] = useState("")
  const [expression, setExpression] = useState("")

  const et = expression.trim()

  const isOperator = (symbol: string) => {
  return /[*/+-]/.test(symbol)
  }

  const btnPress = (symbol: string) => {
    if (symbol === "clear") {
      setResult("")
      setExpression("0")
    } else if (symbol === "reverse") {
      if (result === "") return;
      setResult(
        result.toString().charAt(0) === "-" ? result.slice(1) : "-" + result
      )
    } else if (symbol === "percent") {
      if (result === "") return;
      setResult((parseFloat(result) / 100).toString())
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ")
    } else if (symbol === "=") {
      calculate()
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol)
      }
    } else if ( symbol === ".") {
      // split by operators and get last number
      const lastNum = expression.split(/[-+/*]/g).pop()
      if (!lastNum) return;
      console.log("lastNum :>> ", lastNum)
      // if last number already has a decimal, don't add another
      if (lastNum?.includes(".")) return;
      setExpression(expression + symbol)
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol)
      } else {
        setExpression(expression + symbol)
      }
    }
  }

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ")
    const newParts = []

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i])
        let j = 0
        let k = i - 1
        while (isOperator(parts[k])) {
          k--
          j++
        }
        i -= j
      } else {
        newParts.unshift(parts[i])
      }
    }
    const newExpression = newParts.join(" ")
    if (isOperator(newExpression.charAt(0))) {
      setResult(eval(result + newExpression) as string)
    } else {
      setResult(eval(newExpression) as string)
    }
    setExpression("")
  }
  

  return (
    <>
      <div className="container">
        <h1>JavaScript Calculator</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="result">{result}</div>
            <div id="expression">{expression}</div>
          </div>
          <button 
            id='clear'
            className="red"
            onClick={() => btnPress("clear")}
          >
            C
          </button>
          <button 
            id='reverse'
            className="yellow"
            onClick={() => btnPress("reverse")}
          >
            +/-
          </button>
          <button 
            id='percent'
            className="yellow"
            onClick={() => btnPress("percent")}
          >
            %
          </button>
          <button 
            id='divide'
            className="light-gray"
            onClick={() => btnPress("/")}
          >
            /
          </button>
          <button 
            id='seven'
            className="dark-gray"
            onClick={() => btnPress("7")}
          >
            7
          </button>
          <button 
            id='eight'
            className="dark-gray"
            onClick={() => btnPress("8")}
          >
            8
          </button>
          <button 
            id='nine'
            className="dark-gray"
            onClick={() => btnPress("9")}
          >
            9
          </button>
          <button 
            id='multiply'
            className="light-gray"
            onClick={() => btnPress("*")}
          >
            *
          </button>
          <button 
            id='four'
            className="dark-gray"
            onClick={() => btnPress("4")}
          >
            4
          </button>
          <button 
            id='five'
            className="dark-gray"
            onClick={() => btnPress("5")}
          >
            5
          </button>
          <button 
            id='six'
            className="dark-gray"
            onClick={() => btnPress("6")}
          >
            6
          </button>
          <button 
            id='subtract'
            className="light-gray"
            onClick={() => btnPress("-")}
          >
            -
          </button>
          <button 
            id='one'
            className="dark-gray"
            onClick={() => btnPress("1")}
          >
            1
          </button>
          <button 
            id='two'
            className="dark-gray"
            onClick={() => btnPress("2")}
          >
            2
          </button>
          <button 
            id='three'
            className="dark-gray"
            onClick={() => btnPress("3")}
          >
            3
          </button>
          <button 
            id='add'
            className="light-gray"
            onClick={() => btnPress("+")}
          >
            +
          </button>
          <button 
            id='zero'
            className="dark-gray"
            onClick={() => btnPress("0")}
          >
            0
          </button>
          <button 
            id='decimal'
            className="yellow"
            onClick={() => btnPress(".")}
          >
            .
          </button>
          <button 
            id='equals'
            className="green"
            onClick={() => btnPress("=")}
          >
            =
          </button>
        </div>
      </div>
    </>
  )
}

export default App
