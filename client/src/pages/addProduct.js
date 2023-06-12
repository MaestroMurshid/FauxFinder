import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Component } from 'react';
import QRCode from 'qrcode.react';
import "../App.css";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", desc: "", showQRCode: false };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCreateProduct = async (e) => {
    e.preventDefault();
    const { account, contract } = this.props;
    const { name, desc } = this.state;

    try {
      console.log(name, desc);
      await contract.methods.createProduct(name, desc).send({ from: account });
      window.alert(`${account} Created a Product\n${name}\n${desc}`);
      this.setState({ showQRCode: true }); // Show the QR code after product creation
    } catch (e) {
      window.alert("Error occurred!");
      console.log(e);
    }
  }

  saveQRCode = () => {
    const canvas = document.querySelector('.qrCodeContainer > canvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `${this.state.name}.png`;
    link.click();
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleCreateProduct}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Control
              type="text"
              placeholder="Product Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductdesc">
            <Form.Control
              type="text"
              placeholder="Product Description"
              name="desc"
              value={this.state.desc}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            className='submitButton'
            variant="primary"
            type="submit"
          >
            Add product
          </Button>
        </Form>
        <div>
        <div>
          <p>                                           </p>
        {this.state.showQRCode && (
          <div className="qrCodeContainer">
            <QRCode value={`VERIFIED PRODUCT\nName: ${this.state.name}\nDescription: ${this.state.desc}`} />
            <div>
              <p>                                              </p>
            <Button variant="secondary" onClick={this.saveQRCode}>
              Save QR Code
            </Button>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    );
  }
}

