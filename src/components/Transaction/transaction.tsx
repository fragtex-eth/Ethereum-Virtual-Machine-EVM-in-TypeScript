import React, { Dispatch, SetStateAction } from "react";

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
}

const Transaction: React.FC<TransactionProps> = ({ tx, setTx }) => {
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
    <div className="Transaction">
      <div className="transactioncontainer">
        <div className="singleitem">
          <span className="from">from:</span>
          <input
            type="text"
            className="from"
            value={tx.from}
            onChange={(event) => handleInputChange(event, "from")}
          />
        </div>
        <div className="singleitem">
          <span className="to">to:</span>
          <input
            type="text"
            className="to"
            value={tx.to}
            onChange={(event) => handleInputChange(event, "to")}
          />
        </div>
        <div className="singleitem">
          <span className="origin">origin:</span>
          <input
            type="text"
            className="origin"
            value={tx.origin}
            onChange={(event) => handleInputChange(event, "origin")}
          />
        </div>
        <div className="singleitem">
          <span className="gasprice">gasprice:</span>
          <input
            type="text"
            className="gasprice"
            value={tx.gasprice}
            onChange={(event) => handleInputChange(event, "gasprice")}
          />
        </div>
        <div className="singleitem">
          <span className="value">value:</span>
          <input
            type="text"
            className="value"
            value={tx.value}
            onChange={(event) => handleInputChange(event, "value")}
          />
        </div>
        <div className="singleitem">
          <span className="data">data:</span>
          <input
            type="text"
            className="data"
            value={tx.data}
            onChange={(event) => handleInputChange(event, "data")}
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
