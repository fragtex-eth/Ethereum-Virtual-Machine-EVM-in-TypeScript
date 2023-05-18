import React, { useState, Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

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
  setAddressesVis: Dispatch<SetStateAction<boolean>>;
}

const State: React.FC<StateProps> = ({
  addresses,
  setAddresses,
  setAddressesVis,
}) => {
  const [inputData, setInputData] = useState<InputData>({
    address: "",
    code: "Code",
    balance: "Balance",
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
    <div className="setParameters">
      <div className="circle"></div>
      <IconContext.Provider value={{ className: "icon-close" }}>
        <div className="icon_container" onClick={() => setAddressesVis(false)}>
          <IoClose />
        </div>
      </IconContext.Provider>
      <h3>State</h3>

      <div className="sContainer">
        <div className="row">
          <div className="singleitem">
            <span className="from">Address:</span>
            <input
              type="text"
              className="stateInput"
              value={inputData.address}
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
            />

            <input
              type="text"
              className="stateInput stateInside"
              value={inputData.code}
              onChange={(e) =>
                setInputData({ ...inputData, code: e.target.value })
              }
            />
            <input
              type="text"
              className="stateInput stateInside"
              value={inputData.balance}
              onChange={(e) =>
                setInputData({ ...inputData, balance: e.target.value })
              }
            />
            <button className="btn_done" onClick={handleAdd}>
              Add
            </button>
          </div>

          <div className="singleitem sIDisplay">
            {Object.entries(addresses).map(([key, value], index) => {
              const item = value as AddressData;
              return (
                <div className="singleitem" key={index}>
                  <span className="stateInputFixed">{key}</span>{" "}
                  <span className="stateInputFixed stateInside">
                    {item.balance}
                  </span>{" "}
                  {item.code.bin && (
                    <span className="stateInputFixed stateInside">
                      {item.code.bin}
                    </span>
                  )}
                  <div className="buttoncontainer buttonremove">
                    <button
                      className="btn_done"
                      onClick={() => setAddressesVis(false)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="buttoncontainer buttoncontainer3">
        <button className="btn_done" onClick={() => setAddressesVis(false)}>
          Done
        </button>
      </div>
    </div>
  );
};

export default State;
