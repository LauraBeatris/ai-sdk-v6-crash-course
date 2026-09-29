import { openai } from '@ai-sdk/openai';
import {
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
  type UIMessage,
  convertToModelMessages,
} from 'ai';

const model = openai('gpt-5-mini')

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  // Converts the UI message to a model message that the model can process 🤷‍♀️
  const modelMessages: ModelMessage[] = await convertToModelMessages(messages);

  // Pass to the model and get a text stream
  const streamTextResult = streamText({
    model,
    messages: modelMessages,
  });

  // Convert text stream to UI stream
  const stream = streamTextResult.toUIMessageStream();

  // Convert to a response to the UI
  return createUIMessageStreamResponse({
    stream,
  });
};
