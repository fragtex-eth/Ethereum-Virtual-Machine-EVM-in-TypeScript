import "./main.css";
import evm from "../EVM/evm";
import { useState } from "react";

interface TxState {
  from: string;
  to: string;
  origin: string;
  gasprice: string;
  value: string;
  data: string;
}
interface BlockState {
  basefee: string;
  coinbase: string;
  timestamp: string;
  number: string;
  difficulty: string;
  gaslimit: string;
  chainid: string;
}
interface AddressData {
  balance: string;
  code: {
    bin: string;
  };
}

interface MainProps {
  setOutput: (output: any) => void;
  tx: TxState;
  block: BlockState;
  addresses: { [key: string]: AddressData };
}

//@note what is the correct line
function Main({ setOutput, tx, block, addresses }: MainProps) {
  function hexStringToUint8Array(hexString: string) {
    return new Uint8Array(
      (hexString?.match(/../g) || []).map((byte) => parseInt(byte, 16))
    );
  }

  function handleChange(e: any) {
    let input = hexStringToUint8Array(e.target.value);
    let newOutput = evm(input, tx, block, addresses);
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
