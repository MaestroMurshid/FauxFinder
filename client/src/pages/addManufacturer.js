import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../App.css"
import { Component, useState } from 'react'


export default class addManufacturer extends Component{

    constructor(props) {
		super(props)
		this.state = { name: "", address: "" }
	}


    handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}



	handleCreateManufacturer = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { name, address } = this.state

		try {
            console.log( account, contract, name, address)
			await contract.methods.createManufacturer(name, address).send({from: account})
			window.alert(`${account}Created a manufacturer\n${name}\n${address}`)
		}
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}


render(){

    return (
        
        <Form onSubmit={this.handleCreateManufacturer}>
      <Form.Group className="mb-3" controlId="formManufacturerName">
        <Form.Control type="text" placeholder="Manufacturer Name"           
        name="name" 
        value={this.state.name} onChange={this.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formManufacturerAddress">
        <Form.Control type="text" placeholder="Manufacturer Address"
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