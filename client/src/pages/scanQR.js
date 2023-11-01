import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../App.css"
import { Component, useState } from 'react'
import QrReader from 'react-qr-scanner'


export default class addManufacturer extends Component{

    constructor(props) {
      
		super(props)
		this.state = { name: "" ,
    delay: 100,
    result: 'No result',}
      this.handleScan = this.handleScan.bind(this)

	}
  

    handleChange = (e) => {
		const { name, value } = e.target
		this.setState({ [name]: value })
	}

  handleScan(data){
    this.setState({
      result: data,
    })
   
  }
  handleError(err){
    console.error(err)
  }

	handleCreateManufacturer = async (e) => {
		e.preventDefault()
		const { account, contract } = this.props
		const { name } = this.state

        console.log(name)
		try {

          var getproduct = await contract.methods.getProduct(name).call({ from: account });
          console.log(getproduct)

          window.alert(`Product Name:- ${getproduct.pName}\nProduct ID:- ${getproduct.pID}
          \nProduct Desc:- ${getproduct.pDesc}\n Current Owner :- ${getproduct.currentOwner}
          \nPrevious Owners:- ${getproduct.listOfOwners[0]} , ${getproduct.listOfOwners[1]}`)

		}
		catch (e) {
			window.alert("Error occured!")
			console.log(e)
		}
	}


render(){
  const previewStyle = {
    height: 240,
    width: 320,
  }
    return (
        
        <Form onSubmit={this.handleCreateManufacturer}>
      <Form.Group className="mb-3" controlId="formProductVerify">
        <Form.Control type="text" placeholder="Product ID"           
        name="name" 
        value={this.state.value} onChange={this.handleChange}
        />
      </Form.Group>

      <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>

      <Button className='submitButton' variant="primary" type="submit"
      >
        Submit
      </Button>
      
    </Form>
    
    ) 
}    
}