import { Link, Outlet } from "react-router-dom";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import logoHeader from "../assets/logo_rest_countries.png";
import { TextField } from "@mui/material";

const Layout = () => {
  // States
  const [menuClass, setMenuClass] = useState("menu_bar unclicked");
  const [pagesClass, setPagesClass] = useState("pages_hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Refs for click-outside detection
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    if (!isMenuClicked) {
      setMenuClass("menu_bar clicked");
      setPagesClass("pages_visible");
      setShowOverlay(true);
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      setMenuClass("menu_bar unclicked");
      setPagesClass("pages_hidden");
      setShowOverlay(false);
      document.body.style.overflow = ""; // Re-enable scrolling
    }
    setIsMenuClicked(!isMenuClicked);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuClicked &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerButtonRef.current &&
        !burgerButtonRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    // Add event listener when menu is open
    if (isMenuClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isMenuClicked]);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    if (isMenuClicked) {
      toggleMenu();
    }
  };

  return (
    <div className="layout_component">
      {/* Overlay */}
      {/* {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        />
      )} */}

      <div
        className={`${showOverlay ? `sm:block md:hidden` : `hidden`} fixed inset-0 bg-black bg-opacity-50 z-30`}
        onClick={toggleMenu}
      />

      <header className="header bg-[#020261] sticky top-0 w-full z-40">
        <div className="header_block max-w-[1440px] m-[0_auto] md:px-[60px] sm:px-[20px] flex justify-between items-center py-[20px]">
          <div className="block_1_header">
            <Link to="/">
              <img
                className="w-[60px]"
                src={logoHeader}
                alt="Rest Countries Logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="navbar">
            <ul className="sm:hidden md:flex md:items-center md:gap-2">
              <li>
                <Link
                  className="text-[17px] text-white hover:underline font-[500]"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-[17px] text-white hover:underline font-[500]"
                  to="/countries"
                >
                  Countries
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search Field - Desktop */}
          <div className="block_3_header sm:hidden md:block">
            <TextField
              sx={{
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.7)",
                  },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputBase-input": { color: "white" },
              }}
              id="outlined-basic"
              label="Search Countries"
              variant="outlined"
              type="search"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={burgerButtonRef}
            className="btn_menu_mobile_size sm:block md:hidden cursor-pointer outline-none"
            aria-label="Toggle menu"
          >
            <div
              className="burger_menu flex flex-col gap-[9px]"
              onClick={toggleMenu}
            >
              <div
                className={`${menuClass} lines w-[40px] h-[4px] bg-[#fff]`}
              ></div>
              <div
                className={`${menuClass} lines w-[40px] h-[4px] bg-[#fff]`}
              ></div>
              <div
                className={`${menuClass} lines w-[40px] h-[4px] bg-[#fff]`}
              ></div>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        ref={menuRef}
        className={`pages_mobile_size ${pagesClass} md:hidden bg-[#020261] fixed top-[100px] py-[20px] w-full z-40 transition-all duration-300`}
      >
        <ul className="flex flex-col items-center justify-center gap-[20px]">
          <li>
            <Link
              className="text-[17px] text-white hover:underline font-[500]"
              to="/"
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-[17px] text-white hover:underline font-[500]"
              to="/countries"
              onClick={handleLinkClick}
            >
              Countries
            </Link>
          </li>
        </ul>
        <div className="block_input_search px-5 mt-6">
          <TextField
            sx={{
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.7)",
                },
                "&.Mui-focused fieldset": { borderColor: "#90caf9" },
              },
              "& .MuiInputBase-input": { color: "white" },
            }}
            id="outlined-basic"
            label="Search Countries"
            variant="outlined"
            type="search"
            fullWidth
          />
        </div>
      </div>

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <footer className="footer"></footer>
    </div>
  );
};

export default Layout;
