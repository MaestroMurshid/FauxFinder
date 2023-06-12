import { useState, useEffect } from "react";
import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Web3 from "web3";
import "./App.css"

import FauxFinderTransactions from "./contracts/FauxFinderTransactions.json"
import allProducts from "./pages/allProducts";
import AccountPage from "./pages/Account"
import addManufacturer from "./pages/addManufacturer";
import ownedProducts from "./pages/ownedProducts";
import sellProduct from "./pages/sellProduct";

function App() {

  var i=0;
  let Component;

  const [Account, setAccount] = useState();
  const [currentcontract, setcurrentContract] = useState();
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
    setcurrentContract(contract);
    var owner = await contract.methods.owner().call();


    if (accounts[0] === owner) {
      setIsOwner(true)
    }
    else {
      setIsOwner(false)
    }
  }



  switch (window.location.pathname){
    
    case "/addManufacturer":
      Component = addManufacturer
      break;
    case "/allProducts":
      Component = allProducts
      break;

    case "/ownedProducts":
      Component = ownedProducts
      break;
    case "/sellProduct":
      Component = sellProduct
      break;
    default:
      Component = AccountPage
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
                  <Nav.Link href="/addManufacturer">Add Manufaturer</Nav.Link>
                  <Nav.Link href="#pricing">Transactions</Nav.Link>
                </Nav>
                <Navbar.Text>{Account}</Navbar.Text>
              </Container>
              
            </Navbar>

            <Component account = {Account} contract = {currentcontract}></Component>
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
                  <Nav.Link href="/ownedProducts">Owned Products</Nav.Link>

                  <Nav.Link href="/sellProduct">Sell Product</Nav.Link>
                </Nav>
            <Nav className="me-auto">

            </Nav>
            <Navbar.Text>{Account}</Navbar.Text>
          </Container>
        </Navbar>

        <Component account = {Account} contract = {currentcontract}></Component>
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
