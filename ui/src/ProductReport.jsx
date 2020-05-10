/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: ProductReport.jsx
*/

import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import ProductFilter from './ProductFilter.jsx';
import withToast from './withToast.jsx';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';

/* eslint linebreak-style: ["error", "windows"] */

const categories = ['Shirts', 'Jeans', 'Jackets', 'Sweaters', 'Accessories'];

class ProductReport extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = { };
    if (params.get('Category')) vars.Category = params.get('Category');
    // const effortMin = parseInt(params.get('effortMin'), 10);
    // if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const priceMax = parseInt(params.get('priceMax'), 10);
    if (!Number.isNaN(priceMax)) vars.priceMax = priceMax;
    const query = `query productCounts(
        $Category: ProductCategory
        $priceMax: Int
    ) {
    productCounts(
        Category: $Category
        priceMax: $priceMax
        ) {
        Price Shirts Jeans Jackets Sweaters Accessories    
        }
    }`;
    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor(props) {
    super(props);
    const stats = store.initialData ? store.initialData.productCounts : null;
    delete store.initialData;
    this.state = { stats };
  }

  componentDidMount() {
    const { stats } = this.state;
    if (stats == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search }, match, showError } = this.props;
    const data = await ProductReport.fetchData(match, search, showError);
    if (data) {
      this.setState({ stats: data.productCounts });
    }
  }

  render() {
    const { stats } = this.state;
    if (stats == null) return null;
    const headerColumns = (
      categories.map(Category => (
        <th key={Category}>{Category}</th>
      ))
    );
    const numberOfRows = stats.length;
    const statRows = stats.map(counts => (
      <tr key={counts.Price}>
        <td>{counts.Price}</td>
        {categories.map(Catagory => (
          <td key={Catagory}>{counts[Catagory]}</td>
        ))}
      </tr>
    ));

    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <ProductFilter urlBase="/report" />
          </Panel.Body>
        </Panel>
        <h4>
          Total number of rows:
          {' '}
          {numberOfRows}
        </h4>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th />
              {headerColumns}
            </tr>
          </thead>
          <tbody>
            {statRows}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

const ProductReportWithToast = withToast(ProductReport);
ProductReportWithToast.fetchData = ProductReport.fetchData;
export default ProductReportWithToast;
