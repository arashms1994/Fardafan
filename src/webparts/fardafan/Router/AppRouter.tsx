import * as React from "react";
import { Component } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { Layout } from "../Layout/Layout";
import Fardafan from "../components/Fardafan";

export default class AppRouter extends Component<any, any> {
  public render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Fardafan} />
          {/* <Route path="cart" component={Cart} />
          <Route path="product-details/:Code" component={ProductPage} />
          <Route path="order" component={OrderForm} /> */}
        </Route>
      </Router>
    );
  }
}
