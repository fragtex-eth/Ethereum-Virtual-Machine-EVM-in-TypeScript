import "./main.css";
import evm from "../EVM/evm";
import { useState } from "react";

//@note what is the correct line
function Main({ setOutput}: { setOutput: any }) {
  function hexStringToUint8Array(hexString: string) {
    return new Uint8Array(
      (hexString?.match(/../g) || []).map((byte) => parseInt(byte, 16))
    );
  }

  function handleChange(e: any) {
    let input = hexStringToUint8Array(e.target.value);
    let newOutput = evm(input, "", "", "");
    console.log(newOutput);
    setOutput(newOutput);
  }

  return (
    <div className="Main">
      <textarea onChange={(e) => handleChange(e)} name="" id=""></textarea>
    </div>
  );
}

export default Main;
