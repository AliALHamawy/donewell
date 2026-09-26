"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        // 1. التحقق من حالة الجلسة الحالية عند تحميل المكون
        const checkUserSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                setIsAuthenticated(false);
                router.replace("/auth");
            } else {
                setIsAuthenticated(true);
            }
        };

        checkUserSession();

        // 2. الاستماع لأي تغيرات في حالة تسجيل الدخول أو الخروج (Realtime Auth State)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                setIsAuthenticated(false);
                router.replace("/auth");
            } else {
                setIsAuthenticated(true);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    // عرض شاشة تحميل بسيطة ريثما يتم التحقق من الجلسة لمنع الوميض (Flicker)
    if (isAuthenticated === null) {
        return <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;