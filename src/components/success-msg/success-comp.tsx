import React from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import "./success-comp.scss";

import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  root: {
    width: 300,
  },
});

export function SuccessContainerDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" className="textCenter">Subscription Successfull!</DialogTitle>
      <DialogContent className={classes.root}>
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <div className="textCenter">
        <button className="tryAgainBtn" onClick={onClose}>Subscribe Again!</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
