
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle mobile menu
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setOpenDropdown(null);
  };

  // Close menu on item click
  const handleItemClick = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Toggle dropdowns
  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav className="bg-green-900 p-4 fixed w-full top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-tight">
          ESchools
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="text-white text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-2 hover:bg-green-800 transition duration-300"
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen
              ? "fixed top-0 left-0 w-4/5 h-screen bg-green-900 p-6 flex flex-col transition-transform duration-300 transform translate-x-0 overflow-y-auto lg:hidden"
              : "hidden transform -translate-x-full lg:flex lg:space-x-6 lg:bg-transparent lg:p-0 lg:relative lg:flex-row lg:items-center lg:transform-none"
          }`}
        >
          {/* Close Button (Mobile) */}
          {/* {isMenuOpen && (
            <button
              className="absolute top-4 right-4 text-white text-3xl focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md p-2 hover:bg-green-800 hover:text-yellow-400 transition duration-300"
              onClick={handleMenuToggle}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          )} */}

          <ul className="flex flex-col space-y-4 text-white text-lg font-medium mt-12 lg:flex-row lg:space-y-0 lg:space-x-6 lg:text-base lg:mt-0">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-green-800 hover:text-yellow-400 rounded-lg transition duration-300 lg:hover:bg-transparent"
                onClick={handleItemClick}
              >
                Home
              </Link>
            </li>

            {/* Schools Dropdown */}
            <li className="relative">
              <button
                className="block py-2 px-4 hover:bg-green-800 hover:text-yellow-400 rounded-lg transition duration-300 flex items-center w-full lg:hover:bg-transparent"
                onClick={() => handleDropdownToggle(1)}
                aria-expanded={openDropdown === 1}
                aria-label="Toggle Schools dropdown"
              >
                Schools <span className="ml-2 text-sm">▼</span>
              </button>
              {openDropdown === 1 && (
                <ul className="mt-2 bg-green-800 rounded-lg shadow-lg w-full lg:absolute lg:left-0 lg:w-48 lg:bg-green-800/95 lg:backdrop-blur-sm">
                  <li>
                    <Link
                      to="/schoolshomepage"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Schools
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/teacherlogin"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Login as a teacher
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/studentlogin"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Login as a student
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/examhomepage"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Exams
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/bookshophomepage"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Bookshops
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/tutorialhomepage"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Tutorial
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Admission Dropdown */}
            <li className="relative">
              <button
                className="block py-2 px-4 hover:bg-green-800 hover:text-yellow-400 rounded-lg transition duration-300 flex items-center w-full lg:hover:bg-transparent"
                onClick={() => handleDropdownToggle(2)}
                aria-expanded={openDropdown === 2}
                aria-label="Toggle Admission dropdown"
              >
                Admission <span className="ml-2 text-sm">▼</span>
              </button>
              {openDropdown === 2 && (
                <ul className="mt-2 bg-green-800 rounded-lg shadow-lg w-full lg:absolute lg:left-0 lg:w-48 lg:bg-green-800/95 lg:backdrop-blur-sm">
                  <li>
                    <Link
                      to="/admission"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Admission
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/comparison"
                      className="block px-4 py-2 hover:bg-green-700 hover:text-yellow-400 rounded-lg transition duration-300"
                      onClick={handleItemClick}
                    >
                      Compare Schools
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                to="/alljobs"
                className="block py-2 px-4 hover:bg-green-800 hover:text-yellow-400 rounded-lg transition duration-300 lg:hover:bg-transparent"
                onClick={handleItemClick}
              >
                Ejobs
              </Link>
            </li>
            <li>
              <Link
                to="/traininghomepage"
                className="block py-2 px-4 hover:bg-green-800 hover:text-yellow-400 rounded-lg transition duration-300 lg:hover:bg-transparent"
                onClick={handleItemClick}
              >
                Training
              </Link>
            </li>
            <li>
              <Link
                to="/storehomepage"
                className="block py-2 px-4 hover:bg-green-800 hover:text-yellow-400 rounded-lg transition duration-300 lg:hover:bg-transparent"
                onClick={handleItemClick}
              >
                Store
              </Link>
            </li>
            <li>
              <div className="flex flex-col space-y-2 mt-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:mt-0">
                <Link
                  to="/login"
                  className="block py-2 px-6 bg-yellow-400 text-green-900 hover:bg-yellow-500 rounded-lg transition duration-300 font-semibold lg:bg-transparent lg:text-white lg:hover:text-yellow-400 lg:hover:bg-transparent"
                  onClick={handleItemClick}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block py-2 px-6 bg-white text-green-900 hover:bg-gray-100 rounded-lg transition duration-300 font-semibold lg:bg-transparent lg:text-white lg:hover:text-yellow-400 lg:hover:bg-transparent"
                  onClick={handleItemClick}
                >
                  Signup
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;












// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);

//   // Toggle mobile menu
//   const handleMenuToggle = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Close menu on item click (mobile)
//   const handleItemClick = () => {
//     setIsMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   // Toggle dropdowns
//   const handleDropdownToggle = (index) => {
//     setOpenDropdown(openDropdown === index ? null : index);
//   };

//   return (
//     <nav className={`bg-green-900 p-4 fixed w-full top-0 left-0 right-0 z-50 shadow-lg ${isMenuOpen ? "min-h-[20px]" : "h-auto"}`}>
//       <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//         {/* Brand Logo */}
//         <Link to="/" className="text-white text-2xl font-bold">
//           ESchools
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <div className="lg:hidden">
//           {isMenuOpen ? (
//             <button
//               className="text-white text-xl focus:outline-none"
//               onClick={handleMenuToggle}
//             >
//               ✖
//             </button>
//           ) : (
//             <button className="text-white text-xl" onClick={handleMenuToggle}>
//               ☰
//             </button>
//           )}
//         </div>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             isMenuOpen ? "fixed inset-0 bg-green-900 p-6 flex flex-col space-y-4" : "hidden"
//           } lg:flex lg:space-x-8 lg:bg-transparent lg:p-0 lg:relative lg:flex-row lg:items-center`}
//         >
// <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 items-end text-right text-white">

//             <li>
//               <Link
//                 to="/"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Home
//               </Link>
//             </li>

//             {/* Schools Dropdown */}
//             <li className="relative">
//               <button
//                 className="hover:text-yellow-400 transition duration-300 flex items-center"
//                 onClick={() => handleDropdownToggle(1)}
//               >
//                 Schools ▼
//               </button>
//               {openDropdown === 1 && (
//                 <ul className="lg:absolute lg:left-0 mt-2 bg-green-800 text-white rounded-lg shadow-lg w-48 lg:block">
//                   <li>
//                     <Link
//                       to="/schoolshomepage"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Schools
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/teacherlogin"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Login as a teacher
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/studentlogin"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Login as a student
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/examhomepage"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Exams
//                     </Link>
//                     <li>
//                     <Link
//                       to="/bookshophomepage"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Bookshops
//                     </Link>
//                   </li>
//                   </li>
//                   <li>
//                     <Link
//                       to="/tutorialhomepage"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Tutorial
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             {/* Admission Dropdown */}
//             <li className="relative">
//               <button
//                 className="hover:text-yellow-400 transition duration-300 flex items-center"
//                 onClick={() => handleDropdownToggle(2)}
//               >
//                 Admission ▼
//               </button>
//               {openDropdown === 2 && (
//                 <ul className="lg:absolute lg:left-0 mt-2 bg-green-800 text-white rounded-lg shadow-lg w-48 lg:block">
//                   <li>
//                     <Link
//                       to="/admission"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Admission
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/comparison"
//                       className="block px-4 py-2 hover:bg-green-700"
//                       onClick={handleItemClick}
//                     >
//                       Compare Schools
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>

//             <li>
//               <Link
//                 to="/alljobs"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Ejobs
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/traininghomepage"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Training
//               </Link>
//             </li>

          

         
//             <li>
//               <Link
//                 to="/storehomepage"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Store
//               </Link>
//             </li>

//             {/* Login & Signup */}
//             <li>
//               <Link
//                 to="/login"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Login
//               </Link>{" "}
//               |{" "}
//               <Link
//                 to="/signup"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Signup
//               </Link>
//             </li>


//             <li>
//               <Link
//                 to="/scholarship"
//                 className="hover:text-yellow-400 transition duration-300"
//                 onClick={handleItemClick}
//               >
//                 Study Abroad
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
