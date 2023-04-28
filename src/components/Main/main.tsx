import "./main.css";
import evm from "../EVM/evm";
import { useState } from "react";

function Main() {
  const [output, setOutput] = useState<any>(
    {}
  )

  function hexStringToUint8Array(hexString: string) {
    return new Uint8Array(
      (hexString?.match(/../g) || []).map((byte) => parseInt(byte, 16))
    );
  }


async function handleChange(e:any) {
    console.log()
    let newOutput = await evm(hexStringToUint8Array(e.target.value), "", "", "");
    setOutput(newOutput);
    console.log(output);
  }

  return (
    <div className="Main">
      <textarea onChange={(e) => handleChange(e)} name="" id=""></textarea>
      <p className="test1223">Output: {}</p>
    </div>
  );
}

export default Main;
