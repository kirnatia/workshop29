import React from "react";
import ReactDOM from "react-dom";
import PuppyBowl from "./PuppyBowl";

ReactDOM.render(
  <PuppyBowl />,
  document.getElementById("all-players-container")
);
ReactDOM.render(<PuppyBowl />, document.getElementById("new-player-form"));
