/* eslint-disable no-eval */
import { useState } from "react";

function App() {
  const [input, setInput] = useState("0");
  const [isDecimal, setIsDecimal] = useState(false);

  const operators = ["-", "+", "*", "/"];

  const getLastLetter = () => {
    return input.toString().slice(-1);
  };

  const handleClick = (value: string) => {
    if (input === "0") {
      setInput("");
    }

    if (operators.includes(value)) {
      if (operators.includes(getLastLetter()) && value !== "-") {
        for (let i = input.length - 1; i !== 0; i--) {
          if (operators.includes(input.charAt(i))) {
            setInput((prev) => prev.slice(0, i + 1));
          }
        }
        setInput((prev) => prev.slice(0, -1));
      }

      setIsDecimal(false);
      setInput((prev) => prev + value);
      return;
    }

    switch (value) {
      case "C":
        setInput("0");
        setIsDecimal(false);
        return;

      case "=":
        try {
          setInput(eval(input));
        } catch (error) {
          console.error(error);
        }

        setIsDecimal(false);
        return;

      case ".":
        if (!isDecimal) {
          setInput((prev) => prev + value);
          setIsDecimal(true);
        }
        return;
    }

    setInput((prev) => prev + value);
  };

  const buttons = [
    { id: "zero", value: "0" },
    { id: "one", value: "1" },
    { id: "two", value: "2" },
    { id: "three", value: "3" },
    { id: "four", value: "4" },
    { id: "five", value: "5" },
    { id: "six", value: "6" },
    { id: "seven", value: "7" },
    { id: "eight", value: "8" },
    { id: "nine", value: "9" },
    { id: "add", value: "+" },
    { id: "subtract", value: "-" },
    { id: "multiply", value: "*" },
    { id: "divide", value: "/" },
    { id: "decimal", value: "." },
    { id: "clear", value: "C" },
    { id: "equals", value: "=" },
  ];

  return (
    <div className="calculator">
      <div id="display">{input}</div>

      <div className="buttons">
        {buttons.map((button, id) => (
          <button
            key={id}
            id={button.id}
            onClick={() => handleClick(button.value)}
          >
            {button.value}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
