import OpenAI from "openai";
import { useAIChatStore } from "@/store/useAIChatStore";

function getApiKey() {
  return process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || "your api key here";
}
const openai = new OpenAI({apiKey: getApiKey()});

export async function createResponse(input: string, chatname: string, model = "gpt-4o-mini", ) {
    const lastId = useAIChatStore.getState().getLastResponseId("alice");
    const response = await openai.responses.create({
        model: model,
        input: [{"role": "user", "content" : input}],
        previous_response_id: lastId,
        store: true,
    });
    useAIChatStore.getState().setLastResponseId("alice", response.id);
    return response.output_text
}