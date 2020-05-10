/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: ProductAdd.jsx
*/


import React from 'react';
import {
  FormControl, FormGroup, ControlLabel, Button, Row, Col,
} from 'react-bootstrap';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const form = document.forms.productAdd;
    const price = form.Price.value;
    const newPrice = price.substr(1, price.length);
    e.preventDefault();
    const product = {
      Category: form.Category.value,
      Price: newPrice,
      Name: form.Name.value,
      Image: document.getElementById('image').value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.Category.value = 'Shirts';
    form.Price.value = '$';
    form.Name.value = '';
    form.Image.value = '';
  }

  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Category:</ControlLabel>
              <FormControl componentClass="select" name="Category" id="productCategory">
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Sweaters</option>
                <option>Accessories</option>
              </FormControl>
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>  Product Name: </ControlLabel>
              <FormControl type="text" name="Name" id="name" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Price Per Unit: </ControlLabel>
              <FormControl type="text" name="Price" id="price" />
            </FormGroup>
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <FormGroup>
              <ControlLabel>Image URL: </ControlLabel>
              <FormControl type="url" name="Image" id="image" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={4} sm={4} md={2} lg={2}>
            <FormGroup>
              <ControlLabel>&nbsp;</ControlLabel>
              <Button bsStyle="primary" type="submit">Add Product</Button>
            </FormGroup>
          </Col>
        </Row>
      </form>

    );
  }
}
