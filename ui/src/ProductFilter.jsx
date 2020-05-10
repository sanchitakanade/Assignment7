/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: ProductFilter.jsx
*/

/* eslint "react/prefer-stateless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Form, FormControl, FormGroup, ControlLabel, Button,
} from 'react-bootstrap';
import URLSearchParams from 'url-search-params';

class ProductFilter extends React.Component {
  constructor({ location: { search } }) {
    super();
    const params = new URLSearchParams(search);
    this.state = {
      Category: params.get('Category') || '',
      priceMax: params.get('priceMax') || '',
      changed: false,
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangePriceMax = this.onChangePriceMax.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.showOriginalFilter = this.showOriginalFilter.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.showOriginalFilter();
    }
  }

  onChangeCategory(e) {
    this.setState({ Category: e.target.value, changed: true });
  }

  onChangePriceMax(e) {
    const priceString = e.target.value;
    if (priceString.match(/^\d*$/)) {
      this.setState({ priceMax: e.target.value, changed: true });
    }
  }

  showOriginalFilter() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    this.setState({
      Category: params.get('Category') || '',
      priceMax: params.get('priceMax') || '',
      changed: false,
    });
  }

  applyFilter() {
    const { Category, priceMax } = this.state;
    const { history, urlBase, showError } = this.props;

    const { totalProducts } = this.props;
    const params = new URLSearchParams();
    if (Category) params.set('Category', Category);
    if (priceMax) params.set('priceMax', priceMax);
    const search = params.toString() ? `?${params.toString()}` : '';
    history.push({ pathname: urlBase, search });
    totalProducts(search, showError);
  }

  render() {
    const { Category, changed } = this.state;
    const { priceMax } = this.state;

    return (
      <Form inline>
        <FormGroup>
          <ControlLabel>
            Category:
          </ControlLabel>
          {' '}
          <FormControl componentClass="select" value={Category} onChange={this.onChangeCategory}>
            <option value="">(All)</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
          </FormControl>
        </FormGroup>
        {'   '}
        <FormGroup>
          <ControlLabel>Max Price:</ControlLabel>
          {'  '}
          <FormControl value={priceMax} onChange={this.onChangePriceMax} />
        </FormGroup>
        {' '}
        <Button bsStyle="primary" type="button" onClick={this.applyFilter}>
          Apply
        </Button>
        {' '}
        <Button
          type="button"
          onClick={this.showOriginalFilter}
          disabled={!changed}
        >
          Reset
        </Button>
      </Form>
    );
  }
}

export default withRouter(ProductFilter);
