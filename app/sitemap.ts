import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://donewell.vercel.app"; // 👈 دومين موقعك

  return [
    {
      url: baseUrl, // الصفحة الرئيسية فقط
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}