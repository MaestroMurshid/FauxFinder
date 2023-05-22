import { useState,useEffect } from "react";
import Web3 from "web3";
import "./App.css"


function App() {

  const [Account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [balance, setBalance] = useState();

  const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
  useEffect(() => {
    loadAccounts();
  },[]);


  

  async function loadAccounts() {
    const accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0]);
  }


  return (
    <div className="App">
      <header className="App-Header">
        <p>Your Account: { Account }</p>
      </header>
    </div>
  );
}

export default App;
