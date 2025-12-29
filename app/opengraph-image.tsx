import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "radial-gradient(circle at 20% 20%, rgba(13,148,136,0.25), transparent 40%), radial-gradient(circle at 80% 30%, rgba(245,158,11,0.22), transparent 45%), linear-gradient(180deg, #FAF8F3 0%, #ffffff 100%)",
        }}
      >
        <div
          style={{
            width: 1040,
            padding: "56px 64px",
            borderRadius: 32,
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(231,229,228,1)",
            boxShadow: "0 30px 80px rgba(28,25,23,0.10)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 2, color: "#0F766E" }}>
            PRIVATE TOURS • SRI LANKA
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#1C1917", lineHeight: 1.05 }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 30, color: "#57534E", lineHeight: 1.3, maxWidth: 920 }}>
            Custom itineraries, trusted local guide, comfortable vehicles — designed for international
            travelers.
          </div>
        </div>
      </div>
    ),
    size
  );
}

