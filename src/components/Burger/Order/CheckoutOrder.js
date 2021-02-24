import React, { useEffect } from "react";
import Button from "../../UI/Button/Button";
import Burger from "../Burger";
import classes from "./CheckoutOrder.module.css";

function CheckoutOrder(props) {
  return (
    <div className={classes.CheckoutOrder}>
      <div style={{ width: "100%", height: "300px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.onClickCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.onClickContinue}>
        Continue
      </Button>
    </div>
  );
}

export default CheckoutOrder;
