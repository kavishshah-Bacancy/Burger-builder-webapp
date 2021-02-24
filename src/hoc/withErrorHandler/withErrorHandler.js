import React, { Component, useEffect, useState } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Auxi from "../Auxi/Auxi";

const WithErrorHandler = (WrappedComponent, axios) => {
  return function Example(props) {
    const [error, setError] = useState(null);
    useEffect(() => {
      console.log("hello");
      const reqInterceptor = axios.interceptors.request.use((req) => {
        console.log("Requesttt");
        setError(null);
        return req;
      });

      const resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          console.log(error.message + "Error from interceptor");
          setError(error);
        }
      );

      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.request.eject(resInterceptor);
      };
    }, []);
    const errorConfirmedHandler = () => {
      setError(null);
    };
    return (
      <Auxi>
        <Modal show={error} close={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Auxi>
    );
  };

  //   return class extends Component {
  //     state = {
  //       error: null,
  //     };

  //     componentWillMount() {
  //       this.reqInterceptor = axios.interceptors.request.use((req) => {
  //         console.log("Request");
  //         this.setState({ error: null });
  //         return req;
  //       });
  //       this.resInterceptor = axios.interceptors.response.use(
  //         (res) => res,
  //         (error) => {
  //           console.log(error.message + "Error from interceptor");
  //           this.setState({ error: error });
  //         }
  //       );
  //     }

  //     componentWillUnmount() {
  //       axios.interceptors.request.eject(this.reqInterceptor);
  //       axios.interceptors.response.eject(this.resInterceptor);
  //     }
  //     errorConfirmedHandler = () => {
  //       this.setState({ error: null });
  //     };

  //     render() {
  //       return (
  //         <Auxi>
  //           <Modal show={this.state.error} close={this.errorConfirmedHandler}>
  //             {this.state.error ? this.state.error.message : null}
  //           </Modal>
  //           <WrappedComponent {...this.props} />
  //         </Auxi>
  //       );
  //     }
  //   };
};

export default WithErrorHandler;
