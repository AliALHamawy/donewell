"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
    resolvedTheme: "light" | "dark";
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(
        "light"
    );

    useEffect(() => {
        const storedTheme = window.localStorage.getItem("theme") as Theme | null;
        setThemeState(storedTheme ?? "system");
    }, []);

    useEffect(() => {
        const applyTheme = () => {
            const nextTheme = theme === "system" ? getSystemTheme() : theme;
            document.documentElement.classList.toggle("dark", nextTheme === "dark");
            setResolvedTheme(nextTheme);
        };

        applyTheme();

        if (theme !== "system") return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", applyTheme);
        return () => mediaQuery.removeEventListener("change", applyTheme);
    }, [theme]);

    const setTheme = (nextTheme: Theme) => {
        window.localStorage.setItem("theme", nextTheme);
        setThemeState(nextTheme);
    };

    return (
        <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}