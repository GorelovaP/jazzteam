import React from "react";

import "./styledLoading.css";

export const Loading = () => {
  return (
    <div className="loadingArea">
      <div className={"loadingArea__loader"}>
        <div className={"loadingArea__loader__innerOne"}> </div>
        <div className={"loadingArea__loader__innerTwo"}> </div>
        <div className={"loadingArea__loader__innerThree"}> </div>
      </div>
    </div>
  );
};
