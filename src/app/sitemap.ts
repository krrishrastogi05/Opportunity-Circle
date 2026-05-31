import { MetadataRoute } from "next";

const siteUrl = "https://opportunitycircle.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/companies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/opportunities`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/open-source`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/reach`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
}
