

"use client";
import React, { useState } from "react";
import {
    GoogleGenerativeAI,
} from "@google/generative-ai";
import { Button } from "@/components/ui/button";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp", });

const generationConfig = {
    temperature: 1.25,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};


const Chats = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
    const [chatSession, setChatSession] = useState(model.startChat({
    generationConfig,
    history: [],
  }));


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleUserInput = async () => {
    if(userInput.trim() === ""){
      return; //Prevent sending empty messages
    }

    setIsLoading(true);
    try {
     setChatHistory((prevHistory) => [
         ...prevHistory,
          { text: userInput, sender: "user" }, // Store user message
       ])
    const result = await chatSession.sendMessage(userInput)
       const textResponse = result.response.text();
          setChatHistory((prevHistory) => [
           ...prevHistory,
          {text: textResponse, sender:"bot"}
       ])
       setUserInput("")
     
    } catch (error) {
      console.error("API call failed:", error);
         setChatHistory(prevHistory => [
        ...prevHistory, {text:"Sorry an error occurred", sender:"bot"}] )
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className={`h-screen ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
      {/* Navbar */}
      <div className="navbar mx-auto rounded-lg p-5 text-neutral-content">
        <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
          Chat Bot 
          <div className="ml-2 "> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        </div>
        </h1>
        <div className="ml-auto">
          <label className="swap swap-rotate">
            {/* Theme toggle checkbox */}
            <input type="checkbox" checked={!isDarkMode} onChange={toggleTheme} />

            {/* Sun icon for light mode */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon for dark mode */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>

      {/* Chat */}
      <div className={`overflow-y-auto h-[calc(100vh-10rem)] p-4 w-full max-w-7xl mx-auto rounded-md shadow-md ${isDarkMode ?  "bg-zinc-900": "bg-gray-100" }  `}>
      {chatHistory.map((chat, index) => (
        <div
          key={index}
          className={`chat ${chat.sender === "user" ? "chat-end" : "chat-start"}`}
        >
          {/* Avatar */}
          <div className="chat-image avatar">
            <div className="w-10 rounded-full shadow-md mx-2 bg-gray-100">
              <img
                alt={`${chat.sender} avatar`}
                src={
                  chat.sender === "user"
                    ? "./user.png"
                    : "./bot.png"
                }
              />
            </div>
          </div>
            

          {/* Chat Bubble */}
          <div
            className={`shadow-md rounded-3xl p-2 text-md text-pretty ${
              isDarkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-black"
            }`}
          >
            {chat.text}
          </div>
        

        </div>
      ))}
    </div>


      {/* Textarea */}
      <div className="absolute bottom-3 flex justify-center items-center w-full p-4">
      
      <input
        type="text"
        className={`input input-bordered w-full max-w-6xl rounded-full px-4 py-2 ${
          isDarkMode
            ? "bg-zinc-800 text-white border-zinc-700 focus:border-blue-500"
            : "bg-gray-100 text-black border-gray-300 focus:border-blue-400"
        }`}
        placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
       <Button
          className={`ml-4 p-5 rounded-full transition-all ${
            isDarkMode
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
              : "bg-blue-400 text-white hover:bg-blue-500 shadow-md"
          }`}
          onClick={handleUserInput}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </Button>

    

      


      </div>
    </div>
  );
};

export default Chats;



