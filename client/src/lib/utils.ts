import { type ClassName } from "@/types";

export function cn(...inputs: (string | ClassName | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}