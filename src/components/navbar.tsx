import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const session = useSession();

  return (
    <nav className="px-10 w-full flex justify-between items-center py-7 h-[8vh] ">
      <div className="text-white text-xl font-medium">
        <Link href="/">BrainReel</Link>
      </div>
      <div className="flex gap-8 items-center text-lg">
        {session.status === 'authenticated' && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              className="rounded-full text-white px-4 py-1.5 transition-colors bg-[rgb(14_165_233/1)] hover:bg-[rgb(56_189_248/1)]"
              onClick={() => {
                signOut({ redirect: true, callbackUrl: '/' });
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
