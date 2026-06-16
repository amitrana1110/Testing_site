import React from "react";

function MaxWidthContainer({ children, className = "" }) {
  return (
    <div
      className={`max-w-7xl mx-auto w-full px-4 py-4 lg:px-5 ${className}`}
    >
      {children}
    </div>
  );
}

export default MaxWidthContainer;
