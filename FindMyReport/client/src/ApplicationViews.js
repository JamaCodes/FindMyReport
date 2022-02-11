import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import PatientList from "./components/Patient/PatientList";
import AddTest from "./components/Test/AddTest";
import TestList from "./components/Test/TestList";
import EditTest from "./components/Test/EditTest"
import DeleteTest from "./components/Test/DeleteTest";
import  Dashboard  from "./components/Dashboard";
import  DisplayReportTest  from "./components/ReportTest/ReportTestDisplay";
import AddReportTest  from "./components/ReportTest/AddReportTest";
import  EditReport  from "./components/Reports/EditReport";
import  ReportList from "./components/Reports/ReportList";
import AddReport from "./components/Reports/AddReport";
import DeleteReport from "./components/Reports/DeleteReport";
import  FindMyTest  from "./components/Test/FindMyTest";
import Test from "./components/Test/Test";
import Register from "./components/Register";
import CheckInPatient from "./components/Patient/AddPatient";

export default function ApplicationViews({ isLoggedIn}) {
    return (
        <main>
        <Switch> 


        <Route path="/" exact>
                    {isLoggedIn ? <Dashboard  />: <Redirect to="/login" />}
                </Route>
        <Route path="/test" exact>
                    {isLoggedIn ? <TestList />: <Redirect to="/login" />}
                </Route>

                <Route path="/report" exact>
                    {isLoggedIn ? <ReportList />: <Redirect to="/login" />}
                </Route>

                <Route path="/login" exact>
                  <Login />
                </Route> 
              
                <Route path="/addtest" exact>
                {isLoggedIn ?  <AddTest /> : <Redirect to="/login" />}
                </Route> 

                <Route path="/editTest/:id">
                {isLoggedIn ?  <EditTest  /> : <Redirect to="/login" />} 
                </Route>
                <Route path="/editreport/:id">
                {isLoggedIn ?  <EditReport /> : <Redirect to="/login" />} 
                </Route>
                <Route path="/deleteTest/:id">
                {isLoggedIn ?  <DeleteTest /> : <Redirect to="/login" />} 
                </Route>

                <Route path="/addtestreport/:id">
                {isLoggedIn ?  <AddReportTest /> : <Redirect to="/login" />} 

                </Route>
            
                <Route path="/reporttest/:id">
                {isLoggedIn ?  <DisplayReportTest /> : <Redirect to="/login" />} 
                </Route>

                <Route path="/addreport" exact>
                {isLoggedIn ?  <AddReport /> : <Redirect to="/login" />}
                </Route> 



                <Route path="/deletereport/:id">
                {isLoggedIn ?    <DeleteReport userparams /> : <Redirect to="/login" />}
                </Route>
                <Route path="/findmytest">
                    <FindMyTest  />
                </Route>
                <Route path="/register">
                    <Register  />
                </Route>
                <Route path="/checkin">
                    <CheckInPatient  />
                </Route>
                
        </Switch>
        </main>
    )
}