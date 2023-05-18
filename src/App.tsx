import './App.css';
import Main from './components/Main/main';
import Output from './components/Output/output';
import Transaction from './components/Transaction/transaction';
import Block from './components/Block/block';
import State from './components/State/state';
import Opcodes from './components/Opcodes/opcodes';

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
interface AddressData {
  balance: string;
  code: {
    bin: string;
  };
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
  const [addresses, setAddresses] = useState<{ [key: string]: AddressData }>(
    {}
  );
  const [txVis, setTxVis] = useState(false);
  const [blockVis, setBlockVis] = useState(false);
  const [addressesVis, setAddressesVis] = useState(false);
  return (
    <div className="App">
      <div className="bg">
        <div className="glow1"></div>
        <div className="glow2"></div>
        <div className="glow3"></div>
        <div className="glow4"></div>
        <div className="glow5"></div>
        <div className="glow6"></div>
      </div>
      {txVis || blockVis || addressesVis ? (
        ""
      ) : (
        <div className="mainsection">
          <div className="container">
            <Main
              setOutput={setOutput}
              tx={tx}
              setTxVis={setTxVis}
              setBlockVis={setBlockVis}
              setAddressesVis={setAddressesVis}
              block={block}
              addresses={addresses}
            />
            <Output output={output} />
          </div>
          <Opcodes />
        </div>
      )}
      {/* <Transaction tx={tx} setTx={setTx} />
        <Block block={block} setBlock={setBlock} />
        <State addresses={addresses} setAddresses={setAddresses} /> */}
      {txVis ? <Transaction tx={tx} setTx={setTx} setTxVis={setTxVis} /> : ""}
      {blockVis ? (
        <Block block={block} setBlock={setBlock} setBlockVis={setBlockVis} />
      ) : (
        ""
      )}
      {addressesVis ? (
        <State
          addresses={addresses}
          setAddresses={setAddresses}
          setAddressesVis={setAddressesVis}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
