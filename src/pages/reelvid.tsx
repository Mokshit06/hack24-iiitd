"use client";
import Head from "next/head";
import BlurIn from "@/components/magicui/blur-in";
import Link from "next/link";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
// import { useTheme } from "next-themes";
 
import { MagicCard } from "@/components/magicui/magic-card";
 
import { useEffect, useState } from "react";
 

 

import styles from "./index.module.css";

export default function Home() {

  const [value, setValue] = useState(0);
  // const { theme } = useTheme();
 
  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <nav className="bg-black p-4 flex justify-between items-center pt-7 pb-7 h-[50px] border-b border-b-gray-700 ">
        <div className="text-white text-lg font-bold">
            <a href="#">YourBrand</a>
        </div>
        <div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600">
            Logout
        </button>
        </div>
    </nav>
    <main className="bg-black text-white flex justify-center items-center h-[calc(100vh-57px)]">
    <div
      className={
        "flex h-[500px] w-[70vw] flex-col gap-4 lg:h-[250px] lg:flex-row text-white" 
      }
    >
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center shadow-1xl whitespace-nowrap text-4xl bg-black text-blue-500 border border-blue-500">
        Reels
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center shadow-1xl whitespace-nowrap text-4xl bg-neutral-900 text-red-500 border border-red-500"
      >
        Videos
      </MagicCard>
    </div>
    </main>
    </div>
  );
}

