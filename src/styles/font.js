import { Outfit } from "next/font/google";

export const outfitFont = Outfit({
  weight: ["400", "600", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
});
