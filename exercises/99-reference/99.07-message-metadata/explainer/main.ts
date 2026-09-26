import { openai } from '@ai-sdk/openai';
import { streamText, type UIMessage } from 'ai';

type MyMetadata = {
  // The length of the message generated
  length: number;
};

type MyMessage = UIMessage<MyMetadata>;

const streamTextResult = streamText({
  model: openai('gpt-5-mini'),
  prompt: 'Hello, world!',
});

let totalLength = 0;

const stream = streamTextResult.toUIMessageStream<MyMessage>({
  messageMetadata: ({ part }) => {
    if (part.type === 'text-delta') {
      totalLength += part.text.length;
    }

    if (part.type === 'finish') {
      return {
        length: totalLength,
      };
    }
  },
  onFinish: ({ responseMessage }) => {
    console.log(responseMessage.metadata);
  },
});

for await (const chunk of stream) {
  console.log(chunk);
}
