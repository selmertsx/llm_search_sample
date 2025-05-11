import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";

async function main() {
  const agent = new Agent({
    name: "NewsSearchAgent",
    instructions: "You are a helpful AI assistant that searches for news.",
    model: google("gemini-2.5-pro-preview-05-06", {
      useSearchGrounding: true,
    }),
  });

  const prompt =
    "List the top 5 San Francisco news from the past week." +
    "You must include the date of each article.";

  const result = await agent.generate(prompt);
  console.log(result);
}

main();
