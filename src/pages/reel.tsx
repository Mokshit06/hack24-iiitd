import { CoolMode } from '@/components/magicui/cool-mode';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import { generateFeedItem } from '@/lib/anthropic';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Reel() {
  const router = useRouter();
  const { topic, subject } = router.query as Record<string, string | undefined>;

  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log({ topic, subject });

  useEffect(() => {
    if (!topic || !subject || !loading) {
      return;
    }

    Promise.allSettled([
      generateFeedItem(`${subject}—${topic}`),
      generateFeedItem(`${subject}—${topic}`),
      generateFeedItem(`${subject}—${topic}`),
    ])
      .then(items => {
        setReels(items.filter(i => i.status === 'fulfilled').map(i => i.value));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [loading, subject, topic]);

  if (!topic || !subject) {
    return <div>Invalid URL</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(/hero.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="h-screen overflow-y-auto snap-y snap-always snap-mandatory"
    >
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <svg
            className="animate-spin h-16 w-16 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        reels.map((reel, i) => (
          <div
            key={i}
            id={`reel-${i}`}
            className="bg-black/20 snap-center h-screen w-screen flex items-center justify-center"
          >
            <button
              className="rounded-full mr-12 p-2.5 text-lg bg-neutral-700 text-white"
              onClick={() => {
                document.getElementById(`reel-${i - 1}`)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              <ArrowLeftIcon height={32} width={32} />
            </button>
            <ReelCard reel={reel} i={i} topic={topic} />
            <button
              onClick={() => {
                document.getElementById(`reel-${i + 1}`)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className="rounded-full ml-12 p-2.5 text-lg bg-neutral-700 text-white"
            >
              <ArrowRightIcon height={32} width={32} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function ReelCard({ reel, i, topic }: { reel: any; i: number; topic: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <NeonGradientCard className="relative w-[400px] items-center justify-center h-[95vh] p-0 [&>div]:p-0.5 [&>div]:bg-black">
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
        <video
          className="absolute rounded-2xl top-0 left-0  w-full h-full object-cover"
          src="/gameplay_subway.mp4"
          autoPlay
          muted
          loop
          style={{ filter: 'brightness(0.4)' }}
          ref={videoRef => {
            if (videoRef) {
              videoRef.addEventListener('click', () => {
                if (videoRef.paused) {
                  videoRef.play();
                } else {
                  videoRef.pause();
                }
              });
            }
          }}
        />
        <div
          className="absolute rounded-2xl top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"
          onClick={e => {
            const videoElement = e.currentTarget
              .previousElementSibling as HTMLVideoElement;
            if (videoElement.paused) {
              videoElement.play();
            } else {
              videoElement.pause();
            }
          }}
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 translate-y-[-40%] w-[90%] bg-white rounded-lg shadow-lg p-4 max-w-[380px]">
          <div className="flex items-center mb-2">
            <img
              src={`https://picsum.photos/32?a=${i}`}
              alt="User avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{reel.subreddit}</p>
              <p className="text-gray-500">
                Posted by {reel.username} • {Math.floor(Math.random() * 24)}{' '}
                hours ago
              </p>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{reel.title}</h2>
          <p className="text-gray-700 mb-4">{reel.content}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <button className={clsx('flex items-center mr-4')}>
              <svg
                className="w-4 h-4 mr-1 shadow-xl"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              {Math.floor(Math.random() * 10)}k
            </button>
            <button className="flex items-center mr-4">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              {Math.floor(Math.random() * 1000)} Comments
            </button>
            <button className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <div className="flex items-center mb-2 w-fit">
            <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full mr-3 p-px">
              <img
                className="w-10 h-10 rounded-full"
                src="/reddit-logo.png"
                alt="User avatar"
              />
            </div>
            <span className="font-bold mr-3">iiitd_reddit_guy</span>
            <button className="ml-auto bg-transparent border border-neutral-200/50 rounded-md px-2 py-0.5 text-xs font-medium">
              Follow
            </button>
          </div>
          <p className="mb-2">
            Let&apos;s learn <span className="lowercase">{topic}</span> with
            your personal learning assistant ;)
          </p>
          <div className="flex items-center text-sm bg-black/60 rounded-2xl w-fit px-3 py-1">
            <span className="mr-4">
              <span className="mr-1 font-bold">♫</span> Original Audio
            </span>
            <span className="text-xs text-white/80">View more</span>
          </div>
        </div>
        <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-4">
          <div className="relative justify-center">
            <CoolMode>
              <button
                onClick={async () => {
                  setSaved(!saved);
                  await fetch('/api/saved', {
                    method: 'POST',
                    body: JSON.stringify({
                      saved: !saved,
                      title: reel.title,
                      content: reel.content,
                      username: reel.username,
                      subreddit: reel.subreddit,
                    }),
                  });
                }}
                className={clsx(
                  saved ? 'text-rose-600' : 'text-white',
                  'transition-colors'
                )}
              >
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="block text-xs">123k</span>
              </button>
            </CoolMode>
          </div>
          <button className="text-white">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 122.97 122.88"
              fill="white"
            >
              <title>instagram-comment</title>
              <path d="M61.44,0a61.46,61.46,0,0,1,54.91,89l6.44,25.74a5.83,5.83,0,0,1-7.25,7L91.62,115A61.43,61.43,0,1,1,61.44,0ZM96.63,26.25a49.78,49.78,0,1,0-9,77.52A5.83,5.83,0,0,1,92.4,103L109,107.77l-4.5-18a5.86,5.86,0,0,1,.51-4.34,49.06,49.06,0,0,0,4.62-11.58,50,50,0,0,0-13-47.62Z" />
            </svg>
            <span className="block text-xs mt-1">1024</span>
          </button>
          <button className="text-white">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
            </svg>
            <span className="block text-xs">Share</span>
          </button>
          <button className="text-white">
            <span className="font-bold tracking-[2px]">...</span>
          </button>
        </div>
      </div>
    </NeonGradientCard>
  );
}
