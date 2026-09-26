import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://donewell.vercel.app"; // 👈 دومين موقعك

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/auth",      // 🚫 منع أرشفة صفحة تسجيل الدخول وإنشاء الحساب
                "/api/",      // مسارات الـ API الداخلية
                "/_next/",    // ملفات Next.js الداخلية
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}