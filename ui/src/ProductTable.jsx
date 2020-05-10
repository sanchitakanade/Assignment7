/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: ProductTable.jsx
*/


import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
} from 'react-bootstrap';

export const images = [];
const editTooltip = (
  <Tooltip id="close-tooltip" placement="top">Edit Product</Tooltip>
);

const deleteTooltip = (
  <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
);

function ProductRow({ product, deleteProduct, index }) {
  images[product.id] = product.Image;
  return (
    <tr>
      <td>{product.Name}</td>
      <td>{('$').concat(product.Price)}</td>
      <td>{product.Category}</td>
      <td><a href={`/#/view/${product.id}`}>View</a></td>
      <td>
        <LinkContainer to={`/edit/${product.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
            <Button bsSize="sm">
              <Glyphicon glyph="edit" />
            </Button>
          </OverlayTrigger>
        </LinkContainer>
      </td>
      <td>
        <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="sm" type="button" onClick={() => { deleteProduct(index); }}>
            <Glyphicon glyph="trash" />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
}

export default function ProductTable({ products, deleteProduct }) {
  const productrows = products.map((product, index) => (
    <ProductRow
      key={product.id}
      product={product}
      deleteProduct={deleteProduct}
      index={index}
    />
  ));
  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {productrows}
      </tbody>
    </Table>
  );
}
