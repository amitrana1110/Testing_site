import React from "react";

function MaxWidthContainer({ children, className = "", ...props }) {
  return (
    <div
      className={`max-w-7xl mx-auto w-full px-4 py-4 lg:px-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default MaxWidthContainer;
