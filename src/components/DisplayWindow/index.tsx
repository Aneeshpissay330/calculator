import React from "react";

type DisplayWindowProps = {
    expression: string;
    result: string;
}

const DisplayWindow : React.FunctionComponent<DisplayWindowProps> = ({ expression, result }) => {
    return (
      <div className="displayWindow">
        <p className="expression">{expression}</p>
        <p className="result">{result}</p>
      </div>
    );
  };
  
  export default DisplayWindow;