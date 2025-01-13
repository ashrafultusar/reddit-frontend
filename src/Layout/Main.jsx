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
                    href="/popular"
                    className="block py-2 px-4 rounded hover:bg-base-300"
                  >
                    Popular
                  </a>
                </li>
                <hr />
                <li>
                  <div class="w-64 p-4">
                    <div class="space-y-2">
                      {/* <!-- Parent Menu --> */}
                      <div>
                        <input
                          type="checkbox"
                          id="parentItem1"
                          class="peer hidden"
                        />
                        <label
                          for="parentItem1"
                          class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <span class="flex items-center space-x-2">
                            <span>RECENT</span>
                          </span>
                          <svg
                            class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </label>
                        <div class="hidden peer-checked:block pl-6 py-2 space-y-4 text-gray-600">
                          {/* <!-- Child Menu 1 --> */}
                          <div>
                            <input
                              type="checkbox"
                              id="item1"
                              class="peer hidden"
                            />
                            <label
                              for="item1"
                              class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <span class="flex items-center space-x-2">
                                <span>😊</span>
                                <span>Internet Culture (Viral)</span>
                              </span>
                              <svg
                                class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </label>
                            <div class="hidden peer-checked:block pl-6 py-2 text-sm">
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 1
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 2
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 3
                              </p>
                            </div>
                          </div>
                          {/* <!-- Child Menu 2 --> */}
                          <div>
                            <input
                              type="checkbox"
                              id="item2"
                              class="peer hidden"
                            />
                            <label
                              for="item2"
                              class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <span class="flex items-center space-x-2">
                                <span>🎮</span>
                                <span>Games</span>
                              </span>
                              <svg
                                class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </label>
                            <div class="hidden peer-checked:block pl-6 py-2 text-sm">
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 1
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 2
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 3
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div class="w-64 p-4">
                    <div class="space-y-2">
                      {/* <!-- Parent Menu --> */}
                      <div>
                        <input
                          type="checkbox"
                          id="parentItem2"
                          class="peer hidden"
                        />
                        <label
                          for="parentItem2"
                          class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <span class="flex items-center space-x-2">
                            <span>TOPICS</span>
                          </span>
                          <svg
                            class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </label>
                        <div class="hidden peer-checked:block pl-6 py-2 space-y-4 text-gray-600">
                          {/* <!-- Child Menu 1 --> */}
                          <div>
                            <input
                              type="checkbox"
                              id="item3"
                              class="peer hidden"
                            />
                            <label
                              for="item3"
                              class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <span class="flex items-center space-x-2">
                                <span>😊</span>
                                <span>Internet Culture (Viral)</span>
                              </span>
                              <svg
                                class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </label>
                            <div class="hidden peer-checked:block py-2 text-sm">
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Amazing
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Animal & Pet
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Cringe & Facepalm
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Funny
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Interesting
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Memes
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Oddly Satisfying
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Reddit Meta
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Wholesome & Heartwarming
                              </p>
                            </div>
                          </div>
                          {/* <!-- Child Menu 2 --> */}
                          <div>
                            <input
                              type="checkbox"
                              id="item4"
                              class="peer hidden"
                            />
                            <label
                              for="item4"
                              class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <span class="flex items-center space-x-2">
                                <span>🎮</span>
                                <span>Games</span>
                              </span>
                              <svg
                                class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </label>
                            <div class="hidden peer-checked:block pl-6 py-2 text-sm">
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 1
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 2
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 3
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <div class="w-64 p-4">
                    <div class="space-y-2">
                      {/* <!-- Parent Menu --> */}
                      <div>
                        <input
                          type="checkbox"
                          id="parentItem5"
                          class="peer hidden"
                        />
                        <label
                          for="parentItem5"
                          class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <span class="flex items-center space-x-2">
                            <span>RESOURCES</span>
                          </span>
                          <svg
                            class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </label>
                        <div class="hidden peer-checked:block pl-6 py-2 space-y-4 text-gray-600">
                          {/* <!-- Child Menu 1 --> */}
                          <div>
                            <input
                              type="checkbox"
                              id="item6"
                              class="peer hidden"
                            />
                            <label
                              for="item6"
                              class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <span class="flex items-center space-x-2">
                                <span>😊</span>
                                <span>Internet Culture (Viral)</span>
                              </span>
                              <svg
                                class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </label>
                            <div class="hidden peer-checked:block pl-6 py-2 text-sm">
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 1
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 2
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 3
                              </p>
                            </div>
                          </div>
                          {/* <!-- Child Menu 2 --> */}
                          <div>
                            <input
                              type="checkbox"
                              id="item7"
                              class="peer hidden"
                            />
                            <label
                              for="item7"
                              class="w-full flex items-center justify-between text-gray-700 py-2 px-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <span class="flex items-center space-x-2">
                                <span>🎮</span>
                                <span>Games</span>
                              </span>
                              <svg
                                class="w-4 h-4 transition-transform transform peer-checked:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </label>
                            <div class="hidden peer-checked:block pl-6 py-2 text-sm">
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 1
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 2
                              </p>
                              <p class="hover:bg-gray-100 cursor-pointer text-center w-full py-1 hover:text-black">
                                Submenu 3
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* {showMobileNav && (
            <div className="sticky top-10 left-0 md:hidden bg-white">
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
          )} */}
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
