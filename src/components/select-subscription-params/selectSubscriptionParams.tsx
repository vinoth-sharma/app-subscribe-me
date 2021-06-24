import React, { useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "./selectSubscriptionParams.scss";
import {
  getGlobalStorageData,
  setUserSelection,
} from "../../service/global.service";

export function SelectSubscriptionParams() {
  const [duration, setDuration] = React.useState(null);
  const [gb, setGb] = React.useState(null);
  const [upfront, setUpfront] = React.useState(null);
  const [durationSets, setDurationSets] = React.useState([]);

  useEffect(() => {
    
    let data = getGlobalStorageData();
      setDuration(data.duration);
      setGb(data.gb);
      setUpfront(data.upfrontPayment);
      setDurationSets(data.price_data);

  }, []);

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (name === "duration") {
      setDuration(+value);
      setUserSelection("duration", +value);
    } else if (name === "gb") {
      setGb(+value);
      setUserSelection("gb", +value);
    } else {
      setUpfront(value);
      setUserSelection("upfrontPayment", value);
    }
  };

  return (
    <div id="selectSub">
      <div className="line-item">
        <div>Duration</div>
        <div style={{ width: "272px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="duration"
              name="duration"
              value={duration}
              onChange={handleChange}
            >
              {durationSets.map((ele)=>(
              <FormControlLabel
              key={ele.duration_months}
              value={ele.duration_months}
              control={<Radio />}
              label={
                <div className="radio-option">
                  {ele.duration_months} Months<span>Price: {ele.price_usd_per_gb} USD/GB</span>
                </div>
              }
            />                
              ))}
              {/* <FormControlLabel
                value={3}
                control={<Radio />}
                label={
                  <div className="radio-option">
                    3 Months<span>Price: 3usd/gb</span>
                  </div>
                }
              />
              <FormControlLabel
                value={6}
                control={<Radio />}
                label={
                  <div className="radio-option">
                    6 Months<span>Price: 2.5usd/gb</span>
                  </div>
                }
              />
              <FormControlLabel
                value={12}
                control={<Radio />}
                label={
                  <div className="radio-option">
                    12 Months<span>Price: 2usd/gb</span>
                  </div>
                }
              /> */}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="line-item">
        <div>Amount of GigaBytes in a cloud</div>
        <div style={{ width: "272px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="gb"
              name="gb"
              value={gb}
              onChange={handleChange}
            >
              <FormControlLabel
                value={5}
                control={<Radio />}
                label={<div className="radio-option">5 GB</div>}
              />
              <FormControlLabel
                value={10}
                control={<Radio />}
                label={<div className="radio-option">10 GB</div>}
              />
              <FormControlLabel
                value={50}
                control={<Radio />}
                label={<div className="radio-option">50 GB</div>}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="line-item">
        <div>Upfront Payment</div>
        <div style={{ width: "272px" }}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="upfront"
              name="upfront"
              value={upfront}
              onChange={handleChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={<div className="radio-option">Yes</div>}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={<div className="radio-option">No</div>}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
