import React, { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

import "./transaction.css";

interface TxState {
  from: string;
  to: string;
  origin: string;
  gasprice: string;
  value: string;
  data: string;
}


interface TransactionProps {
  tx: TxState;
  setTx: Dispatch<SetStateAction<TxState>>;
  setTxVis: Dispatch<SetStateAction<boolean>>;
}

const Transaction: React.FC<TransactionProps> = ({ tx, setTx, setTxVis }) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof TxState
  ) => {
    setTx({
      ...tx,
      [field]: event.target.value,
    });
    console.log(tx);
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
        <div className="row">
          <div className="singleitem">
            <span className="from">From:</span>
            <input
              type="text"
              className="from"
              value={tx.from}
              onChange={(event) => handleInputChange(event, "from")}
            />
          </div>
          <div className="singleitem">
            <span className="to">To:</span>
            <input
              type="text"
              className="to"
              value={tx.to}
              onChange={(event) => handleInputChange(event, "to")}
            />
          </div>
          <div className="singleitem">
            <span className="origin">Origin:</span>
            <input
              type="text"
              className="origin"
              value={tx.origin}
              onChange={(event) => handleInputChange(event, "origin")}
            />
          </div>
        </div>
        <div className="row">
          <div className="singleitem">
            <span className="gasprice">Gasprice:</span>
            <input
              type="text"
              className="gasprice"
              value={tx.gasprice}
              onChange={(event) => handleInputChange(event, "gasprice")}
            />
          </div>
          <div className="singleitem">
            <span className="value">Value:</span>
            <input
              type="text"
              className="value"
              value={tx.value}
              onChange={(event) => handleInputChange(event, "value")}
            />
          </div>
          <div className="singleitem">
            <span className="data">Data:</span>
            <input
              type="text"
              className="data"
              value={tx.data}
              onChange={(event) => handleInputChange(event, "data")}
            />
          </div>
        </div>
      </div>
      <div className="buttoncontainer">
        <button className="btn_done" onClick={() => setTxVis(false)}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Transaction;
