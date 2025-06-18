import React from "react";

// Stepper container with flex styling
const Steps = ({ activeStep, children }) => {
  return (
    <div className="flex flex-col sm:flex-row md:space-x-16 gap-6 mt-6 md:mt-0">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { isActive: index <= activeStep }) 
      )}
    </div>
  );
};

// Individual Step component
const Step = ({ isActive, children, index }) => {
  return (
    <div className="flex items-center md:justify-center">
      <div
        className={`${
          isActive
            ? "bg-black text-white border-black" 
            : "bg-gray-200 text-black" 
        } border-2 rounded-full w-8 h-8 flex items-center justify-center font-semibold`}
      >
        <span className="text-xs">{index + 1}</span>
      </div>
      <div
        className={`ml-2 `} 
      >
        {children}
      </div>
    </div>
  );
};

const StepperComponent = ({ activeStep, nextStep }) => {
  const steps = [
    { label: "Contact Details" },
    { label: "Address Details" },
    { label: "Payment Details" },
  ];

  return (
    <div className="flex justify-start items-center">
      <Steps activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} index={index} {...step}>
            <div>
              <p className="font-medium">{step.label}</p>
            </div>
          </Step>
        ))}
      </Steps>
    </div>
  );
};

export { StepperComponent };

