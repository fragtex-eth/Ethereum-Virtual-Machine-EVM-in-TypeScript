import React, { useRef, useEffect } from "react";
import "./opcodes.css";
import opcodes from "./opcodes.json";

function Opcodes() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft = container.scrollWidth / 2;
    }
  }, []);

  return (
    <div className="Opcodes">
      <div className="opcodescontainer" ref={containerRef}>
        {opcodes.map((opcode) => (
          <div className="singleopcode" key={opcode.uint8}>
            <div className="title">
              <span className="uint8">{opcode.uint8}</span>
              <span className="name">{" " + opcode.mnemonic}</span>
            </div>
            <span className="description">{opcode.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Opcodes;
