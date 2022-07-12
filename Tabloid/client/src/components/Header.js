import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logout } from '../modules/authManager';
import './Header.scss'

export default function Header({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div id="nav">
      <Navbar color="dark" light expand="md">
        <img src='quill-logo.png'></img>
        <NavbarBrand tag={RRNavLink} to="/" className="nav-link" activeclassname="active">Tabloid</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="myposts">My Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/categories" className={({ isActive }) => "nav-link" + (isActive ? "active" : "inactive")}>Categories</NavLink>
                </NavItem>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login" className={({ isActive }) => "nav-link" + (isActive ? " active" : "inactive")}>Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register" className={({ isActive }) => "nav-link" + (isActive ? " active" : "inactive")}>Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
