import TypingAnimation from '@/components/magicui/typing-animation';
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from '@radix-ui/react-icons';

import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import ShineBorder from '@/components/magicui/shine-border';
import BlurFade from '@/components/magicui/blur-fade';
import Navbar from '@/components/navbar';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

const imgStyles =
  'absolute h-full object-cover w-full object-center top-0 left-0 right-0 bottom-0 opacity-50 transition-all duration-300 ease-out brightness-[50%] ';

const features = [
  {
    Icon: FileTextIcon,
    type: 'MATHS',
    name: 'Mathematics',
    description: 'Its all fun and gammes until someone divides by zero',
    href: '/subjects/MATHS',
    cta: 'Visit',
    background: <img src="mathbgfinal.jpg" className={imgStyles} />,
    className:
      '[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] backdrop text-white lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
  },
  {
    type: 'SCIENCE',
    Icon: InputIcon,
    name: 'Science',
    description: 'Never trust an atom... they make up everything',
    href: '/subjects/SCIENCE',
    cta: 'Visit',
    background: <img className={imgStyles} src="phybg.jpg" />,
    className:
      '[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
  },
  {
    Icon: GlobeIcon,
    name: 'English',
    type: 'ENGLISH',
    description: `The 3 most untrue words in English are -"Studying is boring"`,
    href: '/subjects/ENGLISH',
    cta: 'Visit',
    background: <img className={imgStyles} src="englishfinal2.avif" />,
    className:
      '[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
  },
  {
    Icon: CalendarIcon,
    type: 'SOCIAL_STUDIES',
    name: 'Social Science',
    description: 'Science, its like magic, but real',
    href: '/subjects/SOCIAL_STUDIES',
    cta: 'Visit',
    background: <img className={imgStyles} src="socialscience.jpeg" />,
    className:
      '[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
  },
  {
    Icon: BellIcon,
    type: 'MORAL_VALUES',
    name: 'Moral Values',
    description:
      'We are all born as empty vessels and shaped through moral values',
    href: '/subjects/MORAL_VALUES',
    cta: 'Visit',
    background: <img className={imgStyles} src="moralvalyes.avif" />,
    className:
      '[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] text-white lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
  },
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: userClass, status: classStatus } = useQuery({
    queryKey: ['class'],
    queryFn: () => fetch('/api/class').then(r => r.json()),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [router, status]);

  if (status === 'loading' || classStatus === 'pending') {
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: 'url(/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'start',
      }}
    >
      <Navbar />
      <main className="h-full min-h-screen">
        <div className="pt-10 pb-0 mb-11">
          <TypingAnimation
            duration={200}
            className="text-7xl font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-100/30"
            text={`Hi, ${session?.user?.name}!`}
          />
        </div>
        {!userClass || userClass.message ? (
          <div className="h-full mt-[20vh] flex items-center justify-center">
            <div className="flex flex-col w-fit min-w-[400px] bg-black/20 items-center justify-center p-6 border border-border rounded-xl">
              <div className="text-4xl text-white font-bold">
                No class joined
              </div>
              <div className="text-lg text-neutral-300/70 mt-4">
                Join or create a class to get started
              </div>
              <div className="w-full space-y-3">
                <button
                  onClick={() => router.push('/class/join')}
                  className="rounded-lg text-xl w-full mt-8 text-white px-4 py-2.5 transition-colors bg-[rgb(14_165_233/1)] hover:bg-[rgb(56_189_248/1)]"
                >
                  Join Class
                </button>
                <button
                  onClick={() => router.push('/class/create')}
                  className="rounded-lg text-xl w-full mt-8 text-white px-4 py-2.5 transition-colors bg-[rgb(14_165_233/1)] hover:bg-[rgb(56_189_248/1)]"
                >
                  Create Class
                </button>
              </div>
            </div>
          </div>
        ) : (
          <C />
        )}
      </main>
    </div>
  );
}

function C() {
  const activeTopic = useQuery({
    queryKey: ['activeTopic'],
    queryFn: () => fetch('/api/topics/active').then(r => r.json()),
  });

  return (
    <>
      {activeTopic.isSuccess && activeTopic.data?.topic && (
        <BlurFade delay={0.2}>
          <div className="p-10 pt-0 pb-8 [--accent:0_0%_100%] [--accent-foreground:0_0_0%]">
            <div className="text-4xl text-white/80 mb-6 font-bold my-5">
              Active Topic
            </div>

            <BlurFade delay={0.4}>
              <div className="relative flex rounded-[12px] w-fit flex-col items-center justify-center overflow-hidden bg-transparent md:shadow-xl">
                {/* @ts-ignore */}
                <BentoCard
                  {...features.find(r => r.type === activeTopic.data.topic)}
                />
              </div>
            </BlurFade>
          </div>
        </BlurFade>
      )}
      <BlurFade delay={0.2}>
        <div className="p-10 pt-0 [--accent:0_0%_100%] [--accent-foreground:0_0_0%]">
          <div className="text-4xl text-white/80 mb-6 font-bold my-5">
            Your subjects
          </div>

          <BlurFade delay={0.4}>
            <ShineBorder
              borderRadius={24}
              className="relative flex p-4 rounded-[24px] w-full flex-col items-center justify-center overflow-hidden border !bg-black/50 md:shadow-xl"
              color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
            >
              <BentoGrid className="lg:grid-rows-3 [&_svg]:text-white/60">
                {features.map((feature, idx) => (
                  <BlurFade
                    className="[display:contents]"
                    key={feature.name}
                    delay={0.25 + idx * 0.05}
                    inView
                  >
                    <BentoCard {...feature} />
                  </BlurFade>
                ))}
              </BentoGrid>
            </ShineBorder>
          </BlurFade>
        </div>
      </BlurFade>
    </>
  );
}
