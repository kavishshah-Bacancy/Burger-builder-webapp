import React, { Component } from "react";
import Auxi from "../../../hoc/Auxi/Auxi";
import Button from "../../UI/Button/Button";

export default class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("Update orderSummary");
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey} </span> :{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Auxi>
        <h3>Your Order Summary</h3>
        <p>Delicious Burger with follwing Ingredients</p>
        <ul>{ingredientsSummary}</ul>
        <p>Total Price : {this.props.price}</p>
        <p>Continue to Checkout !!!</p>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          CANCEL
        </Button>
      </Auxi>
    );
  }
}
