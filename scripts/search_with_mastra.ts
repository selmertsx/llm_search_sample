import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";
import { Message } from "@ai-sdk/ui-utils";
import { z } from "zod";

const PersonInfoSchema = z.object({
  fullName: z.string().describe("本名"),
  company: z.string().describe("所属会社"),
  department: z.string().describe("所属部署"),
});

async function main() {
  const agent = new Agent({
    name: "PeasonSearchAgent",
    instructions: "You are a helpful AI assistant that searches for person.",
    model: google("gemini-2.5-pro-preview-05-06", {
      useSearchGrounding: true,
    }),
  });

  const prompt: Message = {
    id: "1",
    role: "user",
    content:
      "github accountのaccount名がselmertsxという人がいます。この人の本名と所属会社、所属部署を教えてください",
  };

  const result = await agent.generate([prompt], {
    output: PersonInfoSchema,
  });
  console.log(result);
}

main();
