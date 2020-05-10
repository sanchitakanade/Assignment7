/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: App.jsx
*/

import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Contents from './Contents.jsx';
import ProductAddNavItem from './ProductAddNavItem.jsx';

function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>My Company Inventory</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/products">
          <NavItem>Product List</NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>Report</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <ProductAddNavItem />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

const element = (
  <Router>
    <div>
      <NavBar />
      <Grid fluid>
        <Contents />
      </Grid>
    </div>
  </Router>
);

ReactDOM.render(element, document.getElementById('content'));
if (module.hot) {
  module.hot.accept();
}
