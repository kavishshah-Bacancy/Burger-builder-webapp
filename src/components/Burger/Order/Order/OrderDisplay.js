import React, { useEffect, useState } from "react";
import classes from "./Order.module.css";

function OrderDisplay(props) {
  const [ingre, setIngre] = useState([]);
  let ingredients = [];
  useEffect(() => {
    for (let item in props.ingredients) {
      ingredients.push({
        name: item,
        count: props.ingredients[item],
      });
    }

    setIngre(ingredients);
  }, []);

  const op = ingre.map((ing) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid lightseagreen",
          padding: "10px",
        }}
        key={ing.name}
      >
        {ing.name}:- {ing.count}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p style={{ textTransform: "uppercase" }}>
        <strong>Ingredients</strong>
      </p>
      <div>{op}</div>
      <br></br>
      <div>
        <p>
          Delivery Method<br></br>
          <span style={{ color: "lightseagreen" }}>
            <strong>{props.deliveryMethod}</strong>
          </span>
        </p>
      </div>
      <p>
        Price :
        <strong>
          <span style={{ color: "red" }}>Rs. {props.price}</span>
        </strong>
      </p>

      <div className={classes.customerCard}>
        <p>Customer details</p>
        {props.customerDetails.name}
        <br></br>
        {props.customerDetails.email}
      </div>
    </div>
  );
}
export default OrderDisplay;
