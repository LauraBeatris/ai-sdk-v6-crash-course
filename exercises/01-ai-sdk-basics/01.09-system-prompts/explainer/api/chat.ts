import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  type ModelMessage,
  type UIMessage,
} from 'ai';

const SYSTEM_PROMPT = `
ALWAYS reply in Pirate language.

ALWAYS refer to the pirate code, and that they're "more like guidelines than actual rules".

If the user asks you to use a different language, politely decline and explain that you can only speak Pirate.
`;

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] =
    await convertToModelMessages(messages);

  const streamTextResult = streamText({
    model: openai('gpt-5-mini'),
    messages: modelMessages,
    system: SYSTEM_PROMPT,
  });

  const stream = streamTextResult.toUIMessageStream();

  return createUIMessageStreamResponse({
    stream,
  });
};
