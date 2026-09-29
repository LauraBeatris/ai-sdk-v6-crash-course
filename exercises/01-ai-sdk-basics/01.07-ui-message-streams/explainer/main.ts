import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const model = openai('gpt-5-mini');

const stream = streamText({
  model,
  prompt: 'What is the safest city to live in Brazil.',
});

for await (const chunk of stream.toUIMessageStream()) {
  console.log(chunk);
}
