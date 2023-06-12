import "../App.css"
import { Component, useEffect, useState, useTransition } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Table } from 'react-bootstrap';  
import { use } from "chai";

export default class OwnedProducts extends Component {

  
  constructor(props) {
    super(props)
    this.state = { name: "", address: "" }
  }
  
	handleCreateManufacturer = async (e) => {
		e.preventDefault()
    const [column, setcolumn] = useState("")
    const [records, setRecords] = useState("")

		const { account, contract } = this.props
		const { name, address } = this.state
    var i = 0
    var product1 = []

		try {
      
      do{
        var getproduct = await contract.methods.getProduct(i).call({from: account[0]});
        if(getproduct.exists!=true){
          break;
        }
        product1.push(getproduct)
        i++;
  
    }while(getproduct.exists == true)
    

    }
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}

  render() {

    return (

      <Table striped bordered hover variant='dark'>  
      <thead>  
        <tr>    
          <th>First Name</th>  
          <th>Last Name</th>  
          <th>Username</th>  
        </tr>  
      </thead>  
      <tbody>  
        
      </tbody>  
    </Table>  
    )
  }
}