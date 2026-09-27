import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/myComponents/ThemeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Providers } from "@/store/Providers";

export const viewport: Viewport = {
  themeColor: "#090d16",
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
  metadataBase: new URL("https://donewell-task.vercel.app"),
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
    "donewell notes app",

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
    "notes and reminders",
    "notes app for productivity",

    // 🚀 Productivity & Workflow Keywords
    "productivity app",
    "focus workspace",
    "distraction-free planner",
    "time management tool",
    "minimalist workspace",
    "offline-first todo app",
    "realtime sync app",

    // 💻 Tech Stack Specific
    "supabase todo & notes app",
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
    // 🇪🇸 Spanish Keywords (Notas y Tareas)
    "aplicación de notas",
    "tomar notas rápidamente",
    "gestor de tareas",
    "lista de tareas",
    "notas y tareas",
    "notas minimalistas",
    "planificador diario",
    "organizador personal",
    "aplicación de lista de verificación",
    "rastreador de tareas",
    "notas y recordatorios",
    "aplicación de productividad",

    // 🇫🇷 French Keywords (Notes et Tâches)
    "application de prise de notes",
    "notes rapides",
    "gestionnaire de tâches",
    "liste de tâches",
    "notes et tâches",
    "notes minimalistes",
    "planificateur quotidien",
    "organisateur personnel",
    "application de liste de contrôle",
    "suivi des tâches",
    "notes et rappels",
    "application de productivité",
  ],
  verification: {
    google: "4839dTLhK3YmqiQddjWRbRmo5p_cDlWp5rgZ6vnK3SE",
  },
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
        <Providers>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}