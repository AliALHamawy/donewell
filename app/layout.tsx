import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/myComponents/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";

export const viewport: Viewport = {
  themeColor: "#090d16", // طابق هذا اللون مع لون خلفية الـ Theme لديك
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://donewell.vercel.app"), // 👈 استبدله بالدومين الخاص بك لاحقاً
  title: {
    default: "Donewell — Minimalist Task Management & Focus Workspace",
    template: "%s | Donewell",
  },
  description:
    "Organize your daily tasks, stay focused, take notes, and achieve your goals with a fast, offline-first workspace.",
  keywords: [
    // 🏷️ Brand & Core Keywords
    "donewell",
    "donewell app",
    "donewell task manager",

    // 📝 Notes & Task Keywords (English)
    "note taking app",
    "quick notes",
    "task manager",
    "todo list app",
    "notes and tasks",
    "minimalist notes",
    "daily planner app",
    "personal organizer",
    "checklist app",
    "task tracker",

    // 🚀 Productivity & Workflow Keywords
    "productivity app",
    "focus workspace",
    "distraction-free planner",
    "time management tool",
    "minimalist workspace",
    "offline-first todo app",
    "realtime sync app",

    // 💻 Tech Stack Specific
    "pocketbase todo",
    "nextjs task manager",
    "shadcn task app",

    // 🇸🇦 Arabic Keywords (مهام وملاحظات وتنظيم الوقت)
    "تطبيق ملاحظات",
    "تدوين الملاحظات",
    "تطبيق إدارة المهام",
    "تطبيق مهام وملاحظات",
    "قائمة مهام يومية",
    "تطبيق تنظيم الوقت",
    "مخطط يومي",
    "منظم المهام",
    "إدارة الوقت والإنتاجية",
    "تطبيقات زيادة الإنتاجية",
    "تطبيق تو دو ليست",
    "تطبيق مفكرة شخصية",
    "دون ويل",
  ],
  authors: [{ name: "Donewell Team" }],
  creator: "Donewell",
  publisher: "Donewell",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://donewell.app",
    title: "Donewell — Focused Task Workspace",
    description:
      "A fast, distraction-free task management experience designed for speed and clarity.",
    siteName: "Donewell",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donewell — Task Management App",
    description: "Stay focused with a clean, offline-first task workspace.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}