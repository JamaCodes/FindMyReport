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
import SubMenu from "./SubMenu";
import { logout } from "../modules/authManager";

export const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Provider Dashboard</h3>
    </div>
    <div className="side-menu">
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

const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      itle: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;
