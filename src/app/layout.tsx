import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerCraft — Build Your Resume. Showcase Your Potential.",
  description:
    "Create a professional, ATS-friendly resume and a stunning personal portfolio in minutes. No design or coding skills required.",
  keywords: [
    "resume builder",
    "portfolio builder",
    "ATS resume",
    "developer portfolio",
    "designer portfolio",
    "cv maker",
    "free resume templates",
  ],
  authors: [{ name: "CareerCraft" }],
  openGraph: {
    title: "CareerCraft — Resume & Portfolio Builder SaaS",
    description:
      "Build ATS-friendly resumes and responsive personal portfolio websites in minutes.",
    url: "https://careercraft.dev",
    siteName: "CareerCraft",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-150">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
