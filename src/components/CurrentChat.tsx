import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { selectOpenedChat } from "../redux/chatSlice";
import { useAppSelector } from "../redux/store";

export const CurrentChat = (props: any) => {
  const currentChat = useAppSelector(selectOpenedChat);
  if (currentChat == null)
    return (
      <span>
        chat not found. click <Link to="/"> here </Link> to go back
      </span>
    );
  const { username, displayName } = currentChat;
  return (
    <div className="flex-1 bg-blue-300 h-full">
      <div className="p-4 bg-slate-400 flex justify-between items-center">
        <div>
          <Link to="/">Back</Link> -- {username}
        </div>
        <div>View profile</div>
      </div>
      <div className="p-5">chat with {displayName}</div>
    </div>
  );
};
