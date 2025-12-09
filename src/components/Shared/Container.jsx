import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className} container mx-auto py-3 lg:py-4`}>
      {children}
    </div>
  );
};

export default Container;
