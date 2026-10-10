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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('careercraft_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (!stored && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-150">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
