/* Author: Sanchita Kanade
   File: productTable.js
*/

/* globals React */
function ProductRow({
  product
}) {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.Name), /*#__PURE__*/React.createElement("td", null, '$'.concat(product.Price)), /*#__PURE__*/React.createElement("td", null, product.Category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
    href: product.Image,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "View")));
}

export default function ProductTable({
  products
}) {
  const productrows = products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productrows));
}