import { z } from "zod";
import { type ToolMetadata, type InferSchema } from "xmcp";

// Define the schema for tool parameters
export const schema = {
  name: z.string().describe("The name of the user to greet"),
};

// Define tool metadata
export const metadata: ToolMetadata = {
  name: "getDependencyInfo",
  description:
    "Gets the dependency information for a given package manager in the current project",
};

// Tool implementation
export default function getDependencyInfo({}: InferSchema<typeof schema>) {
  throw new Error("Not implemented yet");
}
