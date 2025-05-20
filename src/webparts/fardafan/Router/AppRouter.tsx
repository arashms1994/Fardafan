import * as React from "react";
import { Component } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Layout } from "../Layout/Layout";
import Fardafan from "../components/Fardafan";
import Experience from "../components/Experience/Experience";
import Profession from "../components/Profession/Profession";
import Family from "../components/Family/Family";

export default class AppRouter extends Component<any, any> {
  public render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Fardafan} />
          <Route path="Experience" component={Experience} />
          <Route path="profession" component={Profession} />
          <Route path="family" component={Family} />
        </Route>
      </Router>
    );
  }
}
