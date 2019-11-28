import * as React from "react";
import * as ReactDOM from "react-dom";
import HeaderScrollSync from "./headerScrollSync";
import SideScrollSync from "./sideScrollSync";
import PlanningScrollSync from "./planningScrollSync";

document.addEventListener( "DOMContentLoaded", event => {
  ReactDOM.render( <SideScrollSync />, document.getElementById( 'scroll_sync_example' ) );
} );
