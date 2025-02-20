import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import footerLogo from "../assets/website/logo.png"


const FooterLinks = [
  {
    title: "Corporate info",
    link: "/#",
  },
  {
    title: "Accessibility",
    link: "/#about",
  },
  {
    title: "Jobs",
    link: "/#contact",
  },
  {
    title: "Ad Choices",
    link: "/#blog",
  },
  {
    title: "Privacy Policy",
    link: "/#",
  },
  {
    title: "CA Notice",
    link: "/#",
  },
  {
    title: "Terms of Service-NEW",
    link: "/#",
  },
];


const FooterLink3 = [
  {
    title: "NBC App",
    link: "/#",
  },
  {
    title: "Peacock",
    link: "/#",
  },
  {
    title: "Advertise",
    link: "/#",
  },
  {
    title: "Closed Captioning",
    link: "/#",
  },
]

const FooterLink2 = [
  {
    title: "Advertise",
    link: "/#",
  },
  {
    title: "Link TV Provider",
    link: "/#",
  },
  {
    title: "FAQ",
    link: "/#",
  },
  {
    title: "Casting",
    link: "/#blog",
  },
  {
    title: "Contact Us",
    link: "/#",
  },
  {
    title: "Local Schedule",
    link: "/#",
  },
  {
    title: "Tickets and NBC Studio",
    link: "/#",
  },
];


const Footer = () => {
  return (
    // <div className="bg-gray-100 ">
    //   <section className="container">
    //     <div className=" grid md:grid-cols-3 py-5">
  
    //       <div className=" py-8 px-4 ">
    //         <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
    //           <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
    //           ESchools
    //         </h1>
    //         <p className="">
    //           Book tickets & track your coach anytime, anywhere.{" "}
    //         </p>
    //         <br />
    //         <div className="flex items-center gap-3">
         
    //         </div>
    //         <div className="flex items-center gap-3 mt-3">
    
    //         </div>
    //         {/* Social Handle */}
    //         <div className="flex items-center gap-3 mt-6">
    //           <a href="#">
    //             <FaInstagram className="text-3xl" />
    //           </a>
    //           <a href="#">
    //             <FaFacebook className="text-3xl" />
    //           </a>
    //           <a href="#">
    //             <FaLinkedin className="text-3xl" />
    //           </a>
    //         </div>
    //       </div>
    //       {/* Links */}
    //       <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
    //         <div className="">
    //           <div className="py-8 px-4 ">
    //             <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
    //               Quick Links
    //             </h1>
    //             <ul className={`flex flex-col gap-3`}>
    //               {FooterLinks.map((link) => (
    //                 <li className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
    //                   <span>&#11162;</span>
    //                   <span>{link.title}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //         <div className="">
    //           <div className="py-8 px-4 ">
    //             <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
    //               {/* Links */}
    //             </h1>
    //             <ul className="flex flex-col gap-3">
    //               {FooterLink3.map((link) => (
    //                 <li className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
    //                   <span>&#11162;</span>
    //                   <span>{link.title}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //         <div className="">
    //           <div className="py-8 px-4 ">
 
    //             <ul className="flex flex-col gap-3">
    //               {FooterLink2.map((link) => (
    //                 <li className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500">
    //                   <span>&#11162;</span>
    //                   <span>{link.title}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="text-center py-10 border-t-2 border-gray-300/50">
    //         @copyright 2024 All rights reserved 
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <></>
  );
};

export default Footer;
