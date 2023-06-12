import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../App.css"
import { Component, useState } from 'react'


export default class sellProduct extends Component{

    constructor(props) {
        console.log("In sell")
		super(props)
		this.state = { id: "", address: "" }
	}


    handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}



	handleOwnershipChange = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { id, address } = this.state

		try {
            console.log( account, contract, id, address)
			await contract.methods.ownershipChange(id, address).send({from: account})
			window.alert(`${account}changed ownership of \n${id} to \n${address}`)
		}
		catch (e) {
			window.alert("Check the Product ID and if youre the Current Owner")
			console.log(e)
		}
	}


render(){
    console.log("in sell1")

    return (
        
        <Form onSubmit={this.handleOwnershipChange}>
      <Form.Group className="mb-3" controlId="formProductId">
        <Form.Control type="text" placeholder="Product ID"           
        name="id" 
        value={this.state.id} onChange={this.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formReceiverAddress">
        <Form.Control type="text" placeholder="New Owner Address"
            name="address" 
            value={this.state.address} onChange={this.handleChange}
         />
      </Form.Group>
      <Button className='submitButton' variant="primary" type="submit"
      >
        Submit
      </Button>
    </Form>
    ) 
}    
}