import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalize = (value: number, min: number, max: number) =>
  (value - min) / (max - min);

export const formatter = Intl.NumberFormat("en", { notation: "compact" });
