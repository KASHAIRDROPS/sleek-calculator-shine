import { useState } from "react";

type Operation = "+" | "-" | "×" | "÷" | null;

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [resetNext, setResetNext] = useState(false);

  const handleNumber = (num: string) => {
    if (resetNext) {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (a: number, b: number, op: Operation): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? 0 : a / b;
      default: return b;
    }
  };

  const handleOperation = (op: Operation) => {
    const current = parseFloat(display);
    if (previousValue !== null && operation && !resetNext) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    } else {
      setPreviousValue(current);
    }
    setOperation(op);
    setResetNext(true);
  };

  const handleEquals = () => {
    if (previousValue === null || !operation) return;
    const current = parseFloat(display);
    const result = calculate(previousValue, current, operation);
    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setResetNext(false);
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const formatDisplay = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    if (value.endsWith(".")) return value;
    if (value.includes(".") && value.endsWith("0")) return value;
    if (Math.abs(num) >= 1e12) return num.toExponential(4);
    return num.toLocaleString("en-US", { maximumFractionDigits: 10 });
  };

  const displayFontSize = display.length > 12 ? "text-3xl" : display.length > 8 ? "text-4xl" : "text-5xl";

  const Key = ({
    label,
    onClick,
    variant = "number",
    span2 = false,
  }: {
    label: string;
    onClick: () => void;
    variant?: "number" | "operator" | "function";
    span2?: boolean;
  }) => {
    const base =
      "flex items-center justify-center rounded-2xl font-semibold text-xl transition-all duration-150 active:scale-95 select-none cursor-pointer h-[72px]";
    const variants = {
      number: "bg-calc-key hover:bg-calc-key-hover active:bg-calc-key-active text-foreground",
      operator: `bg-calc-operator hover:bg-calc-operator-hover active:bg-calc-operator-active text-primary-foreground shadow-[0_0_20px_hsl(var(--calc-glow)/0.3)]`,
      function: "bg-calc-function hover:bg-calc-function-hover text-foreground",
    };

    return (
      <button
        className={`${base} ${variants[variant]} ${span2 ? "col-span-2" : ""}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-[360px]">
        {/* Glow effect */}
        <div className="relative">
          <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,hsl(var(--calc-glow)/0.15),transparent_70%)] rounded-[2rem] blur-xl" />

          <div className="relative bg-card rounded-3xl p-5 shadow-2xl border border-border/50">
            {/* Display */}
            <div className="bg-calc-display rounded-2xl p-6 mb-4 min-h-[120px] flex flex-col justify-end items-end overflow-hidden">
              {previousValue !== null && operation && (
                <span className="text-muted-foreground text-sm mb-1 font-mono">
                  {previousValue.toLocaleString()} {operation}
                </span>
              )}
              <span className={`${displayFontSize} font-mono font-bold text-foreground tracking-tight leading-none`}>
                {formatDisplay(display)}
              </span>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-3">
              <Key label="AC" onClick={handleClear} variant="function" />
              <Key label="+/−" onClick={handleToggleSign} variant="function" />
              <Key label="%" onClick={handlePercent} variant="function" />
              <Key label="÷" onClick={() => handleOperation("÷")} variant="operator" />

              <Key label="7" onClick={() => handleNumber("7")} />
              <Key label="8" onClick={() => handleNumber("8")} />
              <Key label="9" onClick={() => handleNumber("9")} />
              <Key label="×" onClick={() => handleOperation("×")} variant="operator" />

              <Key label="4" onClick={() => handleNumber("4")} />
              <Key label="5" onClick={() => handleNumber("5")} />
              <Key label="6" onClick={() => handleNumber("6")} />
              <Key label="-" onClick={() => handleOperation("-")} variant="operator" />

              <Key label="1" onClick={() => handleNumber("1")} />
              <Key label="2" onClick={() => handleNumber("2")} />
              <Key label="3" onClick={() => handleNumber("3")} />
              <Key label="+" onClick={() => handleOperation("+")} variant="operator" />

              <Key label="0" onClick={() => handleNumber("0")} span2 />
              <Key label="." onClick={handleDecimal} />
              <Key label="=" onClick={handleEquals} variant="operator" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
