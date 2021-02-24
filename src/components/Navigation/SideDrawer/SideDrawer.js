import React from "react";
import Auxi from "../../../hoc/Auxi/Auxi";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    console.log("hello");
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxi>
      <Backdrop show={props.open} close={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxi>
  );
};

export default SideDrawer;
