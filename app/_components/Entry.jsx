"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Entry = ({onShowChats}) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoading(false); // Stop loading
          return 100; // Ensure progress doesn't exceed 100
        }
        return prevProgress + 20; // Increment progress
      });
    }, 100); // Adjust interval speed as needed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 flex flex-col justify-center items-center h-screen w-full px-4">
      {/* Heading */}
      <div className="max-w-xl w-full rounded-lg overflow-hidden shadow-lg bg-slate-900 p-12 ">
        <h1 className="text-3xl sm:text-2xl md:text-3xl font-bold text-center text-white hover:scale-105 transform transition-all ease-out mb-6">
          {loading ? "Loading The Chat Bot" : "Chat Bot Loaded"}
        </h1>

        {/* Progress-Bar */}
        <div className="w-full max-w-xs md:max-w-lg">
          <Progress value={progress} />
        </div>
        <div className="flex flex-col items-center">
        
        {!loading && (
            <Button  variant="" className="mt-5 shadow-md bg-slate-800 items-center flex justify-center  font-bold  focus:outline-none  hover:bg-blue-800 hover:scale-105 transform transition-all ease-in-out "  onClick={onShowChats} > Start Chatting </Button>
        )}
        
        </div>
        
      </div>
    </div>
  );
};

export default Entry;
