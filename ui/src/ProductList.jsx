/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: ProductList.jsx
*/


import React from 'react';
import URLSearchParams from 'url-search-params';
import { Panel } from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import ProductFilter from './ProductFilter.jsx';
import withToast from './withToast.jsx';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      productCount: 0,
    };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.totalProducts = this.totalProducts.bind(this);
  }

  componentDidMount() {
    const { location: { search }, showError } = this.props;
    this.loadData();
    document.forms.productAdd.Price.value = '$';
    this.totalProducts(search, showError);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search }, showError } = this.props;
    if (prevSearch !== search) {
      this.loadData();
      this.totalProducts(search, showError);
    }
  }

  async loadData() {
    const { location: { search }, showError } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('Category')) vars.Category = params.get('Category');
    if (params.get('priceMax')) vars.priceMax = params.get('priceMax');

    const query = `query productList(
      $Category: ProductCategory         
      $priceMax: Int
      ){
      productList(
        Category: $Category
        priceMax: $priceMax
        ) {
          id Category Name Price
          Image
      }
      }`;
    const data = await graphQLFetch(query, vars, showError);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async totalProducts(search, showError) {
    console.log('totalProducts called');

    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('Category')) vars.Category = params.get('Category');
    if (params.get('priceMax')) vars.priceMax = params.get('priceMax');
    console.log(vars.Category);
    console.log(vars.priceMax);

    const query = `query totalProducts(
      $Category: ProductCategory         
      $priceMax: Int
      ){
        totalProducts(
        Category: $Category
        priceMax: $priceMax
        ) 
      }`;
    const data = await graphQLFetch(query, vars, showError);
    if (data) {
      this.setState({ productCount: data.totalProducts });
      // const { productCount } = this.state;
      console.log(data.totalProducts);
    }
  }

  async createProduct(product) {
    const query = `mutation addProduct($product: productInputs!) {
    addProduct(product: $product) {
        id
    }
    }`;
    const data = await graphQLFetch(query, { product }, this.showError);
    if (data) {
      const { location: { search }, showError } = this.props;
      this.loadData();
      this.totalProducts(search, showError);
    }
  }

  async deleteProduct(index) {
    const query = `mutation deleteProduct($id: Int!) {
      deleteProduct(id: $id)
    }`;
    const { products } = this.state;
    const { showSuccess, showError } = this.props;
    const { location: { pathname, search }, history } = this.props;
    const { id } = products[index];
    const data = await graphQLFetch(query, { id }, showError);
    if (data && data.deleteProduct) {
      showSuccess(`Deleted product ${id} successfully.`);
      this.setState((prevState) => {
        const newList = [...prevState.products];
        if (pathname === `/products/${id}`) {
          history.push({ pathname: '/products', search });
        }
        newList.splice(index, 1);
        this.totalProducts(search, showError);
        return { products: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { products, productCount } = this.state;
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductFilter urlBase="/products" totalProducts={this.totalProducts} />
          </Panel.Body>
        </Panel>
        <h4>
          Showing
          {' '}
          {productCount}
          {' '}
          available products
        </h4>
        <ProductTable products={products} deleteProduct={this.deleteProduct} />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}

const ProductListWithToast = withToast(ProductList);
export default ProductListWithToast;
