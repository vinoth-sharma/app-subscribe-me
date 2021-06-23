import "./confirmation.scss";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";

export function Confirmation() {
  const [terms, setTerms] = React.useState(false);
  const handleCheckBoxChange = (event) => {
    setTerms(event.target.checked);
  };

  return (
    <>
      <p className="title">Selected Subscription Plan</p>

      <div className="card-container">
        <div className="kpi-cards">
          <div>3</div>
          <div> Duration(Months)</div>
        </div>
        <div className="kpi-cards">
          <div>10</div>
          <div> Cloud Storage(GB)</div>
        </div>
        <div className="kpi-cards">
          <div>Yes</div>
          <div> Upfront Payment</div>
        </div>
      </div>
      <div className="line-item">
        <p>Please enter your email address</p>
        <TextField id="standard-basic" label="Email" variant="outlined" placeholder="xxx@email.com" />
      </div>
      <div className="line-item">
      <Checkbox
          checked={terms}
          onChange={handleCheckBoxChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <p onClick={()=>setTerms(!terms)} className="cursorPointer">By Clicking, you agree to our terms and conditions.</p>

      </div>
    </>
  );
}
