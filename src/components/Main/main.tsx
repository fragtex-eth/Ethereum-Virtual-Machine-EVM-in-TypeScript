import React, { ChangeEvent, useEffect } from "react";
import evm from "../EVM/evm";
import { MainProps } from "../types";
import "./main.css";

const Main: React.FC<MainProps> = ({
  setOutput,
  tx,
  setTxVis,
  setBlockVis,
  setAddressesVis,
  block,
  addresses,
}) => {
  const hexStringToUint8Array = (hexString: string): Uint8Array => {
    return new Uint8Array(
      (hexString?.match(/../g) || []).map((byte) => parseInt(byte, 16))
    );
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = hexStringToUint8Array(e.target.value);
    const newOutput = evm(input, tx, block, addresses);
    console.log(newOutput);
    setOutput(newOutput);
  };

  useEffect(() => {
    setOutput(
      evm(
        hexStringToUint8Array(
          "60056005600860055255600560086009608060806088607753"
        ),
        tx,
        block,
        addresses
      )
    );
  }, []); 

  return (
    <div className="Main">
      <h2>Message</h2>
      <textarea
        onChange={handleChange}
        name=""
        id=""
        placeholder="60056005600860055255600560086009608060806088607753"
      ></textarea>
      <div className="settings">
        <button className="btn_state" onClick={() => setTxVis(true)}>
          Transaction
        </button>
        <button className="btn_state" onClick={() => setBlockVis(true)}>
          Block
        </button>
        <button className="btn_state" onClick={() => setAddressesVis(true)}>
          State
        </button>
      </div>
    </div>
  );
};

export default Main;
