import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import "./stepper.scss";
import { SelectSubscriptionParams } from "../select-subscription-params/selectSubscriptionParams";
import { PaymentDetails } from "../payment/payment";
import { Confirmation } from "../confirmation/confirmation";
import { SuccessContainerDialog } from "../success-msg/success-comp";
import {
  resetGlobalStorage,
  setStepCompletion,
  onValueChanges,
  getGlobalStorageData,
} from "../../service/global.service";

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: 20,
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  backbtn: {
    border: "1px solid grey",
  },
}));

function getSteps() {
  return ["Select Plan", "Add Credit Card Details", "Confirmation"];
}

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <SelectSubscriptionParams />;
//     case 1:
//       return <PaymentDetails validHandler={setIsCardValid} />;
//     case 2:
//       return <Confirmation />;
//     default:
//       return <Confirmation />;
//   }
// }

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [totalAmount, setTotal] = React.useState(10);
  const [duration, setDuration] = React.useState(12);
  const [upfront, setUpfront] = React.useState("no");
  const [open, setOpen] = React.useState(false);
  const [isCardValid, setIsCardValid] = React.useState(false);
  const [isUserValid, setIsUserValid] = React.useState(false);

  useEffect(() => {

    const subscription = onValueChanges().subscribe((res) => {
      const {
        total_payable,
        duration,
        upfrontPayment
      } = res;
      setTotal(total_payable);
      setDuration(duration);
      setUpfront(upfrontPayment);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <SelectSubscriptionParams />;
      case 1:
        return <PaymentDetails validHandler={setIsCardValid} />;
      case 2:
        return <Confirmation validHandler={setIsUserValid}  />;
      default:
        return <Confirmation  validHandler={setIsUserValid}  />;
    }
  }

  const handleClose = () => {
    setActiveStep(0);
    setOpen(false);
    resetGlobalStorage();
  };

  const handleNext = () => {
    setStepCompletion(activeStep);

    if (activeStep === 2) {
      setOpen(true);
      return true;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateNextBtn = () => {
    // console.log("validate");
    // console.log(res);
    
    // if(!res) return false
    // const {
    //   total_payable,
    //   duration,
    //   upfrontPayment,
    //   card_no_1,
    //   card_no_2,
    //   card_no_3,
    //   card_no_4,
    //   expiry__m,
    //   expiry__y,
    //   cvv,
    // } = res;
    // if (activeStep === 1) {
    //   if (
    //     card_no_1.length === 4 &&
    //     card_no_2.length === 4 &&
    //     card_no_3.length === 4 &&
    //     card_no_4.length === 4 &&
    //     expiry__m.length === 2 &&
    //     expiry__y.length === 2 &&
    //     cvv === 3
    //   ) {
    //     console.log("true");
    //   } else console.log("false");
    // }

    // console.log(activeStep);
    // return false;
  };


  console.log("return");
  

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div id="stepper-content">
          {getStepContent(activeStep)}
          <div className="stepper-footer">
            <div className="display-center">
              <p style={{ width: "200px" }}>
                Plan Selected{" "}
                <span style={{ fontSize: "0.8rem" }}>({duration} Months)</span>
              </p>
              {upfront === "yes" ? (
                <>
                  <div className="marginR10"> $ {totalAmount * 0.9} </div>
                  <div style={{ textDecoration: "line-through" }}>
                    $ {totalAmount}
                  </div>
                </>
              ) : (
                <div> $ {totalAmount} </div>
              )}
            </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={`${classes.backbtn} ${classes.button}`}
              >
                Back
              </Button>
              <Button
                disabled={activeStep === 1? !isCardValid : activeStep === 2? !isUserValid : false}
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Confirm" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SuccessContainerDialog open={open} onClose={handleClose} />
    </div>
  );
}
