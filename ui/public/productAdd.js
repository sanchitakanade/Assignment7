/* Author: Sanchita Kanade
   File: productAdd.js
*/

/* globals React */
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
      Image: document.getElementById('image').value
    };
    const {
      createProduct
    } = this.props;
    createProduct(product);
    form.Category.value = 'Shirts';
    form.Price.value = '$';
    form.Name.value = '';
    form.Image.value = '';
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "productCategory"
    }, "Category", /*#__PURE__*/React.createElement("select", {
      name: "Category",
      id: "productCategory"
    }, /*#__PURE__*/React.createElement("option", null, "Shirts"), /*#__PURE__*/React.createElement("option", null, "Jeans"), /*#__PURE__*/React.createElement("option", null, "Jackets"), /*#__PURE__*/React.createElement("option", null, "Sweaters"), /*#__PURE__*/React.createElement("option", null, "Accessories"))), /*#__PURE__*/React.createElement("label", {
      htmlFor: "name"
    }, "Product Name", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "Name",
      id: "name"
    }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "price"
    }, "Price Per Unit", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "Price",
      id: "price"
    })), /*#__PURE__*/React.createElement("label", {
      htmlFor: "image"
    }, "Image URL", /*#__PURE__*/React.createElement("input", {
      type: "url",
      name: "Image",
      id: "image"
    }))), /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Add Product"));
  }

}