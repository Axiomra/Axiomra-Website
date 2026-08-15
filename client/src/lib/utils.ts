import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins class names and resolves Tailwind conflicts, so a caller-supplied
 * `className` reliably overrides a component's own defaults instead of both
 * classes landing in the DOM and the cascade picking a winner at random.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
