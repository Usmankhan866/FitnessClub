import { Link } from "react-router-dom";
import logoWhite from "../../images/logo/logo.png";
import logoBlack from "../../images/logo/logo-footer.png";

function Logo({ size = "w-full", type = "white" }) {
  return (
    <Link to="/" className="inline-block focus outline-none">
      <img
        src={type === "black" ? logoBlack : logoWhite}
        alt="Corefit logo"
        className={`object-contain ${size} max-h-[50px]`} // adjust max height here
      />
    </Link>
  );
}

export default Logo;
