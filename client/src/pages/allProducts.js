import "../App.css"
import { Component, useState } from 'react'
import ReactTable from "react-table";  


export default class allProducts extends Component {

  constructor(props) {
    super(props)
    this.state = { name: "", address: "" }
  }


  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }



  handleProductLoader = async (e) => {
    e.preventDefault()
    const { account, contract } = this.props
    const { name, address } = this.state
    var i = 0
    var product1 = []
    

    try {

      do {
        var getproduct = await contract.methods.getProduct(i).call({ from: account[0] });
        if (getproduct.exists != true) {
          break;
        }
        product1.push(getproduct)
        i++;

      } while (getproduct.exists == true)
      console.log(getproduct)
      
    }
    catch (e) {
      window.alert("Error occured!")
      console.log(e)
    }

   

  }
render() {
  return (
      <table></table>
    )
}
 

}