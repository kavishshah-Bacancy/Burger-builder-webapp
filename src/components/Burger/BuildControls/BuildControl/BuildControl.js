import React from "react";
import classes from "./BuildControl.module.css";
//purpose of this is out BuildControls have 2 buttons and label so this are reusable so we make this
// component for that reusable button and lable and use that in BuildControls.js

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
);

export default buildControl;
