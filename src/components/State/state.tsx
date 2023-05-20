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
    code: "",
    balance: "",
  });

 const handleAdd = () => {
   // Ethereum address validation
   const addressValidation = /^0x[a-fA-F0-9]{40}$/;
   if (!addressValidation.test(inputData.address)) {
     alert("Address should be 42 characters long and start with 0x");
     return;
   }
   // Balance validation
   if (isNaN(parseFloat(inputData.balance))) {
     alert("Balance should be a valid number");
     return;
   }
   // Code validation
   const codeValidation = /^[a-zA-Z0-9]*$/;
   if (!codeValidation.test(inputData.code)) {
     alert("Code should only contain letters and numbers");
     return;
   }

   // All validations passed, add address to the state
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


  const handleRemove = (keyToRemove: string) => {
    const newAddresses = { ...addresses };
    delete newAddresses[keyToRemove];
    setAddresses(newAddresses);
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
              placeholder="0x0000000000000000000000000000000000000000"
              className="stateInput stateInputfixed"
              value={inputData.address}
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="6001606052"
              className="stateInput stateInside"
              value={inputData.code}
              onChange={(e) =>
                setInputData({ ...inputData, code: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="100000000"
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
                      onClick={() => handleRemove(key)}
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
