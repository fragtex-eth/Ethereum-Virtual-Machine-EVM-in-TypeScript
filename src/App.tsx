import './App.css';
import Main from './components/Main/main';
import Output from './components/Output/output';
import Transaction from './components/Transaction/transaction';
import Block from './components/Block/block';
import { useState } from 'react';

interface TxState {
  from: string;
  to: string;
  origin: string;
  gasprice: string;
  value: string;
  data: string;
}
interface BlockState {
  basefee: string;
  coinbase: string;
  timestamp: string;
  number: string;
  difficulty: string;
  gaslimit: string;
  chainid: string;
}

function App() {
  const [output, setOutput] = useState<Object|any>(null);
  const [tx, setTx] = useState<TxState>({
    from: "",
    to: "",
    origin: "",
    gasprice: "",
    value: "",
    data: "",
  });
 const [block, setBlock] = useState<BlockState>({
   basefee: "",
   coinbase: "",
   timestamp: "",
   number: "",
   difficulty: "",
   gaslimit: "",
   chainid: ""
 });
  return (
    <div className="App">
      <Main setOutput={setOutput} />
      <Output output={output} />
      <Transaction tx={tx} setTx={setTx} />
      <Block block={block} setBlock={setBlock}/>
    </div>
  );
}

export default App;
