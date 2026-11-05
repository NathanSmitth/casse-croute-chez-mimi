import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F5A2E",
          color: "#FAF8F3",
          fontFamily: "Fredoka",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 112, lineHeight: 1 }}>M</div>
        <div style={{ marginTop: 6, width: 56, height: 6, borderRadius: 3, background: "#A8CB6E" }} />
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
