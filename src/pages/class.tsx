import Head from 'next/head';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

export default function Class() {
  const { data: userClass, status } = useQuery('/class');

  if (status !== 'success' || !userClass) {
    return null;
  }

  return (
    <div className="flex w-full bg-gray-50 flex-1 items-center justify-center">
      <Head>
        <title>Attendance</title>
      </Head>
      <div className="p-8 w-full max-w-[1100px] rounded-lg bg-white text-center shadow-sm">
        <div className="my-2 text-left pl-4">
          <h1 className="mb-2 font-medium text-2xl">
            Class {userClass.data.grade}-{userClass.data.section}
          </h1>
          <p className="text-lg">
            Class Code:{' '}
            <span className="bg-gray-200 px-2 py-1 rounded">
              {userClass.data.code}
            </span>
          </p>
        </div>
        <table className="mt-8 w-full rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">S. No.</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Verified</th>
            </tr>
          </thead>
          <tbody>
            {userClass?.data.participants?.map(
              (participant: any, index: number) => (
                <tr key={participant.id}>
                  <td className="border-t px-4 py-2">{index + 1}</td>
                  <td className="border-t px-4 py-2">{participant.name}</td>
                  <td className="border-t px-4 py-2">{participant.email}</td>
                  <td className="border-t px-4 py-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      disabled
                      defaultChecked={participant.verified}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
