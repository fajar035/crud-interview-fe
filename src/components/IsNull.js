import React from "react";

function IsNull({ onClick }) {
  return (
    <div className="wrapper-null">
      <h1>You have no data yet</h1>
      <p>☹️</p>
      <button onClick={onClick}>Add users first </button>
    </div>
  );
}

export default IsNull;
