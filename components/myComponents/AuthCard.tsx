"use client";

import { supabase } from "@/lib/supabaseClient";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";

interface formType {
    id: number;
    heading: string;
    subHeading: string;
    button: string;
    qt: string;
    qlt: string;
    link: string;
}

const formData: formType[] = [
    {
        id: 1,
        heading: "Welcome back",
        subHeading: "Sign in to continue to your tasks.",
        button: "Sign in",
        qt: "New to Donewell?",
        qlt: "Create an account",
        link: "#",
    },
    {
        id: 2,
        heading: "Create your account",
        subHeading: "Start with a fresh, focused workspace.",
        button: "Create account",
        qt: "Already have an account?",
        qlt: "Sign in",
        link: "#",
    },
];

const AuthCard = () => {
    const router = useRouter();

    const [form, setForm] = useState<formType>(formData[0]);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. التحقق اليدوي من الحقول الفارغة
        if (!email.trim() || !password.trim()) {
            toast.add({
                type: "error",
                title: "Missing fields",
                description: "Please fill in both email and password.",
            });
            return;
        }

        // 2. التحقق من صحة البريد الإلكتروني (يحتوي على @ و .)
        if (!email.includes("@") || !email.includes(".")) {
            toast.add({
                type: "error",
                title: "Invalid email",
                description: "Please enter a valid email address.",
            });
            return;
        }

        // 3. التحقق من طول كلمة المرور (أقل من 6 أحرف)
        if (password.length < 6) {
            toast.add({
                type: "error",
                title: "Weak password",
                description: "Password must be at least 6 characters long.",
            });
            return;
        }

        setLoading(true);

        try {
            if (form.id === 1) {
                // 🔑 تسجيل الدخول باستخدام Supabase
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                toast.add({
                    type: "success",
                    title: "Check your inbox!",
                    description: "We've sent a verification link to your email. Please confirm it before signing in.",
                });

                router.push("/");
            } else {
                // 📝 إنشاء حساب جديد باستخدام Supabase
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (signUpError) throw signUpError;

                // 🔑 تسجيل الدخول تلقائياً فور إنشاء الحساب بنجاح
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;

                toast.add({
                    type: "success",
                    title: "Account created!",
                    description: "Your workspace is ready.",
                });

                router.push("/"); // التوجيه الفوري للصفحة الرئيسية
            }
        } catch (err: any) {
            console.error("Auth Error:", err);

            let title = form.id === 1 ? "Sign in failed" : "Registration failed";
            let description = err?.message || "An error occurred. Please try again.";

            // تخصيص رسائل الخطأ الشائعة في Supabase
            if (err?.message?.includes("Invalid login credentials")) {
                description = "Invalid email or password. Please check your credentials.";
            } else if (err?.message?.includes("User already registered")) {
                description = "This email is already registered.";
            }

            toast.add({
                type: "error",
                title: title,
                description: description,
            });
        } finally {
            setLoading(false);
        }
    };

    const toggleForm = (targetForm?: formType) => {
        if (targetForm) {
            setForm(targetForm);
        } else {
            setForm(form.id === 1 ? formData[1] : formData[0]);
        }
    };

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-(--shadow-panel) sm:p-9 flex flex-col items-start gap-4 w-full">
            <div className="flex w-full flex-col gap-2 items-start">
                <h3 className="text-3xl font-medium tracking-tight">{form.heading}</h3>
                <h4 className="text-sm text-muted-foreground">{form.subHeading}</h4>
            </div>

            <div className="mt-7 grid grid-cols-2 rounded-lg bg-muted p-1 w-full gap-1">
                <button
                    type="button"
                    className={cn(
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none h-9 px-4 py-2 text-foreground",
                        form.id === 1 ? "bg-primary text-background" : "hover:bg-primary/10"
                    )}
                    onClick={() => toggleForm(formData[0])}
                >
                    Sign in
                </button>
                <button
                    type="button"
                    className={cn(
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none h-9 px-4 py-2 text-foreground",
                        form.id === 2 ? "bg-primary text-background" : "hover:bg-primary/10"
                    )}
                    onClick={() => toggleForm(formData[1])}
                >
                    Sign up
                </button>
            </div>

            <form className="mt-7 space-y-5 w-full" onSubmit={handleSubmit} noValidate>
                <label className="block text-sm font-medium">
                    Email address
                    <input
                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm mt-2 h-11"
                        placeholder="you@example.com"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label className="block text-sm font-medium">
                    Password
                    <span className="relative mt-2 block">
                        <input
                            className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-11 pr-11"
                            placeholder="At least 6 characters"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground absolute right-1 top-1 size-9"
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-eye"
                                aria-hidden="true"
                            >
                                {showPassword ? (
                                    <path d="M3 3l18 18M10.58 10.58a2 2 0 0 0 2.83 2.83M9.88 4.24A10.9 10.9 0 0 1 12 4c5 0 8.73 4.11 9.9 7.5a1.2 1.2 0 0 1 0 1 11.6 11.6 0 0 1-2.15 3.35M6.61 6.61A11.7 11.7 0 0 0 2.1 11.5a1.2 1.2 0 0 0 0 1C3.27 15.89 7 20 12 20a10.9 10.9 0 0 0 2.12-.24"></path>
                                ) : (
                                    <>
                                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </>
                                )}
                            </svg>
                        </button>
                    </span>
                </label>

                <button
                    className={cn(
                        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md px-8 h-11 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        form.button
                    )}
                </button>
            </form>

            <div className="w-full flex justify-center text-center items-center text-muted-foreground text-sm">
                {form.qt}{" "}
                <button
                    className="ml-1 text-primary hover:underline cursor-pointer"
                    type="button"
                    onClick={() => toggleForm()}
                >
                    {form.qlt}
                </button>
            </div>
        </div>
    );
};

export default AuthCard;