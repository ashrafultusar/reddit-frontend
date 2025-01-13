import React from "react";

const MobileNav = () => {
  return (
    <div className="sticky top-10 left-0 md:hidden bg-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <a href="/" className="block py-2 px-4 rounded hover:bg-base-300">
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
  );
};

export default MobileNav;
