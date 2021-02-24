import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/Checkout/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Order from "./container/Order/Order";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Layout>
            <Switch>
              <Route path="/orderdetails" component={Order} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  }
}
