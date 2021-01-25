import React from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";
import { Redirect } from "react-router-dom";

class NavbarNav extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if (localStorage.usertoken) {
      return(
        <Nav navbar className="border-left flex-row">
          <UserActions />
        </Nav>
      )
    }
    else{
      return <Redirect to='/sign-in' />;
    }
  }
}

export default NavbarNav;