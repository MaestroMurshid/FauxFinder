import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../App.css"
import { Component, useState } from 'react'


export default class addProduct extends Component{

    constructor(props) {
		super(props)
		this.state = { name: "", desc: "" }
	}


    handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}



	handleCreateProduct = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { name, desc } = this.state

		try {
            console.log(name, desc)
			await contract.methods.createProduct(name, desc).send({from: account})
			window.alert(`${account}Created a Product\n${name}\n${desc}`)
		}
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}


render(){

    return (
        
        <Form onSubmit={this.handleCreateProduct}>
      <Form.Group className="mb-3" controlId="formProductName">
        <Form.Control type="text" placeholder="Product Name"           
        name="name" 
        value={this.state.name} onChange={this.handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formProductdesc">
        <Form.Control type="text" placeholder="Product desc"
             name="desc" 
            value={this.state.desc} onChange={this.handleChange}
         />
      </Form.Group>
      <Button className='submitButton' variant="primary" type="submit"
      >
        Add product
      </Button>
    </Form>
    ) 
}    
}