import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import { NavLink } from "react-router-dom";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem exact link="/">
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orderdetails">Order Details</NavigationItem>
  </ul>
);

export default NavigationItems;
