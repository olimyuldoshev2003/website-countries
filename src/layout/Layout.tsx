import { Link, Outlet, useLocation } from "react-router-dom";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import logoHeader from "../assets/logo_rest_countries.png";
import { Button, Dialog, TextField } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getSearchedCountries } from "../api/api";

const Layout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  // States
  const [menuClass, setMenuClass] = useState("menu_bar unclicked");
  const [pagesClass, setPagesClass] = useState("pages_hidden");
  const [isMenuClicked, setIsMenuClicked] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [modalRegions, setModalRegions] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [modalSearch, setModalSearch] = useState<boolean>(false);
  // const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Refs
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const modalSearchRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Redux states
  const searchedCountries = useAppSelector(
    (state) => state.restCountriesSlice.searchedCountries
  );
  const loadingSearchedCountries = useAppSelector(
    (state) => state.restCountriesSlice.loadingSearchedCountries
  );

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

  const handleSearchFocus = () => {
    setIsFocused(true);
    setModalSearch(true);
    document.body.style.overflow = "hidden";
  };

  const handleSearchBlur = () => {
    // Only blur if modal is being closed
    if (!modalSearch) {
      setIsFocused(false);
      document.body.style.overflow = "unset";
    }
  };

  const handleModalClose = () => {
    setModalSearch(false);
    setIsFocused(false);
    setMenuClass("menu_bar unclicked");
    setPagesClass("pages_hidden");
    setShowOverlay(false);
    setSearchValue("");
    document.body.style.overflow = "unset";

    // Properly blur the active input
    if (
      desktopInputRef.current &&
      document.activeElement === desktopInputRef.current
    ) {
      desktopInputRef.current.blur();
    }
    if (
      mobileInputRef.current &&
      document.activeElement === mobileInputRef.current
    ) {
      mobileInputRef.current.blur();
    }
  };

  const handleLinkClick = () => {
    if (isMenuClicked) {
      toggleMenu();
    }
  };

  const handleCloseModalRegions = () => {
    setModalRegions(false);
    setMenuClass("menu_bar unclicked");
    setPagesClass("pages_hidden");
    setShowOverlay(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      // setIsMobileView(mobile);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // When switching to desktop, ensure proper focus/blur state
      if (!mobile && modalSearch && desktopInputRef.current) {
        desktopInputRef.current.focus();
      } else if (mobile && modalSearch && mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [modalSearch]);

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

    if (isMenuClicked) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuClicked]);

  // Handle search modal state across screen sizes
  useEffect(() => {
    if (modalSearch && windowSize.width >= 768) {
      // When resizing to desktop/tablet, ensure modal stays open
      setModalSearch(true);
      if (desktopInputRef.current) {
        desktopInputRef.current.focus();
      }
    }
  }, [windowSize.width, modalSearch]);

  useEffect(() => {
    if (searchValue.trim() !== "") {
      dispatch(getSearchedCountries(searchValue));
    } else {
      dispatch(getSearchedCountries(""));
    }
  }, [searchValue, dispatch]);

  return (
    <div className="layout_component">
      <div
        className={`${
          showOverlay
            ? `sm:pointer-events-auto md:hidden bg-black bg-opacity-50`
            : `pointer-events-none bg-white bg-opacity-0`
        } fixed inset-0 z-0 duration-300`}
      />

      <header className="header bg-[#020261] sticky top-0 w-full z-40">
        <div className="header_block max-w-[1440px] m-[0_auto] md:px-[60px] sm:px-[20px] flex justify-between items-center py-[20px]">
          <div className={`block_1_header`}>
            <Link to="/">
              <img
                className="w-[60px]"
                src={logoHeader}
                alt="Rest Countries Logo"
              />
            </Link>
          </div>

          <nav className={`navbar ${isFocused ? "hidden" : "block"}`}>
            <ul className="sm:hidden md:flex md:items-center md:gap-2">
              <li>
                <Link
                  className={`${
                    location.pathname === "/"
                      ? `underline text-[red]`
                      : `text-white`
                  } text-[17px] hover:underline font-[500]`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    location.pathname === "/countries"
                      ? `underline text-[red]`
                      : `text-white`
                  } text-[17px] hover:underline font-[500]`}
                  to="/countries"
                >
                  Countries
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Search Field */}
          <div className="block_input_search_and_btn_regions_modal sm:hidden md:flex md:items-center md:gap-2">
            <TextField
              inputRef={desktopInputRef}
              sx={{
                transition: "all 0.3s ease",
                width: isFocused ? "80%" : "200px",
                "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.7)",
                  },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
                "& .MuiInputBase-input": { color: "white" },
                ...(isFocused && {
                  position: "absolute",
                  right: 0,
                  margin: `0 auto`,
                  paddingRight: "40px",
                  zIndex: `5`,
                }),
              }}
              id="desktop-search-input"
              label="Search Countries"
              variant="outlined"
              type="search"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              value={searchValue}
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setSearchValue(event.target.value);
              }}
            />
            <Button
              variant="contained"
              className={`text-sm`}
              sx={{
                ...(isFocused
                  ? {
                      display: "none",
                    }
                  : { display: "block" }),
              }}
              color="warning"
              onClick={() => {
                setModalRegions(true);
              }}
            >
              Open Modal Regions
            </Button>
          </div>

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

      <div
        ref={menuRef}
        className={`pages_mobile_size ${pagesClass} md:hidden bg-[#020261] fixed top-[100px] py-[20px] w-full z-40`}
      >
        <ul className="flex flex-col items-center justify-center gap-[20px]">
          <li>
            <Link
              className={`${
                location.pathname === "/"
                  ? `underline text-[red]`
                  : `text-white`
              } text-[17px] hover:underline font-[500]`}
              to="/"
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`${
                location.pathname === "/countries"
                  ? `underline text-[red]`
                  : `text-white`
              } text-[17px] hover:underline font-[500]`}
              to="/countries"
              onClick={handleLinkClick}
            >
              Countries
            </Link>
          </li>
        </ul>
        <div className="block_input_search_and_btn_regions_modal_mobile_size px-5 mt-6">
          <TextField
            inputRef={mobileInputRef}
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
            id="mobile-search-input"
            label="Search Countries"
            variant="outlined"
            type="search"
            fullWidth
            onFocus={handleSearchFocus}
            value={searchValue}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setSearchValue(event.target.value);
            }}
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

      <div
        className={`background_modal_search fixed ${
          isMenuClicked
            ? `sm:top-[21.7rem] flex`
            : `sm:top-[6.2rem] sm:hidden md:flex`
        } md:top-[100px] left-0 w-full h-full z-50 justify-center items-center bg-black bg-opacity-50 ${
          modalSearch
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
        ref={modalSearchRef}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleModalClose();
          }
        }}
      >
        <div
          className={`modal_search bg-white p-[10px] absolute top-[20px] w-[77%] md:right-[40px] shadow-2xl rounded-md z-50 md:max-h-[50vh] sm:max-h-[30vh] overflow-auto`}
          onClick={(e) => e.stopPropagation()}
        >
          {loadingSearchedCountries ? (
            <div className="flex justify-center items-center h-full">
              <span>Loading...</span>
            </div>
          ) : searchedCountries.length > 0 ? (
            searchValue ? (
              searchedCountries.map((country: any) => (
                <Link
                  key={country.cca2}
                  to={`/country/${country.name.official}`}
                  className="block p-2 hover:bg-gray-200"
                  onClick={() => {
                    handleModalClose();
                  }}
                >
                  {country.name.common}
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <span className="text-center">Search the country</span>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center">
              <span>No results found</span>
            </div>
          )}
        </div>
      </div>

      <Outlet />
      <footer className="footer"></footer>
    </div>
  );
};

export default Layout;
