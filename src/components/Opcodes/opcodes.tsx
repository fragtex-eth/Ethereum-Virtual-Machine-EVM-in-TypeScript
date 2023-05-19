import React, { useState, useEffect, useRef } from "react";
import "./opcodes.css";
import opcodes from "./opcodes.json";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { IconContext } from "react-icons";
import { IoSearchSharp } from "react-icons/io5";

interface Opcode {
  uint8: string;
  mnemonic: string;
  description: string;
}

function Opcodes() {
  const [searchText, setSearchText] = useState("");
  const carousel = useRef<AliceCarousel | null>(null);

  const filteredOpcodes: Opcode[] = opcodes.filter(
    (opcode: Opcode) =>
      opcode.uint8.toLowerCase().includes(searchText.toLowerCase()) ||
      opcode.mnemonic.toLowerCase().includes(searchText.toLowerCase()) ||
      opcode.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOnDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    e.preventDefault();

  const items = filteredOpcodes.map((opcode: Opcode) => (
    <div className="singleopcontainer">
      <div
        className="singleopcode"
        key={opcode.uint8}
        onDragStart={handleOnDragStart}
      >
        <div className="title">
          <span className="uint8">{opcode.uint8}</span>
          <span className="name">{" " + opcode.mnemonic}</span>
        </div>
        <span className="description">{opcode.description}</span>
      </div>
    </div>
  ));

  // Slide to the middle index after the component has mounted
  useEffect(() => {
    if (carousel.current) {
      carousel.current.slideTo(Math.floor(filteredOpcodes.length / 2));
    }
  }, [filteredOpcodes.length]);

  return (
    <div className="Opcodes">
      <div className="opcodescontainer">
        <AliceCarousel
          items={items}
          infinite={true}
          autoWidth={true}
          disableButtonsControls
          disableDotsControls
          mouseTracking

        />
      </div>
      <div className="searchContainer">
        <IconContext.Provider value={{ className: "icon-search" }}>
          <div className="searchIcon_container">
            <IoSearchSharp />
          </div>
        </IconContext.Provider>
        <input
          type="text"
          className="searchOp"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Opcodes;
