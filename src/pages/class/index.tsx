import Head from 'next/head';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/navbar';
import { toast } from 'sonner';

export default function Class() {
  const { data: userClass, status } = useQuery({
    queryKey: ['class'],
    queryFn: () => fetch('/api/class').then(r => r.json()),
  });

  if (status !== 'success' || !userClass) {
    return null;
  }

  return (
    <div
      className="flex w-full h-screen flex-col items-center"
      style={{
        backgroundImage: 'url(/hero.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Head>
        <title>Class Details</title>
      </Head>
      <Navbar />
      <div className="p-8 my-8 flex-1 w-full max-w-[1100px] rounded-lg bg-black/20 ring ring-border text-center shadow-sm text-white">
        <div className="my-2 text-left pl-4">
          <h1 className="mb-2 font-bold text-5xl">
            Class {userClass.class.name}
          </h1>
          <p className="text-2xl mt-6">
            Class Code:{' '}
            <span
              className="bg-white/60 text-black px-2 py-1 rounded-xl text-xl mx-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(userClass.class.id);
                toast.success('Copied code to clipboard!');
              }}
            >
              {userClass.class.id}
            </span>
          </p>
        </div>
        <table className="mt-8 w-full rounded-lg">
          <thead>
            <tr className="text-lg">
              <th className="px-4 py-4 font-semibold text-left">S.No</th>
              <th className="px-4 py-4 font-semibold text-left"></th>
              <th className="px-4 py-4 font-semibold text-left">Name</th>
              <th className="px-4 py-4 font-semibold text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {userClass?.class.users?.map((user: any, index: number) => (
              <tr key={user.id} className="text-left">
                <td className="border-t px-4 py-4">{index + 1}</td>
                <td className="border-t px-4 py-4">
                  <img src={user.image} className="size-8 rounded-full" />
                </td>
                <td className="border-t px-4 py-4">{user.name}</td>
                <td className="border-t px-4 py-4">{user.email}</td>
                {/* <td className="border-t px-4 py-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      disabled
                      defaultChecked={user.verified}
                    />
                  </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
