import React, { useState, useContext } from "react";
// import icons
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import headless ui components
import { Menu } from "@headlessui/react";
// import context
import { HouseContext } from "./HouseContext";

const CategoryDropdown = () => {
  const {category, setCategory, categories} = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[19px] font-medium leading-tight">
            {category}
          </div>
          <div className="text-[16px]">Select category</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="dropdown-menu text-[16px]">
        {categories.map((category, index) => {
          return (
            <Menu.Item
              as="li"
              onClick={() => setCategory(category)}
              key={index}
              className="cursor-pointer hover:text-violet-700 transition"
            >
              {category}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CategoryDropdown;
