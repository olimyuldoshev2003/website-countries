import React from "react";
import { Link, Outlet } from "react-router-dom";

// Images
import logoHeader from "../assets/logo_rest_countries.png";

const Layout = () => {
  return (
    <>
      <div className="layout_component">
        <header className="header">
          <div className="header_block max-w-[1440px] m-[0_auto] px-[60px] flex  justify-between items-center py-[20px]">
            <div className="block_1_header">
              <Link to={`/`}>
                <img className="w-[60px]" src={logoHeader} alt="" />
              </Link>
            </div>
            <nav className="navbar">
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    className="text-[19px] hover:underline font-[500]"
                    to={`/`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[19px] hover:underline font-[500]"
                    to={`/countries`}
                  >
                    Countries
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="block_3_header">
              <input
                type="search"
                placeholder="Search Countries"
                name=""
                id=""
              />
            </div>
          </div>
        </header>
        <Outlet />
        <footer className="footer"></footer>
      </div>
    </>
  );
};

export default Layout;
