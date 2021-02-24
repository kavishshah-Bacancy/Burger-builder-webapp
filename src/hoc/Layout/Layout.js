/* eslint-disable no-lone-blocks */
//This is Layout part
// so in this we want TOOLbar , Sidedrawer, Backdrop
//we make one hoc for not using root component, we here didnnt use Fragement,instead of that we make one HOC which return chilldre

import React, { Component } from "react";
import Auxi from "../Auxi/Auxi";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

{
  /* <div>
    <ToolBar/>
    <SideBar/>
    <Backdrop>
</div>
<Main>
    here we want our component to load
    {props.children}
</Main> */
}

export default class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
  };

  openSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxi>
        <Toolbar openSidebar={this.openSideDrawer} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.closeSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Auxi>
    );
  }
}
