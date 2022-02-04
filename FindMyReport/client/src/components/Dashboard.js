import React from "react";
import PatientList from "./Patient/PatientList";
import TestList from "./Test/TestList";


export const Dashboard = () => {
   

  return (
    <div className=".container">

      <PatientList></PatientList>
      <TestList></TestList>
    </div>
  );
};
