import "./output.css";

function Output({output} : {output: any}) {
  return (
    <div className="Output">
      <p className="memory">
        Memory: {output != null && output.memory ? output.memory : ""}
      </p>
      <p className="storage">
        Storage: {output != null && output.storage ? output.storage : ""}
      </p>
      <p className="stack">
        Stack:{" "}
        {output != null && output.stack
          ? output.stack.map((item: any, index: any) => (
              <p key={index}>{item.toString()}</p>
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
