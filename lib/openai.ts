import { useAIChatStore } from "@/store/useAIChatStore";

export async function createResponse(input: string, chatname: string, model = "gpt-4o-mini") {
  try {
    // Get the last response ID from store
    const lastId = useAIChatStore.getState().getLastResponseId(chatname);

    // Call your API route instead of OpenAI directly
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
        lastId,
        model,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();

    // Save the new response ID to store
    if (data.id) {
      useAIChatStore.getState().setLastResponseId(chatname, data.id);
    }

    return data.message;
  } catch (error) {
    console.error('Error calling AI:', error);
    throw error;
  }
}