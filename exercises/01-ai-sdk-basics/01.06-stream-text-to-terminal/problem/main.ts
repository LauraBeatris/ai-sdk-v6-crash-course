import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const model = openai('gpt-5-mini');

const prompt =
  'Give me the first paragraph of a story about an imaginary planet.';

const stream = TODO; // TODO - stream some text with the model above.

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
