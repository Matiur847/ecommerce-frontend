import React from "react";
import "../style/CheckPointStep.css";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Shipping Details", "Confirm Order", "Payment"];

const CheckPointStep = ({ activeStep }) => {
  return (
    <div className="mt-4">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
    </div>
  );
};

export default CheckPointStep;
