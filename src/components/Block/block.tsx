import React from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import { BlockState, TransactionProps } from "../types";
import "./block.css";

const Block: React.FC<TransactionProps> = ({
  block,
  setBlock,
  setBlockVis,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof BlockState;
    setBlock({
      ...block,
      [field]: event.target.value,
    });
  };

  const fieldNames = [
    { name: "basefee", displayName: "Basefee" },
    { name: "coinbase", displayName: "Coinbase" },
    { name: "timestamp", displayName: "Timestamp" },
    { name: "number", displayName: "Number" },
    { name: "difficulty", displayName: "Difficulty" },
    { name: "gaslimit", displayName: "Gaslimit" },
    { name: "chainid", displayName: "Chainid" },
  ];

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
        {fieldNames.map((field, index) => (
          <div key={index} className="row">
            <div className="singleitem">
              <span className={field.name}>{field.displayName}:</span>
              <input
                type="text"
                name={field.name}
                className={field.name}
                value={block[field.name as keyof BlockState]}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}
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
