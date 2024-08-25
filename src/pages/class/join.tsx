import Navbar from '@/components/navbar';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function JoinClass() {
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: 'url(/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'start',
      }}
      className="flex flex-col h-screen"
    >
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={async e => {
            e.preventDefault();
            if (!code) {
              return alert('Please enter a valid code.');
            }
            setSubmitting(true);

            await fetch('/api/class/join', {
              method: 'POST',
              body: JSON.stringify({
                classId: code,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            setSubmitting(false);
            await router.replace('/class');
          }}
          className="rounded-xl ring shadow-lg bg-black/20 min-w-[450px] ring-border py-10 px-8"
        >
          <h1 className="text-5xl my-3 text-center text-white font-bold">
            Join Class
          </h1>
          <div className="mt-8 w-full">
            <p className="text-lg mb-4 text-white">
              Enter the class code to join
            </p>
            <input
              placeholder="j#hn_do*"
              className="bg-[rgb(30_41_59/1)] text-neutral-100 outline-none focus:outline-none focus-within:outline-none w-full border-none h-12 rounded-lg text-xl px-6 focus:border-none"
              required
              disabled={submitting}
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </div>
          <button
            disabled={submitting}
            className="rounded-lg text-xl w-full mt-8 text-white px-4 py-2.5 transition-colors bg-[rgb(14_165_233/1)] hover:bg-[rgb(56_189_248/1)]"
          >
            {submitting ? 'Joining...' : 'Join'}
          </button>
        </form>
      </div>
    </div>
  );
}
