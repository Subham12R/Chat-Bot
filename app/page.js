"use client";
import React, { useState } from "react";
import Entry from './_components/Entry';
import Chats from './_components/Chats';

const Home = () => {
  const [showChats, setShowChats] = useState(false);
  return (
    <div>
      {!showChats ? (
        <Entry onShowChats={() => setShowChats(true)} />
      ) : (
        <Chats
          />
      )}
    </div>
  );
}

export default Home;
