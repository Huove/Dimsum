"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import {
  MdOutlineAnalytics,
  MdOutlineLogout,
} from "react-icons/md";

import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";

function SideNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menu = [
    {
      name: "Profile",
      icon: <CgProfile />,
      path: "/profile",
    },
    {
      name: "Keranjang",
      icon: <FaRegComments />,
      path: "/keranjang",
    },
    {
      name: "Transaksi",
      icon: <MdOutlineAnalytics />,
      path: "/transaksi",
    },
    {
      name: "Notifikasi",
      icon: <BiMessageSquareDots />,
      path: "/notifikasi",
    },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[999] p-2 rounded-md"
      >
        <GiHamburgerMenu className="text-2xl text-black" />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[998] lg:hidden"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white z-[999]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-lg font-bold text-[#741209]">
            User Info
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <IoClose className="text-3xl" />
          </button>
        </div>

        <div className="p-4">
          {menu.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                onClick={() => setOpen(false)}
                className={`flex mb-2 items-center gap-4 pl-5 p-3 rounded-md cursor-pointer transition-all
                ${
                  pathname === item.path
                    ? "bg-[#B54141] text-gray-200"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h3 className="text-base font-semibold">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-4 mt-4">
          <div
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="flex items-center gap-4 pl-5 p-3 border rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-gray-700"
          >
            <MdOutlineLogout className="text-2xl" />
            <h3 className="font-semibold">Logout</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNavbar;