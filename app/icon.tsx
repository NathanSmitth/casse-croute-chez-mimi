import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

// Favicon — replace with the real logo mark once provided (or drop an icon.png here).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1F5A2E",
          borderRadius: 16,
          color: "#FAF8F3",
          fontFamily: "Fredoka",
          fontWeight: 700,
          fontSize: 46,
          paddingBottom: 4,
        }}
      >
        M
      </div>
    ),
    { ...size, fonts: await ogFonts() }
  );
}
