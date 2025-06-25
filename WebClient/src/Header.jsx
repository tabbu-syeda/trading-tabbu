import { Link } from "react-router";
import Login from "./components/Login";
const Header = () => {
  return (
    <>
      <div className="h-[80px] flex items-center justify-between text-xl dark:bg-black text-white">
        <Link to="/">
          <div className="px-5">LOGO</div>
        </Link>
        <div>
          <ul className="flex flex-row px-10 mx-2">
            <Link to="/">
              <li className="px-4">OUR SERVICES</li>
            </Link>
            <Link to="/">
              <li className="px-4">OUR MISSION</li>
            </Link>{" "}
            <Link to="/">
              <li className="px-4">CONTACT US </li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-row px-5">
          <Login />
        </div>
      </div>
      <hr className="border-1 border-amber-300 w-full" />
    </>
  );
};

export default Header;
