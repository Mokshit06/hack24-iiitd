import Navbar from '@/components/navbar';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';

export default function JoinClass() {
  const [standard, setStandard] = useState('');
  const [section, setSection] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();
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
            if (!standard) {
              return toast.error('Please enter a valid code.');
            }
            if (!section) {
              return toast.error('Please enter a valid section.');
            }

            setSubmitting(true);

            await fetch('/api/class/create', {
              method: 'POST',
              body: JSON.stringify({
                section: section,
                standard: parseInt(standard),
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });

            setSubmitting(false);
            queryClient.invalidateQueries({ queryKey: ['class'] });
            await router.push('/dashboard');
          }}
          className="rounded-xl ring shadow-lg bg-black/20 min-w-[450px] ring-border py-10 -mt-12 px-8"
        >
          <h1 className="text-5xl mb-3 text-center text-white font-bold">
            Create Class
          </h1>
          <div className="mt-8 w-full">
            <p className="text-lg mb-4 text-white">Enter Standard</p>
            <input
              type="number"
              min={1}
              max={12}
              step={1}
              placeholder="1-12"
              className="bg-[rgb(30_41_59/1)] text-neutral-100 outline-none focus:outline-none focus-within:outline-none w-full border-none h-12 rounded-lg text-xl px-6 focus:border-none"
              required
              disabled={submitting}
              value={standard}
              onChange={e => setStandard(e.target.value)}
            />
          </div>
          <div className="mt-8 w-full">
            <p className="text-lg mb-4 text-white">Enter Section</p>
            <input
              placeholder="A-Z"
              className="bg-[rgb(30_41_59/1)] text-neutral-100 outline-none focus:outline-none focus-within:outline-none w-full border-none h-12 rounded-lg text-xl px-6 focus:border-none"
              required
              disabled={submitting}
              value={section}
              onChange={e => setSection(e.target.value)}
            />
          </div>
          <button
            disabled={submitting}
            className="rounded-lg text-xl w-full mt-8 text-white px-4 py-2.5 transition-colors bg-[rgb(14_165_233/1)] hover:bg-[rgb(56_189_248/1)]"
          >
            {submitting ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}
