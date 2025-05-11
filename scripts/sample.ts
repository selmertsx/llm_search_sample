import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const { text, sources } = await generateText({
  model: google("gemini-1.5-pro", {
    useSearchGrounding: true,
  }),
  prompt:
    "List the top 5 San Francisco news from the past week." +
    "You must include the date of each article.",
});

console.log(text);
console.log(sources);
