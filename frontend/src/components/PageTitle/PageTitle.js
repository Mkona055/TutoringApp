import React from 'react';
import "./PageTitle.css"
const CenteredTitleWithDivider = ({title}) => {
  return (
    <div className="container text-center mt-5">
      <h1 className="d-inline-block position-relative">
      <span className="title">{title}</span> 

        <div className="underline"></div> 
      </h1>
    </div>
  );
};

export default CenteredTitleWithDivider;
