import Head from "next/head";
import BlurIn from "@/components/magicui/blur-in";
import Link from "next/link";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

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
    name: "Mathematics",
    description: "Its all fun and gammes until someone divides by zero",
    href: "/",
    cta: "Learn more",
    background: <img src="mathbgfinal.jpg" className="bg-repeat"/>,
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Science",
    description: "Never trust an atom... they make up everything",
    href: "/",
    cta: "Learn more",
    background: <img className="bg-repeat bg-center opacity-60" src="phybg.jpg" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "English",
    description: `The 3 most untrue words in English are -"Studying is boring"`,
    href: "/",
    cta: "Learn more",
    background: <img className="absolute -right-20 -top-20 opacity-60" src="englishfinal2.avif" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Social Science",
    description: "Science, its like magic, but real",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute opacity-60" src="socialscience.jpeg"/>,
    className: " lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Moral Values",
    description:
      "We are all born as empty vessels and shaped through moral values",
    href: "/",
    cta: "Learn more",
    background: <img className="absolute opacity-60" src="moralvalyes.avif"/>,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];
 

import styles from "./index.module.css";

export default function Home() {
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
    <main className="bg-black h-full min-h-screen">
        <div className=" text-white font-bold text-5xl pl-10 pt-12"> Hi Ishaan Arora</div>
        <div className="p-10">
          <div className="text-3xl text-gray-300 font-bold my-5 underline-offset-3 underline">
            Subjects
          </div>

        <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
      </div>
    </main>
    </div>
  );
}

