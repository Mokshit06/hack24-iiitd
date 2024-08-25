'use client';

import { useEffect, useState } from 'react';

import AnimatedCircularProgressBar from '@/components/magicui/animated-circular-progress-bar';

import { FileTextIcon } from '@radix-ui/react-icons';
import Navbar from '@/components/navbar';
import Link from 'next/link';
import ShinyButton from '@/components/magicui/shiny-button';
import { useRouter } from 'next/router';

const features = [
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    href: '/',
    cta: 'Learn more',
    background: <img className="opacity-60" />,
    className: 'w-[900px] h-[90px] flex left-10 top-[-50px]',
  },
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    href: '/',
    cta: 'Learn more',
    background: <img className="opacity-60" />,
    className: 'w-[900px] h-[90px] flex left-10 top-[-50px]',
  },
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    href: '/',
    cta: 'Learn more',
    background: <img className="opacity-60" />,
    className: 'w-[900px] h-[90px] flex left-10 top-[-50px]',
  },
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    href: '/',
    cta: 'Learn more',
    background: <img className="opacity-60" />,
    className: 'w-[900px] h-[90px] flex left-10 top-[-50px]',
  },
];

export default function Home() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const subject = router.query.subject as string;

  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setTimeout(() => setValue(handleIncrement), 2000);
    return () => clearTimeout(interval);
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'start',
        backdropFilter: 'brightness(0.4)',
      }}
    >
      <Navbar />
      <main className="h-full min-h-screen text-white px-12 pb-4 pt-12">
        <div className="flex justify-between items-center">
          <div className="text-5xl text-white font-bold">Mathematics</div>
          <div className="">
            <AnimatedCircularProgressBar
              className="size-[100px]"
              max={100}
              min={0}
              value={value}
              gaugePrimaryColor="rgb(56 189 248/1)"
              gaugeSecondaryColor="rgba(255, 255, 255, 0.2)"
            />
          </div>
        </div>
        <div className="relative h-full text-black mt-14">
          {[
            'Number Systems',
            'Polynomials',
            'Coordinate Geometry',
            'Linear Equations in Two Variables',
            "Introduction to Euclid's Geometry",
            'Triangles',
            'Quadrilaterals',
            'Circles',
          ].map((topic, i) => (
            <div
              key={i}
              className="bg-black/40 text-white border border-border [box-shadow:0_-10px_80px_-20px_#ffffff1f_inset] w-[70vw] text-lg px-4 py-2 max-w-[calc(100vw - 300px)] leading-tight rounded-2xl left-10 mb-3 flex justify-between items-center height-[60px]"
            >
              <span>{topic}</span>
              <div className="py-0.5 flex gap-3 font-light uppercase">
                <Link
                  className="!bg-gradient-to-tr from-yellow-400/20 via-red-500/20 to-purple-500/20 rounded-md ring-1 ring-white/10 hover:shadow-lg text-white py-1.5 px-5 text-sm"
                  href={`/reel?subject=${subject}&topic=${topic}`}
                >
                  Reel
                </Link>
                <Link
                  className="rounded-md ring-1 ring-white/10 hover:shadow-lg bg-gradient-to-tr from-sky-400 via-sky-600 to-sky-800 text-white py-1.5 px-5 text-sm"
                  href={`/animation?subject=${subject}&topic=${topic}`}
                >
                  Animation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
