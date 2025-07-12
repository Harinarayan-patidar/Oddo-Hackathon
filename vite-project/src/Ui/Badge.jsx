import React from "react";

export const Badge = ({ children, className = "", ...props }) => (
  <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${className}`} {...props}>
    {children}
  </span>
);
