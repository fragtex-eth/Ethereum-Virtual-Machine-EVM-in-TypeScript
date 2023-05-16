import "./output.css";

function Output({output} : {output: any}) {

 function splitNumber(number: Buffer) {
   const chunks = [];
   for (let i = 0; i < number.length; i += 32) {
     const chunk = number.slice(i, i + 32).toString("hex");
     if (parseInt(chunk) !== 0) {
      if(chunk !== "")
      {
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
   return chunks;
 }

  return (
    <div className="output">
      <div className="component">
        <h2 className="">Stack</h2>
        <div className="compOut">
          <div className="containerOut">
            {output != null && output.stack
              ? output.stack.map((item: any, index: any) => (
                  <div className="compElement" key={index}>
                    <div>
                      <p className="firstRow">{`${(index + ":").slice(-2)}`}</p>
                    </div>
                    <p className="secondRow">{`
                0x${("0".repeat(64) + item.toString(16)).slice(-64)}`}</p>
                  </div>
                ))
              : "no output"}
          </div>
        </div>
      </div>
      <div className="component">
        <div className="component">
          <h2 className="">Memory</h2>
          <div className="compOut">
            <div className="containerOut">
              {output != null && output.memory
                ? splitNumber(output.memory)
                : ""}
            </div>
          </div>
        </div>
      </div>
      <div className="component">
        <h2 className="">Storage</h2>
        <div className="compOut">
          <div className="containerOut">
            {output != null && output.storage
              ? output.storage.map((item: any, index: any) => (
                  <div className="compElement" key={index}>
                    <div>
                      <p className="firstRow">{`0x${("00" + index + "0").slice(
                        -2
                      )}:`}</p>
                    </div>
                    <p className="secondRow">{`
                0x${("0".repeat(64) + item.toString(16)).slice(-64)}`}</p>
                  </div>
                ))
              : "no storage"}
          </div>
        </div>
      </div>

      <p className="return">
        Return: {output != null && output.return ? output.return : ""}
      </p>
    </div>
  );
}

export default Output;
