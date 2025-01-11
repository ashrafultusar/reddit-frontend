import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationSharedContext";
import MobileNav from "../Shared/MobileNav";

const Main = () => {
  const { showMobileNav } = useContext(ApplicationContext);
  console.log(showMobileNav);
  return (
    <div className="relative">
      <div className="sticky top-0">
        <Navbar></Navbar>
      </div>
      <div className="flex justify-between">
        <div className="">
          <div className="sticky top-9 hidden md:block">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="block py-2 px-4 rounded hover:bg-base-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="block py-2 px-4 rounded hover:bg-base-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="block py-2 px-4 rounded hover:bg-base-300"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/join"
                    className="block py-2 px-4 rounded hover:bg-base-300"
                  >
                    Join
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {showMobileNav && <MobileNav />}
        </div>
        <div>
          <Outlet></Outlet>
        </div>
        <div className="rightBar hidden lg:block">
          <div className=" sticky top-9">
            <div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#home"
                      className="block py-2 px-4 rounded hover:bg-base-300"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#portfolio"
                      className="block py-2 px-4 rounded hover:bg-base-300"
                    >
                      Portfolio
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="block py-2 px-4 rounded hover:bg-base-300"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="block py-2 px-4 rounded hover:bg-base-300"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
