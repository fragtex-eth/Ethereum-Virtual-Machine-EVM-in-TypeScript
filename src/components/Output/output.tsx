import "./output.css";

function Output({output} : {output: any}) {
 function splitNumber(number:Buffer) {
   const chunks = [];
   for (let i = 0; i < number.length; i += 32) {
     const chunk = number.slice(i, i + 32).toString("hex");
      if (parseInt(chunk) !== 0) {
          chunks.push(`0x${i.toString(16)}: ${chunk}`);
      }
   }
   return chunks.filter((chunk) => chunk !== "").join("\n");
 }



  return (
    <div className="Output">
      <p className="memory">
        Memory:{" "}
        {output != null && output.memory ? splitNumber(output.memory) : ""}
      </p>
      <p className="storage">
        Storage:
        {output != null && output.storage
          ? output.storage.map((item: any, index: any) => (
              <p key={index}>{`0x${("0" + index).slice(-2)}: 0x${(
                "0".repeat(64) + item.toString(16)
              ).slice(-64)}`}</p>
            ))
          : "no storage"}
      </p>
      <p className="stack">
        Stack:{" "}
        {output != null && output.stack
          ? output.stack.map((item: any, index: any) => (
              <p key={index}>{`0x${("0" + index).slice(
                -2
              )} 0x${(
                "0".repeat(64) + item.toString(16)
              ).slice(-64)}`}</p>
            ))
          : "no output"}
      </p>
      <p className="return">
        Return: {output != null && output.return ? output.return : ""}
      </p>
    </div>
  );
}

export default Output;
