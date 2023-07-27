import React from "react";
import FriendList from "../../app/pages/Rightbar/FriendList";
import FriendListHorizontal from "../../app/pages/Rightbar/FriendListHorizontal";
import Search from "../search/Search";

const Rightbar = () => {
  return (
    <div className="p-4">
      <Search></Search>
      <FriendListHorizontal></FriendListHorizontal>
      <FriendList></FriendList>
    </div>
  );
};

export default Rightbar;
