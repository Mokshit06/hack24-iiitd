import SparklesText from '@/components/magicui/sparkles-text';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function Animation() {
  const router = useRouter();
  const topic = router.query.topic as string | undefined;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!topic) {
    return <div>No topic</div>;
  }

  return (
    <div
      className="h-screen text-white gap-6 p-8 flex flex-col"
      style={{
        backgroundImage: 'url(/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center gap-4">
        <SparklesText text={topic} className="text-5xl" />
        <button
          onClick={() => {
            // router.push(`/animation?topic=${topic}&seed=${Math.random()}`);
            // iframeRef.current?.contentWindow?.location.reload();
            if (iframeRef.current)
              iframeRef.current.src = `/api/p5?topic=${topic}&seed=${Math.random()}`;
          }}
          className="h-fit p-2 rounded-full bg-white/20 w-fit"
        >
          <ReloadIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1">
        <iframe
          src={`/api/p5?topic=${topic}`}
          ref={iframeRef}
          className="h-full w-full ring ring-border rounded-xl bg-black/30"
        />
      </div>
    </div>
  );
}
