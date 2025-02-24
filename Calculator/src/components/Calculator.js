import React, { useState, useEffect } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/\d/.test(key) || ["+", "-", "*", "/", ".", "^"].includes(key)) {
      setInput((prev) => prev + key);
    } else if (key === "Enter") {
      event.preventDefault(); // Prevent form submission
      calculate();
    } else if (key === "Backspace") {
      handleBackspace();
    }
  };

  const calculate = () => {
    try {
      // Replace ^ with ** for exponentiation
      const expression = input.replace(/\^/g, "**");
      // eslint-disable-next-line no-new-func
      const safeEval = new Function(`return ${expression}`);
      setResult(safeEval());
    } catch (error) {
      setResult("Error");
    }
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly />
        <input type="text" value={result} readOnly />
      </div>
      <div className="buttons">
        {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", "00", ".", "/", "^", "="].map((value) => (
          <button key={value} onClick={() => (value === "=" ? calculate() : handleClick(value))}>
            {value}
          </button>
        ))}
        <button onClick={clearInput}>C</button>
        <button onClick={handleBackspace}>←</button>
      </div>
    </div>
  );
};

export default Calculator;
