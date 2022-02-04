import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { Spinner } from "reactstrap";
import Header from "./components/Header";
import ApplicationViews from "./ApplicationViews";
import { onLoginStatusChange } from "./modules/authManager";
import SideBar from "./components/SideBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark"/>;
  }

  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <ApplicationViews className="content" isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        </div>
    </Router>
  );
}

export default App;