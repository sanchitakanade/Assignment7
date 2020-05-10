/* Author: Sanchita Kanade
   File: ProductList.js
*/
/* globals React */

/* eslint "react/jsx-no-undef": "off" */

import graphQLFetch from './graphQLFetch.js';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.list();
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.list();
    document.forms.productAdd.Price.value = '$';
  }

  async createProduct(product) {
    const query = `mutation addProduct($product: productInputs!) {
    addProduct(product: $product) {
        id
    } 
    }`;
    const data = await graphQLFetch(query, {
      product
    });

    if (data) {
      this.list();
    }
  }

  async list() {
    const query = `query {
    productList {
        id Category Name Price
        Image
    }
    }`;
    const data = await graphQLFetch(query);

    if (data) {
      this.setState({
        products: data.productList
      });
    }
  }

  render() {
    const {
      products
    } = this.state;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "My Company Inventory"), /*#__PURE__*/React.createElement("div", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
      products: products
    }), /*#__PURE__*/React.createElement("div", null, "Add a new product to inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}