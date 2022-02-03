import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import PatientList from "./components/Patient/PatientList";
import AddTest from "./components/Test/AddTest";
import TestList from "./components/Test/TestList";



export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
        <Switch> 

        <Route path="/" exact>
                    {isLoggedIn ? <PatientList />: <Redirect to="/login" />}
                </Route>
        <Route path="/test" exact>
                    {isLoggedIn ? <TestList />: <Redirect to="/login" />}
                </Route>

                <Route path="/login" exact>
                  <Login />
                </Route> 
              
                <Route path="/addtest" exact>
                {isLoggedIn ?  <AddTest /> : <Redirect to="/login" />}
                </Route> 
        </Switch>
        </main>
    )
}