import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import { AddressData, InputData, StateProps } from "../types";
import "./state.css";

const InputField: React.FC<{
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}> = ({ placeholder, value, onChange, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    className={className || "stateInput stateInside"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const AddressDisplay: React.FC<{
  address: string;
  data: AddressData;
  onRemove: () => void;
}> = ({ address, data, onRemove }) => (
  <div className="singleitem">
    <span className="stateInputFixed">{address}</span>
    <span className="stateInputFixed stateInside">{data.balance}</span>
    {data.code.bin && (
      <span className="stateInputFixed stateInside">{data.code.bin}</span>
    )}
    <div className="buttoncontainer buttonremove">
      <button className="btn_done" onClick={onRemove}>
        Remove
      </button>
    </div>
  </div>
);

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
    const { address, balance, code } = inputData;

    if (!isValidData(address, balance, code)) return;

    setAddresses((prevState) => ({
      ...prevState,
      [address]: {
        balance,
        code: { bin: code },
      },
    }));

    setInputData({ address: "", code: "", balance: "" });
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
            <InputField
              placeholder="0x0000000000000000000000000000000000000000"
              className="stateInput stateInputfixed"
              value={inputData.address}
              onChange={(value) =>
                setInputData({ ...inputData, address: value })
              }
            />
            <InputField
              placeholder="6001606052"
              value={inputData.code}
              onChange={(value) => setInputData({ ...inputData, code: value })}
            />
            <InputField
              placeholder="100000000"
              value={inputData.balance}
              onChange={(value) =>
                setInputData({ ...inputData, balance: value })
              }
            />
            <button className="btn_done" onClick={handleAdd}>
              Add
            </button>
          </div>

          <div className="singleitem sIDisplay">
            {Object.entries(addresses).map(([key, value], index) => (
              <AddressDisplay
                key={index}
                address={key}
                data={value as AddressData}
                onRemove={() => handleRemove(key)}
              />
            ))}
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

function isValidData(address: string, balance: string, code: string) {
  const addressValidation = /^0x[a-fA-F0-9]{40}$/;
  if (!addressValidation.test(address)) {
    alert("Address should be 42 characters long and start with 0x");
    return false;
  }

  if (isNaN(parseFloat(balance))) {
    alert("Balance should be a valid number");
    return false;
  }

  const codeValidation = /^[a-zA-Z0-9]*$/;
  if (!codeValidation.test(code)) {
    alert("Code should only contain letters and numbers");
    return false;
  }

  return true;
}

export default State;
