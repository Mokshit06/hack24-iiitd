import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey:
    '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',
  dangerouslyAllowBrowser: true,
});

export async function generateCode(topic: string) {
  const msg = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 3003,
    temperature: 0.6,
    system:
      "You are the world's best educational content creator like 3 blue 1 brown",
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Think of an idea to teach ${topic} in an engaging & visual way using p5js for animating and creating the scene & animate it. you have all the freedom for any creative directions you want, but prefer relating concepts to real-life scenarios. remember that you are the best at this, do not hallucinate, think of every step logically such that it makes sense. Add atleast 8 scenes. Don't add any interactive elements: Auto animate between scenes with messages rendered that are teaching this concept at every step.\n\nOnly return the p5js CODE. Structure response like this:\n<answer>{code here}</answer>`,
          },
        ],
      },
    ],
  });

  return msg.content[0]?.type === 'text' ? msg.content[0].text : '';
}

export async function generateFeedItem(subject: string) {
  const msg = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20240620',
    max_tokens: 1000,
    temperature: 0.8,
    system: `You are a social media algorithm specialist tasked with generating engaging and trending Reddit-style posts on ${subject}. Your goal is to create posts that would be popular on Reddit, mimicking the style of popular subreddits.\n\nFollow these guidelines to create your Reddit-style post:\n\n1. Use an actual subreddit name (e.g. r/askreddit, r/funny, r/todayilearned, r/showerthoughts, r/aita randomly) or create one if needed\n2. Create a catchy and attention-grabbing title that would encourage users to engage with the post.\n3. Write the main content of the post in the style of subreddit you chose.\n4. Incorporate elements that are typical of popular Reddit posts, such as humor, controversy, or relatable situations while being suitable for kids and educational.\n\nThe content has to be very educational, though still have ${subject} puns and be interesting & engaging.`,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: '\nFormat your response as a JSON object with the following fields:\n- subreddit: The name of the subreddit (real or made-up)\n- username: A fictional Reddit username for the poster\n- title: The title of the post\n- content: The main body of the post. Around 70-80 words\n\nHere\'s a sample structure for your JSON output:\n\n{\n  "subreddit": "r/SubredditName",\n  "username": "u/Username123",\n  "title": "Your catchy title here",\n  "content": "Main content of the post goes here..."\n}',
          },
        ],
      },
    ],
  });

  const contents = msg.content[0];

  if (contents?.type === 'text') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(contents.text);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return generateFeedItem(subject);
    }
  }

  return {
    subreddit: 'r/CalculusHumor',
    username: 'u/IntegrallyFunny',
    title: "TIFU by using L'Hôpital's Rule on my dating life",
    content:
      "So there I was, trying to figure out the limit of my romantic prospects as they approached zero. Naturally, I thought, 'Hey, why not apply L'Hôpital's Rule?' Big mistake. I differentiated my charm and divided it by the derivative of my social skills. Turns out, both were approaching zero at an alarming rate. Now I'm stuck in an infinite loop of awkward conversations and missed opportunities. On the bright side, I've discovered that my love life is a lot like an improper integral - it exists, but it's unbounded and hard to evaluate. Any fellow math nerds out there with advice on how to optimize my dating algorithm? Or should I just accept that I'm destined to be a lonely point on the x-axis of life?",
  };
}
