/* Name: Sanchita Kanade
   Class:CS648.02 Modern Full-Stack Web Development (Spring 2020)
   Assignment: 7
   File: Contents.jsx
*/

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductList from './ProductList.jsx';
import displayImage from './DisplayImage.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductReport from './ProductReport.jsx';

const NotFound = () => <h1>Page Not Found</h1>;
export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/view/:id" component={displayImage} />
      <Route path="/edit/:id" component={ProductEdit} />
      <Route path="/report" component={ProductReport} />
      <Route component={NotFound} />
    </Switch>
  );
}
