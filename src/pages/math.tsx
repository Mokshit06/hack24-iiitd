"use client";
import Head from "next/head";
import BlurIn from "@/components/magicui/blur-in";
import Link from "next/link";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
 
import { useEffect, useState } from "react";
 
import AnimatedCircularProgressBar from "@/components/magicui/animated-circular-progress-bar";
 

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
 
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
 
const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    href: "/",
    cta: "Learn more",
    background: <img className="opacity-60" />,
    className: "w-[900px] h-[90px] flex left-10 top-[-50px]",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    href: "/",
    cta: "Learn more",
    background: <img className="opacity-60" />,
    className: "w-[900px] h-[90px] flex left-10 top-[-50px]",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    href: "/",
    cta: "Learn more",
    background: <img className="opacity-60" />,
    className: "w-[900px] h-[90px] flex left-10 top-[-50px]",
  },
  {
    Icon: FileTextIcon,
    name: "Save your files",
    href: "/",
    cta: "Learn more",
    background: <img className="opacity-60" />,
    className: "w-[900px] h-[90px] flex left-10 top-[-50px]",
  },
  
];
 

import styles from "./index.module.css";

export default function Home() {

  const [value, setValue] = useState(0);
 
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
    <main className="bg-black h-full min-h-screen text-white">
      <div className="flex justify-between">

        <div className="text-5xl text-white font-bold p-10 pt-20">Mathematics</div>
        <div className="p-7 pr-16"><AnimatedCircularProgressBar
      max={100}
      min={0}
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"/></div>
      </div>
      <div className="relative h-full text-black left-[40px] w-[calc(100vw-150px)]">
      <div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Number Systems</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Polynomials</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Coordinate Geometry</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Linear Equations in Two Variables</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Introduction to Euclid's Geometry</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Triangles</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Quadrilaterals</div>
<div className="bg-white w-[70vw] text-lg p-4 max-w-[calc(100vw - 300px)] h-[60px] rounded-2xl left-10 mb-3">Circles</div>





      </div>
    </main>
    </div>
  );
}

