import { useState } from 'react';
import { SubjectEnum } from '@prisma/client';
import Navbar from '@/components/navbar';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const subjects = Object.values(SubjectEnum);

export default function ManageClass() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectEnum | ''>('');
  const [topics, setTopics] = useState<string[]>([]);
  const router = useRouter();
  const [newTopic, setNewTopic] = useState('');
  const { data: userClass, status } = useQuery({
    queryKey: ['class'],
    queryFn: () => fetch('/api/class').then(r => r.json()),
  });

  if (status !== 'success' || !userClass) {
    return null;
  }

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value as SubjectEnum);
  };

  const generateTopic = async () => {
    const response = await fetch(
      `/api/topics/generate?subject=${selectedSubject}&standard=${userClass.class.standard}`
    );
    const data = await response.json();
    setTopics(data.topics);
  };

  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const handleSubmit = async () => {
    await fetch(`/api/subjects/${selectedSubject}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject: selectedSubject, topics }),
    });
    await router.push('/dashboard');
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <div className="flex-1 w-full pt-12 pb-10 justify-center items-center flex">
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
          className="rounded-xl ring shadow-lg bg-black/20 min-w-[450px] ring-border py-10 px-8"
        >
          <h1 className="text-5xl mb-3 text-center text-white font-bold">
            Manage Subjects
          </h1>
          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="bg-[rgb(30_41_59/1)] text-neutral-100 outline-none focus:outline-none focus-within:outline-none w-full border-none h-12 rounded-lg text-xl px-6 focus:border-none mt-4"
          >
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {selectedSubject && (
            <div className="flex mt-6 gap-3">
              <div className="flex-1">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newTopic}
                    className="bg-[rgb(30_41_59/1)] text-neutral-100 outline-none focus:outline-none focus-within:outline-none border-none h-10 flex-1 rounded-lg text-lg px-6 focus:border-none"
                    onChange={e => setNewTopic(e.target.value)}
                    placeholder="Enter topic"
                  />
                  <button
                    className="rounded-lg text-lg px-4 h-10 transition-colors bg-white/50 text-black leading-none"
                    type="button"
                    onClick={addTopic}
                  >
                    Add Topic
                  </button>
                </div>
                <div className="flex items-center my-4">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="px-3 text-white text-lg">OR</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                <button
                  className="rounded-lg text-lg px-4 h-10 transition-colors bg-white/50 text-black leading-none w-full"
                  type="button"
                  onClick={generateTopic}
                >
                  Generate Topic
                </button>
                <div className="space-y-1 my-3">
                  {topics.map((topic, index) => (
                    <div
                      className="bg-black/30 border border-border text-white rounded-lg px-4 py-2"
                      key={index}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
                <button
                  className="mt-4 rounded-lg text-xl text-white px-4 h-12 transition-colors bg-[rgb(14_165_233/1)] leading-none w-full hover:bg-[rgb(56_189_248/1)]"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
