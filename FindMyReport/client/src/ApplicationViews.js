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

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
        <Switch> 


        <Route path="/" exact>
                    {isLoggedIn ? <Dashboard />: <Redirect to="/login" />}
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
                    <EditTest userparams />
                </Route>

                <Route path="/deleteTest/:id">
                    <DeleteTest userparams />
                </Route>

                <Route path="/addtestreport/:id">
                    <AddReportTest  />
                </Route>

                <Route path="/reporttest/">
                    <DisplayReportTest />
                </Route>

                <Route path="/addreport" exact>
                {isLoggedIn ?  <AddReport /> : <Redirect to="/login" />}
                </Route> 

                <Route path="/editreport/:id">
                    <EditReport userparams />
                </Route>

                <Route path="/deletereport/:id">
                    <DeleteReport userparams />
                </Route>
                <Route path="/findmytest">
                    <FindMyTest  />
                </Route>
                
        </Switch>
        </main>
    )
}