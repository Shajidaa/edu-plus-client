import React from "react";

const StudTuitionGetRow = ({ tuitionData }) => {
  const data = tuitionData;

  return (
    <div>
      {" "}
      <p className="text-7xl text-green-600">student rows{data.length}</p>
    </div>
  );
};

export default StudTuitionGetRow;
