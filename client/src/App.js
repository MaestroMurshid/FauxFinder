import { useState, useEffect } from "react";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Web3 from "web3";
import "./App.css"
import FauxFinderTransactions from "./contracts/FauxFinderTransactions.json"


function App() {

  const [Account, setAccount] = useState();
  const [isOwner, setIsOwner] = useState('false');

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    loadPage();
  },[])


  async function loadAccounts() {
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const networkID = await web3.eth.net.getId();
    const CONTRACT_ABI = FauxFinderTransactions.abi;
    const CONTRACT_ADDRESS = FauxFinderTransactions.networks[networkID].address;
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


    var accounts = await web3.eth.requestAccounts()
    setAccount(accounts[0]);
    var owner = await contract.methods.owner().call();
    if (accounts[0] === owner) {
      setIsOwner(true)
    }
    else {
      setIsOwner(false)
    }
  }

  const allProducts = () => {

    return(
          console.log(allProducts)
    )


  }

  const loadPage = () => {
    console.log(isOwner);
    
    if (isOwner) {
      return (
        <div className="App">
          <header className="App-Header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="#home">FauxFinder</Navbar.Brand>
                <Nav className="me-auto">
                  <Nav.Link href="/allProducts">Products</Nav.Link>
                  <Nav.Link href="#features">Add Manufaturer</Nav.Link>
                  <Nav.Link href="#pricing">Transactions</Nav.Link>
                </Nav>
                <Navbar.Text>{Account}</Navbar.Text>
              </Container>
            </Navbar>

            <p>Your Account: {Account}</p>
          </header>
        </div>
      )
    } else if(!isOwner){
      return (
      <div className="App">
      <header className="App-Header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">FauxFinder</Navbar.Brand>
            <Nav className="me-auto">
                  <Nav.Link href="#home">Owned Products</Nav.Link>
                  <Nav.Link href="#home">Add Products</Nav.Link>
                  <Nav.Link href="#features">Sell Product</Nav.Link>
                </Nav>
            <Nav className="me-auto">

            </Nav>
            <Navbar.Text>{Account}</Navbar.Text>
          </Container>
        </Navbar>

        <p>Your Account: {Account}</p>
      </header>
    </div>
      )
    }
  }


return (


  <div className="App">
    {
      loadPage()
    }
  </div>
);
}
export default App;
