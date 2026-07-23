import "./globals.css";
import ExperienceEffects from "@/components/ExperienceEffects";

export const metadata = {
  title: "N2 Fitness Gym Betul | Animated Hero Experience",
  description:
    "Premium animated Next.js hero section for N2 Fitness Gym Betul, Madhya Pradesh with cinematic motion, WhatsApp CTAs, and responsive design.",
  keywords: [
    "N2 Fitness Gym Betul",
    "gym in Betul",
    "fitness Betul",
    "Next.js gym website",
    "animated gym hero"
  ],
  openGraph: {
    title: "N2 Fitness Gym Betul",
    description:
      "Luxury-inspired animated fitness website hero for N2 Fitness Gym Betul.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ExperienceEffects />
        {children}
      </body>
    </html>
  );
}
