import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faList, faUpload, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import logo from "/Users/yashjani/Documents/Code/Shp1/SmartHirePro1/src/assets/logo.jpeg";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        
        <div id="logo">
          <img src={logo} alt="Smart Hire Pro Logo" style={{ height: "100px", width: "auto" }} />
        </div>

        <h1>Smart Hire Pro</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <div className="blank-space"></div>
        <nav>
          <ul>
            
            <li>
              <Link to={`about`}>
                <FontAwesomeIcon icon={faInfoCircle} /> <span>ABOUT</span>
              </Link>
            </li>
            <li>
              <Link to={`services`}>
                <FontAwesomeIcon icon={faList} /> <span>JOBLIST</span>
              </Link>
            </li>
            <li>
              <Link to={`Upload`}>
                <FontAwesomeIcon icon={faUpload} /> <span>UPLOAD</span>
              </Link>
            </li>
            <li>
              <Link to={`Login`}>
                <FontAwesomeIcon icon={faSignInAlt} /> <span>SIGN UP</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
