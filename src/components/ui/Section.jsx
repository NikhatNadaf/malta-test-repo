"use client";

import React from "react";

const Section = ({ children, className = "" }) => {
  return (
    <section className={`py-12 md:py-12 ${className}`}>
      {/* <div className="container mx-auto px-4">{children}</div> */}
      <div className="mx-auto px-4">{children}</div>
    </section>
  );
};

export default Section;
