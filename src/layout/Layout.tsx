import { Link, Outlet } from "react-router-dom";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import logoHeader from "../assets/logo_rest_countries.png";
import { Button, Dialog, TextField } from "@mui/material";

const Layout = () => {
  // States
  const [menuClass, setMenuClass] = useState("menu_bar unclicked");
  const [pagesClass, setPagesClass] = useState("pages_hidden");
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [modalRegions, setModalRegions] = useState<boolean>(false);

  // Refs for click-outside detection
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    if (!isMenuClicked) {
      setMenuClass("menu_bar clicked");
      setPagesClass("pages_visible");
      setShowOverlay(true);
      document.body.classList.add("scroll_hidden");
      document.body.classList.remove("scroll_visible");
    } else {
      setMenuClass("menu_bar unclicked");
      setPagesClass("pages_hidden");
      setShowOverlay(false);
      document.body.classList.add("scroll_visible");
      document.body.classList.remove("scroll_hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  function handleCloseModalRegions() {
    setModalRegions(false);
  }

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
        className={`${
          showOverlay
            ? `sm:pointer-events-auto md:hidden bg-black bg-opacity-50`
            : `pointer-events-none bg-white bg-opacity-0`
        } fixed inset-0 z-30 duration-300`}
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
          <div className="block_input_search_and_btn_regions_modal sm:hidden md:flex md:items-center md:gap-2">
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
            <Button
              variant="contained"
              className="text-sm"
              color="warning"
              onClick={() => {
                setModalRegions(true);
              }}
            >
              Open Modal Regions
            </Button>
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
        className={`pages_mobile_size ${pagesClass} md:hidden bg-[#020261] fixed top-[100px] py-[20px] w-full z-40`}
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
        <div className="block_input_search_and_btn_regions_modal_mobile_size px-5 mt-6">
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
          <Button
            variant="contained"
            className="text-sm"
            color="warning"
            fullWidth
            sx={{
              marginTop: "20px",
            }}
            onClick={() => {
              setModalRegions(true);
              setMenuClass("menu_bar unclicked");
              setPagesClass("pages_hidden");
              setShowOverlay(false);
            }}
          >
            Open Modal Regions
          </Button>
        </div>
      </div>

      {/* Modal Regions */}
      <Dialog
        open={modalRegions}
        onClose={handleCloseModalRegions}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="block_btn_close_modal bg-[#020261] flex justify-between items-center px-3">
          <span className="text-white text-[17px]">
            Find countries by region
          </span>
          <span
            className="text-white text-4xl cursor-pointer"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            &times;
          </span>
        </div>

        <div className="block_modal-regions grid grid-cols-2 gap-4 p-4 w-[280px] place-items-center h-[250px] bg-[#020261] text-white text-[19px]">
          <Link
            to={`/region/asia`}
            className="region_1"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            Asia
          </Link>
          <Link
            to={`/region/europe`}
            className="region_2"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            Europe
          </Link>
          <Link
            to={`/region/america`}
            className="region_3"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            America
          </Link>
          <Link
            to={`/region/atlantic`}
            className="region_4"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            Antarctic
          </Link>
          <Link
            to={`/region/africa`}
            className="region_5"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            Africa
          </Link>
          <Link
            to={`/region/oceania`}
            className="region_6"
            onClick={() => {
              setModalRegions(false);
            }}
          >
            Oceania
          </Link>
        </div>
      </Dialog>

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <footer className="footer"></footer>
    </div>
  );
};

export default Layout;
