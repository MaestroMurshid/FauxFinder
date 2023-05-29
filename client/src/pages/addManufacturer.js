import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "../App.css"
import { useState } from 'react'

export default function addManufacturer(Account, contract){
    
    return(

        <Form>
      <Form.Group className="mb-3" controlId="formManufacturerName">
        <Form.Control type="text" placeholder="Manufacturer Name" 
        
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formManufacturerAddress">
        <Form.Control type="text" placeholder="Manufacturer Address"
         />
      </Form.Group>
      <Button className='submitButton' variant="primary" type="submit"
      >
        Submit
      </Button>
    </Form>
       
    )
}