import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Krrish Rastogi — Backend Engineer & Competitive Programmer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#888",
            marginBottom: 16,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          krrishrastogi.vercel.app
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Krrish Rastogi
        </div>
        <div style={{ fontSize: 28, color: "#aaa", marginBottom: 40 }}>
          Backend Engineer · Competitive Programmer · AI/ML
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {["LeetCode Knight 1900+", "SIH'25 Winner", "BIT Mesra"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "#1f1f1f",
                border: "1px solid #333",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 18,
                color: "#ccc",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
