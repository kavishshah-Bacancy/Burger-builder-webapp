import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  console.log(props.disabled);
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      //here we have pass array of class and seprate it through space
      //Button class appliend on every btn but another btnType that we get from calling Component
      //ig its Danger we appliend another class .Danger or .Success like that
      className={[classes.Button, classes[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
