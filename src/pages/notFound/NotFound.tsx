import { Button } from "@mui/material";
import imgNotFound from "../../assets/not_found.jpg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="not_found_page bg-black">
        <img
          className="w-full h-[100vh] object-contain object-center"
          src={imgNotFound}
          alt=""
        />
        <div className="block_btn_back flex justify-center absolute bottom-36 left-0 right-0">
          <Link to={`/`}>
            <Button variant="contained">Go back to home page</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
