import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="px-10 flex justify-between items-center py-7 h-[8vh] ">
      <div className="text-white text-xl font-medium">
        <Link href="/">BrainReel</Link>
      </div>
      <div>
        <button className="rounded-full text-white px-4 py-1.5 transition-colors bg-[rgb(14_165_233/1)] hover:bg-[rgb(56_189_248/1)]">
          Logout
        </button>
      </div>
    </nav>
  );
}
