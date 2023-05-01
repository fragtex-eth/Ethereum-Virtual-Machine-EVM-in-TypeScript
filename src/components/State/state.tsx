import React, { useState, Dispatch, SetStateAction } from "react";
import "./state.css";

interface AddressData {
  balance: string;
  code: {
    bin: string;
  };
}

interface InputData {
  address: string;
  code: string;
  balance: string;
}

interface StateProps {
  addresses: { [key: string]: AddressData };
  setAddresses: Dispatch<SetStateAction<{ [key: string]: AddressData }>>;
}

const State: React.FC<StateProps> = ({ addresses, setAddresses }) => {
  const [inputData, setInputData] = useState<InputData>({
    address: "",
    code: "",
    balance: "",
  });

  const handleAdd = () => {
    setAddresses((prevState) => ({
      ...prevState,
      [inputData.address]: {
        balance: inputData.balance,
        code: { bin: inputData.code },
      },
    }));
    setInputData({ address: "", code: "", balance: "" });
    console.log(addresses);
  };

  return (
    <div className="State">
      <div className="statecontainer">
        <div className="addaddress">
          <span className="from">address</span>
          <input
            type="text"
            className="address"
            value={inputData.address}
            onChange={(e) =>
              setInputData({ ...inputData, address: e.target.value })
            }
          />
          <span className="from">code</span>
          <input
            type="text"
            className="code"
            value={inputData.code}
            onChange={(e) =>
              setInputData({ ...inputData, code: e.target.value })
            }
          />
          <span className="from">balance</span>
          <input
            type="text"
            className="balance"
            value={inputData.balance}
            onChange={(e) =>
              setInputData({ ...inputData, balance: e.target.value })
            }
          />
          <button className="add" onClick={handleAdd}></button>
        </div>
        <div className="displayaddress">
          {Object.entries(addresses).map(([key, value], index) => {
            const item = value as AddressData;
            return (
              <div className="singleaddress" key={index}>
                <span className="address">{key}</span>{" "}
                <span className="balance">{item.balance}</span>{" "}
                {item.code.bin && <span className="code">{item.code.bin}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default State;
