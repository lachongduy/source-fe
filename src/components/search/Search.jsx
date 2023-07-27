import React from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Search Friends!"
        className="px-10 py-2 border border-gray-300 w-full rounded-lg"
      />
      <div className="absolute text-xl cursor-pointer p-2">
        <BiSearch className="text-gray-500"></BiSearch>
      </div>
    </div>
  );
};

export default Search;
