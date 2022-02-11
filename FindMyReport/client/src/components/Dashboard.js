import React , {useState} from "react";
import PatientList from "./Patient/PatientList";
import SideBar from "./SideBar";
import TestList from "./Test/TestList";




 const Dashboard = () => {


  return (
  <div className=".container">
    <div className="p-5">
      <PatientList></PatientList>
      <TestList></TestList>
   </div>
   </div>
   
  );
};
export default Dashboard
