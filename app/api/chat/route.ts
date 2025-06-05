import OpenAI from "openai";
import { NextRequest } from "next/server";

function getApiKey() {
  return process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || "your api key here";
}
const openai = new OpenAI({apiKey: getApiKey()});

export async function POST(request: NextRequest) {
    const { input, lastId, model = "gpt-4o-mini" } = await request.json();

    const response = await openai.responses.create({
      model: model,
      input: [{"role": "user", "content" : input}],
      previous_response_id: lastId,
      store: true,
    });
    return {message: response.output_text, id: response.id};
}