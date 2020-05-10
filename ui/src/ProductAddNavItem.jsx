/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: ProductAddNavItem.jsx
*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import withToast from './withToast.jsx';

class ProductAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const { showError } = this.props;
    const form = document.forms.productAdd2;
    const product = {
      Category: form.Category.value,
      Name: form.Name.value,
      Price: form.Price.value,
      Image: form.Image.value,
    };

    const query = `mutation addProduct($product: productInputs!) {
    addProduct(product: $product) {
        id
    } 
    }`;

    const data = await graphQLFetch(query, { product }, showError);
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.addProduct.id}`);
    }
  }

  render() {
    const { showing } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="create-product">Create Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="productAdd2">
              <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" name="Category" autoFocus>
                  <option>Shirts</option>
                  <option>Jeans</option>
                  <option>Jackets</option>
                  <option>Sweaters</option>
                  <option>Accessories</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Product Name</ControlLabel>
                <FormControl type="text" name="Name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Price</ControlLabel>
                <FormControl type="text" name="Price" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                <FormControl type="text" name="Image" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withToast(withRouter(ProductAddNavItem));
