import { clsx, type ClassValue } from "clsx";

/**
 * Joins class names. Plain clsx, not tailwind-merge: twMerge cost 100 kB in the
 * entry chunk, and the few call sites that relied on it to drop a conflicting
 * class now simply don't pass one (see src/lib/utils.test.jsx).
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
