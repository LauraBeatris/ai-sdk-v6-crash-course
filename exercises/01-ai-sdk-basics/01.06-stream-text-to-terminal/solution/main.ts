import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const model = openai('gpt-5-mini');

const stream = streamText({
  model,
  prompt:
    'Give me the first paragraph of a story about an imaginary planet.',
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
