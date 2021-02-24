import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "../../../components/UI/Button/Button";

import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";

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
  const [deliveryMethod, setDeliveryMode] = useState(null);
  const [loading, setLoader] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [totalPrice, setTotalprice] = useState(0);

  useEffect(() => {
    setIngredients(props.ingredients);
    setTotalprice(props.totalPrice);
  });

  const inputChangeHandler = (e) => {
    console.log(e.target.value + " " + e.target.name);
    if (
      e.target.name === "street" ||
      e.target.name === "zipcode" ||
      e.target.name === "country"
    ) {
      setCustomer({
        ...customer,
        address: {
          ...customer.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === "deliveryMethod") {
      setDeliveryMode(e.target.value);
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    console.log(customer);
  };
  const onOrderHandle = (e) => {
    e.preventDefault();
    console.log(customer);
    console.log(deliveryMethod);
    setLoader(true);
    let order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: customer,
      deliveryMethod: deliveryMethod,
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

  let form = null;
  if (loading) {
    form = <Spinner />;
  } else {
    form = (
      <Form>
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
      </Form>
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

export default Contact;
