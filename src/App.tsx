import './App.css';
import Main from './components/Main/main';
import Output from './components/Output/output';
import { useState } from 'react';

function App() {
  const [output, setOutput] = useState<Object|any>(null);
  
  return (
    <div className="App">
      <Main setOutput={setOutput} />
      <Output output={output} />
    </div>
  );
}

export default App;
