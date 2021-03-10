//here we make main Buger Builder component, in which we can make burger
//<div>Burger Design like animation</div>
//<div>Build controls</div>

import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../../hoc/Auxi/Auxi";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  //Get ingredients from backend
  //But Our jsx will load first before this ingredients load so, we have to put spinner
  //in place where we have pass ingredients as props
  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get(
    //     "https://burger-builder-4746-default-rtdb.firebaseio.com/ingredients.json"
    //   )
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((error) => {
    //     console.log("error");
    //   });
  }

  //Handler for checking User add some ingredients or not?
  //For making order button enable/disable
  //so we need total of ingredients added if its >0 then enable other not
  updatePurchaseState(updatedIngredient) {
    const ingredients = {
      ...updatedIngredient,
    };

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]; //its return the value(cnt) salad :1 then it return 1 in place of salad
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0); //reduce method sums all got values(igKey) and gives direct sum

    return sum > 0;
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingre,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;

    if (this.props.ingre) {
      burger = (
        <Auxi>
          <Burger ingredients={this.props.ingre} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingre)}
            ordered={this.purchasingHandler}
          />
        </Auxi>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingre}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    //disabledInfo like eg { salad:true/false, bacon:true etc  }
    //so we know disable less button of that ingredient
    //otherwise if we do not add that ingredient and still try to remove it
    return (
      <Auxi>
        {burger}
        {/* change in Model for Showing Spinner-->Till now only chnages in props use for rendering but
        but now Changes in children is also has to encounter */}
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      </Auxi>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingre: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
