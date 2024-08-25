import Navbar from '@/components/navbar';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <div className="min-h-screen text-[#e4e4e4] bg-[url('/hero.jpg')] bg-center bg-cover w-full overflow-x-hidden">
      <Navbar />
      <div className="max-w-[850px] ml-32 mt-20">
        <h1 className="mb-10 font-sans text-7xl font-extrabold leading-[1.22]">
          Make learning addictive with AI
        </h1>
        <div
          onClick={() => {
            // router.push('/login');
            signIn('google', {
              redirect: true,
              callbackUrl: '/dashboard',
            });
          }}
          className="flex max-w-[600px] [&>*]:pointer-events-none"
        >
          <input
            placeholder="john@doe.com"
            className="bg-[rgb(30_41_59/1)] border-none h-14 shadow-lg text-lg px-6 focus:border-none rounded-l-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled
          />
          <button
            className="bg-[rgb(14_165_233/1)] px-8 text-md h-14 active:bg-[rgb(56_189_248/1)] hover:bg-[rgb(56_189_248/1)] rounded-r-lg"
            disabled
          >
            Start now
          </button>
        </div>
      </div>
      <div className="overflow-y-visible mt-20">
        <div className="ml-[-5%] grid grid-cols-4 w-[110%] gap-x-10 gap-y-3">
          <TaskPreview />
          <TaskPreview />
          <div className="p-4 rounded-lg shadow-lg backdrop-blur-md backdrop-brightness-120 border-2 border-[rgb(30_41_59/1)] flex justify-between gap-8">
            <div className="h-full w-full">
              <p className="mb-2 text-lg">
                Solve trigonometry PSets and revise Unit Circle concept
              </p>
              <span className="bg-[rgb(14_165_233/0.8)] text-[theme.light] px-2 py-1 rounded">
                Mathematics
              </span>
            </div>
            <div className="h-full flex items-end">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            </div>
          </div>
          <TaskPreview />
          <TaskPreview />
          <TaskPreview />
          <div></div>
          <TaskPreview />
          <div></div>
          <TaskPreview />
          <div></div>
          <TaskPreview />
        </div>
      </div>
    </div>
  );
}

function TaskPreview() {
  return (
    <div className="p-4 rounded-lg shadow-xl backdrop-blur-md backdrop-brightness-120 border-2 border-[rgb(30_41_59/1)] w-full flex justify-between gap-8">
      <div className="h-full w-full">
        <div className="mb-3 h-4 w-full bg-[rgb(30_41_59/1)] rounded-md"></div>
        <div className="h-3 w-1/2 bg-[rgb(30_41_59/1)] rounded-md opacity-70"></div>
      </div>
      <div className="h-full flex items-end">
        <div className="h-5 w-5 rounded-full bg-[rgb(30_41_59/1)]"></div>
      </div>
    </div>
  );
}
