import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import CheckoutOrder from "../../components/Burger/Order/CheckoutOrder";
import Contact from "./Contactus/Contact";

function Checkout(props) {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    bacon: 1,
    meat: 1,
    cheese: 1,
  });
  const [totalPrice, setTotalprice] = useState(0);
  useEffect(() => {
    let tempobj = {};
    let price = 0;
    const query = new URLSearchParams(props.location.search);
    if (query !== null) {
      for (let param of query.entries()) {
        if (param[0] === "price") {
          price = param[1];
        } else {
          tempobj[param[0]] = +param[1];
        }
      }
      setIngredients(tempobj);
      console.log(ingredients);
      setTotalprice(price);
    }
  }, []);
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
        ingredients={ingredients}
        onClickCancel={onClickCancel}
        onClickContinue={onClickContinue}
      />
      <Route
        path={props.match.path + "/contact-detail"}
        render={() => (
          <Contact ingredients={ingredients} totalPrice={totalPrice} />
        )}
      />
    </div>
  );
}

export default Checkout;
