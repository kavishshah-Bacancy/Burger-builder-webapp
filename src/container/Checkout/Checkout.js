import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckoutOrder from "../../components/Burger/Order/CheckoutOrder";
import Contact from "./Contactus/Contact";

function Checkout(props) {
  const onClickCancel = () => {
    console.log("cancel");
    props.history.goBack();
  };

  const onClickContinue = () => {
    props.history.replace("/checkout/contact-detail");
  };
  return (
    <div>
      <CheckoutOrder
        ingredients={props.ingre}
        onClickCancel={onClickCancel}
        onClickContinue={onClickContinue}
      />
      <Route path={props.match.path + "/contact-detail"} component={Contact} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingre: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

export default connect(mapStateToProps)(Checkout);
