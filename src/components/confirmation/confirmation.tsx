import "./confirmation.scss";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import React, { ChangeEvent, Dispatch, useEffect } from "react";
import {
  getGlobalStorageData,
  setUserSelection,
} from "../../service/global.service";

interface ConfirmationProp {
  validHandler: Dispatch<boolean>;
}
export function Confirmation({ validHandler }: ConfirmationProp) {
  const [terms, setTerms] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const [duration, setDuration] = React.useState(null);
  const [gb, setGb] = React.useState(null);
  const [upfront, setUpfront] = React.useState(null);

  useEffect(() => {
    setUserSelection("acceptTerms", false);

    let data = getGlobalStorageData();
    setDuration(data.duration);
    setGb(data.gb);
    setUpfront(data.upfrontPayment);
    setEmail(data.email);
  }, []);

  useEffect(() => {
    if (validateEmail(email) && terms) validHandler(true);
    else validHandler(false);
  }, [email, terms, validHandler]);

  const handleCheckBoxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.checked);
    setUserSelection(event.target.name, event.target.checked);
  };

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setUserSelection(event.target.name, event.target.value);
  };

  return (
    <>
      <p className="title">Selected Subscription Plan</p>

      <div className="card-container">
        <div className="kpi-cards">
          <div>{duration}</div>
          <div> Duration(Months)</div>
        </div>
        <div className="kpi-cards">
          <div>{gb}</div>
          <div> Cloud Storage(GB)</div>
        </div>
        <div className="kpi-cards">
          <div>{upfront}</div>
          <div> Upfront Payment</div>
        </div>
      </div>
      <div className="line-item">
        <p>Please enter your email address</p>
        <TextField
          autoFocus
          name="email"
          id="standard-basic"
          label="Email"
          variant="outlined"
          placeholder="xxx@email.com"
          value={email}
          onChange={inputHandler}
        />
      </div>
      <div className="line-item">
        <Checkbox
          name="acceptTerms"
          checked={terms}
          onChange={handleCheckBoxChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <p onClick={() => setTerms(!terms)} className="cursorPointer">
          By Accepting,You agree to our terms and conditions.
        </p>
      </div>
    </>
  );
}

function validateEmail(email) {
  let re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (re.test(email)) {
    return true;
  } else return false;
}
