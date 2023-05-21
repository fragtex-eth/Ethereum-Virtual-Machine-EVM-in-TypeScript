import React, { ReactNode } from "react";
import { Buffer } from "buffer";
import "./output.css";

type OutputProps = {
  output: {
    stack?: number[];
    memory?: Buffer;
    storage?: number[];
    return?: string;
  } | null;
};

type OutputBlockProps = {
  title: string;
  content: ReactNode;
};

const OutputBlock: React.FC<OutputBlockProps> = ({ title, content }) => (
  <div className="component">
    <div className="compcontainer">
      <h2 className="">{title}</h2>
      <div className="compOut">
        <div className="containerOut">
          {content || <div>No {title.toLowerCase()}</div>}
        </div>
      </div>
    </div>
  </div>
);

const Output: React.FC<OutputProps> = ({ output }) => {
  function splitNumber(number: Buffer) {
    const chunks: ReactNode[] = [];
    for (let i = 0; i < number.length; i += 32) {
      const chunk = number.slice(i, i + 32).toString("hex");
      if (parseInt(chunk) !== 0) {
        if (chunk !== "") {
          chunks.push(
            <div className="compElement" key={i}>
              <div>
                <p className="firstRow">{`0x${("00" + i.toString(16)).slice(
                  -2
                )}:`}</p>
              </div>
              <p className="secondRow">{chunk}</p>
            </div>
          );
        }
      }
    }
    return chunks.length > 0 ? chunks : null;
  }

  return (
    <div className="output">
      <OutputBlock
        title="Stack"
        content={output?.stack?.map((item, index) => (
          <div className="compElement" key={index}>
            <div>
              <p className="firstRow">{`${index}:`}</p>
            </div>
            <p className="secondRow">{`0x${(
              "0".repeat(64) + item.toString(16)
            ).slice(-64)}`}</p>
          </div>
        ))}
      />

      <OutputBlock
        title="Memory"
        content={splitNumber(output?.memory ?? Buffer.alloc(0))}
      />

      <OutputBlock
        title="Storage"
        content={output?.storage?.map((item, index) => (
          <div className="compElement" key={index}>
            <div>
              <p className="firstRow">{`0x${("00" + index + "0").slice(
                -2
              )}:`}</p>
            </div>
            <p className="secondRow">{`0x${(
              "0".repeat(64) + item.toString(16)
            ).slice(-64)}`}</p>
          </div>
        ))}
      />

      <OutputBlock
        title="Return"
        content={
          output?.return && (
            <div className="containerOut containerRet">{output.return}</div>
          )
        }
      />
    </div>
  );
};

export default Output;
