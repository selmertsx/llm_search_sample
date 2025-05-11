import { google } from "@ai-sdk/google";
import { generateText } from "ai";

async function main() {
  const { text, sources } = await generateText({
    model: google("gemini-2.5-pro-preview-05-06", {
      useSearchGrounding: true,
    }),
    prompt:
      "List the top 5 San Francisco news from the past week." +
      "You must include the date of each article.",
  });

  console.log(text);
  console.log(sources);
}

main();
