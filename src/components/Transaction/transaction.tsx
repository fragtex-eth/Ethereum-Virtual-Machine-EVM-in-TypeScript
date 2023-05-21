import React, { useState } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import { TxState, TransactionPropsState } from "../types";
import "./transaction.css";

const Transaction: React.FC<TransactionPropsState> = ({
  tx,
  setTx,
  setTxVis,
}) => {
  const [localTx, setLocalTx] = useState(tx);

  const fields: (keyof TxState)[] = [
    "from",
    "to",
    "origin",
    "gasprice",
    "value",
    "data",
  ];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof TxState
  ) => {
    setLocalTx({
      ...localTx,
      [field]: event.target.value,
    });
  };

  const handleDone = () => {
    setTx(localTx);
    setTxVis(false);
  };

  return (
    <div className="setParameters">
      <div className="circle"></div>
      <IconContext.Provider value={{ className: "icon-close" }}>
        <div className="icon_container" onClick={() => setTxVis(false)}>
          <IoClose />
        </div>
      </IconContext.Provider>
      <h3>Transaction</h3>
      <div className="sContainer">
        {fields.map((field, i) => (
          <div key={i} className="row">
            <div className="singleitem">
              <span className={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </span>
              <input
                type="text"
                className={field}
                value={localTx[field]}
                onChange={(event) => handleInputChange(event, field)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="buttoncontainer">
        <button className="btn_done" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Transaction;
