import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 20% 20%, rgba(13,148,136,0.24), transparent 40%), radial-gradient(circle at 80% 30%, rgba(245,158,11,0.20), transparent 45%), linear-gradient(180deg, #FAF8F3 0%, #ffffff 100%)",
        }}
      >
        <div style={{ width: 1040, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 20, letterSpacing: 2, color: "#0F766E" }}>
            SRI LANKA PRIVATE TOURS
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, color: "#1C1917", lineHeight: 1.05 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 28, color: "#57534E", lineHeight: 1.3, maxWidth: 920 }}>
            Plan a smooth, safe, and unforgettable journey — with the right vehicle for your group.
          </div>
        </div>
      </div>
    ),
    size
  );
}

