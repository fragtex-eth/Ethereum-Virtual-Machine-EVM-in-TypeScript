import React, { Dispatch, SetStateAction } from "react";

import "./block.css";

interface BlockState {
  basefee: string;
  coinbase: string;
  timestamp: string;
  number: string;
  difficulty: string;
  gaslimit: string;
  chainid: string;
}

interface TransactionProps {
  block: BlockState;
  setBlock: Dispatch<SetStateAction<BlockState>>;
}

const Block: React.FC<TransactionProps> = ({ block, setBlock }) => {
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof BlockState
  ) => {
    setBlock({
      ...block,
      [field]: event.target.value,
    });
    console.log(block);
  };

  return (
    <div className="Transaction">
      <div className="transactioncontainer">
        <div className="singleitem">
          <span className="basefee">basefee:</span>
          <input
            type="text"
            className="basefee"
            value={block.basefee}
            onChange={(event) => handleInputChange(event, "basefee")}
          />
        </div>
        <div className="singleitem">
          <span className="coinbase">coinbase:</span>
          <input
            type="text"
            className="coinbase"
            value={block.coinbase}
            onChange={(event) => handleInputChange(event, "coinbase")}
          />
        </div>
        <div className="singleitem">
          <span className="timestamp">timestamp:</span>
          <input
            type="text"
            className="timestamp"
            value={block.timestamp}
            onChange={(event) => handleInputChange(event, "timestamp")}
          />
        </div>
        <div className="singleitem">
          <span className="number">number:</span>
          <input
            type="text"
            className="number"
            value={block.number}
            onChange={(event) => handleInputChange(event, "number")}
          />
        </div>
        <div className="singleitem">
          <span className="difficulty">difficulty:</span>
          <input
            type="text"
            className="difficulty"
            value={block.difficulty}
            onChange={(event) => handleInputChange(event, "difficulty")}
          />
        </div>
        <div className="singleitem">
          <span className="gaslimit">gaslimit:</span>
          <input
            type="text"
            className="gaslimit"
            value={block.gaslimit}
            onChange={(event) => handleInputChange(event, "gaslimit")}
          />
        </div>
        <div className="singleitem">
          <span className="chainid">chainid:</span>
          <input
            type="text"
            className="chainid"
            value={block.chainid}
            onChange={(event) => handleInputChange(event, "chainid")}
          />
        </div>
      </div>
    </div>
  );
};

export default Block;
