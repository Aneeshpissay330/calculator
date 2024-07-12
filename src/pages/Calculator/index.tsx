import { useEffect, useState } from "react";
import DisplayWindow from "../../components/DisplayWindow";
import KeysWindow from "../../components/KeysWindow";

type SciFunc = {
    [key: string]: string;
};

const sciFunc: SciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
};

const Calculator = () => {
    const [expression, setExpression] = useState<string>("");
    const [displayEXP, setDisplayEXP] = useState<string>("");
    const [result, setResult] = useState<string>("0");

    const calcResult = () => {
        if (expression.length !== 0) {
            try {
                // eslint-disable-next-line no-eval
                let compute = eval(expression);
                compute = parseFloat(compute.toFixed(4));
                setResult(compute.toString());
            } catch (error) {
                setResult("An Error Occurred!");
            }
        } else {
            setResult("An Error Occurred!");
        }
    };

    const handleButton = (value: string) => {
        if (value === "AC") {
            setExpression("");
            setDisplayEXP("");
            setResult("0");
        } else if (value === "DEL") {
            setDisplayEXP(displayEXP.slice(0, -1));
            setExpression(expression.slice(0, -1));
        } else if (sciFunc.hasOwnProperty(value)) {
            setDisplayEXP(displayEXP + value);
            setExpression(expression + sciFunc[value]);
        } else if (value === "!") {
            const lastNum = extractLastNum(expression);
            if (lastNum != null) {
                const num = parseFloat(lastNum);
                setDisplayEXP(displayEXP + value);
                setExpression(expression.replace(lastNum, factorial(num).toString()));
            }
        } else if (value === "=") {
            calcResult();
        } else {
            setExpression(expression + value);
            setDisplayEXP(displayEXP + value);
        }
    };

    const factorial = (n: number): number => {
        let result = 1;
        for (let i = 1; i <= n; i++) result *= i;
        return result;
    };

    const extractLastNum = (exp: string): string | null => {
        const numbers = exp.match(/\d+(\.\d+)?/g); // Match integers and floats
        return numbers ? numbers[numbers.length - 1] : null;
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        const { key } = event;
        if (key === "Enter" || key === "=") {
            handleButton("=");
        } else if (key === "Backspace") {
            handleButton("DEL");
        } else if ("0123456789+-*/".includes(key)) {
            handleButton(key);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [expression, displayEXP, result]);
    return (
        <div className="calculator">
            <DisplayWindow expression={displayEXP} result={result} />
            <KeysWindow handleButton={handleButton} />
        </div>
    );
};

export default Calculator;