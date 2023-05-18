import React, { Dispatch, SetStateAction } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

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
  setBlockVis: Dispatch<SetStateAction<boolean>>;
}

const Block: React.FC<TransactionProps> = ({
  block,
  setBlock,
  setBlockVis,
}) => {
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
    <div className="setParameters">
      <div className="circle"></div>
      <IconContext.Provider value={{ className: "icon-close" }}>
        <div className="icon_container" onClick={() => setBlockVis(false)}>
          <IoClose />
        </div>
      </IconContext.Provider>
      <h3>Block</h3>
      <div className="sContainer">
        <div className="row">
          <div className="singleitem">
            <span className="basefee">Basefee:</span>
            <input
              type="text"
              className="basefee"
              value={block.basefee}
              onChange={(event) => handleInputChange(event, "basefee")}
            />
          </div>

          <div className="singleitem">
            <span className="coinbase">Coinbase:</span>
            <input
              type="text"
              className="coinbase"
              value={block.coinbase}
              onChange={(event) => handleInputChange(event, "coinbase")}
            />
          </div>
          <div className="singleitem">
            <span className="timestamp">Timestamp:</span>
            <input
              type="text"
              className="timestamp"
              value={block.timestamp}
              onChange={(event) => handleInputChange(event, "timestamp")}
            />
          </div>

          <div className="singleitem">
            <span className="number">Number:</span>
            <input
              type="text"
              className="number"
              value={block.number}
              onChange={(event) => handleInputChange(event, "number")}
            />
          </div>
        </div>
        <div className="row">
          <div className="singleitem">
            <span className="difficulty">Difficulty:</span>
            <input
              type="text"
              className="difficulty"
              value={block.difficulty}
              onChange={(event) => handleInputChange(event, "difficulty")}
            />
          </div>
          <div className="singleitem">
            <span className="gaslimit">Gaslimit:</span>
            <input
              type="text"
              className="gaslimit"
              value={block.gaslimit}
              onChange={(event) => handleInputChange(event, "gaslimit")}
            />
          </div>

          <div className="singleitem">
            <span className="chainid">Chainid:</span>
            <input
              type="text"
              className="chainid"
              value={block.chainid}
              onChange={(event) => handleInputChange(event, "chainid")}
            />
          </div>
        </div>
      </div>
      <div className="buttoncontainer">
        <button className="btn_done" onClick={() => setBlockVis(false)}>
          Done
        </button>
      </div>
    </div>
  );
};

export default Block;
