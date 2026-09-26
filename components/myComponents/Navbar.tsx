"use client";

import { useTheme } from "@/components/myComponents/ThemeProvider";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import Logo from "@/components/myComponents/Logo";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const [email, setEmail] = useState<string>("User");

  // جلب البريد الإلكتروني للمستخدم الحالي عند تحميل الـ Navbar
  useEffect(() => {
    async function getUserEmail() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
    }
    getUserEmail();
  }, []);

  // دالة تسجيل الخروج باستخدام Supabase
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace("/auth");
    } else {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-background flex w-full items-center border-b border-border justify-center py-3">
        <div className="max-w-250 w-full justify-between flex items-center px-4 sm:px-6 lg:px-8 mx-auto">
          <Logo />

          <div className="flex items-center gap-2">
            <p className="hidden sm:flex px-2 text-xs font-medium text-primary rounded-xl items-center bg-primary/20 py-1">
              {email}
            </p>
            <AnimatedThemeToggler
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              onThemeChange={setTheme}
              className="flex p-2 size-8 rounded-sm items-center transition-all duration-300 hover:bg-primary/25 cursor-pointer"
            />
            <button 
              className="flex p-2 size-8 rounded-sm items-center transition-all duration-300 hover:bg-primary/25 cursor-pointer text-muted-foreground hover:text-foreground" 
              onClick={handleLogout}
              title="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;