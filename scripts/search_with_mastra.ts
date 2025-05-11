import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";

async function main() {
  const agent = new Agent({
    name: "PeasonSearchAgent",
    instructions: "You are a helpful AI assistant that searches for person.",
    model: google("gemini-2.5-pro-preview-05-06", {
      useSearchGrounding: true,
    }),
  });

  const prompt =
    "github accountのaccount名がselmertsxという人がいます。この人の本名と所属会社、所属部署を教えてください";

  const result = await agent.generate(
    prompt,
  );
  console.log(result);
}

main();
