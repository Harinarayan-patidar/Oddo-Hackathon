import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded ${className}`}
    {...props}
  >
    {children}
  </button>
);
