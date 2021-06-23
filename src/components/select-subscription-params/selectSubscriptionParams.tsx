import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./selectSubscriptionParams.scss";

export function SelectSubscriptionParams() {
  const [duration, setDuration] = React.useState("6");
  const [gb, setGb] = React.useState("50");
  const [upfront, setUpfront] = React.useState("no");

  const handleChange = (event) => {
    let name =  event.target.name;
    if(name === "duration") setDuration(event.target.value);
    else if(name === "gb") setGb(event.target.value);
    else setUpfront(event.target.value);
  };

  return (
    <div id="selectSub">
      <div className="line-item">
        <div>Duration</div>
        <div style={{ width : "272px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="duration"
              name="duration"
              value={duration}
              onChange={handleChange}
            >
            <FormControlLabel value="3" control={<Radio />} label={<div className="radio-option">3 Months<span>Price: 3usd/gb</span></div>} />
            <FormControlLabel value="6" control={<Radio />} label={<div className="radio-option">6 Months<span>Price: 2.5usd/gb</span></div>} />
            <FormControlLabel value="12" control={<Radio />} label={<div className="radio-option">12 Months<span>Price: 2usd/gb</span></div>} />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="line-item">
        <div>Amount of GigaBytes in a cloud</div>
        <div style={{ width : "272px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="gb"
              name="gb"
              value={gb}
              onChange={handleChange}
            >
            <FormControlLabel value="5" control={<Radio />} label={<div className="radio-option">5 GB</div>} />
            <FormControlLabel value="10" control={<Radio />} label={<div className="radio-option">10 GB</div>} />
            <FormControlLabel value="50" control={<Radio />} label={<div className="radio-option">50 GB</div>} />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="line-item">
        <div>Upfront Payment</div>
        <div style={{ width : "272px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="upfront"
              name="upfront"
              value={upfront}
              onChange={handleChange}
            >
            <FormControlLabel value="yes" control={<Radio />} label={<div className="radio-option">Yes</div>} />
            <FormControlLabel value="no" control={<Radio />} label={<div className="radio-option">No</div>} />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
