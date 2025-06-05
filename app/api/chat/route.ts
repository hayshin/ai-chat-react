import OpenAI from "openai";
import { NextRequest } from "next/server";

function getApiKey() {
  return process.env.OPENAI_API_KEY || "your api key here";
}
const openai = new OpenAI({apiKey: getApiKey()});

export async function POST(request: NextRequest) {
  try {
    const { input, lastId, model } = await request.json();

    const response = await openai.responses.create({
      model: model,
      input: [{"role": "user", "content" : input}],
      previous_response_id: lastId,
      store: true,
    });

    return Response.json({message: response.output_text, id: response.id});
  } catch (error) {
    console.error('OpenAI API error:', error);
    return Response.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}