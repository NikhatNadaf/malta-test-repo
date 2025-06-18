"use client";

import React, { useState, useRef } from "react";

export default function Stepper({ stepsData }) {
  const [activeStep, setActiveStep] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const itemRefs = useRef([]);

  const toggleAccordion = (index) => {
    if (activeStep === index) {
      setActiveStep(null);
    } else {
      setActiveStep(index);
      itemRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full flex justify-start">
      <div className="relative flex flex-col items-start w-full">
        {stepsData.length > 0 ? (
          stepsData.map((item, index) => {
            const isAccordionExpanded = activeStep === index;
            const isDescriptionExpanded = expandedDescriptions[index] || false;

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className="flex items-start w-full mb-5"
              >
                <div className="flex flex-col items-center pt-1 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold bg-primary">
                    {index + 1}
                  </div>
                  {index !== stepsData.length - 1 && (
                    <div className="w-[2px] my-1 h-10 bg-primary"></div>
                  )}
                </div>

                {/* Desktop version */}
                <div className="hidden md:block w-full">
                  <h3 className="text-lg font-semibold mb-1">{item.heading}</h3>
                  <div className="relative">
                    <p
                      className={`text-gray-700 text-sm leading-relaxed transition-all duration-300 ${
                        isDescriptionExpanded ? "line-clamp-none" : "line-clamp-3"
                      }`}
                    >
                      {item.description}
                    </p>

                    {item.description.length > 120 && (
                      <button
                        onClick={() => toggleDescription(index)}
                        className="mt-3 px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition-all shadow-sm"
                      >
                        {isDescriptionExpanded ? "Show less ▲" : "Show more ▼"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile version */}
                <div className="block md:hidden w-full p-3 rounded-lg border border-gray-200 bg-white">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-semibold">{item.heading}</h3>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="px-3 py-1 text-sm rounded-full font-medium text-white bg-primary hover:bg-primary/90 shadow-sm transition"
                    >
                      {isAccordionExpanded ? "Hide ▲" : "Details ▼"}
                    </button>
                  </div>

                  {isAccordionExpanded && (
                    <div className="mt-3 text-sm text-gray-700 leading-relaxed">
                      <p>{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No steps available.</p>
        )}
      </div>
    </div>
  );
}
