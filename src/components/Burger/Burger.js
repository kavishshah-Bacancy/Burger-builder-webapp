import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  //so from Burger we got Object [key,value] eg [salad:2,bacon:1] etc
  //Now we have to convert that into array becuase we need that much time call of that ingredeient
  //eg salag:2 theen we have to call burgerIngredeint 2 time with salad types then how to convert?

  // Object.keys(props.ingredients) transfomr object into array
  //So in that console we get (salad,bacon,etc that user entered)
  //Now we make space using Array method like we got type name and now we get value of it
  //...Array(props.ingredients[salad]) i.e eg 2 then it make two blank space, that we want
  //so through that we iterate 2 times and pass types as igKey and _ is first arg that we dont need so i is key
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      console.log(igKey);
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    });

  console.log(transformedIngredients.length);

  //without using REDUCE function we get this
  //(4) [Array(1), Array(2), Array(3), Array(1)]
  // 0: [{…}]
  // 1: (2) [{…}, {…}]
  // 2: (3) [{…}, {…}, {…}]
  // 3: [{…}]
  //length: 4;
  //and iff we want total ingredients added? then how to get that?
  //use Reduce function at the and of tranformedIngredients

  //With REduce function:--
  //         we got this
  //         (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
  //            0: {$$typeof: Symbol(react.element), key: "salad0", ref: null, props: {…}, type: ƒ, …}
  //            1: {$$typeof: Symbol(react.element), key: "bacon0", ref: null, props: {…}, type: ƒ, …}
  //            2: {$$typeof: Symbol(react.element), key: "bacon1", ref: null, props: {…}, type: ƒ, …}
  //            3: {$$typeof: Symbol(react.element), key: "cheese0", ref: null, props: {…}, type: ƒ, …}
  //            4: {$$typeof: Symbol(react.element), key: "cheese1", ref: null, props: {…}, type: ƒ, …}
  //            5: {$$typeof: Symbol(react.element), key: "cheese2", ref: null, props: {…}, type: ƒ, …}
  //            6: {$$typeof: Symbol(react.element), key: "meat0", ref: null, props: {…}, type: ƒ, …}
  //            length: 7

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Add some ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
