import { Agent } from "@mastra/core/agent";
import { google } from "@ai-sdk/google";
import { Message } from "@ai-sdk/ui-utils";
import { z, ZodObject, ZodRawShape, UnknownKeysParam, ZodTypeAny } from "zod";

export async function searchAndExtractInfo<
  S extends ZodObject<ZodRawShape, UnknownKeysParam, ZodTypeAny>,
>(
  itemName: string,
  outputSchema: S,
  rawSearchPromptTemplate: (itemName: string) => string,
  extractionPromptTemplate: (itemName: string, rawText: string) => Message[],
  agentName: string = "GenericSearchAgent",
  agentInstructions: string = "You are a helpful AI assistant that searches for information and provides structured data."
): Promise<z.infer<S>> {
  const agent = new Agent({
    name: agentName,
    instructions: agentInstructions,
    model: google("gemini-2.5-pro-preview-05-06", {
      useSearchGrounding: true,
    }),
  });

  const rawSearchPrompt = rawSearchPromptTemplate(itemName);
  const rawResult = await agent.generate(rawSearchPrompt);

  console.log(rawResult);

  const rawText =
    typeof rawResult.text === "string"
      ? rawResult.text
      : JSON.stringify(rawResult);
  const extractionPrompt = extractionPromptTemplate(itemName, rawText);
  const structuredResult = await agent.generate(extractionPrompt, {
    output: outputSchema,
  });
  console.log(structuredResult);
  return structuredResult;
}
