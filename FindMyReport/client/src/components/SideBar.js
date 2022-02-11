import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

export const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#000" }}>
        &times;
      </span>
      <h3>Provider Dashboard</h3>
    </div>
    <div className="side-menu nav-links">
      <Nav vertical className="list-unstyled pb-3">
        <p></p>
        
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/test"}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Tests
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink tag={Link} to={"/report"}>
            <FontAwesomeIcon icon={faCopy} className="mr-2" />
           Reports
          </NavLink>
        </NavItem>

        <NavItem>
          <a
            aria-current="page"
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={logout}
          >
            Logout
          </a>
        </NavItem>
      </Nav>
    </div>
  </div>
);



export default SideBar;
