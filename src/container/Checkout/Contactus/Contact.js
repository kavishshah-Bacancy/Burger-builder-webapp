import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";

import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";
import Input from "../../../components/UI/FormFields/Input/Input";
import { connect } from "react-redux";

function Contact(props) {
  let history = useHistory();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      zipcode: null,
      country: "",
    },
  });

  const [customerOrderForm, setCustomerOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Enter Your Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Your Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Your zipcode",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter Your Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "Please Select Method",
            displayValue: "Please Select Method",
          },
          { value: "Fastest", displayValue: "Fastest" },
          { value: "Cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      value: "",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [deliveryMethod, setDeliveryMode] = useState("Normal");
  const [loading, setLoader] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [totalPrice, setTotalprice] = useState(0);

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      //we define required property to TRUE
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };
  const onInputHandler = (event, inputIdentifier) => {
    //so now for updating the value we first want to know,
    //Which field that we have to update, so for that we have inputIdentifier(name,street etc)
    const updatedOrderFormValue = {
      ...customerOrderForm,
    };
    const updatedFormElement = {
      ...customerOrderForm[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    let formIsValid = true;

    for (let input in updatedOrderFormValue) {
      if (input !== "deliveryMethod")
        formIsValid = updatedOrderFormValue[input].valid && formIsValid;
    }
    setFormIsValid(formIsValid);
    console.log(formIsValid);
    updatedOrderFormValue[inputIdentifier] = updatedFormElement;
    setCustomerOrderForm(updatedOrderFormValue);
  };

  const onOrderHandle = (e) => {
    e.preventDefault();
    let customerArr = {};
    console.log(customerOrderForm);
    for (let inputIdentifier in customerOrderForm) {
      customerArr[inputIdentifier] = customerOrderForm[inputIdentifier].value;
    }
    console.log(customerArr);
    console.log(deliveryMethod);
    setLoader(true);
    let order = {
      ingredients: props.ingre,
      price: props.totalPrice,
      customer: customerArr,
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        console.log(res);
        setLoader(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const formsArray = [];
  for (let customerFormKey in customerOrderForm) {
    formsArray.push({
      id: customerFormKey, //here we get name,street etc
      config: customerOrderForm[customerFormKey], //here we get all respective data of name,street etc
    });
  }
  let form = null;
  if (loading) {
    form = <Spinner />;
  } else {
    form = (
      <form>
        {formsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              valueType={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.value}
              isValid={!formElement.config.valid}
              touched={formElement.config.touched}
              changed={(event) => onInputHandler(event, formElement.id)}
            />
          );
        })}

        <Button
          btnType="Success"
          disabled={!formIsValid}
          clicked={onOrderHandle}
        >
          Continue
        </Button>
      </form>
    );
  }
  return (
    <div
      className="card"
      style={{
        width: "50%",
        padding: "10px",
        marginTop: "10%",
        alignItems: "center",
        marginLeft: "20%",
      }}
    >
      {form}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ingre: state.ingredients,
    totalPrice: state.totalPrice,
  };
};
export default connect(mapStateToProps)(Contact);

// const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     address: {
//       street: "",
//       zipcode: null,
//       country: "",
//     },
//   });

// const inputChangeHandler = (e) => {
//     console.log(e.target.value + " " + e.target.name);
//     if (
//       e.target.name === "street" ||
//       e.target.name === "zipcode" ||
//       e.target.name === "country"
//     ) {
//       setCustomer({
//         ...customer,
//         address: {
//           ...customer.address,
//           [e.target.name]: e.target.value,
//         },
//       });
//     } else if (e.target.name === "deliveryMethod") {
//       setDeliveryMode(e.target.value);
//     } else {
//       setCustomer({ ...customer, [e.target.name]: e.target.value });
//     }

//     console.log(customer);
//   };

//onOrderHandle=()=>{
//     console.log(deliveryMethod);
//     setLoader(true);
//     let order = {
//       ingredients: ingredients,
//       price: totalPrice,
//       customer: customer,
//       deliveryMethod: deliveryMethod,
//     };
//     axios
//       .post("/orders.json", order)
//       .then((res) => {
//         console.log(res);
//         setLoader(false);
//         history.push("/");
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoader(false);
//       });
// }

// -----------------Form using boostrap--------------
/* <Form>
        <p style={{ color: "#703B09", fontSize: "30px", textAlign: "center" }}>
          <u>Enter Your Contact Details</u>
        </p>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            name="name"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>street</label>
          <input
            type="text"
            className="form-control"
            name="street"
            placeholder="Enter your streat name here"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>Zipcode</label>
          <input
            type="number"
            className="form-control"
            name="zipcode"
            placeholder="Enter zipcode code here"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            placeholder="Enter Country here"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label>Delivery Method</label>
          <select
            name="deliveryMethod"
            onChange={(e) => inputChangeHandler(e)}
            className="form-control"
          >
            <option value="Please Select Type">Please Select Type</option>
            <option value="Fast Express">Fast Express</option>
            <option value="Normal">Normal</option>
          </select>
        </div>
        <Button clicked={onOrderHandle} btnType="Success">
          Continue
        </Button>
      </Form> */
