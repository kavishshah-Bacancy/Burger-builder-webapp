import React, { useEffect, useState } from "react";
import OrderDisplay from "../../components/Burger/Order/Order/OrderDisplay";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
//import Spinner from "../../../components/UI/Spinner/Spinner";

function Order() {
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  let order = [];
  useEffect(() => {
    axios
      .get("/orders.json")
      .then((res) => {
        setLoading(false);
        for (let item in res.data) {
          order.push({ data: res.data[item], key: item });
        }
        setOrderDetail(order);
        console.log(orderDetail);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {orderDetail.map((orders) => {
        console.log(orders.data.customer);
        return (
          <OrderDisplay
            key={orders.key}
            customerDetails={orders.data.customer}
            ingredients={orders.data.ingredients}
            price={orders.data.price}
          />
        );
      })}
    </div>
  );
}

export default Order;
