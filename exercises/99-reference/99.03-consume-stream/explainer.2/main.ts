import { openai } from '@ai-sdk/openai';
import { consumeStream, streamText } from 'ai';

console.log('Process starting...');

const streamTextResult = streamText({
  model: openai('gpt-5-mini'),
  prompt: 'Hello, world!',
  onFinish: () => {
    console.log('Stream finished!');
  },
});

// Try commenting this out and see what happens!
await consumeStream({
  stream: streamTextResult.toUIMessageStream(),
});

console.log('Process exiting...');
