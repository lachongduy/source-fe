import { Button } from "@mui/material";
import React from "react";
import { GoDiffAdded } from "react-icons/go";

const ActionButton = (props) => {
  const openCreateDialog = () => {
    props.actionCreateDialog();
  };
  return (
    <div>
      <Button
        disabled={props.disabled}
        onClick={openCreateDialog}
        variant="contained"
        startIcon={<GoDiffAdded />}>
        {props.title}
      </Button>
    </div>
  );
};

export default ActionButton;
